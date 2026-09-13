/* ============================================================================
   MotionToggle — how much cinema.

   Three states, so it is a cycle button rather than a switch. The glyph is
   three speed lines: all three lit is cinematic, two is standard, one is
   reduced. It borrows `.tr-theme-toggle` for its shell so the pair in the
   navbar sit at identical size and take their colour from `--tr-fg`, which
   means they read correctly over a dark hero and on light glass alike.
   ========================================================================= */

import { useMotion, type MotionLevel } from "./motion";

const LABEL: Record<MotionLevel, string> = {
  cinematic: "Cinematic motion",
  standard: "Standard motion",
  reduced: "Reduced motion",
};

const NEXT: Record<MotionLevel, MotionLevel> = {
  cinematic: "standard",
  standard: "reduced",
  reduced: "cinematic",
};

/** Lit bars per level — the glyph is literally the setting. */
const LIT: Record<MotionLevel, number> = {
  cinematic: 3,
  standard: 2,
  reduced: 1,
};

export default function MotionToggle({
  className = "",
}: {
  className?: string;
}) {
  const { motion, cycleMotion } = useMotion();
  const lit = LIT[motion];

  return (
    <button
      type="button"
      onClick={cycleMotion}
      className={`tr-theme-toggle tr-motion-toggle ${className}`}
      aria-label={`${LABEL[motion]}. Switch to ${LABEL[NEXT[motion]].toLowerCase()}`}
      title={`${LABEL[motion]} — click for ${LABEL[NEXT[motion]].toLowerCase()}`}
      data-motion-state={motion}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          transform="skewX(-14)"
        >
          {/* Longest bar is always lit; the upper two come on with the level. */}
          <path d="M6 16.5h13" opacity={lit >= 1 ? 1 : 0.22} />
          <path d="M8 12h11" opacity={lit >= 2 ? 1 : 0.22} />
          <path d="M10 7.5h9" opacity={lit >= 3 ? 1 : 0.22} />
        </g>
      </svg>
      <span className="sr-only">{LABEL[motion]}</span>
    </button>
  );
}
