/* ============================================================================
   Motion quality — how much cinema the visitor gets.

   The site's motion layer is deliberately heavy: scroll-driven camera moves,
   route wipes, per-character title rolls. That is the point on a desktop with a
   GPU, and it is the wrong answer on a five-year-old laptop. So the whole thing
   is gated on one attribute, `data-motion` on <html>, exactly the way the
   palette is gated on `data-theme`:

     cinematic  everything — scroll-linked camera, route blades, 3D type
     standard   entrances, hovers and route fades; no scroll-linked camera
     reduced    essentially still; matches prefers-reduced-motion

   CSS reads `html[data-motion="cinematic"] …`; JS-driven effects call
   `motionAtLeast("standard")`. Nothing needs to know about the others.

   Default is `cinematic`, EXCEPT for a visitor whose OS asks for reduced
   motion and who has never chosen here — they get `reduced`, and can still opt
   back up. `index.html` runs an inline copy of `resolve()` before first paint
   so the first frame is already at the right level; React is the backstop.
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

export type MotionLevel = "cinematic" | "standard" | "reduced";

export const MOTION_KEY = "tr-motion";

const LEVELS: MotionLevel[] = ["reduced", "standard", "cinematic"];

/** Read the stored choice, falling back to the OS preference then cinematic. */
export function storedMotion(): MotionLevel {
  try {
    const raw = localStorage.getItem(MOTION_KEY);
    if (raw === "cinematic" || raw === "standard" || raw === "reduced") {
      return raw;
    }
  } catch {
    /* private mode — fall through */
  }
  try {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return "reduced";
    }
  } catch {
    /* ignore */
  }
  return "cinematic";
}

/** Push a level onto <html>. */
export function applyMotion(level: MotionLevel) {
  document.documentElement.dataset.motion = level;
}

/**
 * True when the active level is at or above `min`. The single predicate every
 * JS-driven effect should use instead of reading the attribute itself.
 */
export function motionAtLeast(min: MotionLevel, level?: MotionLevel): boolean {
  const current =
    level ??
    ((typeof document !== "undefined"
      ? (document.documentElement.dataset.motion as MotionLevel)
      : undefined) ||
      "cinematic");
  return LEVELS.indexOf(current) >= LEVELS.indexOf(min);
}

type MotionContextValue = {
  motion: MotionLevel;
  setMotion: (level: MotionLevel) => void;
  /** Cycles cinematic → standard → reduced → cinematic. */
  cycleMotion: () => void;
  /** Convenience: `atLeast("standard")` bound to the live level. */
  atLeast: (min: MotionLevel) => boolean;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [motion, setMotionState] = useState<MotionLevel>(() =>
    typeof document === "undefined"
      ? "cinematic"
      : (document.documentElement.dataset.motion as MotionLevel) ||
        storedMotion(),
  );

  useEffect(() => {
    applyMotion(motion);
  }, [motion]);

  const setMotion = useCallback((next: MotionLevel) => {
    setMotionState(next);
    try {
      localStorage.setItem(MOTION_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const cycleMotion = useCallback(() => {
    const order: MotionLevel[] = ["cinematic", "standard", "reduced"];
    setMotion(order[(order.indexOf(motion) + 1) % order.length]);
  }, [motion, setMotion]);

  // Another tab changed the level — follow it rather than drift out of sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === MOTION_KEY) setMotionState(storedMotion());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({
      motion,
      setMotion,
      cycleMotion,
      atLeast: (min: MotionLevel) => motionAtLeast(min, motion),
    }),
    [motion, setMotion, cycleMotion],
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

/**
 * Motion access. Falls back to reading/writing <html> directly when no provider
 * is mounted, so a stray component can never crash the page.
 */
export function useMotion(): MotionContextValue {
  const ctx = useContext(MotionContext);
  const [fallback, setFallback] = useState<MotionLevel>(() =>
    typeof document === "undefined" ? "cinematic" : storedMotion(),
  );

  if (ctx) return ctx;

  const setMotion = (next: MotionLevel) => {
    setFallback(next);
    applyMotion(next);
    try {
      localStorage.setItem(MOTION_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const order: MotionLevel[] = ["cinematic", "standard", "reduced"];
  return {
    motion: fallback,
    setMotion,
    cycleMotion: () =>
      setMotion(order[(order.indexOf(fallback) + 1) % order.length]),
    atLeast: (min: MotionLevel) => motionAtLeast(min, fallback),
  };
}
