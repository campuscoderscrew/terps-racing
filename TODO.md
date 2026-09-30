# Terps Racing website — TODO

Last updated: 2026-09-30, after the 9/30 client feedback from Rayan Elias.
Sources: 9/23 and 9/30 client meetings. Most important first in every section.

---

## Features

### 1. Cars through the years (home page) — top priority
The client's #1 request. Modeled on the Virginia Tech SAE website.
- [ ] One entry per car, every year since 1982: car name/number, year, photo, and key specs or results where known.
- [ ] Browse by decade (1980s, 1990s, 2000s, 2010s, 2020s) as well as by year.
- [ ] Collect historic photos and car data from the team's Google Drive, with Rayan.

### 2. IC page: make it cohesive + division diagrams
- [ ] Rework the page flow so it reads as one story; the client says it currently feels disjointed.
- [ ] Build the division diagrams from Rayan's car diagram. Each division gets a hotspot on the car; clicking zooms into that area and opens the division.
- [ ] Replace the divisions grid with the diagram once it's done.

### 3. Photo tagging: star ratings + orientation
Drives which photos appear where on the site.
- [ ] Add a 1–5 star rating to the image tagger, saved in `tags.json`.
- [ ] Read orientation from Rayan's new filenames (`architecture1v` = vertical, `architecture2h` = horizontal). Fall back to the image's pixel size when the filename has no suffix.
- [ ] Have the site use tags + stars + orientation to place images: top-rated professional shots go in highlights, spotlights and the top of the gallery, and vertical and horizontal slots get matching photos.
- [ ] Tag filters in the gallery, and a "report incorrect tag" option.

### 4. Gallery curation
- [ ] Put professionally shot photos at the top of the gallery, above phone photos. Many are in Drive's `Pictures/Videos` folder and not on the site yet.
- [ ] Add more Pitt Shootout photos. Keep the campus shoot. Testing photos can come later.
- [ ] Main pages should show photos that represent the team; the gallery can be more varied.

### 5. Home page slideshow
- [ ] Replace the current race car photo on the home page with a slideshow.

### 6. Merchandise tab
- [ ] Add a Merchandise tab under Gallery.
- [ ] Show merch photos, including shirts being worn, once Rayan uploads them to `Pictures/Videos/Merch`.
- [ ] Interest sign-up that adds people to a list. An embedded Google Form is fine for this. For the full merch form, prefer something less basic than Google Forms.

### 7. Google Drive access without downloading (built, needs setup)
The Drive folders are several GB each, too large to keep on disk.
- [x] `tools/drive`: a read-only Google Drive API client + CLI (`npm run drive`) that browses and reads folders on demand.
- [x] The image tagger reads straight from Drive folders (`"drive:pictures"` roots), including Drive-rendered previews of HEIC/NEF photos.
- [ ] One-time Google Cloud setup: enable the Drive API, create an OAuth "Desktop app" client, save `tools/drive/credentials.json`. See `tools/drive/README.md`.
- [ ] `npm run drive -- login` with the terpmail account, then paste the folder links into `tools/drive/drive.config.json`.

### 8. Weekly update task
- [ ] Scheduled task that checks the TR Google Drive and the web for new articles and content, and appends to `src/data/news.ts`.

### 9. Video area
- [ ] Section for the most-viewed and POV videos (`4/15 #11 > Footage`, `Pictures/Videos > Testing`), similar to the Club Climbing site.

### 10. EV and Baja page refresh
- [ ] Give both pages the same content refresh as IC, using their Drives and TREV's photos.

### 11. Leadership / exec board page
- [ ] Club leadership page, using the leadership photos Rayan is sending. Optionally use Claude to find existing leadership photos.

### 12. Later ideas (not yet agreed)
- [ ] Instagram integration: static posts that link to Instagram, or an API feed. A dynamic page isn't needed.
- [ ] Team demographics, e.g. number of engineers vs. business members.

---

## Small fixes and content changes

1. [ ] **Fix the inaccurate ECU claim.** The IC "Electronics & controls" card says "No off-the-shelf ECU, no black boxes." The team buys an ECU and tailors it to its needs (`src/pages/ic.tsx`, `TR26_FEATURES`).
2. [ ] **Replace the "Who We Are" photo on the IC page.** It shows the social media lead (`images/IC/tr26_campus.webp`).
3. [ ] **Replace the old car picture on the IC page.**
4. [ ] **Swap images per Rayan's list** of file locations and replacements. Someone from TR can help.
5. [ ] **Review the highlight reel picks.** One photo shows someone with their eyes closed (`REEL` in `src/pages/gallery.tsx`).
6. [ ] **Remove near-duplicate shots** of the same scene from different angles in the gallery.
7. [ ] **Remove the light/dark toggle; keep dark mode only.** It takes up space, and some image backgrounds don't switch with it. Remove `ThemeToggle` from the navbar and the light-theme overrides.
8. [ ] **American English throughout.** Visible text to change:
   - fibre → fiber (IC, home, sponsors, active aero)
   - aluminium → aluminum
   - tyres → tires
   - moulds → molds
   - organisations → organizations
   - licences → licenses
   - cheques → checks
   - visualisation → visualization
   - Enquire → Inquire
9. [ ] **IC sponsor tier amounts.** The IC sponsor list shows the old ranges (e.g. Platinum $10,000+); the new packet uses $15,000+. Confirm each sponsor's tier with Rayan first.
10. [ ] **After GitHub Actions deploys work:** remove `npm run deploy` and the `gh-pages` package, and delete the old `gh-pages` branch. If Vercel is also connected, keep only one host.
11. [ ] **Housekeeping:** remove ~67 unused images (16.6 MB) in `src/public` and the orphaned `src/pages/committees.tsx`.

---

## Waiting on (from Rayan)
- [ ] File locations of images to replace, and their replacements
- [ ] TREV (EV) photos
- [ ] Club leadership photos
- [ ] Merch photos (including shirts being worn) and other image assets

## Outside the website (Brennen)
- [ ] Internal feedback form for TR members. Internal only; do **not** put it on the website.
