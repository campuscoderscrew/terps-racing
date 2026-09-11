import { useMemo } from "react";

export type BackdropVariant =
  | "aurora" // drifting colour mesh — cinematic, used on the home page
  | "hud" // telemetry grid + scanlines — the Formula IC / engineering look
  | "floor" // perspective grid receding to a horizon
  | "speed" // diagonal streaks
  | "carbon" // carbon fibre weave
  | "terrain" // topographic contours — Baja
  | "darkroom"; // near-black with a soft centre glow — gallery

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
  className?: string;
  /** 0–1, scales the whole backdrop's presence. */
  intensity?: number;
}

/**
 * Layered decorative background for a section. Every layer is CSS-only, sits
 * behind the content (`z-0`) and is inert to pointer events, so a section only
 * needs `position: relative` and content at `z-10`.
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
          <div
            className="tr-bd-grid"
            style={{ ["--grid-opacity" as string]: 0.1 }}
          />
        </>
      )}

      {variant === "hud" && (
        <>
          <div
            className="tr-bd-grid"
            style={{
              ["--grid-size" as string]: "88px",
              ["--grid-opacity" as string]: 0.2,
            }}
          />
          <div className="tr-bd-trace" />
          <div
            className="tr-bd-scan"
            style={{ ["--scan-opacity" as string]: 0.5 }}
          />
        </>
      )}

      {variant === "floor" && (
        <>
          <div className="tr-bd-mesh" style={{ opacity: 0.75 }} />
          <div className="tr-bd-floor" />
        </>
      )}

      {variant === "speed" && (
        <>
          <div className="tr-bd-carbon" />
          <div className="tr-bd-speed" />
        </>
      )}

      {variant === "carbon" && (
        <>
          <div className="tr-bd-carbon" />
          <div
            className="tr-bd-grid"
            style={{ ["--grid-opacity" as string]: 0.08 }}
          />
        </>
      )}

      {variant === "terrain" && (
        <>
          <div className="tr-bd-topo" />
          <div className="tr-bd-grid-fine" style={{ opacity: 0.3 }} />
        </>
      )}

      {variant === "darkroom" && (
        <>
          <div
            style={{
              background:
                "radial-gradient(58% 48% at 50% 34%, rgba(255,255,255,0.07), transparent 68%)",
            }}
          />
          <div className="tr-bd-grid-fine" style={{ opacity: 0.35 }} />
        </>
      )}

      {scanPass && <div className="tr-bd-sweepline" />}
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
