import { useEffect, useRef, useState } from "react";

/**
 * Shared visual primitives for the team pages.
 *
 * Colours default to `var(--accent)`, so anything built from these picks up
 * whichever page theme it renders under (see src/theme.ts).
 *
 * Motion here is deliberately fast and lateral rather than slow and vertical:
 * elements arrive from the side and snap into place on an expo-out curve, which
 * reads as speed instead of drift. All of it collapses to a plain fade when the
 * visitor asks for reduced motion.
 */

/** The site's one easing curve, from the EV hero. Hard deceleration = snap. */
export const SNAP = "cubic-bezier(0.16,1,0.3,1)";
export const SNAP_MS = 0.45;
/** Tight enough that a row of cards crosses the line together. */
export const STAGGER = 0.06;

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export type RevealFrom = "left" | "right" | "up";

/** Entrance animation. `from` sets the direction of travel. */
export function Reveal({ show, from = "up", delay = 0, distance = 48, className, style, children }: {
  show: boolean;
  from?: RevealFrom;
  delay?: number;
  distance?: number;
  className?: string;
  /** Merged onto the wrapper. Grid placement belongs here: the wrapper is the
   *  grid child, so gridArea set on the element inside it would be ignored. */
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();

  // The slight skew is what sells the speed — it shears on entry and squares up
  // as the element settles, like something decelerating into position.
  const resting =
    from === "left"  ? `translateX(-${distance}px) skewX(-4deg)` :
    from === "right" ? `translateX(${distance}px) skewX(4deg)` :
                       `translateY(${Math.round(distance / 2)}px)`;

  const duration = reduced ? 0.3 : SNAP_MS;

  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: show ? 1 : 0,
        transform: show || reduced ? "none" : resting,
        transition: `opacity ${duration}s ${SNAP} ${delay}s, transform ${duration}s ${SNAP} ${delay}s`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

// ── Background layers ─────────────────────────────────────────────────────────
export function GridOverlay({ opacity = 0.1, size = 80 }: { opacity?: number; size?: number }) {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

export function Scanlines() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
      }}
    />
  );
}

export function Glow({ color, className, size = 480 }: { color: string; className: string; size?: number }) {
  return (
    <div
      className={`absolute z-0 pointer-events-none rounded-full ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(40px)",
      }}
    />
  );
}

/** Angled streaks that read as motion blur trailing off an element. */
export function SpeedLines({ className = "", color = "var(--accent)", count = 5, flip = false }: {
  className?: string; color?: string; count?: number; flip?: boolean;
}) {
  return (
    <div className={`absolute z-0 pointer-events-none ${className}`} aria-hidden="true"
      style={{ transform: "skewX(-18deg)" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 2,
            marginBottom: 7,
            width: `${100 - i * 15}%`,
            marginLeft: flip ? "auto" : undefined,
            background: `linear-gradient(${flip ? 270 : 90}deg, transparent, ${color})`,
            opacity: 0.5 - i * 0.07,
          }}
        />
      ))}
    </div>
  );
}

/** Checkered flag band. Used sparingly — once per page is the point. */
export function CheckerBand({ size = 10, className = "", color = "#ffffff", opacity = 0.55 }: {
  size?: number; className?: string; color?: string; opacity?: number;
}) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        height: size * 2,
        opacity,
        backgroundImage: `conic-gradient(${color} 0 25%, transparent 0 50%, ${color} 0 75%, transparent 0)`,
        backgroundSize: `${size * 2}px ${size * 2}px`,
      }}
    />
  );
}

/** Diagonal hazard stripes. Baja's counterpart to the checkered band — the
 *  chequer belongs to tarmac racing, the hazard stripe to the trail. */
export function HazardBand({ size = 12, className = "", color = "var(--accent)", opacity = 0.55 }: {
  size?: number; className?: string; color?: string; opacity?: number;
}) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        height: size * 1.6,
        opacity,
        backgroundImage: `repeating-linear-gradient(-45deg, ${color} 0 ${size}px, transparent ${size}px ${size * 2}px)`,
      }}
    />
  );
}

const CORNER_POSITION = {
  tl: "top-0 left-0",
  tr: "top-0 right-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0",
} as const;

export type Corner = keyof typeof CORNER_POSITION;

/** Two bars meeting at a corner — a bracket mark, not a full border. */
export function CornerAccent({ at, color = "var(--accent)", length = 80, weight = 4 }: {
  at: Corner; color?: string; length?: number; weight?: number;
}) {
  const pos = CORNER_POSITION[at];
  return (
    <>
      <div className={`absolute ${pos} z-20`} aria-hidden="true" style={{ width: length, height: weight, background: color }} />
      <div className={`absolute ${pos} z-20`} aria-hidden="true" style={{ width: weight, height: length, background: color }} />
    </>
  );
}

// ── Type primitives ───────────────────────────────────────────────────────────
export const FONT_LABEL = "'Roboto Mono', monospace";

/** Monospace eyebrow, wide-tracked. Sits above a heading. */
export function SectionLabel({ children, color = "var(--accent)", className = "" }: {
  children: React.ReactNode; color?: string; className?: string;
}) {
  return (
    <span
      className={`block text-xs font-bold uppercase ${className}`}
      style={{ color, fontFamily: FONT_LABEL, letterSpacing: "0.25em" }}
    >
      {children}
    </span>
  );
}

/** Hairline that fades out to the right. */
export function Rule({ color = "var(--accent)", className = "w-32" }: { color?: string; className?: string }) {
  return (
    <div className={`h-px ${className}`} aria-hidden="true" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
  );
}
