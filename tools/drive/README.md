# Google Drive access (`tools/drive`)

Read the team's Google Drive folders straight from Drive, **without downloading them**. The Drive
folders are several GB each; this keeps only what you actually look at on disk:

| What | Where it lives | Size |
|---|---|---|
| Folder listings | `tools/.cache/drive/index-<folderId>.json`, refreshed daily or on demand | a few hundred KB |
| Photo previews you've viewed | `tools/.cache/drive/thumbs/`; the oldest are cleared once it passes `cacheMB` | capped (400 MB default) |
| Anything else | nothing is saved unless you run `get` | — |

It uses Google's official Drive API with **read-only** access (`drive.readonly`). It can't change or
delete anything on Drive. There are no npm packages to install; it needs Node 18+.

Two things use it:
- **The image tagger.** Put a Drive folder in `tools/image-tagger/tagger.config.json` and tag it like a
  local folder. Drive also renders previews of HEIC / NEF / TIFF photos, which browsers can't show.
- **The `drive` command** (below), for browsing and reading Drive from the terminal. This is also how
  Claude can look through the folders for website content.

---

## One-time setup (≈10 minutes)

### 1. Create a Google Cloud project and turn on the Drive API
1. Go to <https://console.cloud.google.com/> and sign in.
   Use your **terpmail** account if UMD lets you create projects; otherwise any Google account works for this step.
2. Create a project (top bar → project picker → **New project**), e.g. `terps-racing-site`.
3. **APIs & Services → Library**, search for **Google Drive API**, and click **Enable**.

### 2. Set up the consent screen
**APIs & Services → OAuth consent screen** (on newer consoles: **Google Auth Platform**).
- App name `TR Website Tools`; your email for support and developer contact.
- **Audience / user type:**
  - **Internal**, if it's offered. It only appears when the project belongs to the umd.edu organization.
    Only UMD accounts can sign in, and sign-ins don't expire.
  - Otherwise **External**. Leave it in **Testing** and add your **terpmail address as a test user**.
    In Testing mode Google makes you sign in again **every 7 days**: just rerun `login`.
- You don't need to add scopes here. The tool requests `drive.readonly` when you sign in.

### 3. Create the OAuth client
**APIs & Services → Credentials → Create credentials → OAuth client ID** (or **Clients → Create client**):
- Application type: **Desktop app**
- Click **Download JSON**, then save it as **`tools/drive/credentials.json`**.

`credentials.json` and `token.json` are in `.gitignore`. Never commit them.

### 4. Sign in
From the `terps-racing` folder:
```
npm run drive -- login
```
A browser tab opens. Sign in with the **terpmail account the folders are shared with** and allow read
access. Google will say the app is unverified, because it's your own app: click **Advanced → Go to TR
Website Tools**. Your sign-in is saved to `tools/drive/token.json`.

Check it worked:
```
npm run drive -- whoami
```

### 5. Add the folder links
Paste the Drive folder links into `tools/drive/drive.config.json` under `"folders"`. The names become
shortcuts you can use anywhere a link is expected:
```json
"folders": {
  "pictures": "https://drive.google.com/drive/folders/1AbC…",
  "business": "https://drive.google.com/drive/folders/1XyZ…"
}
```

---

## Using it

```
npm run drive -- ls pictures                         # one folder
npm run drive -- tree pictures --depth 2             # the folder tree (cached; --refresh to rescan)
npm run drive -- find pictures "pitt"                # search names
npm run drive -- text "https://docs.google.com/document/d/…"   # read a Google Doc / Slides / Sheet as text
npm run drive -- get pictures "Merch/shirt1v.jpg" ./tmp        # download ONE file
npm run drive -- index pictures pictures-index.json  # full listing as JSON (path, id, type, size)
npm run drive -- logout
```
Any command takes a folder/file **link, ID, or alias**.

### Tagging Drive folders
In `tools/image-tagger/tagger.config.json`, list Drive folders next to (or instead of) local folders:
```json
{
  "roots": [
    "drive:pictures",
    { "drive": "https://drive.google.com/drive/folders/1XyZ…", "name": "TR Business" }
  ]
}
```
Then `npm run tag-images` as usual. How it behaves:
- **Paths:** images are saved in `tags.json` as `<folder name>/<path inside it>`, the same as for local
  folders, so tags carry over if the folder is ever downloaded.
- **Scanning:** the first run lists the whole folder, which takes a moment for big ones. After that the
  listing is cached for a day. **↻ Rescan** picks up new uploads straight away.
- **Previews:** the grid loads small previews and the editor loads large ones. Only images you actually
  view are fetched.
- **Open in Drive ↗** opens the original in your browser.

---

## Troubleshooting

| Message | Fix |
|---|---|
| `Missing …credentials.json` | Do setup step 3 and save the file to `tools/drive/`. |
| `Not signed in` / `sign-in has expired` | `npm run drive -- login` (every 7 days in Testing mode). |
| `Not found on Drive (or not shared with this account)` | Sign in with the account the folder is shared with (`whoami` shows which). Check the link. |
| "This app is blocked" / "Access blocked" when signing in | UMD's Google admin may block apps it hasn't approved for terpmail. Create the project **inside** the umd.edu organization with **Internal** audience, or ask Rayan to share the folders with a personal Google account and sign in with that. |
| `Error 403: access_denied` | Add your address as a **test user** on the consent screen (step 2). |

## Files
- `googledrive.mjs`: the client library (sign-in, listing, previews, downloads, Docs export).
- `drive.mjs`: the command-line tool.
- `drive.config.json`: folder aliases and cache size.
- `credentials.json`, `token.json`: your OAuth client and sign-in. **Private, git-ignored.**

For testing without Google, `GDRIVE_AUTH_URL`, `GDRIVE_TOKEN_URL` and `GDRIVE_API_URL` can point the
client at a mock server.
