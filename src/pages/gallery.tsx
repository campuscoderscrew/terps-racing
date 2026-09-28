import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SiteCredit from "~/components/sitecredit";
import { createPortal } from "react-dom";
import NavBar from "../components/navbar";
import Header from "~/components/header";
import Reveal from "~/components/reveal";
import Backdrop from "~/components/backdrop";
import { motionAtLeast } from "~/components/motion";

/* ============================================================================
   Gallery

   Photos are organised like folders: a collection (tab) holds one or more
   albums (sub-folders). Every photo is listed by its path under
   src/public/images/gallery, with its pixel size so the grid can reserve the
   right space before it loads and show the whole frame, never cropped.

   Files are picked up with import.meta.glob, so adding a photo is: drop the
   .webp in the folder, add a line below. If a matching file exists in a
   `thumbs/` folder next to it, the grid uses that and keeps the full-size file
   for the lightbox.

   `tags` is optional and reserved for the tagging pipeline
   (tools/image-tagger → tags.json).
   ========================================================================= */

// Files with a space in the name are older duplicates of the renamed ones and
// the collection icons are no longer shown; both are left out of the bundle.
const FULL = import.meta.glob<string>(
  [
    "../public/images/gallery/**/*.webp",
    "!**/* *.webp",
    "!**/gallery_icons/**",
  ],
  { eager: true, import: "default" }
);

const url = (file: string) => FULL[`../public/images/gallery/${file}`] ?? "";
const thumbUrl = (file: string) => {
  const i = file.lastIndexOf("/");
  const t = `../public/images/gallery/${file.slice(0, i)}/thumbs/${file.slice(i + 1)}`;
  return FULL[t] ?? url(file);
};

type Photo = { file: string; w: number; h: number; alt?: string; tags?: string[] };
type Album = { name: string; photos: Photo[] };
type Collection = { name: string; cover: string; albums: Album[] };

const p = (file: string, w: number, h: number, alt = ""): Photo => ({ file, w, h, alt });
const track = (n: string) => p(`track/track_${n}.webp`, 1825, 1217, "Terps Racing car on track at competition");

const COLLECTIONS: Collection[] = [
  {
    name: "2026 Season",
    cover: "season26/loop_17.webp",
    albums: [
      {
        name: "Campus shoot",
        photos: [
          p("season26/loop_17.webp", 1600, 1067, "TR26 in front of the flower-bed M on campus"),
          p("season26/loop_10.webp", 1600, 1200, "TR26 outside the Iribe Center"),
          p("season26/loop_11.webp", 1200, 1600, "TR26's rear wing: Fear the Turtle"),
          p("season26/loop_12.webp", 1200, 1600, "TR26 on the McKeldin Mall hill"),
          p("season26/loop_7.webp", 1600, 1200, "TR26 with a team member"),
          p("season26/loop_1.webp", 1200, 1600, "Terps Racing with the rocketry and rover teams"),
          p("season26/loop_15.webp", 1200, 1600, "Three UMD engineering teams side by side"),
          p("season26/loop_22.webp", 1200, 1600, "Terps Racing, rocketry and rover teams outside a campus building"),
          p("season26/loop_23.webp", 1200, 1600, "Team members with the car and a rover"),
          p("season26/loop_25.webp", 1200, 1600, "Low angle of TR26 with the rocket and rover"),
        ],
      },
      {
        name: "Pitt Shootout",
        photos: [
          p("season26/pitt_4676.webp", 1600, 1200, "TR26 on corner-weight scales at the Pittsburgh Shootout"),
          p("season26/pitt_4675.webp", 1600, 1200, "TR26 in the paddock at the Pittsburgh Shootout"),
          p("season26/pitt_4667.webp", 1600, 1200, "The paddock at the Pittsburgh Shootout"),
          p("season26/pitt_4673.webp", 1600, 1200, "A visiting collie meets the team"),
          p("season26/pitt_4679.webp", 1600, 1200, "Driver and dog in the cockpit"),
        ],
      },
      {
        name: "Testing",
        photos: [
          p("season26/testing_fall59.webp", 1600, 1067, "Autumn test day, car at speed"),
          p("season26/testing_night.webp", 1600, 1600, "Night testing under the lights"),
          p("season26/testing_sparks.webp", 1600, 1067, "Sparks fly in the pits during a night test"),
          p("season26/testing_fall15.webp", 1600, 1067, "The team around the car on a test day"),
          p("season26/testing_fall48.webp", 1600, 1067, "Driver strapped in before a run"),
          p("season26/testing_day2.webp", 1600, 1600, "Car on track on a test day"),
        ],
      },
    ],
  },
  {
    name: "Highlights",
    cover: "highlights/hl_316.webp",
    albums: [
      {
        name: "Highlights",
        photos: [
          p("highlights/hl_316.webp", 2400, 1389),
          p("highlights/hl_352.webp", 2400, 1601),
          p("highlights/hl_139.webp", 2400, 1601),
          p("highlights/hl_15.webp", 2400, 1601),
          p("highlights/hl_146.webp", 1601, 2400),
          p("highlights/hl_14.webp", 2400, 1601),
          p("highlights/hl_17.webp", 2400, 1600),
          p("highlights/hl_1519.webp", 2400, 1600),
          p("highlights/hl_9.webp", 1920, 2400),
        ],
      },
    ],
  },
  {
    name: "The Team",
    cover: "team/team_464.webp",
    albums: [
      {
        name: "The Team",
        photos: [
          p("team/team_464.webp", 2400, 1601),
          p("team/team_391.webp", 2400, 1601),
          p("team/team_471.webp", 2400, 1601),
          p("team/team_465.webp", 2400, 1601),
          p("team/team_409.webp", 2400, 1601),
          p("team/team_459.webp", 2400, 1600),
          p("team/team_597.webp", 2400, 1601),
          p("team/team_592.webp", 2001, 1335),
        ],
      },
    ],
  },
  {
    name: "The Car + Process",
    cover: "car_process/pro_7.webp",
    albums: [
      {
        name: "The Car + Process",
        photos: [
          p("car_process/pro_7.webp", 2400, 1601),
          p("car_process/pro_0249.webp", 2400, 1600),
          p("car_process/pro_0436.webp", 1397, 2095),
          p("car_process/pro_0126.webp", 1397, 2095),
          p("car_process/pro_0004.webp", 1397, 2095),
          p("car_process/pro_0183.webp", 2400, 1600),
          p("car_process/pro_88.webp", 1601, 2400),
          p("car_process/pro_0538.webp", 2400, 1601),
        ],
      },
    ],
  },
  {
    name: "The Track",
    cover: "track/track_17.webp",
    albums: [
      {
        name: "The Track",
        photos: [
          p("track/track_17.webp", 2400, 1601),
          p("track/track_3.webp", 2400, 1601),
          p("track/track_1998.webp", 2400, 1600),
          p("track/track_2176.webp", 2400, 1655),
          ...[
            "0764", "0834", "0685", "0780", "0765", "0748", "0221", "0725",
            "0244", "0327", "0382", "0380", "0498", "0363", "0476", "0347",
            "0368", "0330", "0323", "0322", "0331", "0334", "0355",
          ].map(track),
        ],
      },
    ],
  },
];

/** The reel at the top of the page: a few of the best frames from every collection. */
const REEL: Photo[] = [
  p("highlights/hl_316.webp", 2400, 1389, "Terps Racing at competition"),
  p("season26/loop_17.webp", 1600, 1067, "TR26 on campus"),
  p("season26/testing_fall59.webp", 1600, 1067, "Autumn test day"),
  p("season26/pitt_4676.webp", 1600, 1200, "TR26 at the Pittsburgh Shootout"),
  p("highlights/hl_14.webp", 2400, 1601, "Highlights"),
  p("season26/testing_sparks.webp", 1600, 1067, "Night testing"),
  p("track/track_17.webp", 2400, 1601, "On track"),
  p("team/team_464.webp", 2400, 1601, "The team"),
];

const PAGE_SIZE = 12;

/* ── Highlight reel ──────────────────────────────────────────────────────── */
// Only the current slide and the one after it are ever in the DOM, so the reel
// costs two images no matter how long it gets. Cross-fades on opacity only.
function HighlightReel({ onOpen }: { onOpen: (list: Photo[], i: number) => void }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = REEL.length;
  const next = useCallback(() => setI((v) => (v + 1) % n), [n]);
  const prev = useCallback(() => setI((v) => (v - 1 + n) % n), [n]);

  useEffect(() => {
    if (paused || !motionAtLeast("standard")) return;
    const id = window.setTimeout(next, 5200);
    return () => window.clearTimeout(id);
  }, [i, paused, next]);

  const shown = [i, (i + 1) % n];

  return (
    <section
      className="tr-on-dark relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black"
      style={{ aspectRatio: "21/9", minHeight: 220 }}
      aria-roledescription="carousel"
      aria-label="Highlight reel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {shown.map((idx) => (
        <button
          key={REEL[idx].file}
          type="button"
          onClick={() => onOpen(REEL, idx)}
          aria-label="Open this photo"
          tabIndex={idx === i ? 0 : -1}
          className="absolute inset-0 cursor-zoom-in transition-opacity duration-[900ms] ease-[var(--tr-ease)]"
          style={{ opacity: idx === i ? 1 : 0, zIndex: idx === i ? 1 : 0 }}
        >
          <img
            src={url(REEL[idx].file)}
            alt={REEL[idx].alt}
            className="h-full w-full object-cover"
            decoding="async"
          />
        </button>
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: "linear-gradient(180deg, transparent 55%, rgba(8,8,10,0.75))" }}
      />

      <div className="absolute inset-x-0 bottom-0 z-[3] flex items-center justify-between gap-3 px-4 pb-3 sm:px-6 sm:pb-5">
        <span className="tr-eyebrow !text-white/80">Highlight reel</span>
        <div className="flex items-center gap-2">
          <div className="mr-2 hidden gap-1.5 sm:flex">
            {REEL.map((r, idx) => (
              <button
                key={r.file}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show photo ${idx + 1} of ${n}`}
                aria-current={idx === i}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: idx === i ? 22 : 8,
                  background: idx === i ? "var(--tr-gold)" : "rgb(255 255 255 / 0.4)",
                }}
              />
            ))}
          </div>
          {[
            { label: "Previous photo", icon: "←", fn: prev },
            { label: paused ? "Play" : "Pause", icon: paused ? "▶" : "❚❚", fn: () => setPaused((v) => !v) },
            { label: "Next photo", icon: "→", fn: next },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={b.fn}
              aria-label={b.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-sm text-white transition-colors hover:bg-black/80"
            >
              {b.icon}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Lightbox ────────────────────────────────────────────────────────────── */
function Lightbox({
  list,
  index,
  onClose,
}: {
  list: Photo[];
  index: number;
  onClose: () => void;
}) {
  const [i, setI] = useState(index);
  const photo = list[i];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => Math.min(v + 1, list.length - 1));
      if (e.key === "ArrowLeft") setI((v) => Math.max(v - 1, 0));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, list.length]);

  const arrow = (dir: -1 | 1) => {
    const target = i + dir;
    const disabled = target < 0 || target >= list.length;
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          setI(target);
        }}
        aria-label={dir < 0 ? "Previous photo" : "Next photo"}
        className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-xl text-white transition-opacity hover:bg-black/90 disabled:opacity-0 ${
          dir < 0 ? "left-3 sm:left-6" : "right-3 sm:right-6"
        }`}
      >
        {dir < 0 ? "←" : "→"}
      </button>
    );
  };

  return createPortal(
    <div
      className="tr-on-dark fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged photo"
    >
      <div className="absolute inset-0 bg-black/92 backdrop-blur-sm" />
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-2xl text-white transition-all duration-300 hover:rotate-90 hover:bg-black/90"
      >
        ×
      </button>
      {arrow(-1)}
      {arrow(1)}
      <img
        key={photo.file}
        src={url(photo.file)}
        alt={photo.alt ?? ""}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[86vh] max-w-[88vw] rounded-xl object-contain shadow-[var(--tr-shadow-lg)]"
        style={{ animation: "tr-fade-up 0.4s var(--tr-ease) both" }}
      />
      <span
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60"
        style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}
      >
        {i + 1} / {list.length}
      </span>
    </div>,
    document.body
  );
}

/* ── Photo grid ──────────────────────────────────────────────────────────── */
// A masonry of CSS columns: every photo keeps its own aspect ratio, so nothing
// is cropped. width/height attributes reserve the space before it loads, and
// only one page is mounted at a time — "Show more" adds the next page.
function PhotoGrid({ photos, onOpen }: { photos: Photo[]; onOpen: (i: number) => void }) {
  const [count, setCount] = useState(PAGE_SIZE);
  const shown = photos.slice(0, count);
  const left = photos.length - shown.length;

  return (
    <>
      <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3">
        {shown.map((photo, i) => (
          <button
            key={photo.file}
            type="button"
            onClick={() => onOpen(i)}
            aria-label={photo.alt ? `View: ${photo.alt}` : "View photo full size"}
            className="group relative block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg bg-white/[0.04]"
            style={{ animation: `tr-fade-up 0.5s var(--tr-ease) ${Math.min(i % PAGE_SIZE, 8) * 50}ms both` }}
          >
            <img
              src={thumbUrl(photo.file)}
              alt={photo.alt ?? ""}
              width={photo.w}
              height={photo.h}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full transition-transform duration-[800ms] ease-[var(--tr-ease)] group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
          </button>
        ))}
      </div>
      {left > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((c) => c + PAGE_SIZE)}
            className="tr-btn tr-btn-ghost"
          >
            Show more <span className="text-white/50">({left} left)</span>
          </button>
        </div>
      )}
    </>
  );
}

/* ── Collection tabs + albums ────────────────────────────────────────────── */
function GalleryOpt() {
  const [collectionName, setCollectionName] = useState(COLLECTIONS[0].name);
  const [albumName, setAlbumName] = useState<string>("All");
  const [lightbox, setLightbox] = useState<{ list: Photo[]; index: number } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const collection = COLLECTIONS.find((c) => c.name === collectionName)!;
  const photos = useMemo(
    () =>
      albumName === "All"
        ? collection.albums.flatMap((a) => a.photos)
        : collection.albums.find((a) => a.name === albumName)?.photos ?? [],
    [collection, albumName]
  );
  const count = (c: Collection) => c.albums.reduce((n, a) => n + a.photos.length, 0);

  return (
    <>
      <div className="tr-shell">
        <Reveal variant="up">
          <HighlightReel onOpen={(list, index) => setLightbox({ list, index })} />
        </Reveal>

        {/* Collection tabs — compact, so the photos stay the star */}
        <div ref={topRef} className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Photo collections">
          {COLLECTIONS.map((c) => {
            const active = c.name === collectionName;
            return (
              <button
                key={c.name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setCollectionName(c.name);
                  setAlbumName("All");
                }}
                className={`flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 transition-all duration-300 ${
                  active
                    ? "border-tr-gold bg-tr-gold/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/30 hover:text-white"
                }`}
              >
                <img
                  src={thumbUrl(c.cover)}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover"
                  loading="lazy"
                />
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.92rem", textTransform: "uppercase" }}>
                  {c.name}
                </span>
                <span className="text-white/40" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}>
                  {count(c)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Albums (sub-folders) inside the collection */}
        {collection.albums.length > 1 && (
          <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Albums">
            <span className="tr-eyebrow mr-1">Albums</span>
            {["All", ...collection.albums.map((a) => a.name)].map((name) => {
              const active = name === albumName;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setAlbumName(name)}
                  className={`rounded-full border px-3 py-1 text-[0.72rem] uppercase tracking-[0.12em] transition-colors ${
                    active ? "border-tr-red bg-tr-red/15 text-white" : "border-white/10 text-white/55 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {name}
                </button>
              );
            })}
          </div>
        )}

        <div
          key={`${collectionName}/${albumName}`}
          className="mt-8"
          style={{ animation: "tr-fade-up 0.5s var(--tr-ease) both" }}
        >
          <PhotoGrid photos={photos} onOpen={(index) => setLightbox({ list: photos, index })} />
        </div>
      </div>

      {lightbox && (
        <Lightbox
          list={lightbox.list}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Gallery() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-tr-ink">
      <NavBar overMedia={false} />
      <Backdrop variant="darkroom" className="!fixed" intensity={0.9} />
      <main className="tr-section relative z-10 !pt-[calc(var(--tr-nav-h)+clamp(32px,6vw,72px))]">
        <div className="tr-shell">
          <Header text="Gallery" eyebrow="Terps Racing in pictures" />
        </div>
        <GalleryOpt />
      </main>
      <SiteCredit />
    </div>
  );
}
