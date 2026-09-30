#!/usr/bin/env node
/*
  Terps Racing image tagger — a local, zero-dependency tagging tool.

    node tools/image-tagger/tagger.mjs                 # roots from tagger.config.json
    node tools/image-tagger/tagger.mjs "D:\some\folder" # override the root(s)
    node tools/image-tagger/tagger.mjs "drive:https://drive.google.com/drive/folders/…"

  A root is either a folder on disk or a Google Drive folder ("drive:<link or id>",
  or { "drive": "<link>", "name": "Display name" } in the config). Drive folders are
  read through the Drive API (tools/drive) — nothing is downloaded except the
  previews you look at, which go into a size-capped cache. Drive also renders
  HEIC / NEF / TIFF previews, which browsers can't.

  Walks every image under the configured root folder(s), serves a small web UI on
  http://localhost:5178, and saves tags to tags.json as

    [ { "path": "Terps Racing Business Folder/Logo/TRlogo.png",
        "tags": ["Terps Racing Business Folder", "Terps Racing Business Folder/Logo", ...] }, ... ]

  - Tags are hierarchical and written as paths ("Parent/Child/Grandchild").
  - Every folder is a tag. An image always carries its own folder and every folder above it.
  - Custom tags (not folders) live in custom-tags.json and can sit under any tag, folder or not.
  - An image counts as "tagged" once it has an entry in tags.json, so closing the tool and
    starting it again picks up at the first image without one.
*/
import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import { DriveClient, parseDriveId } from "../drive/googledrive.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_FILE = path.join(HERE, "tagger.config.json");

/* ── config ─────────────────────────────────────────────────────────────── */

/** Folder aliases ("pictures", "ev", …) shared with the drive CLI's drive.config.json. */
function driveId(ref) {
  let aliases = {};
  try {
    aliases = JSON.parse(fs.readFileSync(path.join(HERE, "..", "drive", "drive.config.json"), "utf8")).folders || {};
  } catch {
    /* no aliases */
  }
  const key = String(ref).replace(/^drive:/i, "").trim();
  return parseDriveId(aliases[key] || key);
}

function loadConfig() {
  let cfg = {};
  try {
    cfg = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
  } catch {
    /* defaults below */
  }
  const cliRoots = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const portArg = process.argv.find((a) => a.startsWith("--port="));
  const roots = (cliRoots.length ? cliRoots : cfg.roots || []).map((r) => {
    if (typeof r === "object" && r?.drive) return { kind: "drive", id: driveId(r.drive), name: r.name };
    if (typeof r === "string" && /^drive:/i.test(r)) return { kind: "drive", id: driveId(r) };
    const abs = path.resolve(HERE, String(r));
    return { kind: "local", abs, name: path.basename(abs) };
  });
  return {
    roots,
    port: portArg ? Number(portArg.split("=")[1]) : cfg.port || 5178,
    tagsFile: path.resolve(HERE, cfg.tagsFile || "tags.json"),
    customTagsFile: path.resolve(HERE, cfg.customTagsFile || "custom-tags.json"),
    openBrowser: cfg.openBrowser !== false && !process.argv.includes("--no-open"),
    drive: cfg.drive || {},
  };
}

const CFG = loadConfig();

if (!CFG.roots.length) {
  console.error("No image folder configured. Add one to tagger.config.json → \"roots\", or pass it as an argument.");
  process.exit(1);
}
for (const r of CFG.roots) {
  if (r.kind === "local" && (!fs.existsSync(r.abs) || !fs.statSync(r.abs).isDirectory())) {
    console.error(`Image folder not found: ${r.abs}\nEdit "roots" in ${CONFIG_FILE}.`);
    process.exit(1);
  }
}

const drive = CFG.roots.some((r) => r.kind === "drive")
  ? new DriveClient({
      credentialsFile: CFG.drive.credentials && path.resolve(HERE, CFG.drive.credentials),
      tokenFile: CFG.drive.token && path.resolve(HERE, CFG.drive.token),
      cacheMB: CFG.drive.cacheMB,
    })
  : null;
if (drive && !drive.hasToken()) {
  console.error("This config includes a Google Drive folder, but you're not signed in yet.\nRun once:  node tools/drive/drive.mjs login");
  process.exit(1);
}

/* ── files ──────────────────────────────────────────────────────────────── */

// Browsers render these directly.
const PREVIEWABLE = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".bmp", ".avif"]);
// Images a browser cannot draw (camera RAW, HEIC, TIFF). Still taggable; local ones offer
// "open in default app", Drive ones get a preview rendered by Drive.
const OTHER_IMAGES = new Set([".heic", ".heif", ".nef", ".cr2", ".cr3", ".arw", ".dng", ".tif", ".tiff"]);
const MIME = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
  ".gif": "image/gif", ".svg": "image/svg+xml", ".bmp": "image/bmp", ".avif": "image/avif",
};
const SKIP_DIRS = new Set([".git", "node_modules", "$RECYCLE.BIN", "System Volume Information"]);

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
const isImageName = (name) => {
  const ext = path.extname(name).toLowerCase();
  return PREVIEWABLE.has(ext) || OTHER_IMAGES.has(ext);
};

/**
 * Every image the tool knows about, by its stored path. Paths are
 * "<root name>/<relative path>" for both kinds of root, so a Drive folder and a
 * downloaded copy of it produce the same tags.json keys.
 */
let INDEX = new Map();

/** Walk one local root. */
async function scanLocal(root) {
  const base = root.name;
  const images = [];
  const folders = new Set([base]);
  async function walk(dir, rel) {
    let entries;
    try {
      entries = await fsp.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.name.startsWith(".") || SKIP_DIRS.has(e.name)) continue;
      const abs = path.join(dir, e.name);
      const relPath = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) {
        folders.add(`${base}/${relPath}`);
        await walk(abs, relPath);
      } else if (e.isFile() && isImageName(e.name)) {
        const ext = path.extname(e.name).toLowerCase();
        images.push({ path: `${base}/${relPath}`, ext, previewable: PREVIEWABLE.has(ext), source: "local", abs });
      }
    }
  }
  await walk(root.abs, "");
  return { images, folders: [...folders] };
}

/** List one Drive root through the API (cached for a day unless refresh). */
async function scanDrive(root, refresh) {
  const idx = await drive.walkCached(root.id, {
    name: root.name,
    refresh,
    onProgress: ({ folders, files }) => process.stdout.isTTY && process.stdout.write(`\r  scanning Drive… ${folders} folders, ${files} files `),
  });
  if (process.stdout.isTTY) process.stdout.write("\r\x1b[K");
  root.name = idx.root.name;
  const images = idx.files
    .filter((f) => f.mimeType?.startsWith("image/") || isImageName(f.name))
    .map((f) => {
      const ext = path.extname(f.name).toLowerCase();
      return {
        path: f.path,
        ext,
        // Drive renders a preview for almost any image, including HEIC and RAW.
        previewable: Boolean(f.thumbnailLink) || PREVIEWABLE.has(ext),
        source: "drive",
        meta: f,
      };
    });
  return { images, folders: idx.folders.map((f) => f.path) };
}

let lastScan = null;
async function scanAll({ refresh = false } = {}) {
  if (lastScan && !refresh) return lastScan;
  const images = [];
  const folders = new Set();
  for (const r of CFG.roots) {
    const s = r.kind === "drive" ? await scanDrive(r, refresh) : await scanLocal(r);
    images.push(...s.images);
    s.folders.forEach((f) => folders.add(f));
  }
  images.sort((a, b) => collator.compare(a.path, b.path));
  INDEX = new Map(images.map((i) => [i.path, i]));
  // Only keep folders that actually lead to an image — empty admin folders are noise in the tag tree.
  const used = new Set();
  for (const img of images) {
    const parts = img.path.split("/").slice(0, -1);
    for (let i = 1; i <= parts.length; i++) used.add(parts.slice(0, i).join("/"));
  }
  lastScan = { images, folders: [...folders].filter((f) => used.has(f)).sort(collator.compare) };
  return lastScan;
}

/** What the browser needs per image — no absolute paths or Drive metadata. */
const publicImage = (i) => ({ path: i.path, ext: i.ext, previewable: i.previewable, source: i.source });

/* ── storage ────────────────────────────────────────────────────────────── */

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(`Could not read ${file}: ${err.message}. Refusing to start so it isn't overwritten.`);
      process.exit(1);
    }
    return fallback;
  }
}

// Write to a temp file and rename over the original, so a crash mid-save never leaves a half-written file.
async function writeJsonAtomic(file, data) {
  const tmp = `${file}.tmp`;
  await fsp.writeFile(tmp, JSON.stringify(data, null, 2) + "\n", "utf8");
  await fsp.rename(tmp, file);
}

let records = readJson(CFG.tagsFile, []);
let customTags = readJson(CFG.customTagsFile, []);
if (!Array.isArray(records) || !Array.isArray(customTags)) {
  console.error("tags.json and custom-tags.json must each contain a JSON array.");
  process.exit(1);
}
// One backup per session, taken before anything is changed.
if (fs.existsSync(CFG.tagsFile)) fs.copyFileSync(CFG.tagsFile, CFG.tagsFile.replace(/\.json$/, ".backup.json"));

// Saves are serialised so two quick clicks can't interleave writes.
let saving = Promise.resolve();
const queueSave = (fn) => (saving = saving.then(fn, fn));

const cleanTags = (tags) =>
  [...new Set((Array.isArray(tags) ? tags : []).filter((t) => typeof t === "string").map((t) => t.trim()).filter(Boolean))].sort(collator.compare);

/* ── http ───────────────────────────────────────────────────────────────── */

function send(res, status, body, type = "application/json") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(type === "application/json" ? JSON.stringify(body) : body);
}

async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function openInDefaultApp(abs) {
  const [cmd, args] =
    process.platform === "win32" ? ["explorer.exe", [abs]] : process.platform === "darwin" ? ["open", [abs]] : ["xdg-open", [abs]];
  spawn(cmd, args, { detached: true, stdio: "ignore" }).unref();
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");

    if (req.method === "GET" && url.pathname === "/") {
      return send(res, 200, await fsp.readFile(path.join(HERE, "index.html")), "text/html; charset=utf-8");
    }

    if (req.method === "GET" && url.pathname === "/api/state") {
      const { images, folders } = await scanAll({ refresh: url.searchParams.get("refresh") === "1" });
      return send(res, 200, {
        roots: CFG.roots.map((r) => r.name),
        hasDrive: Boolean(drive),
        images: images.map(publicImage),
        folders,
        records,
        customTags,
        tagsFile: CFG.tagsFile,
      });
    }

    if (req.method === "GET" && url.pathname === "/img") {
      const img = INDEX.get(url.searchParams.get("p"));
      if (!img) return send(res, 404, { error: "not found" });
      // size: the longest edge wanted. The grid asks for small previews, the editor for large.
      const size = Math.min(Math.max(Number(url.searchParams.get("size")) || 1600, 120), 2400);
      if (img.source === "local") {
        const type = MIME[img.ext];
        if (!type || !fs.existsSync(img.abs)) return send(res, 404, { error: "not found" });
        res.writeHead(200, { "Content-Type": type, "Cache-Control": "max-age=3600" });
        return fs.createReadStream(img.abs).pipe(res);
      }
      const thumb = await drive.thumbnail(img.meta, size);
      if (thumb) {
        res.writeHead(200, { "Content-Type": thumb.type, "Cache-Control": "max-age=86400" });
        return fs.createReadStream(thumb.file).pipe(res);
      }
      if (MIME[img.ext]) {
        // No Drive thumbnail yet (e.g. just uploaded) — stream the original once.
        const { res: dl } = await drive.download(img.meta.id);
        res.writeHead(200, { "Content-Type": MIME[img.ext], "Cache-Control": "max-age=3600" });
        return Readable.fromWeb(dl.body).pipe(res);
      }
      return send(res, 404, { error: "no preview" });
    }

    if (req.method === "POST" && url.pathname === "/api/tag") {
      const { path: p, tags } = await readBody(req);
      if (!INDEX.has(p)) return send(res, 400, { error: "unknown image" });
      const clean = cleanTags(tags);
      await queueSave(async () => {
        const i = records.findIndex((r) => r.path === p);
        if (i >= 0) records[i] = { ...records[i], path: p, tags: clean };
        else records.push({ path: p, tags: clean });
        records.sort((a, b) => collator.compare(a.path, b.path));
        await writeJsonAtomic(CFG.tagsFile, records);
      });
      return send(res, 200, { ok: true, record: { path: p, tags: clean } });
    }

    if (req.method === "POST" && url.pathname === "/api/untag") {
      const { path: p } = await readBody(req);
      await queueSave(async () => {
        records = records.filter((r) => r.path !== p);
        await writeJsonAtomic(CFG.tagsFile, records);
      });
      return send(res, 200, { ok: true });
    }

    if (req.method === "POST" && url.pathname === "/api/custom-tags") {
      const { tags } = await readBody(req);
      await queueSave(async () => {
        customTags = cleanTags(tags);
        await writeJsonAtomic(CFG.customTagsFile, customTags);
      });
      return send(res, 200, { ok: true, customTags });
    }

    if (req.method === "POST" && url.pathname === "/api/rename-tag") {
      // Renames a custom tag and everything under it, in custom-tags.json and on every image.
      const { from, to } = await readBody(req);
      if (typeof from !== "string" || typeof to !== "string" || !to.trim()) return send(res, 400, { error: "bad tag" });
      const swap = (t) => (t === from ? to.trim() : t.startsWith(from + "/") ? to.trim() + t.slice(from.length) : t);
      await queueSave(async () => {
        customTags = cleanTags(customTags.map(swap));
        records = records.map((r) => ({ ...r, tags: cleanTags(r.tags.map(swap)) }));
        await writeJsonAtomic(CFG.customTagsFile, customTags);
        await writeJsonAtomic(CFG.tagsFile, records);
      });
      return send(res, 200, { ok: true });
    }

    if (req.method === "POST" && url.pathname === "/api/open") {
      const { path: p } = await readBody(req);
      const img = INDEX.get(p);
      if (!img) return send(res, 404, { error: "not found" });
      if (img.source === "drive") {
        const link = img.meta.webViewLink || `https://drive.google.com/file/d/${img.meta.id}/view`;
        DriveClient.openInBrowser(link);
        return send(res, 200, { ok: true, link });
      }
      if (!fs.existsSync(img.abs)) return send(res, 404, { error: "not found" });
      openInDefaultApp(img.abs);
      return send(res, 200, { ok: true });
    }

    send(res, 404, { error: "not found" });
  } catch (err) {
    console.error(err);
    send(res, 500, { error: String(err.message || err) });
  }
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${CFG.port} is busy — is the tagger already running? Try --port=5179.`);
    process.exit(1);
  }
  throw err;
});

server.listen(CFG.port, "127.0.0.1", async () => {
  let images = [];
  try {
    ({ images } = await scanAll());
  } catch (err) {
    console.error(`\nCould not read the image folders: ${err.message}`);
    process.exit(1);
  }
  const done = new Set(records.map((r) => r.path));
  const tagged = images.filter((i) => done.has(i.path)).length;
  const url = `http://localhost:${CFG.port}`;
  console.log(`\nTerps Racing image tagger`);
  CFG.roots.forEach((r) => console.log(`  folder : ${r.kind === "drive" ? `${r.name} (Google Drive ${r.id})` : r.abs}`));
  console.log(`  tags   : ${CFG.tagsFile}`);
  console.log(`  images : ${images.length} found, ${tagged} tagged, ${images.length - tagged} to go`);
  console.log(`\n  Open ${url}  (Ctrl+C to stop — every save is written immediately)\n`);
  if (CFG.openBrowser) {
    const [cmd, args] =
      process.platform === "win32" ? ["rundll32", ["url.dll,FileProtocolHandler", url]] : process.platform === "darwin" ? ["open", [url]] : ["xdg-open", [url]];
    try {
      spawn(cmd, args, { detached: true, stdio: "ignore" }).on("error", () => {}).unref();
    } catch {
      /* no browser — the URL is printed above */
    }
  }
});
