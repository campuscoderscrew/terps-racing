import { useEffect, useRef } from "react";

/**
 * Shared scroll-velocity driver.
 *
 * One rAF loop for the whole page: measures how fast the visitor is scrolling
 * and feeds it to subscribers. Everything downstream writes `transform` straight
 * to a DOM node — no React state, so scrolling never triggers a re-render.
 */
type Sub = (velocity: number, direction: number) => void;

const subs = new Set<Sub>();
let running = false;
let lastY = 0;
let velocity = 0;

function loop() {
  const y = window.scrollY;
  const delta = y - lastY;
  lastY = y;
  // ease toward the new delta so the value doesn't jitter frame to frame
  velocity += (delta - velocity) * 0.22;
  if (Math.abs(velocity) < 0.05) velocity = 0;

  subs.forEach((s) => s(velocity, Math.sign(delta)));

  if (subs.size) requestAnimationFrame(loop);
  else running = false;
}

function subscribe(fn: Sub) {
  subs.add(fn);
  if (!running) {
    running = true;
    lastY = window.scrollY;
    requestAnimationFrame(loop);
  }
  return () => {
    subs.delete(fn);
  };
}

function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false)
  );
}

/**
 * Leans an element into the corner as scroll speed rises — a slight skew and
 * squash, capped so text stays readable.
 */
export function useSpeedLean<T extends HTMLElement = HTMLDivElement>(
  strength = 1
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion()) return;

    return subscribe((v) => {
      const capped = Math.max(-60, Math.min(60, v));
      const skew = (capped / 60) * 1.6 * strength;
      const scale = 1 - Math.min(Math.abs(capped) / 60, 1) * 0.012 * strength;
      node.style.transform = `skewY(${skew.toFixed(
        3
      )}deg) scale(${scale.toFixed(4)})`;
    });
  }, [strength]);

  return ref;
}

/**
 * Spawns slipstream streaks past the viewport edges while scrolling hard.
 * Each streak is a single short-lived element that removes itself, so nothing
 * animates once the visitor stops.
 */
export function useSlipstream(enabled = true, color?: string) {
  useEffect(() => {
    if (!enabled || reducedMotion()) return;

    let cooldown = 0;
    const host = document.createElement("div");
    host.style.cssText =
      "position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden";
    document.body.appendChild(host);

    const unsub = subscribe((v) => {
      const speed = Math.abs(v);
      if (speed < 26 || performance.now() < cooldown) return;
      cooldown = performance.now() + 55;

      const n = speed > 55 ? 2 : 1;
      for (let i = 0; i < n; i++) {
        const el = document.createElement("i");
        el.className = "tr-slip";
        const fromRight = Math.random() > 0.5;
        const w = 90 + Math.random() * 240;
        el.style.top = `${Math.random() * 100}vh`;
        el.style.width = `${w}px`;
        el.style.left = fromRight ? "100vw" : `${-w}px`;
        el.style.setProperty("--slip-dx", `${fromRight ? -1 : 1} * 0`);
        el.style.setProperty("--slip-dx", `${fromRight ? -120 : 120}vw`);
        el.style.setProperty("--slip-dur", `${420 + Math.random() * 260}ms`);
        if (color) el.style.setProperty("--slip-color", color);
        el.addEventListener("animationend", () => el.remove(), { once: true });
        host.appendChild(el);
      }
    });

    return () => {
      unsub();
      host.remove();
    };
  }, [enabled, color]);
}

/** Raw velocity subscription, for anything else that wants it. */
export function useScrollVelocity(fn: Sub) {
  const saved = useRef(fn);
  saved.current = fn;
  useEffect(() => subscribe((v, d) => saved.current(v, d)), []);
}
