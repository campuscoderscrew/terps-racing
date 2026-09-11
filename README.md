# Terps Racing

The website for [Terps Racing](https://racing.umd.edu) — the University of Maryland's
collegiate motorsports program. Founded in 1982, the team designs, builds and races
three vehicles each season: a Formula SAE combustion car, a Formula SAE Electric car,
and a Baja SAE off-road vehicle.

Built and maintained by [Campus Coders Crew](https://github.com/campuscoderscrew).

**Stack:** Vite · React 18 · TypeScript · Tailwind CSS v4 · React Router

---

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at **http://localhost:5173/terps-racing/** — note the path, it
comes from `base` in `vite.config.ts`.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run deploy` | Build, then publish `dist/` to the `gh-pages` branch |

`npm run build` also runs a `postbuild` step that copies `dist/index.html` to
`dist/404.html`. That's what makes clean URLs work on GitHub Pages — don't remove it.

---

## Project layout

```
src/
├── main.tsx           # entry point + routes
├── app.css            # design tokens, utilities, animation layer  ← all theming lives here
├── siteInfo.tsx       # shared type styles
├── components/        # navbar, reveal, backdrop, gauge, start lights, …
├── pages/             # one file per route
└── public/images/     # all imagery (WebP)
docs/
└── SITE_NOTES.md      # architecture, conventions and gotchas — read before contributing
```

### Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/ic` | Formula SAE (combustion) |
| `/ev` | Formula SAE Electric |
| `/baja` | Baja SAE |
| `/members` | Join the team |
| `/gallery` | Photo galleries |
| `/sponsors` | Sponsorship tiers and partner info |
| anything else | 404 |

---

## Before you open a PR

Please skim **[`docs/SITE_NOTES.md`](docs/SITE_NOTES.md)**. It covers the conventions
and, more usefully, the traps that have already broken this site once. The short
version:

- **Theming is in `src/app.css`**, not `tailwind.config.js`. We're on Tailwind v4, which
  is configured in CSS. Editing `tailwind.config.js` does nothing.
- **Resize and convert images to WebP before committing.** Max 2400px on the long edge.
  The image library was once 941 MB of full-resolution PNGs, which broke deployment
  outright. It's ~46 MB now — please keep it that way.
- **Don't commit `dist/` or `.vite/`.** Both are gitignored. They used to be tracked and
  were a steady source of merge conflicts.
- **Be careful with animations.** There are specific rules in the notes; ignoring them
  once took the home page from 60fps to 4fps.
- New modals must be rendered with `createPortal(…, document.body)` — see the notes for
  why.

---

## Deploying

`npm run deploy` publishes `dist/` to the `gh-pages` branch.

A `vercel.json` is also present for Vercel deploys; it handles SPA routing with a
catch-all rewrite and returns proper 200s for deep links, which GitHub Pages can't do.

If `npm run deploy` seems to succeed but the site doesn't change, see the
troubleshooting section in the notes — it's usually a stale `gh-pages` cache hiding a
failed push.
