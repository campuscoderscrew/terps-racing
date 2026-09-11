import { useCallback, useEffect, useRef, useState } from "react";
import Reveal, { useReveal } from "./reveal";

/* ── Words ───────────────────────────────────────────────────────────────── */

interface WordsProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  /** Needed when a section points at this heading with aria-labelledby. */
  id?: string;
}

/**
 * Splits `text` into words that slide up from a clipped line, one after the
 * other, the first time the block scrolls into view.
 */
export function Words({
  text,
  className = "",
  style,
  delay = 0,
  as: Tag = "span",
  id,
}: WordsProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <Tag
      id={id}
      ref={ref as React.Ref<never>}
      className={`tr-words ${
        revealed ? "is-revealed" : ""
      } ${className}`.trim()}
      style={{ ["--reveal-delay" as string]: `${delay}ms`, ...style }}
      // The words are split across elements, which would otherwise read and
      // copy as one run-on string — expose the real text to assistive tech.
      aria-label={text}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="tr-word"
          style={{ ["--i" as string]: i }}
          aria-hidden="true"
        >
          <span>{word}</span>
        </span>
      ))}
    </Tag>
  );
}

/* ── Spotlight ───────────────────────────────────────────────────────────── */

/**
 * Tracks the pointer across a card and exposes it as --mx/--my so the
 * `.tr-spotlight` gradient follows the cursor.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return { ref, onMouseMove };
}

/* ── Parallax ────────────────────────────────────────────────────────────── */

/**
 * Returns a translateY offset derived from how far the element has travelled
 * through the viewport. `speed` is a fraction of the scrolled distance.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.18,
  { scale = 1 }: { scale?: number } = {}
) {
  const ref = useRef<T>(null);
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    const target = targetRef.current;
    if (!node || !target) return;

    const base = scale === 1 ? "" : ` scale(${scale})`;
    target.style.willChange = "transform";
    target.style.backfaceVisibility = "hidden";

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      target.style.transform = base.trim();
      return;
    }

    let ticking = false;
    const apply = () => {
      const r = node.getBoundingClientRect();
      const progress =
        (window.innerHeight - r.top) / (window.innerHeight + r.height);
      const offset = (progress - 0.5) * 2 * speed * r.height;
      // Written straight to the node: routing this through React state would
      // re-render the whole section on every scroll frame.
      target.style.transform = `translate3d(0, ${offset.toFixed(
        2
      )}px, 0)${base}`;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, scale]);

  return { ref, targetRef };
}

/* ── Marquee band ────────────────────────────────────────────────────────── */

interface MarqueeBandProps {
  items: string[];
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
  /** Tilt the band, for a racing-livery feel. */
  tilt?: number;
  background?: string;
  color?: string;
}

/** An endlessly scrolling strip of short phrases. */
export function MarqueeBand({
  items,
  duration = 34,
  className = "",
  tilt = 0,
  background = "var(--tr-gold)",
  color = "#111",
}: MarqueeBandProps) {
  const tiled = [...items, ...items];
  const ref = useRef<HTMLDivElement>(null);

  // A continuously animating strip is the one steady-state cost worth paying
  // for — but only while it is actually on screen.
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const track = node.querySelector<HTMLElement>(".tr-marquee-track");
    if (!track) return;

    const io = new IntersectionObserver(
      ([e]) => {
        track.style.animationPlayState = e.isIntersecting
          ? "running"
          : "paused";
      },
      { rootMargin: "120px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`tr-marquee relative overflow-hidden ${className}`}
      style={{
        background,
        transform: tilt ? `rotate(${tilt}deg) scale(1.06)` : undefined,
      }}
      aria-hidden="true"
    >
      <div
        className="tr-marquee-track items-center py-2.5"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {tiled.map((item, i) => (
          <span
            key={i}
            className="flex flex-shrink-0 items-center gap-6 px-6 uppercase"
            style={{
              color,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(0.85rem, 1.8vw, 1.15rem)",
              letterSpacing: "0.08em",
            }}
          >
            {item}
            <span style={{ opacity: 0.45 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Section intro ───────────────────────────────────────────────────────── */

interface SceneProps {
  eyebrow?: string;
  title: string;
  /** Huge outlined word ghosted behind the heading. */
  ghost?: string;
  children?: React.ReactNode;
  center?: boolean;
  className?: string;
  id?: string;
}

/** A section heading with an optional ghosted backdrop word. */
export function Scene({
  eyebrow,
  title,
  ghost,
  children,
  center = false,
  className = "",
  id,
}: SceneProps) {
  return (
    <div
      className={`relative ${center ? "text-center" : ""} ${className}`}
      id={id}
    >
      {ghost && (
        <span
          className="tr-ghost"
          aria-hidden="true"
          style={{
            fontSize: "clamp(3rem, 10vw, 8.5rem)",
            top: "-0.16em",
            left: center ? "50%" : "-0.04em",
            transform: center ? "translateX(-50%)" : undefined,
            whiteSpace: "nowrap",
          }}
        >
          {ghost}
        </span>
      )}

      <div className="relative">
        {eyebrow && (
          <Reveal variant="up" className="mb-3 block">
            <span className="tr-eyebrow">{eyebrow}</span>
          </Reveal>
        )}

        <Words
          as="h2"
          text={title}
          delay={eyebrow ? 80 : 0}
          className="tr-h2 text-white"
          style={center ? { justifyContent: "center" } : undefined}
        />

        <Reveal variant="rule" delay={260} className="mt-5 mb-7 block">
          <span className={`tr-rule ${center ? "mx-auto" : ""}`} />
        </Reveal>

        {children}
      </div>
    </div>
  );
}
