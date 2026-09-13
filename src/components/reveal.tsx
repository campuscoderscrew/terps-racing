import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "blur"
  | "rule"
  /** A raked curtain slides off the block instead of the block fading in. */
  | "wipe"
  /** Lies back on a hinge and stands up — for feature blocks and cards. */
  | "tilt"
  /** The long entrance: further, slower, for a section that earns the beat. */
  | "rise"
  /** Arrives off the racing line, raked in from the left and straightening. */
  | "slash";

/**
 * Observes an element and flips `is-revealed` on the first time it scrolls
 * into view. Pairs with the `[data-reveal]` rules in app.css.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {}
) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -10% 0px",
    once = true,
  } = options;
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer (or the visitor prefers less motion) → show immediately.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // A block taller than the viewport can never reach `threshold` as a
          // ratio, so also accept a decent number of visible pixels.
          const visible = entry.intersectionRect.height;
          const enough = entry.intersectionRatio >= threshold || visible >= 120;

          if (entry.isIntersecting && enough) {
            setRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once && !entry.isIntersecting) {
            setRevealed(false);
          }
        });
      },
      { threshold: [0, threshold, 0.5], rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, revealed };
}

interface RevealProps {
  children: ReactNode;
  /** Direction/style of the entrance. */
  variant?: RevealVariant;
  /** Delay in milliseconds — use to stagger siblings. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  threshold?: number;
  id?: string;
}

/** Wraps children so they animate in the first time they enter the viewport. */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  style,
  as: Tag = "div",
  threshold,
  id,
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold });

  return (
    <Tag
      id={id}
      ref={ref}
      data-reveal={variant}
      className={`${revealed ? "is-revealed" : ""} ${className}`.trim()}
      style={{ ["--reveal-delay" as string]: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

/* ── Stagger ─────────────────────────────────────────────────────────────── */

interface StaggerProps {
  children: ReactNode;
  /** Gap between consecutive children, in milliseconds. */
  step?: number;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  id?: string;
}

/**
 * Cascades whatever is inside it.
 *
 * Every entrance mechanism on the site reads `--reveal-delay`, and the
 * `[data-stagger] > *:nth-child(n)` rules in app.css set that variable from a
 * child's position. So this wrapper needs no knowledge of its children and the
 * children need no knowledge of each other: drop `<Reveal>`s (or `<Words>`, or
 * anything else that respects the variable) inside and they arrive in order.
 *
 * Children past the eleventh all share the last delay rather than compounding
 * into a sluggish tail.
 */
export function Stagger({
  children,
  step = 90,
  className = "",
  style,
  as: Tag = "div",
  id,
}: StaggerProps) {
  return (
    <Tag
      id={id}
      data-stagger=""
      className={className}
      style={{ ["--stagger-step" as string]: `${step}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
