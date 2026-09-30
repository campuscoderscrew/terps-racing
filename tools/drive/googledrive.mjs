/*
  Minimal Google Drive client — read-only, zero dependencies (Node 18+).

  Used by the image tagger (tools/image-tagger) and the `drive` CLI
  (tools/drive/drive.mjs) to browse and read the team's Drive folders without
  downloading them. Nothing is synced: folder listings are cached as small JSON
  indexes, and image previews are fetched on demand into a size-capped cache.

  Auth is OAuth 2.0 for installed apps ("Desktop app" client) with PKCE and a
  loopback redirect. The only scope requested is drive.readonly.

    credentials.json  — downloaded from Google Cloud Console (never commit)
    token.json        — written after the first `login` (never commit)
*/
import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));

// Overridable so the whole client can be exercised against a local mock.
const AUTH_URL = process.env.GDRIVE_AUTH_URL || "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = process.env.GDRIVE_TOKEN_URL || "https://oauth2.googleapis.com/token";
const API = process.env.GDRIVE_API_URL || "https://www.googleapis.com/drive/v3";
const SCOPE = "https://www.googleapis.com/auth/drive.readonly";

export const FOLDER = "application/vnd.google-apps.folder";
const SHORTCUT = "application/vnd.google-apps.shortcut";

/** Google-native files can't be downloaded as-is; they're exported. */
export const EXPORTS = {
  "application/vnd.google-apps.document": { mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", ext: ".docx", text: "text/plain" },
  "application/vnd.google-apps.spreadsheet": { mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ext: ".xlsx", text: "text/csv" },
  "application/vnd.google-apps.presentation": { mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation", ext: ".pptx", text: "text/plain" },
  "application/vnd.google-apps.drawing": { mime: "image/png", ext: ".png" },
};

/** Accepts a folder/file ID or any drive.google.com / docs.google.com link. */
export function parseDriveId(input) {
  const s = String(input).trim().replace(/^drive:/, "");
  const m =
    s.match(/\/folders\/([\w-]{10,})/) ||
    s.match(/\/d\/([\w-]{10,})/) ||
    s.match(/[?&]id=([\w-]{10,})/);
  if (m) return m[1];
  if (/^[\w-]{10,}$/.test(s)) return s;
  throw new Error(`Not a Google Drive link or ID: ${input}`);
}

function openInBrowser(url) {
  const [cmd, args] =
    // rundll32 hands the URL straight to the default browser — no cmd.exe
    // parsing, so the & in OAuth URLs survives.
    process.platform === "win32" ? ["rundll32", ["url.dll,FileProtocolHandler", url]]
    : process.platform === "darwin" ? ["open", [url]]
    : ["xdg-open", [url]];
  try {
    spawn(cmd, args, { detached: true, stdio: "ignore" }).on("error", () => {}).unref();
  } catch {
    /* URL is printed as well */
  }
}

const b64url = (buf) => buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

export class DriveClient {
  /**
   * @param {object} opts
   * @param {string} [opts.credentialsFile]
   * @param {string} [opts.tokenFile]
   * @param {string} [opts.cacheDir]  thumbnails + folder indexes
   * @param {number} [opts.cacheMB]   thumbnail cache cap
   */
  constructor(opts = {}) {
    this.credentialsFile = path.resolve(opts.credentialsFile || path.join(HERE, "credentials.json"));
    this.tokenFile = path.resolve(opts.tokenFile || path.join(HERE, "token.json"));
    this.cacheDir = path.resolve(opts.cacheDir || path.join(HERE, "..", ".cache", "drive"));
    this.cacheBytes = (opts.cacheMB ?? 400) * 1024 * 1024;
    this._access = null;
  }

  /* ── auth ─────────────────────────────────────────────────────────────── */

  credentials() {
    if (!fs.existsSync(this.credentialsFile)) {
      throw new Error(
        `Missing ${this.credentialsFile}.\n` +
          "Create a Desktop-app OAuth client in Google Cloud Console and save its JSON there — see tools/drive/README.md."
      );
    }
    const raw = JSON.parse(fs.readFileSync(this.credentialsFile, "utf8"));
    const c = raw.installed || raw.web || raw;
    if (!c.client_id) throw new Error(`${this.credentialsFile} has no client_id.`);
    return { client_id: c.client_id, client_secret: c.client_secret };
  }

  hasToken() {
    return fs.existsSync(this.tokenFile);
  }

  /** Interactive sign-in: opens the browser, catches the redirect on 127.0.0.1. */
  async login({ open = true } = {}) {
    const { client_id, client_secret } = this.credentials();
    const verifier = b64url(crypto.randomBytes(48));
    const challenge = b64url(crypto.createHash("sha256").update(verifier).digest());
    const state = b64url(crypto.randomBytes(16));

    const { code, redirect_uri } = await new Promise((resolve, reject) => {
      let redirect = "";
      const server = http.createServer((req, res) => {
        const u = new URL(req.url, "http://127.0.0.1");
        if (u.pathname !== "/") return res.writeHead(404).end();
        const ok = u.searchParams.get("state") === state && u.searchParams.get("code");
        res.writeHead(ok ? 200 : 400, { "Content-Type": "text/html; charset=utf-8" });
        res.end(
          ok
            ? "<h2 style='font-family:sans-serif'>Signed in to Google Drive.</h2><p style='font-family:sans-serif'>You can close this tab and go back to the terminal.</p>"
            : `<h2 style='font-family:sans-serif'>Sign-in failed: ${u.searchParams.get("error") || "bad response"}</h2>`
        );
        server.close();
        ok
          ? resolve({ code: u.searchParams.get("code"), redirect_uri: redirect })
          : reject(new Error(u.searchParams.get("error") || "Sign-in was not completed."));
      });
      server.listen(0, "127.0.0.1", () => {
        redirect = `http://127.0.0.1:${server.address().port}`;
        const url =
          AUTH_URL +
          "?" +
          new URLSearchParams({
            client_id,
            redirect_uri: redirect,
            response_type: "code",
            scope: SCOPE,
            access_type: "offline",
            prompt: "consent",
            code_challenge: challenge,
            code_challenge_method: "S256",
            state,
          });
        console.log(`\nSign in to Google in your browser. If it didn't open, visit:\n\n  ${url}\n`);
        if (open) openInBrowser(url);
      });
      setTimeout(() => {
        server.close();
        reject(new Error("Timed out waiting for Google sign-in (5 min)."));
      }, 5 * 60 * 1000).unref();
    });

    const tok = await this._tokenRequest({
      grant_type: "authorization_code",
      code,
      redirect_uri,
      client_id,
      client_secret,
      code_verifier: verifier,
    });
    if (!tok.refresh_token) throw new Error("Google did not return a refresh token. Remove this app at myaccount.google.com/permissions and sign in again.");
    await this._saveToken({ refresh_token: tok.refresh_token, scope: tok.scope, created: new Date().toISOString() });
    this._access = { token: tok.access_token, expires: Date.now() + (tok.expires_in - 60) * 1000 };
    return this.about();
  }

  async logout() {
    await fsp.rm(this.tokenFile, { force: true });
    this._access = null;
  }

  async _tokenRequest(params) {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(params),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = body.error_description || body.error || res.statusText;
      if (body.error === "invalid_grant") {
        throw new Error(
          `Google sign-in has expired or was revoked (${msg}). Run:  node tools/drive/drive.mjs login` +
            "\n(Apps left in Google's \"Testing\" mode must sign in again every 7 days — see README.)"
        );
      }
      throw new Error(`Google token request failed: ${msg}`);
    }
    return body;
  }

  async _saveToken(t) {
    await fsp.mkdir(path.dirname(this.tokenFile), { recursive: true });
    await fsp.writeFile(this.tokenFile, JSON.stringify(t, null, 2), { mode: 0o600 });
  }

  async accessToken() {
    if (this._access && Date.now() < this._access.expires) return this._access.token;
    if (!this.hasToken()) throw new Error("Not signed in to Google Drive. Run:  node tools/drive/drive.mjs login");
    const { refresh_token } = JSON.parse(await fsp.readFile(this.tokenFile, "utf8"));
    const { client_id, client_secret } = this.credentials();
    const tok = await this._tokenRequest({ grant_type: "refresh_token", refresh_token, client_id, client_secret });
    this._access = { token: tok.access_token, expires: Date.now() + (tok.expires_in - 60) * 1000 };
    return this._access.token;
  }

  /* ── HTTP ─────────────────────────────────────────────────────────────── */

  async _fetch(url, init = {}, retry = 0) {
    const res = await fetch(url, {
      ...init,
      headers: { ...(init.headers || {}), Authorization: `Bearer ${await this.accessToken()}` },
    });
    if (res.status === 401 && retry === 0) {
      this._access = null;
      return this._fetch(url, init, 1);
    }
    // Back off on rate limits / transient errors.
    if ((res.status === 429 || res.status >= 500) && retry < 4) {
      await new Promise((r) => setTimeout(r, 500 * 2 ** retry + Math.random() * 250));
      return this._fetch(url, init, retry + 1);
    }
    return res;
  }

  async _json(pathAndQuery) {
    const res = await this._fetch(API + pathAndQuery);
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = body.error?.message || res.statusText;
      if (res.status === 404) throw new Error(`Not found on Drive (or not shared with this account): ${msg}`);
      if (res.status === 403) throw new Error(`Drive refused the request: ${msg}`);
      throw new Error(`Drive API error ${res.status}: ${msg}`);
    }
    return body;
  }

  /* ── metadata ─────────────────────────────────────────────────────────── */

  static FIELDS =
    "id,name,mimeType,size,modifiedTime,thumbnailLink,webViewLink,imageMediaMetadata(width,height,rotation),shortcutDetails(targetId,targetMimeType)";

  async about() {
    const a = await this._json("/about?fields=user(displayName,emailAddress)");
    return a.user;
  }

  async get(id) {
    const f = await this._json(`/files/${encodeURIComponent(id)}?supportsAllDrives=true&fields=${encodeURIComponent(DriveClient.FIELDS + ",parents")}`);
    return this._resolveShortcut(f);
  }

  async _resolveShortcut(f) {
    if (f.mimeType !== SHORTCUT || !f.shortcutDetails?.targetId) return f;
    const t = await this._json(`/files/${f.shortcutDetails.targetId}?supportsAllDrives=true&fields=${encodeURIComponent(DriveClient.FIELDS)}`);
    return { ...t, name: f.name }; // keep the shortcut's name as it appears in the folder
  }

  /** Direct children of a folder (shortcuts resolved), all pages. */
  async list(folderId) {
    const out = [];
    let pageToken;
    do {
      const q = new URLSearchParams({
        q: `'${folderId}' in parents and trashed = false`,
        fields: `nextPageToken,files(${DriveClient.FIELDS})`,
        pageSize: "1000",
        supportsAllDrives: "true",
        includeItemsFromAllDrives: "true",
        orderBy: "folder,name_natural",
      });
      if (pageToken) q.set("pageToken", pageToken);
      const page = await this._json(`/files?${q}`);
      for (const f of page.files || []) out.push(await this._resolveShortcut(f));
      pageToken = page.nextPageToken;
    } while (pageToken);
    return out;
  }

  /**
   * Walk a folder tree. Returns { root, folders: [{path,id}], files: [{path,...meta}] }
   * with paths like "Root Name/Sub/Sub2/file.jpg". Folders are listed a few at a
   * time in parallel; loops (a shortcut pointing back up the tree) are skipped.
   */
  async walk(rootId, { name, onProgress } = {}) {
    const root = await this.get(rootId);
    if (root.mimeType !== FOLDER) throw new Error(`${root.name} is not a folder.`);
    const rootName = name || root.name;
    const folders = [{ path: rootName, id: root.id }];
    const files = [];
    const seen = new Set([root.id]);
    const queue = [{ id: root.id, path: rootName }];
    let active = 0;
    await new Promise((resolve, reject) => {
      const pump = () => {
        if (!queue.length && !active) return resolve();
        while (active < 4 && queue.length) {
          const job = queue.shift();
          active++;
          this.list(job.id)
            .then((children) => {
              for (const c of children) {
                const p = `${job.path}/${c.name.replace(/\//g, "∕")}`;
                if (c.mimeType === FOLDER) {
                  if (seen.has(c.id)) continue;
                  seen.add(c.id);
                  folders.push({ path: p, id: c.id });
                  queue.push({ id: c.id, path: p });
                } else files.push({ ...c, path: p });
              }
              onProgress?.({ folders: folders.length, files: files.length });
            })
            .then(() => {
              active--;
              pump();
            }, reject);
        }
      };
      pump();
    });
    return { root: { id: root.id, name: rootName }, folders, files, scannedAt: new Date().toISOString() };
  }

  /** walk(), cached on disk. Pass { refresh: true } to rescan. */
  async walkCached(rootId, { name, refresh = false, maxAgeMs = 24 * 3600e3, onProgress } = {}) {
    const file = path.join(this.cacheDir, `index-${rootId}.json`);
    if (!refresh) {
      try {
        const idx = JSON.parse(await fsp.readFile(file, "utf8"));
        if (Date.now() - Date.parse(idx.scannedAt) < maxAgeMs && (!name || idx.root.name === name)) return idx;
      } catch {
        /* no cache yet */
      }
    }
    const idx = await this.walk(rootId, { name, onProgress });
    await fsp.mkdir(this.cacheDir, { recursive: true });
    await fsp.writeFile(file, JSON.stringify(idx));
    return idx;
  }

  /* ── content ──────────────────────────────────────────────────────────── */

  /** Raw file bytes as a fetch Response (streamable). Google-native files are exported. */
  async download(id, { exportMime } = {}) {
    const meta = await this.get(id);
    const exp = EXPORTS[meta.mimeType];
    const url = exp
      ? `${API}/files/${meta.id}/export?mimeType=${encodeURIComponent(exportMime || exp.mime)}`
      : `${API}/files/${meta.id}?alt=media&supportsAllDrives=true`;
    const res = await this._fetch(url);
    if (!res.ok) throw new Error(`Download of ${meta.name} failed: ${res.status} ${res.statusText}`);
    return { meta, res, ext: exp ? exp.ext : path.extname(meta.name) };
  }

  /** Plain text of a Google Doc/Slides/Sheet (Sheets come back as CSV of the first tab). */
  async readText(id) {
    const meta = await this.get(id);
    const exp = EXPORTS[meta.mimeType];
    if (!exp?.text) throw new Error(`${meta.name} is not a Google Doc, Sheet or Slides file.`);
    const { res } = await this.download(id, { exportMime: exp.text });
    return res.text();
  }

  /**
   * A preview image for any image Drive can render — including HEIC, NEF and
   * TIFF, which browsers can't show. Uses Drive's own thumbnail at the size
   * asked for, cached on disk. Returns { file, type } or null.
   */
  async thumbnail(meta, size = 1600) {
    const key = `${meta.id}-${size}-${(meta.modifiedTime || "").replace(/\W/g, "")}.img`;
    const file = path.join(this.cacheDir, "thumbs", key);
    if (fs.existsSync(file)) {
      const now = new Date();
      fs.utimesSync(file, now, now); // LRU: touch on use
      return { file, type: "image/jpeg" };
    }
    let link = meta.thumbnailLink;
    if (!link) {
      // thumbnailLink expires after a few hours — refresh it from the API.
      link = (await this.get(meta.id)).thumbnailLink;
    }
    let res = link ? await this._fetch(link.replace(/=s\d+$/, `=s${size}`)) : null;
    if (res && !res.ok && meta.thumbnailLink) {
      const fresh = (await this.get(meta.id)).thumbnailLink;
      res = fresh ? await this._fetch(fresh.replace(/=s\d+$/, `=s${size}`)) : null;
    }
    if (!res || !res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    await fsp.mkdir(path.dirname(file), { recursive: true });
    await fsp.writeFile(file, buf);
    this._trimCache().catch(() => {});
    return { file, type: res.headers.get("content-type") || "image/jpeg" };
  }

  async _trimCache() {
    const dir = path.join(this.cacheDir, "thumbs");
    const entries = await Promise.all(
      (await fsp.readdir(dir)).map(async (n) => {
        const s = await fsp.stat(path.join(dir, n));
        return { n, size: s.size, t: s.mtimeMs };
      })
    );
    let total = entries.reduce((a, e) => a + e.size, 0);
    if (total <= this.cacheBytes) return;
    entries.sort((a, b) => a.t - b.t);
    for (const e of entries) {
      if (total <= this.cacheBytes * 0.8) break;
      await fsp.rm(path.join(dir, e.n), { force: true });
      total -= e.size;
    }
  }

  static openInBrowser = openInBrowser;
}
