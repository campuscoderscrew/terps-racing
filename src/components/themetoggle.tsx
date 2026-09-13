/* ============================================================================
   ThemeToggle — the light / dark switch.

   A single button, not a three-way control: the site is dark by default and
   light is the alternative. The two glyphs are stacked and cross-faded so the
   button never changes size, and the whole thing is drawn from the `--tr-fg`
   channel, which means it reads correctly inside a dark `.tr-on-dark` region
   (floating over the hero) and on light glass alike, with no props.
   ========================================================================= */

import { useTheme } from "./theme";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
      <g
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.95"
      >
        <path d="M12 2.6v2.3M12 19.1v2.3M2.6 12h2.3M19.1 12h2.3" />
        <path d="M5.4 5.4 7 7M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M20.2 14.6A8.4 8.4 0 0 1 9.4 3.8a8.4 8.4 0 1 0 10.8 10.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`tr-theme-toggle ${className}`}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      aria-pressed={theme === "light"}
      data-theme-state={theme}
    >
      <span className="tr-theme-toggle-glyphs" aria-hidden="true">
        <span className="tr-theme-glyph tr-theme-glyph-sun">
          <SunIcon />
        </span>
        <span className="tr-theme-glyph tr-theme-glyph-moon">
          <MoonIcon />
        </span>
      </span>
    </button>
  );
}
