//Imports
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NavBar from "../components/navbar";
import Header from "~/components/header";
import Reveal from "~/components/reveal";
import Backdrop from "~/components/backdrop";

//Photos ---------------------------------------------------

//Gallery Icons
import teamIcon from "../public/images/gallery/gallery_icons/team_icon.webp";
import highlightsIcon from "../public/images/gallery/gallery_icons/highlights.webp";
import processIcon from "../public/images/gallery/gallery_icons/process.webp";
// NOTE: named "circuit_icon" rather than "track" — ad blockers (EasyPrivacy et al.)
// match "track.png" as a tracking pixel and block it with ERR_BLOCKED_BY_CLIENT.
import trackIcon from "../public/images/gallery/gallery_icons/circuit_icon.webp";

//The Team
import team_391 from "../public/images/gallery/team/team_391.webp";
import team_409 from "../public/images/gallery/team/team_409.webp";
import team_464 from "../public/images/gallery/team/team_464.webp";
import team_465 from "../public/images/gallery/team/team_465.webp";
import team_471 from "../public/images/gallery/team/team_471.webp";
import team_459 from "../public/images/gallery/team/team_459.webp";
import team_592 from "../public/images/gallery/team/team_592.webp";
import team_597 from "../public/images/gallery/team/team_597.webp";

//Car + Process
import pro_0004 from "../public/images/gallery/car_process/pro_0004.webp";
import pro_7 from "../public/images/gallery/car_process/pro_7.webp";
import pro_88 from "../public/images/gallery/car_process/pro_88.webp";
import pro_0183 from "../public/images/gallery/car_process/pro_0183.webp";
import pro_0126 from "../public/images/gallery/car_process/pro_0126.webp";
import pro_0249 from "../public/images/gallery/car_process/pro_0249.webp";
import pro_0436 from "../public/images/gallery/car_process/pro_0436.webp";
import pro_0538 from "../public/images/gallery/car_process/pro_0538.webp";

//Highlights
import hl_9 from "../public/images/gallery/highlights/hl_9.webp";
import hl_14 from "../public/images/gallery/highlights/hl_14.webp";
import hl_15 from "../public/images/gallery/highlights/hl_15.webp";
import hl_17 from "../public/images/gallery/highlights/hl_17.webp";
import hl_139 from "../public/images/gallery/highlights/hl_139.webp";
import hl_146 from "../public/images/gallery/highlights/hl_146.webp";
import hl_316 from "../public/images/gallery/highlights/hl_316.webp";
import hl_352 from "../public/images/gallery/highlights/hl_352.webp";
import hl_1519 from "../public/images/gallery/highlights/hl_1519.webp";

//Track
import track_3 from "../public/images/gallery/track/track_3.webp";
import track_17 from "../public/images/gallery/track/track_17.webp";
import track_0221 from "../public/images/gallery/track/track_0221.webp";
import track_0244 from "../public/images/gallery/track/track_0244.webp";
import track_0322 from "../public/images/gallery/track/track_0322.webp";
import track_0323 from "../public/images/gallery/track/track_0323.webp";
import track_0327 from "../public/images/gallery/track/track_0327.webp";
import track_0330 from "../public/images/gallery/track/track_0330.webp";
import track_0331 from "../public/images/gallery/track/track_0331.webp";
import track_0334 from "../public/images/gallery/track/track_0334.webp";
import track_0347 from "../public/images/gallery/track/track_0347.webp";
import track_0355 from "../public/images/gallery/track/track_0355.webp";
import track_0363 from "../public/images/gallery/track/track_0363.webp";
import track_0368 from "../public/images/gallery/track/track_0368.webp";
import track_0380 from "../public/images/gallery/track/track_0380.webp";
import track_0382 from "../public/images/gallery/track/track_0382.webp";
import track_0476 from "../public/images/gallery/track/track_0476.webp";
import track_0498 from "../public/images/gallery/track/track_0498.webp";
import track_0685 from "../public/images/gallery/track/track_0685.webp";
import track_0725 from "../public/images/gallery/track/track_0725.webp";
import track_0748 from "../public/images/gallery/track/track_0748.webp";
import track_0764 from "../public/images/gallery/track/track_0764.webp";
import track_0765 from "../public/images/gallery/track/track_0765.webp";
import track_0780 from "../public/images/gallery/track/track_0780.webp";
import track_0834 from "../public/images/gallery/track/track_0834.webp";
import track_1998 from "../public/images/gallery/track/track_1998.webp";
import track_2176 from "../public/images/gallery/track/track_2176.webp";

//------------------------------------------------------------

const holder = "";

const GALLERY_TYPES = [
  {
    name: "The Team",
    image: teamIcon,
    area: holder,
    size: "auto 170%",
    position: "35% 75%",
  },
  {
    name: "Highlights",
    image: highlightsIcon,
    area: holder,
    size: "cover",
    position: "center",
  },
  {
    name: "The Car + Process",
    image: processIcon,
    area: holder,
    size: "cover",
    position: "center",
  },
  {
    name: "The Track",
    image: trackIcon,
    area: holder,
    size: "cover",
    position: "center",
  },
];

const TEAM_GALLERY = [
  { image: team_464, col: "2 / span 10", row: 1, aspect: "15/7" },
  { image: team_391, col: "1 / span 7", row: 2, aspect: "11/6" },
  { image: team_471, col: "9 / span 4", row: 2, aspect: "3/2" },
  { image: team_465, col: "1 / span 5", row: 3, aspect: "8/5" },
  { image: team_409, col: "7 / span 6", row: 3, aspect: "5/3" },
  { image: team_459, col: "1 / span 5", row: 4, aspect: "8/5" },
  { image: team_597, col: "7 / span 5", row: 4, aspect: "3/2" },
  { image: team_592, col: "1 / span 4", row: 5, aspect: "3/2" },
];

//Car + Process Grid
const PROCESS_GALLERY = [
  { image: pro_7, col: "1 / span 12", row: 1, aspect: "3/2" },
  { image: pro_0249, col: "17 / span 8", row: 1, aspect: "8/7" },
  { image: pro_0436, col: "1 / span 5", row: 2, aspect: "2/3" },
  { image: pro_0126, col: "6 / span 5", row: 2, aspect: "2/3" },
  { image: pro_0004, col: "11 / span 5", row: 2, aspect: "2/3" },
  { image: pro_0183, col: "17 / span 8", row: 2, aspect: "7/5" },
  { image: pro_88, col: "1 / span 9", row: 3, aspect: "2/3" },
  { image: pro_0538, col: "17 / span 8", row: 3, aspect: "7/5" },
];

//Track Grid
const TRACK_FEATURES = [
  { image: track_17, col: "1 / span 12", row: 1, aspect: "3/2" },
  { image: track_3, col: "14 / span 8", row: 1, aspect: "6/5" },
  { image: track_1998, col: "1 / span 13", row: 2, aspect: "3/2" },
  { image: track_2176, col: "2 / span 11", row: 3, aspect: "7/4" },
];

//The rest of the track pictures (repeating structure)
const TRACK_GRID = [
  track_0764,
  track_0834,
  track_0685,
  track_0780,
  track_0765,
  track_0748,
  track_0221,
  track_0725,
  track_0244,
  track_0327,
  track_0382,
  track_0380,
  track_0498,
  track_0363,
  track_0476,
  track_0347,
  track_0368,
  track_0330,
  track_0323,
  track_0322,
  track_0331,
  track_0334,
  track_0355,
];

//Highlight photos grid
const HIGHLIGHTS_GALLERY = [
  { image: hl_316, col: "1 / span 24", row: 1, aspect: "12/7" },
  { image: hl_352, col: "1 / span 8", row: 2, aspect: "4/3" },
  { image: hl_139, col: "9 / span 8", row: 2, aspect: "4/3" },
  { image: hl_15, col: "17 / span 8", row: 2, aspect: "4/3" },
  { image: hl_146, col: "1 / span 7", row: 3, aspect: "2/3" },
  { image: hl_14, col: "9 / span 16", row: 3, aspect: "3/2" },
  { image: hl_17, col: "1 / span 8", row: 4, aspect: "4/3" },
  { image: hl_1519, col: "12 / span 11", row: 4, aspect: "11/5" },
  { image: hl_9, col: "1 / span 6", row: 5, aspect: "6/7" },
];

/* ── Lightbox ────────────────────────────────────────────────────────────── */
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
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
      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-[var(--tr-shadow-lg)]"
        style={{ animation: "tr-fade-up 0.45s var(--tr-ease) both" }}
      />
    </div>,
    document.body
  );
}

/* ── Photo tile ──────────────────────────────────────────────────────────── */
function Photo({
  src,
  style,
  index = 0,
  onOpen,
}: {
  src: string;
  style?: React.CSSProperties;
  index?: number;
  onOpen: (src: string) => void;
}) {
  return (
    <Reveal
      variant="scale"
      delay={Math.min(index, 8) * 60}
      className="group relative overflow-hidden rounded-lg"
      style={style}
    >
      <button
        type="button"
        onClick={() => onOpen(src)}
        aria-label="View photo full size"
        className="block h-full w-full cursor-zoom-in"
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[800ms] ease-[var(--tr-ease)] group-hover:scale-[1.06]"
        />
        <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
      </button>
    </Reveal>
  );
}

type GridItem = { image: string; col: string; row: number; aspect: string };

/** Editorial grid; collapses to a simple 2-up on narrow screens. */
function PhotoGrid({
  items,
  columns,
  gap,
  onOpen,
}: {
  items: GridItem[];
  columns: number;
  gap: string;
  onOpen: (src: string) => void;
}) {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      className="grid items-start"
      style={{
        gap,
        gridTemplateColumns: narrow
          ? "repeat(2, minmax(0, 1fr))"
          : `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {items.map((item, i) => (
        <Photo
          key={item.image}
          src={item.image}
          index={i}
          onOpen={onOpen}
          style={
            narrow
              ? { aspectRatio: "4/3" }
              : {
                  gridColumn: item.col,
                  gridRow: item.row,
                  aspectRatio: item.aspect,
                }
          }
        />
      ))}
    </div>
  );
}

/* ── Collections ─────────────────────────────────────────────────────────── */
function TrackSection({ onOpen }: { onOpen: (src: string) => void }) {
  return (
    <div>
      <PhotoGrid
        items={TRACK_FEATURES}
        columns={24}
        gap="1rem"
        onOpen={onOpen}
      />

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {TRACK_GRID.map((image, i) => (
          <Photo
            key={image}
            src={image}
            index={i}
            onOpen={onOpen}
            style={{ aspectRatio: "3/2" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Gallery picker ──────────────────────────────────────────────────────── */
function GalleryOpt() {
  const [openGallery, setOpenGallery] = useState<string>(GALLERY_TYPES[0].name);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="tr-shell">
        {/* Collection cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {GALLERY_TYPES.map((type, i) => {
            const active = openGallery === type.name;
            return (
              <Reveal key={type.name} variant="up" delay={i * 100}>
                <button
                  type="button"
                  onClick={() => setOpenGallery(type.name)}
                  aria-pressed={active}
                  className={`group relative flex h-[clamp(180px,26vw,260px)] w-full items-end justify-center overflow-hidden rounded-2xl border transition-all duration-500 ease-[var(--tr-ease)] ${
                    active
                      ? "border-tr-gold shadow-[0_0_44px_-14px_rgba(255,210,0,0.7)]"
                      : "border-white/[0.07] hover:border-white/30 hover:-translate-y-1"
                  }`}
                >
                  <span
                    className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--tr-ease)] group-hover:scale-[1.08]"
                    style={{
                      backgroundImage: `url(${type.image})`,
                      backgroundSize: type.size,
                      backgroundPosition: type.position,
                    }}
                  />
                  <span
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(8,8,10,0.15) 0%, rgba(8,8,10,0.35) 45%, rgba(8,8,10,0.9) 100%)",
                    }}
                  />
                  <span className="relative z-10 mb-6 flex flex-col items-center gap-2 px-3 text-center">
                    <span
                      className="tr-display text-white"
                      style={{ fontSize: "clamp(1rem, 2.2vw, 1.45rem)" }}
                    >
                      {type.name}
                    </span>
                    <span
                      className="text-[0.62rem] uppercase tracking-[0.2em] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: active
                          ? "var(--tr-gold)"
                          : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {active ? "Viewing" : "View gallery"}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[3px] w-full origin-left transition-transform duration-600 ease-[var(--tr-ease)]"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--tr-red), var(--tr-gold))",
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Selected collection */}
        <div
          key={openGallery}
          className="mt-14"
          style={{ animation: "tr-fade-up 0.55s var(--tr-ease) both" }}
        >
          <div className="mb-6 flex items-baseline gap-4">
            <h2
              className="tr-h2 text-white"
              style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.2rem)" }}
            >
              {openGallery}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          {openGallery === "The Team" && (
            <PhotoGrid
              items={TEAM_GALLERY}
              columns={12}
              gap="0.5rem"
              onOpen={setLightbox}
            />
          )}
          {openGallery === "The Car + Process" && (
            <PhotoGrid
              items={PROCESS_GALLERY}
              columns={24}
              gap="1.25rem"
              onOpen={setLightbox}
            />
          )}
          {openGallery === "The Track" && <TrackSection onOpen={setLightbox} />}
          {openGallery === "Highlights" && (
            <PhotoGrid
              items={HIGHLIGHTS_GALLERY}
              columns={24}
              gap="1rem"
              onOpen={setLightbox}
            />
          )}
        </div>
      </div>

      {lightbox && (
        <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Gallery() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-tr-ink">
      <NavBar />
      <Backdrop variant="darkroom" className="!fixed" intensity={0.9} />
      <main className="tr-section relative z-10 !pt-[calc(var(--tr-nav-h)+clamp(32px,6vw,72px))]">
        <div className="tr-shell">
          <Header text="Gallery" eyebrow="Terps Racing in pictures" />
        </div>
        <GalleryOpt />
      </main>
    </div>
  );
}
