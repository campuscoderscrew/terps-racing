#!/usr/bin/env node
/*
  Terps Racing Google Drive CLI — browse and read the team's Drive folders
  without downloading them.

    node tools/drive/drive.mjs login                 sign in (once; opens the browser)
    node tools/drive/drive.mjs whoami                which Google account is signed in
    node tools/drive/drive.mjs ls    <folder>        list one folder
    node tools/drive/drive.mjs tree  <folder> [--depth N] [--refresh]
    node tools/drive/drive.mjs find  <folder> <text> search file names in a folder tree
    node tools/drive/drive.mjs text  <file>          print a Google Doc / Slides / Sheet as text
    node tools/drive/drive.mjs get   <file> [dir]    download ONE file (Docs export to .docx etc.)
    node tools/drive/drive.mjs get   <folder> "Sub/Path/file.pdf" [dir]
    node tools/drive/drive.mjs index <folder> [out.json] [--refresh]
    node tools/drive/drive.mjs logout

  <folder> / <file> can be a Drive link or an ID. Folder aliases from
  drive.config.json can be used instead, e.g.  ls ic-photos
*/
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import { DriveClient, FOLDER, parseDriveId } from "./googledrive.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(path.join(HERE, "drive.config.json"), "utf8"));
  } catch {
    return {};
  }
}
const CFG = loadConfig();
const drive = new DriveClient({
  credentialsFile: CFG.credentials && path.resolve(HERE, CFG.credentials),
  tokenFile: CFG.token && path.resolve(HERE, CFG.token),
  cacheMB: CFG.cacheMB,
});

/** Resolve an alias from drive.config.json "folders", else a link/ID. */
function idOf(arg) {
  if (!arg) throw new Error("Missing a Drive folder or file (link, ID or alias).");
  const alias = CFG.folders?.[arg];
  return parseDriveId(alias ? (typeof alias === "string" ? alias : alias.link) : arg);
}

const human = (n) => {
  if (n == null) return "";
  const u = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = Number(n);
  while (v >= 1024 && i < u.length - 1) (v /= 1024), i++;
  return `${v.toFixed(i ? 1 : 0)} ${u[i]}`;
};
const kind = (f) => (f.mimeType === FOLDER ? "folder" : f.mimeType.replace("application/vnd.google-apps.", "google-").split("/").pop());

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const pos = args.filter((a) => !a.startsWith("--"));
const flagVal = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const [cmd, a1, a2, a3] = pos;

async function main() {
  switch (cmd) {
    case "login": {
      const user = await drive.login();
      console.log(`Signed in as ${user.displayName} <${user.emailAddress}>. Token saved to ${drive.tokenFile}`);
      break;
    }
    case "logout":
      await drive.logout();
      console.log("Signed out (token removed).");
      break;
    case "whoami": {
      const u = await drive.about();
      console.log(`${u.displayName} <${u.emailAddress}>`);
      break;
    }
    case "ls": {
      const id = idOf(a1);
      const [meta, kids] = await Promise.all([drive.get(id), drive.list(id)]);
      console.log(`${meta.name}/  (${kids.length} items)`);
      for (const f of kids) console.log(`  ${f.mimeType === FOLDER ? "📁" : "  "} ${f.name}${f.mimeType === FOLDER ? "/" : ""}   ${kind(f)}  ${human(f.size)}  ${f.id}`);
      break;
    }
    case "tree": {
      const depth = Number(flagVal("--depth") ?? Infinity);
      const idx = await drive.walkCached(idOf(a1), { refresh: flags.has("--refresh"), onProgress: progress });
      clearProgress();
      const rows = [...idx.folders.map((f) => ({ ...f, dir: true })), ...idx.files].sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));
      for (const r of rows) {
        const d = r.path.split("/").length - 1;
        if (d > depth) continue;
        console.log(`${"  ".repeat(d)}${r.dir ? "📁 " : ""}${r.path.split("/").pop()}${r.dir ? "/" : `  ${human(r.size)}`}`);
      }
      const total = idx.files.reduce((a, f) => a + Number(f.size || 0), 0);
      console.log(`\n${idx.folders.length} folders, ${idx.files.length} files, ${human(total)} on Drive — scanned ${idx.scannedAt}`);
      break;
    }
    case "find": {
      if (!a2) throw new Error("Usage: find <folder> <text>");
      const idx = await drive.walkCached(idOf(a1), { refresh: flags.has("--refresh"), onProgress: progress });
      clearProgress();
      const q = a2.toLowerCase();
      const hits = [...idx.folders, ...idx.files].filter((f) => f.path.toLowerCase().includes(q));
      for (const h of hits) console.log(`${h.path}   ${h.mimeType ? kind(h) : "folder"}  ${human(h.size)}  ${h.id}`);
      console.log(`\n${hits.length} match(es).`);
      break;
    }
    case "text": {
      process.stdout.write(await drive.readText(await resolveFile(a1, a2)));
      process.stdout.write("\n");
      break;
    }
    case "get": {
      // get <file> [dir]   or   get <folder> <relative path> [dir]
      let fileId;
      let outDir;
      if (a2 && !fs.existsSync(a2) && a2.includes("/") || (a2 && /\.[a-z0-9]{2,5}$/i.test(a2) && !fs.existsSync(a2))) {
        fileId = await resolveFile(a1, a2);
        outDir = a3 || ".";
      } else {
        fileId = idOf(a1);
        outDir = a2 || ".";
      }
      const { meta, res, ext } = await drive.download(fileId);
      const base = path.extname(meta.name) ? meta.name : meta.name + ext;
      await fsp.mkdir(outDir, { recursive: true });
      const out = path.join(outDir, base.replace(/[<>:"/\\|?*]/g, "_"));
      await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(out));
      console.log(`Saved ${out} (${human(fs.statSync(out).size)})`);
      break;
    }
    case "index": {
      const idx = await drive.walkCached(idOf(a1), { refresh: flags.has("--refresh"), onProgress: progress });
      clearProgress();
      const slim = {
        root: idx.root,
        scannedAt: idx.scannedAt,
        folders: idx.folders.map((f) => f.path),
        files: idx.files.map((f) => ({ path: f.path, id: f.id, type: f.mimeType, size: f.size ? Number(f.size) : null, modified: f.modifiedTime })),
      };
      const json = JSON.stringify(slim, null, 2);
      if (a2) {
        await fsp.writeFile(a2, json);
        console.log(`Wrote ${a2}: ${slim.folders.length} folders, ${slim.files.length} files.`);
      } else console.log(json);
      break;
    }
    default:
      console.log(fs.readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/")[0].split("/*")[1].trim());
      process.exitCode = cmd ? 1 : 0;
  }
}

/** A file given directly, or as <folder> + "relative/path/in/it". */
async function resolveFile(folderOrFile, rel) {
  if (!rel) return idOf(folderOrFile);
  const idx = await drive.walkCached(idOf(folderOrFile), { onProgress: progress });
  clearProgress();
  const want = rel.replace(/\\/g, "/").replace(/^\/+/, "").toLowerCase();
  const hit =
    idx.files.find((f) => f.path.toLowerCase() === `${idx.root.name}/${want}`.toLowerCase()) ||
    idx.files.find((f) => f.path.toLowerCase().endsWith("/" + want));
  if (!hit) throw new Error(`No file "${rel}" under ${idx.root.name}. Try:  find ${folderOrFile} "${path.basename(rel)}"`);
  return hit.id;
}

let shown = false;
function progress({ folders, files }) {
  if (!process.stderr.isTTY) return;
  shown = true;
  process.stderr.write(`\rScanning Drive… ${folders} folders, ${files} files`);
}
function clearProgress() {
  if (shown) process.stderr.write("\r\x1b[K");
  shown = false;
}

main().catch((err) => {
  clearProgress();
  console.error(`\n${err.message}`);
  process.exit(1);
});
