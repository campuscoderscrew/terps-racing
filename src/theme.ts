import type { CSSProperties } from "react";

/**
 * Per-page accent colours.
 *
 * Each page sets its theme once on its root element via `themeVars()`, which
 * writes the colours out as CSS custom properties. Everything below that root
 * — including shared components like Sponsors — reads `var(--accent)` and picks
 * up whichever page it happens to be rendered on. No prop drilling, and adding
 * a new page means adding one entry here.
 *
 * Accents are chosen to clear 4.5:1 against the site's black backgrounds so
 * they stay legible as heading and label colours, not just as decoration.
 */
export interface PageTheme {
  /** Primary accent: headings, eyebrow labels, dividers, active states. */
  accent: string;
  /** Secondary accent, for pages that carry two brand colours. */
  accentAlt: string;
}

export const PAGE_THEMES = {
  /** Maryland gold over red — the house palette. */
  home:    { accent: "#FFD200", accentAlt: "#C30000" },
  members: { accent: "#FFD200", accentAlt: "#C30000" },

  /** Formula IC: red, the team's established colour. */
  ic:      { accent: "#C30000", accentAlt: "#FFD200" },

  /** Baja: copper-brown for dirt and off-road. Replaces the previous crimson,
   *  which read as a near-duplicate of IC's red. */
  baja:    { accent: "#B87333", accentAlt: "#E0A96D" },

  /** EV: amber, already the page's dominant colour. */
  ev:      { accent: "#e8a010", accentAlt: "#e8180e" },
} satisfies Record<string, PageTheme>;

export type PageKey = keyof typeof PAGE_THEMES;

/** Spread onto a page's root element: `<div style={themeVars("baja")}>`. */
export function themeVars(page: PageKey): CSSProperties {
  const theme = PAGE_THEMES[page];
  return {
    "--accent": theme.accent,
    "--accent-alt": theme.accentAlt,
  } as CSSProperties;
}
