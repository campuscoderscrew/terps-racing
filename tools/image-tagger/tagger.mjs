#!/usr/bin/env node
/*
  Terps Racing image tagger — a local, zero-dependency tagging tool.

    node tools/image-tagger/tagger.mjs                 # roots from tagger.config.json
    node tools/image-tagger/tagger.mjs "D:\some\folder" # override the root(s)

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
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_FILE = path.join(HERE, "tagger.config.json");

/* ── config ─────────────────────────────────────────────────────────────── */

function loadConfig() {
  let cfg = {};
  try {
    cfg = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
  } catch {
    /* defaults below */
  }
  const cliRoots = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const portArg = process.argv.find((a) => a.startsWith("--port="));
  const roots = (cliRoots.length ? cliRoots : cfg.roots || []).map((r) => path.resolve(HERE, r));
  return {
    roots,
    port: portArg ? Number(portArg.split("=")[1]) : cfg.port || 5178,
    tagsFile: path.resolve(HERE, cfg.tagsFile || "tags.json"),
    customTagsFile: path.resolve(HERE, cfg.customTagsFile || "custom-tags.json"),
    openBrowser: cfg.openBrowser !== false && !process.argv.includes("--no-open"),
  };
}

const CFG = loadConfig();

if (!CFG.roots.length) {
  console.error("No image folder configured. Add one to tagger.config.json → \"roots\", or pass it as an argument.");
  process.exit(1);
}
for (const r of CFG.roots) {
  if (!fs.existsSync(r) || !fs.statSync(r).isDirectory()) {
    console.error(`Image folder not found: ${r}\nEdit "roots" in ${CONFIG_FILE}.`);
    process.exit(1);
  }
}

/* ── files ──────────────────────────────────────────────────────────────── */

// Browsers render these directly.
const PREVIEWABLE = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".bmp", ".avif"]);
// Images a browser cannot draw (camera RAW, HEIC, TIFF). Still taggable; the UI offers "open in default app".
const OTHER_IMAGES = new Set([".heic", ".heif", ".nef", ".cr2", ".cr3", ".arw", ".dng", ".tif", ".tiff"]);
const MIME = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
  ".gif": "image/gif", ".svg": "image/svg+xml", ".bmp": "image/bmp", ".avif": "image/avif",
};
const SKIP_DIRS = new Set([".git", "node_modules", "$RECYCLE.BIN", "System Volume Information"]);

const toPosix = (p) => p.split(path.sep).join("/");
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

/** Walk one root. Paths are "<root folder name>/<relative path>" so several roots can share a tags.json. */
async function scanRoot(root) {
  const base = path.basename(root);
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
      } else if (e.isFile()) {
        const ext = path.extname(e.name).toLowerCase();
        if (PREVIEWABLE.has(ext) || OTHER_IMAGES.has(ext)) {
          images.push({ path: `${base}/${relPath}`, ext, previewable: PREVIEWABLE.has(ext) });
        }
      }
    }
  }
  await walk(root, "");
  return { images, folders: [...folders] };
}

async function scanAll() {
  const images = [];
  const folders = new Set();
  for (const r of CFG.roots) {
    const s = await scanRoot(r);
    images.push(...s.images);
    s.folders.forEach((f) => folders.add(f));
  }
  images.sort((a, b) => collator.compare(a.path, b.path));
  // Only keep folders that actually lead to an image — empty admin folders are noise in the tag tree.
  const used = new Set();
  for (const img of images) {
    const parts = img.path.split("/").slice(0, -1);
    for (let i = 1; i <= parts.length; i++) used.add(parts.slice(0, i).join("/"));
  }
  return { images, folders: [...folders].filter((f) => used.has(f)).sort(collator.compare) };
}

/** Map a stored image path back to a file on disk, refusing anything outside the roots. */
function resolveImage(p) {
  if (typeof p !== "string") return null;
  const [head, ...rest] = p.split("/");
  const root = CFG.roots.find((r) => path.basename(r) === head);
  if (!root) return null;
  const abs = path.resolve(root, ...rest);
  const rel = path.relative(root, abs);
  if (rel.startsWith("..") || path.isAbsolute(rel)) return null;
  return abs;
}

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
      const { images, folders } = await scanAll();
      return send(res, 200, { roots: CFG.roots.map((r) => path.basename(r)), images, folders, records, customTags, tagsFile: CFG.tagsFile });
    }

    if (req.method === "GET" && url.pathname === "/img") {
      const abs = resolveImage(url.searchParams.get("p"));
      const type = abs && MIME[path.extname(abs).toLowerCase()];
      if (!abs || !type || !fs.existsSync(abs)) return send(res, 404, { error: "not found" });
      res.writeHead(200, { "Content-Type": type, "Cache-Control": "max-age=3600" });
      return fs.createReadStream(abs).pipe(res);
    }

    if (req.method === "POST" && url.pathname === "/api/tag") {
      const { path: p, tags } = await readBody(req);
      if (!resolveImage(p)) return send(res, 400, { error: "bad path" });
      const clean = cleanTags(tags);
      await queueSave(async () => {
        const i = records.findIndex((r) => r.path === p);
        if (i >= 0) records[i] = { path: p, tags: clean };
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
        records = records.map((r) => ({ path: r.path, tags: cleanTags(r.tags.map(swap)) }));
        await writeJsonAtomic(CFG.customTagsFile, customTags);
        await writeJsonAtomic(CFG.tagsFile, records);
      });
      return send(res, 200, { ok: true });
    }

    if (req.method === "POST" && url.pathname === "/api/open") {
      const { path: p } = await readBody(req);
      const abs = resolveImage(p);
      if (!abs || !fs.existsSync(abs)) return send(res, 404, { error: "not found" });
      openInDefaultApp(abs);
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
  const { images } = await scanAll();
  const done = new Set(records.map((r) => r.path));
  const tagged = images.filter((i) => done.has(i.path)).length;
  const url = `http://localhost:${CFG.port}`;
  console.log(`\nTerps Racing image tagger`);
  CFG.roots.forEach((r) => console.log(`  folder : ${r}`));
  console.log(`  tags   : ${CFG.tagsFile}`);
  console.log(`  images : ${images.length} found, ${tagged} tagged, ${images.length - tagged} to go`);
  console.log(`\n  Open ${url}  (Ctrl+C to stop — every save is written immediately)\n`);
  if (CFG.openBrowser) {
    const [cmd, args] =
      process.platform === "win32" ? ["cmd", ["/c", "start", "", url]] : process.platform === "darwin" ? ["open", [url]] : ["xdg-open", [url]];
    try {
      spawn(cmd, args, { detached: true, stdio: "ignore" }).on("error", () => {}).unref();
    } catch {
      /* no browser — the URL is printed above */
    }
  }
});
