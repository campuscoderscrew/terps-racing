import { useEffect, useRef, useState } from "react";

interface GaugeProps {
  /** 0–1, how far round the arc sweeps. */
  value: number;
  size?: number;
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
  label?: string;
}

const START = -220; // degrees, bottom-left
const SWEEP = 260; // degrees of travel

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arcPath(cx: number, cy: number, r: number, from: number, to: number) {
  const [x1, y1] = polar(cx, cy, r, from);
  const [x2, y2] = polar(cx, cy, r, to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

/**
 * Speedometer dial. The needle arc sweeps once when it scrolls into view
 * (a CSS `stroke-dashoffset` transition — one-shot, no running animation).
 */
export default function Gauge({
  value,
  size = 168,
  color = "var(--tr-gold)",
  trackColor = "rgba(255,255,255,0.09)",
  children,
  label,
}: GaugeProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [swept, setSwept] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setSwept(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSwept(true);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;
  const circumference = 2 * Math.PI * r;
  const arcLen = (SWEEP / 360) * circumference;
  const clamped = Math.max(0, Math.min(1, value));

  // Tick marks around the dial, redline at the top end.
  const ticks = Array.from({ length: 13 }, (_, i) => {
    const deg = START + (SWEEP / 12) * i;
    const inner = i % 3 === 0 ? r - 12 : r - 7;
    const [x1, y1] = polar(cx, cy, inner, deg);
    const [x2, y2] = polar(cx, cy, r - 2, deg);
    return { x1, y1, x2, y2, hot: i >= 10 };
  });

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        className="block"
      >
        <path
          d={arcPath(cx, cy, r, START, START + SWEEP)}
          fill="none"
          stroke={trackColor}
          strokeWidth={6}
          strokeLinecap="round"
        />
        <path
          className={`tr-gauge-arc ${swept ? "is-swept" : ""}`}
          d={arcPath(cx, cy, r, START, START + SWEEP)}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          style={{
            ["--arc-len" as string]: arcLen,
            ["--arc-to" as string]: arcLen * (1 - clamped),
            filter: `drop-shadow(0 0 10px ${color})`,
          }}
        />
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.hot ? "var(--tr-red)" : "rgba(255,255,255,0.28)"}
            strokeWidth={t.hot ? 2.5 : 1.5}
            strokeLinecap="round"
          />
        ))}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children}
        {label && (
          <span
            className="mt-1 max-w-[11ch] text-white/50"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              lineHeight: 1.4,
            }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
