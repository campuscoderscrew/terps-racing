import type { CSSProperties } from "react";

/**
 * Shared type tokens. Fonts and colours live in src/app.css (`@theme` +
 * `:root`); these constants only exist so pages that inline styles stay
 * consistent with the design system.
 */

export const header2_className =
  "tr-h2 text-white mb-4 md:mb-6";

export const header2_style: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
};

export const header2_className_black = "tr-h2 text-black mb-4 md:mb-6";

export const p_className =
  "text-white/70 leading-[1.75] mb-6 md:mb-8 max-w-full md:max-w-[68ch]";

export const p_style: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "clamp(0.95rem, 1.5vw, 1.12rem)",
};
