/* ============================================================================
   Theme — light / dark switching.

   The whole palette lives in CSS custom properties on <html>; this module only
   owns which value of `data-theme` is on that element, and remembers the
   choice. Dark is the default and the site's identity — light is opt-in.

   `index.html` runs a tiny inline copy of `resolve()` before first paint so a
   returning light-mode visitor never sees a flash of the dark palette. React
   picks the same value up on mount, so the two never disagree.
   ========================================================================= */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

export const THEME_KEY = "tr-theme";

/** Read the stored choice; anything unrecognised falls back to dark. */
export function storedTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch {
    // Private mode / storage disabled — not worth failing over.
    return "dark";
  }
}

/** Push a theme onto <html> and keep the browser UI colour in step. */
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#f6f6f8" : "#08080a");
}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof document === "undefined"
      ? "dark"
      : (document.documentElement.dataset.theme as Theme) || storedTheme(),
  );

  // Apply on mount too: covers the case where the inline boot script is missing
  // (e.g. a stale cached index.html) so React is always the backstop.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme],
  );

  // Another tab switched theme — follow it rather than drift out of sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY) setThemeState(storedTheme());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Theme access. Falls back to reading/writing <html> directly when no provider
 * is mounted, so a stray component can never crash the page.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  const [fallback, setFallback] = useState<Theme>(() =>
    typeof document === "undefined" ? "dark" : storedTheme(),
  );

  if (ctx) return ctx;

  const setTheme = (next: Theme) => {
    setFallback(next);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  };

  return {
    theme: fallback,
    setTheme,
    toggleTheme: () => setTheme(fallback === "dark" ? "light" : "dark"),
  };
}
