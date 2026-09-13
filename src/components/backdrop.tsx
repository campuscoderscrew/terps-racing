import { useMemo } from "react";

export type BackdropVariant =
  | "aurora" // lit colour clouds — cinematic, used on the home page
  | "hud" // telemetry grid + scanlines — the Formula IC / engineering look
  | "floor" // perspective grid receding to a lit horizon
  | "speed" // diagonal streaks
  | "carbon" // carbon fibre weave under a raking light
  | "terrain" // topographic contours — Baja
  | "darkroom" // near-black with a soft key light — gallery
  | "circuit" // a track map with a lap running round it
  | "flag" // raked checkered field
  | "heat" // exhaust shimmer rising off the floor
  | "strata"; // livery bands raked across the frame

interface BackdropProps {
  variant?: BackdropVariant;
  /** Corner bracket marks, as on the EV page. */
  corners?: boolean;
  cornerColor?: string;
  /** Floating embers/particles. */
  embers?: number;
  emberColor?: string;
  /** Darken the edges. */
  vignette?: boolean;
  /** Fade the top and bottom edges into the page background. */
  fade?: boolean;
  /** A single bright line sweeping down the section. */
  scanPass?: boolean;
  /** Volumetric light shafts raking across the section. */
  beams?: boolean;
  /** A hotspot for the content to sit in. `[x, y]` overrides its position. */
  keylight?: boolean;
  keyPos?: [string, string];
  className?: string;
  /** 0–1, scales the whole backdrop's presence. */
  intensity?: number;
}

/**
 * The track map. Drawn twice: a wide dim casing, a hairline on top, and a short
 * bright dash that laps it. `pathLength={1000}` normalises the dash arithmetic,
 * so `stroke-dasharray: 46 954` and a -1000 offset close the loop exactly
 * without anyone needing to know the path's real length.
 */
const CIRCUIT =
  "M148 392C92 392 64 336 96 292L236 118C268 78 330 72 372 104L512 212" +
  "C552 242 596 240 634 206L748 104C792 66 862 78 888 128L1012 344" +
  "C1046 404 1018 468 956 486L448 546C372 566 300 540 274 484Z";

function Circuit() {
  return (
    <div className="tr-bd-circuit">
      <svg viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice">
        <path className="tr-track-wide" d={CIRCUIT} />
        <path className="tr-track" d={CIRCUIT} />
        <path className="tr-lap" d={CIRCUIT} pathLength={1000} />
      </svg>
    </div>
  );
}

/**
 * Layered decorative background for a section. Every layer is CSS-only, sits
 * behind the content (`z-0`) and is inert to pointer events, so a section only
 * needs `position: relative` and content at `z-10`.
 *
 * The layers are separated by how they are lit rather than by how they move:
 * a cool counter-light in the shadows, beams that fall off with distance, a key
 * light for the content to sit in. An earlier version drifted each layer at its
 * own rate on scroll, which read beautifully and cost 22 fps of scrolling per
 * section — see the note above the aurora mesh in app.css before trying it
 * again.
 */
export default function Backdrop({
  variant = "aurora",
  corners = false,
  cornerColor,
  embers = 0,
  emberColor,
  vignette = true,
  fade = false,
  scanPass = false,
  beams = false,
  keylight = false,
  keyPos,
  className = "",
  intensity = 1,
}: BackdropProps) {
  // Stable per-mount particle placement.
  const particles = useMemo(
    () =>
      Array.from({ length: embers }, (_, i) => ({
        left: `${(i * 97) % 100}%`,
        dur: `${9 + ((i * 7) % 11)}s`,
        delay: `${(i * 1.7) % 12}s`,
        drift: `${((i % 5) - 2) * 26}px`,
        size: i % 4 === 0 ? 4 : 2.5,
      })),
    [embers]
  );

  return (
    <div
      className={`tr-backdrop ${className}`}
      aria-hidden="true"
      style={{ opacity: intensity }}
    >
      {variant === "aurora" && (
        <>
          <div className="tr-bd-mesh" />
          {/* A second, cooler cloud set offset from the bed — the overlap is
              what gives the wash somewhere to be dark. */}
          <div className="tr-bd-mesh-2" />
          <div
            className="tr-bd-grid"
            style={{ ["--grid-opacity" as string]: 0.12 }}
          />
        </>
      )}

      {variant === "hud" && (
        <>
          <div
            className="tr-bd-grid"
            style={{
              ["--grid-size" as string]: "88px",
              ["--grid-opacity" as string]: 0.24
            }}
          />
          <div className="tr-bd-sheen" />
          <div className="tr-bd-trace" />
          <div
            className="tr-bd-scan"
            style={{ ["--scan-opacity" as string]: 0.5 }}
          />
        </>
      )}

      {variant === "floor" && (
        <>
          <div className="tr-bd-mesh" />
          <div className="tr-bd-floor" />
        </>
      )}

      {variant === "speed" && (
        <>
          <div className="tr-bd-carbon" />
          <div className="tr-bd-sheen" />
          <div className="tr-bd-speed" />
        </>
      )}

      {variant === "carbon" && (
        <>
          <div className="tr-bd-carbon" />
          <div className="tr-bd-sheen" />
          <div
            className="tr-bd-grid"
            style={{ ["--grid-opacity" as string]: 0.1 }}
          />
        </>
      )}

      {variant === "terrain" && (
        <>
          <div className="tr-bd-topo" />
          <div
            className="tr-bd-grid-fine"
            style={{ opacity: 0.3 }}
          />
        </>
      )}

      {variant === "darkroom" && (
        <>
          {/* The gallery's light: one lamp, high and slightly off centre, so the
              photographs below it read as hung rather than tiled. */}
          <div
            className="tr-bd-keylight"
            style={{
              ["--key-x" as string]: "46%",
              ["--key-y" as string]: "26%"
            }}
          />
          <div
            className="tr-bd-grid-fine"
            style={{ opacity: 0.35 }}
          />
        </>
      )}

      {variant === "circuit" && (
        <>
          <div className="tr-bd-carbon" />
          <Circuit />
          <div
            className="tr-bd-grid"
            style={{ ["--grid-opacity" as string]: 0.1 }}
          />
        </>
      )}

      {variant === "flag" && (
        <>
          <div className="tr-bd-carbon" />
          <div className="tr-bd-flag" />
          <div className="tr-bd-sheen" />
        </>
      )}

      {variant === "heat" && (
        <>
          <div className="tr-bd-carbon" />
          <div className="tr-bd-heat" />
          <div
            className="tr-bd-grid-fine"
            style={{ opacity: 0.28 }}
          />
        </>
      )}

      {variant === "strata" && (
        <>
          <div className="tr-bd-strata" />
          <div
            className="tr-bd-grid"
            style={{ ["--grid-opacity" as string]: 0.12 }}
          />
        </>
      )}

      {beams && <div className="tr-bd-beams" />}

      {keylight && (
        <div
          className="tr-bd-keylight"
          style={{
            ...(keyPos
              ? {
                  ["--key-x" as string]: keyPos[0],
                  ["--key-y" as string]: keyPos[1],
                }
              : null)
          }}
        />
      )}

      {scanPass && <div className="tr-bd-sweepline" />}
      {/* Vignette and edge fades are pinned to the section's own edges — give
          either of them parallax and you get a visible seam where the fade
          stops covering the join. */}
      {vignette && <div className="tr-bd-vignette" />}
      {fade && <div className="tr-bd-fade-y" />}

      {embers > 0 && (
        <div
          className="tr-bd-embers"
          style={
            emberColor
              ? ({
                  ["--ember-color" as string]: emberColor,
                } as React.CSSProperties)
              : undefined
          }
        >
          {particles.map((p, i) => (
            <span
              key={i}
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                ["--dur" as string]: p.dur,
                ["--delay" as string]: p.delay,
                ["--drift" as string]: p.drift,
              }}
            />
          ))}
        </div>
      )}

      {corners && (
        <div
          className="tr-corners"
          style={
            cornerColor
              ? ({
                  ["--corner-color" as string]: cornerColor,
                } as React.CSSProperties)
              : undefined
          }
        >
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  );
}

/** A glowing hairline used to separate two sections. */
export function Seam() {
  return <div className="tr-seam" aria-hidden="true" />;
}
