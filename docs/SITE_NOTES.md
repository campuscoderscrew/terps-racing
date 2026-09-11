# Terps Racing site — maintenance notes

Practical notes for anyone working on this codebase: how it's put together, the
decisions behind it, and the traps that have already bitten us once.

**Stack:** Vite 5 · React 18 · TypeScript · Tailwind CSS **v4** · React Router (BrowserRouter)

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173/terps-racing/
npm run build    # outputs to dist/ (also writes dist/404.html — see Deploying)
npm run deploy   # builds, then publishes dist/ to the gh-pages branch
```

---

## Tailwind v4 — configured in CSS, not JS

This is the single most common source of confusion. We use Tailwind **v4** via the
`@tailwindcss/vite` plugin. That means:

- All theming lives in the `@theme` block in **`src/app.css`**.
- **`tailwind.config.js` is not read by the build.** It's kept only so tooling that
  expects it doesn't complain. Editing it does nothing.
- `src/app.css` must stay imported from `src/main.tsx`. If that import disappears,
  every style on the site silently vanishes (this happened once — the site was
  accidentally running on the Tailwind CDN script instead).

---

## Design system

Everything visual is driven by tokens and utility classes in `src/app.css`.

**Tokens:** `--tr-red` `#e21833`, `--tr-gold` `#ffd200`, plus ink/surface/line greys,
easing curves and spacing. Prefer these over hard-coded hex values.

**Core classes:** `.tr-shell` (centred max-width container), `.tr-section` (vertical
rhythm), `.tr-card`, `.tr-btn` + `.tr-btn-gold` / `-red` / `-ghost` / `-dark`,
`.tr-mega` and `.tr-stamp` (display headlines), `.tr-eyebrow`, `.tr-rule`.

### Components

| File | What it does |
|---|---|
| `components/reveal.tsx` | `<Reveal>` / `useReveal` — scroll-triggered entrances |
| `components/cinematic.tsx` | `Words` (per-word headline reveal), `Scene`, `MarqueeBand`, `useParallax`, `useSpotlight` |
| `components/backdrop.tsx` | `<Backdrop variant="…">` — layered CSS section backgrounds |
| `components/startlights.tsx` | Race-start light sequence on first load |
| `components/velocity.tsx` | Shared scroll-velocity loop → `useSpeedLean`, `useSlipstream` |
| `components/gauge.tsx` | SVG speedometer dial |
| `components/countup.tsx` | Number that counts up when scrolled into view |

`<Backdrop>` variants: `aurora`, `floor`, `speed`, `carbon`, `hud`, `terrain`,
`darkroom`. Options: `corners`, `embers`, `vignette`, `fade`, `scanPass`, `intensity`.

---

## ⚠️ Two layout traps

These are not obvious and both have already broken the site once.

### 1. Backdrops paint above static content

`.tr-backdrop` is absolutely positioned at `z-index: 0`. Per CSS painting order, a
*positioned* element paints **above** non-positioned (static) siblings. So a section
using `<Backdrop>` must wrap its real content:

```jsx
<section className="tr-section relative overflow-hidden">
  <Backdrop variant="aurora" fade />
  <div className="tr-shell relative z-10">   {/* ← required */}
    …content…
  </div>
</section>
```

Without `relative z-10` the backdrop tints the text.

### 2. A transformed ancestor breaks `position: fixed`

`.tr-lean` (the speed-lean effect) applies a `transform`. **Any element with a
transform becomes the containing block for its `position: fixed` descendants** — they
stop being positioned relative to the viewport.

Therefore:

- `.tr-lean` wraps **page content only**. The navbar must stay outside it.
- All modals/overlays are rendered with `createPortal(…, document.body)`.

If you add a new overlay, portal it. To check you haven't regressed this:

```js
document.querySelector('header').getBoundingClientRect().top    // must be 0 when scrolled
document.querySelector('[role="dialog"]').parentElement.tagName // must be 'BODY'
```

---

## ⚠️ Animation performance

The site is deliberately heavily animated. It is very easy to make it unusable. We
took the home page from 60fps down to **4fps** once, so these rules are hard-won.

**Never animate a property that forces a repaint:**

- `background-position` → oversize the layer and animate `transform: translate3d()`
- `scale` on a gradient or a large image → animate translation, or size the element instead
- `filter`, `box-shadow` → bake into a static gradient

**Animate only `transform` and `opacity`.** And even those are cheap only when the
layer is GPU-cached. A full-viewport animated gradient is *not* worth it — on machines
without GPU acceleration it re-rasterises every frame.

**One-shot animations are free once finished.** That's where the drama should go:
entrances, hover states, scroll-driven motion — not infinite loops on large surfaces.

Other specifics:

- Masking a 3D-transformed, animating surface is the most expensive thing we found.
- `contain: paint` and `content-visibility: auto` help, but won't rescue a layer that
  is re-rasterising on screen.
- Don't drive scroll effects through React state — write `style.transform` via a ref.
  `useParallax` and `useSpeedLean` already do this.
- Long marquees pause themselves when off-screen. Keep that behaviour.
- Everything is wrapped in `@media (prefers-reduced-motion: reduce)`. Keep it that way.

**Measuring:** count `requestAnimationFrame` callbacks over ~1.5s, idle and while
scrolling. Test on a low-end laptop, not just a fast desktop — and warm the page up for
a few seconds first, or you'll measure the start-light intro instead of the page.

`.tr-kenburns` exists in the CSS but is unused: it conflicts with inline parallax
transforms (the CSS animation wins, so parallax silently stops working). Don't combine
them.

---

## Images

All raster images are **WebP**, capped at 2400px on the long edge, quality 82.

This matters more than it sounds. The library was once 941 MB of photographs saved as
PNG at up to 10290×5956 — a single 53 MB image for one gallery thumbnail. That made
`dist` 647 MB, which silently broke deployment (GitHub Pages caps a site at 1 GB) and
would have made the site unusable on any normal connection.

Current: `src/public` ≈ 46 MB, `dist` ≈ 29 MB.

**When adding images:** resize and convert to WebP first. Do not commit camera
originals. PNG is lossless and cannot compress photographs — resizing alone only got
us from 941 MB to 237 MB; the format change is what did the work. Keep PNG only where
you need lossless line art, and prefer SVG for logos.

---

## Routing and deploying

`BrowserRouter` with `basename={import.meta.env.BASE_URL}`, which picks up `base` from
`vite.config.ts`. URLs are clean — no `#`.

Clean URLs require the host to serve `index.html` for unknown paths:

- **GitHub Pages** has no rewrite rules, so `npm run build` has a `postbuild` step that
  copies `dist/index.html` → `dist/404.html`. Pages serves that for unknown paths with
  the URL intact. Side effect: deep links return a 404 *status* even though they render
  correctly — harmless for users, not ideal for SEO.
- **Vercel** is handled by the catch-all rewrite in `vercel.json` and returns a proper 200.
- Vite's dev server does SPA fallback automatically.

**Do not switch back to `HashRouter`.** Beyond the ugly URLs, it parses in-page anchors
as routes — `href="#tiers"` was read as the route `/tiers` and sent visitors to the 404
page.

### If `npm run deploy` appears to succeed but the site doesn't change

`gh-pages` clones into `node_modules/.cache/gh-pages/<repo>`, commits there, then
pushes. If the push fails the command still exits cleanly. Check:

```bash
git -C node_modules/.cache/gh-pages/<repo> status -sb   # "ahead 1" means the push failed
rm -rf node_modules/.cache/gh-pages                     # then retry
```

---

## Repository hygiene

`dist/` and `.vite/` are **gitignored and untracked**. They were previously committed,
which meant every build churned hundreds of files, the repo carried a duplicate of every
image, and the per-machine `.vite/deps` cache generated merge conflicts on almost every
pull request. Please keep them out.

---

## Content sources

Marketing copy, sponsorship tiers, competition results and the active-aero write-up come
from the team's business folder (sponsorship packet PDFs, the sponsorship presentation,
and the active-aero Q&A document). Ask the Business lead for current versions.

**Not for the public site:** anything from the finance/accounting folder, internal
planning documents naming individuals and their roles, email templates and outreach
drafts, prospect and sponsor contact spreadsheets, and staff members' direct phone
numbers or personal email addresses. The team address and the EIN are public — they're
on the sponsorship packet already.

---

## Known issues / good first tasks

- `README.md` is still the unmodified React Router template boilerplate and describes a
  project this isn't. Worth rewriting.
- ~67 images in `src/public` (≈16 MB) aren't imported anywhere and can be deleted.
- `src/pages/committees.tsx` is orphaned boilerplate — no route points at it.
- The IC page's gallery cards all link to `/gallery`; per-collection routes don't exist yet.
- Git history still contains the old multi-hundred-megabyte image blobs, so fresh clones
  are slow. Fixing this needs a history rewrite and team coordination.
- Several sections still contain placeholder copy — search for `(…info here)`.
