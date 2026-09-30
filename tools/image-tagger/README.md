# TR Image Tagger

A local tool for tagging the team's photos. It runs on your computer. It doesn't need an internet
connection or any npm install, and it saves every click straight to `tags.json`.

## Run it

From the `terps-racing` folder:

```
npm run tag-images
```

(or `node tools/image-tagger/tagger.mjs`). A browser tab opens at http://localhost:5178.
Press Ctrl+C in the terminal to stop it. Nothing is lost when you stop.

## Which folder it tags

`tagger.config.json` → `"roots"`. It points at the Terps Racing Business Folder on the Desktop. Add more
folders to the list, like the Media downloads, and they all go into the same `tags.json`. To try a
different folder for a single run, pass it as an argument:

```
node tools/image-tagger/tagger.mjs "C:\Users\Brennen\Desktop\Terps Racing Folders\Media-20260927T222324Z-1-001\Media"
```

## Tagging Google Drive folders (no download)

A root can also be a Google Drive folder, read through the Drive API. It needs the one-time
setup in `tools/drive/README.md`.

```json
{ "roots": ["drive:pictures", "C:\\Users\\Brennen\\Desktop\\Terps Racing Folders\\Terps Racing Business Folder"] }
```

`drive:pictures` uses an alias from `tools/drive/drive.config.json`; a full folder link works too.
Only the previews you view are fetched, into a size-capped cache. Drive also renders HEIC / NEF
previews. **↻ Rescan** picks up new uploads, and **Open in Drive ↗** opens the original.

## What gets saved

`tags.json` is an array with one entry per image:

```json
[
  {
    "path": "Terps Racing Business Folder/Livery Sticker Logos/Siemens/siemens.png",
    "tags": [
      "Terps Racing Business Folder",
      "Terps Racing Business Folder/Livery Sticker Logos",
      "Terps Racing Business Folder/Livery Sticker Logos/Siemens",
      "Sponsor",
      "Sponsor/Logo"
    ]
  }
]
```

- **Paths** start with the root folder's name and use `/`. The same file keeps working if the folder moves
  to another drive or computer.
- **Tags are hierarchical paths.** `Sponsor/Logo` is the child tag `Logo` inside `Sponsor`. Parent
  tags are always stored too, so filtering by `Sponsor` finds everything under it.
- **Every folder is a tag.** An image starts with its own folder and every folder above it already
  ticked. You can untick one if the image is filed in the wrong place. Folders that hold no images are
  left out of the tree.
- **Custom tags** that aren't folders are listed in `custom-tags.json`. They can sit at the top level or
  inside any other tag, folders included (hover a tag → **+ child**).

## Picking up where you left off

An image counts as tagged once it has an entry in `tags.json`. **To tag** always opens on the first image
without one, so you can close the tool at any point and continue later. **Skip** moves on without saving,
so a skipped image stays in **To tag**.

## Reviewing

**Review tagged** shows a grid of everything tagged so far. Filter it by file name or tag text, or click
any tag chip to filter by that exact tag. Click an image to edit it; moving to the next one saves your
changes. **Mark untagged** sends an image back to **To tag**.

## Shortcuts

| Key | Action |
|---|---|
| Enter | Save & next |
| ← / → | Previous / next (in To tag, → skips) |
| C | Copy the tags from the last image you saved (its folder tags are swapped for this image's) |
| / | Jump to the tag search. Enter checks the match, or creates a new top-level tag |

## Good to know

- Browsers can't show `.NEF`, `.HEIC` or `.TIF` files. They're still listed and taggable, and
  **Open in default app** shows them in Windows Photos.
- A copy of `tags.json` is saved as `tags.backup.json` each time the tool starts.
- Saves are atomic: the tool writes a temp file and renames it, so closing mid-save can't corrupt the file.
- Renaming a custom tag (✎) renames it on every image. A tag can only be deleted (🗑) once no image uses it.
