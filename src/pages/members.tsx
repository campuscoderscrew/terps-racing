const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Roboto+Condensed:wght@400;700&family=Roboto+Mono:wght@400;500&family=Goldman&family=Inter:wght@400;500;600&family=Roboto:ital,wght@0,400;0,500;0,700;1,900&display=swap');`;

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "~/components/navbar";
import { themeVars } from "~/theme";

import heroImg    from "../public/images/newMembers/heroTRNM2400.jpeg";
import sparksImg  from "../public/images/newMembers/sparks.jpg";
import outsideImg from "../public/images/newMembers/outside.jpg";
import weldImg    from "../public/images/newMembers/weld.jpg";
import collabImg  from "../public/images/newMembers/collab.jpg";
import rqbgImg    from "../public/images/newMembers/rqbg.jpg";
import driveImg   from "../public/images/newMembers/drive.jpg";

// Maryland gold/red, resolved from the page theme (src/theme.ts) rather than
// hardcoded — this is a house page, so it keeps the school palette rather than
// borrowing EV's amber. What it borrows from EV is the structure: layered
// background accents, monospace eyebrow labels, gradient rules, scroll reveals.
const GOLD = "var(--accent)";
const RED  = "var(--accent-alt)";

const FONT_DISPLAY = "'Barlow Condensed', sans-serif";
const FONT_BODY    = "'Roboto Condensed', sans-serif";
const FONT_LABEL   = "'Roboto Mono', monospace";

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Reveal({ show, delay = 0, distance = 20, className, children }: {
  show: boolean;
  delay?: number;
  distance?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Background accents ────────────────────────────────────────────────────────
// Layered behind every section so the page reads as one surface: a faint
// engineering grid, CRT scanlines, and soft colour washes in the school palette.
function GridOverlay({ opacity = 0.1, size = 80 }: { opacity?: number; size?: number }) {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

function Scanlines() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
      }}
    />
  );
}

function Glow({ color, className, size = 480 }: { color: string; className: string; size?: number }) {
  return (
    <div
      className={`absolute z-0 pointer-events-none rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(40px)",
      }}
    />
  );
}

const CORNER_POSITION = {
  tl: "top-0 left-0",
  tr: "top-0 right-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0",
} as const;

function CornerAccent({ at }: { at: keyof typeof CORNER_POSITION }) {
  const pos = CORNER_POSITION[at];
  return (
    <>
      <div className={`absolute ${pos} z-20 w-20 h-1`} style={{ background: RED }} />
      <div className={`absolute ${pos} z-20 w-1 h-20`} style={{ background: RED }} />
    </>
  );
}

// ── Type primitives ───────────────────────────────────────────────────────────
function SectionLabel({ children, color = RED }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="block text-xs font-bold uppercase"
      style={{ color, fontFamily: FONT_LABEL, letterSpacing: "0.25em" }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-white mt-4"
      style={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: "clamp(1.4rem, 2.4vw, 2.6rem)",
        lineHeight: 1.15,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

function Rule({ color = GOLD, className = "w-32" }: { color?: string; className?: string }) {
  return (
    <div className={`h-px ${className}`} style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
  );
}

const bodyText: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontWeight: 400,
  color: "rgba(235,235,235,0.82)",
  lineHeight: 1.65,
};

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden flex items-center"
      style={{ minHeight: "calc(100dvh - 3.5rem)" }}
    >
      <img
        src={heroImg}
        alt="Terps Racing members on the international competition stage"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        style={{ objectPosition: "center 80%", filter: "brightness(0.62) saturate(1.15)" }}
      />
      <GridOverlay opacity={0.16} />
      <div
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(100deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.12) 78%)" }}
      />
      <Scanlines />
      <Glow color="rgba(195,0,0,0.38)" className="-left-40 top-1/4" size={560} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 md:px-16 py-20">
        <Reveal show={mounted} delay={0.1}>
          <SectionLabel>Join Terps Racing</SectionLabel>
        </Reveal>

        <Reveal show={mounted} delay={0.25} distance={26}>
          <h1
            className="text-white select-none mt-6 mb-8"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 6.5vw, 5.6rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              textShadow: "0 4px 32px rgba(0,0,0,0.8)",
            }}
          >
            COME REPRESENT<br />
            <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)", color: "transparent" }}>UMD</span> ON THE<br />
            <span style={{ color: GOLD }}>INTERNATIONAL STAGE</span>
          </h1>
        </Reveal>

        <Reveal show={mounted} delay={0.5}>
          <Rule className="w-48" />
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: mounted ? 1 : 0, transition: "opacity 1s ease 1s" }}
      >
        <span style={{ fontFamily: FONT_LABEL, fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.6)" }}>
          SCROLL
        </span>
        <div className="w-px h-10" style={{ background: `linear-gradient(180deg, ${GOLD}, transparent)` }} />
      </div>

      <CornerAccent at="tl" />
    </section>
  );
}

// ── Requirements ──────────────────────────────────────────────────────────────
interface ReqCard {
  label: string;
  img:   string;
  alt:   string;
  desc:  string;
}

const REQ_CARDS: ReqCard[] = [
  { label: "Hands on drive",       img: sparksImg,  alt: "Welding sparks",           desc: "Eager to build, test, and solve real engineering problems." },
  { label: "Team Player",          img: outsideImg, alt: "Team working together",    desc: "We collaborate across disciplines and depend on each other." },
  { label: "Willingness to Learn", img: weldImg,    alt: "Student learning in shop", desc: "We'll teach CAD, machining, and engineering — bring curiosity." },
  { label: "Any Major is Welcome", img: collabImg,  alt: "Students at computers",    desc: "Engineering, computer science, business, design — every skill has a place here." },
];

const CARD_IDLE = {
  borderColor: "rgba(255,255,255,0.1)",
  transform: "translateY(0)",
  boxShadow: "none",
};

const CARD_HOVER = {
  borderColor: GOLD,
  transform: "translateY(-4px)",
  boxShadow: "0 14px 36px rgba(0,0,0,0.55)",
};

function applyCardState(el: HTMLElement, state: typeof CARD_IDLE) {
  el.style.borderColor = state.borderColor;
  el.style.transform = state.transform;
  el.style.boxShadow = state.boxShadow;
}

function Requirements() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      id="requirements"
      className="relative overflow-hidden px-6 sm:px-10 md:px-16 py-20 md:py-28"
    >
      <img
        src={rqbgImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        style={{ objectPosition: "center 60%", filter: "brightness(0.3) saturate(0.7)" }}
      />
      <div className="absolute inset-0 z-0" style={{ background: "rgba(0,0,0,0.72)" }} />
      <GridOverlay opacity={0.1} />
      <Glow color="rgba(255,210,0,0.16)" className="-right-32 -top-24" size={520} />
      <Glow color="rgba(195,0,0,0.2)" className="-left-40 bottom-0" size={460} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Reveal show={inView} delay={0.1}>
          <SectionLabel>Requirements</SectionLabel>
        </Reveal>
        <Reveal show={inView} delay={0.2}>
          <SectionHeading>What we're looking for</SectionHeading>
        </Reveal>
        <Reveal show={inView} delay={0.3} className="mt-5">
          <Rule />
        </Reveal>
        <Reveal show={inView} delay={0.38}>
          <p
            className="mt-6 mb-14 max-w-lg"
            style={{ ...bodyText, color: GOLD, fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)" }}
          >
            No experience needed — just show up ready to work and learn.
          </p>
        </Reveal>

        <div className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {REQ_CARDS.map(({ label, img, alt, desc }, i) => (
            <Reveal key={label} show={inView} delay={0.45 + i * 0.1} className="h-full">
              <article
                className="group h-full flex flex-col overflow-hidden"
                style={{
                  border: `1px solid ${CARD_IDLE.borderColor}`,
                  background: "rgba(255,255,255,0.02)",
                  transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => applyCardState(e.currentTarget, CARD_HOVER)}
                onMouseLeave={(e) => applyCardState(e.currentTarget, CARD_IDLE)}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 2" }}>
                  <img
                    src={img}
                    alt={alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "saturate(0.85)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 45%, rgba(0,0,0,0.6) 100%)" }}
                  />
                  <span
                    className="absolute top-3 left-3"
                    style={{ fontFamily: FONT_LABEL, fontSize: "0.65rem", letterSpacing: "0.2em", color: GOLD }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col gap-3 p-5 flex-1">
                  <h3
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 700,
                      fontSize: "clamp(1.05rem, 1.5vw, 1.6rem)",
                      color: RED,
                      lineHeight: 1.1,
                    }}
                  >
                    {label}
                  </h3>
                  <p style={{ ...bodyText, fontSize: "clamp(0.85rem, 1vw, 1rem)" }}>{desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Commitment ────────────────────────────────────────────────────────────────
const COMMITMENT_BULLETS = [
  "2-3 Meetings per week",
  "High time commitment (5-10+ hours weekly)",
  "Seasonal competitions",
];

function Commitment() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative overflow-hidden flex flex-col bg-black">
      <GridOverlay opacity={0.1} />
      <Glow color="rgba(195,0,0,0.3)" className="-left-24 top-10" size={420} />

      <div className="relative z-10 flex flex-col flex-1 pt-16 md:pt-20">
        <div className="px-6 sm:px-10 md:px-14">
          <Reveal show={inView} delay={0.1}>
            <SectionLabel>Commitment</SectionLabel>
          </Reveal>
          <Reveal show={inView} delay={0.2}>
            <SectionHeading>What to expect</SectionHeading>
          </Reveal>
          <Reveal show={inView} delay={0.3} className="mt-5">
            <Rule />
          </Reveal>

          <ul className="flex flex-col gap-3 list-none mt-10 mb-14">
            {COMMITMENT_BULLETS.map((item, i) => (
              <Reveal key={item} show={inView} delay={0.4 + i * 0.1}>
                <li
                  className="flex items-center gap-4 text-white py-2 pl-5"
                  style={{
                    ...bodyText,
                    color: "#fff",
                    fontSize: "clamp(0.9rem, 1.1vw, 1.1rem)",
                    borderLeft: `2px solid ${GOLD}`,
                  }}
                >
                  <span style={{ fontFamily: FONT_LABEL, fontSize: "0.7rem", letterSpacing: "0.15em", color: GOLD }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Bottom-left image — full-bleed so it anchors the page's lower-left
            corner, and mt-auto pins it to the bottom of this column however
            tall the Teams column next to it grows. */}
        <Reveal show={inView} delay={0.7} className="mt-auto">
          <figure className="relative overflow-hidden group m-0">
            <img
              src={driveImg}
              alt="A driver in helmet and race suit climbing into the car at night in the rain while teammates look on"
              loading="lazy"
              className="w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
              style={{ aspectRatio: "16 / 9", filter: "saturate(0.9)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 35%, rgba(0,0,0,0.4) 100%)" }}
            />
            <figcaption className="absolute bottom-4 left-6 flex items-center gap-3">
              <span className="h-px w-8" style={{ background: GOLD }} />
              <span
                className="uppercase"
                style={{ fontFamily: FONT_LABEL, fontSize: "0.62rem", letterSpacing: "0.24em", color: "rgba(255,255,255,0.9)" }}
              >
                Late nights, all weather
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <CornerAccent at="bl" />
    </section>
  );
}

// ── Teams ─────────────────────────────────────────────────────────────────────
interface TeamEntry {
  name:    string;
  to:      string;
  desc:    string;
  meeting: string;
}

const TEAMS: TeamEntry[] = [
  {
    name: "Baja",
    to: "/baja",
    desc: "Terps Racing Baja SAE is an engineering project team that designs, builds, and races an off-road vehicle to compete in the SAE Collegiate Baja Design Series.",
    meeting: "Baja meets in J.M Patterson Hall 1225 on Tuesdays and Thursdays at 6:30 PM and Sundays at 11 AM",
  },
  {
    name: "Formula IC",
    to: "/IC",
    desc: "Terps Racing Formula SAE is an engineering project team that designs, builds, and races a formula style racecar to compete in the SAE Collegiate Formula Design Series.",
    meeting: "IC meets in J.M Patterson Hall 1225 on Mondays and Wednesdays at 5 PM and Saturdays at 10 AM",
  },
  {
    name: "Formula EV",
    to: "/ev",
    desc: "Founded in 2019, Terps Racing Formula SAE Electric is Terps Racing's newest branch, faced with a modern challenge: convert the classic formula-style experience into something sustainable and clean.",
    meeting: "EV meets in the Cypress Building from 6-8 PM on Mondays and Wednesdays",
  },
];

function Teams() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative overflow-hidden bg-black px-6 sm:px-10 md:px-14 py-16 md:py-20">
      <GridOverlay opacity={0.1} />
      <Glow color="rgba(255,210,0,0.14)" className="-right-32 top-1/3" size={480} />

      <div className="relative z-10">
        <Reveal show={inView} delay={0.1}>
          <SectionLabel>Teams</SectionLabel>
        </Reveal>
        <Reveal show={inView} delay={0.2}>
          <SectionHeading>Which team is right for you?</SectionHeading>
        </Reveal>
        <Reveal show={inView} delay={0.3} className="mt-5 mb-12">
          <Rule />
        </Reveal>

        <div className="flex flex-col gap-4">
          {TEAMS.map(({ name, to, desc, meeting }, i) => (
            <Reveal key={name} show={inView} delay={0.4 + i * 0.12}>
              <Link
                to={to}
                className="group block p-6"
                style={{
                  border: `1px solid ${CARD_IDLE.borderColor}`,
                  background: "rgba(255,255,255,0.02)",
                  textDecoration: "none",
                  transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => applyCardState(e.currentTarget, CARD_HOVER)}
                onMouseLeave={(e) => applyCardState(e.currentTarget, CARD_IDLE)}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 700,
                      fontSize: "clamp(1.1rem, 1.6vw, 2rem)",
                      color: RED,
                      lineHeight: 1.1,
                    }}
                  >
                    {name}
                  </span>
                  <span
                    className="whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ fontFamily: FONT_LABEL, fontSize: "0.62rem", letterSpacing: "0.2em", color: GOLD }}
                  >
                    VIEW TEAM →
                  </span>
                </div>

                <div className="h-[3px] my-3" style={{ width: "clamp(4rem, 10rem, 25rem)", background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />

                <p style={{ ...bodyText, fontSize: "clamp(0.88rem, 1.05vw, 1.05rem)" }}>{desc}</p>

                <div
                  className="flex items-start gap-3 mt-4"
                  style={{ ...bodyText, fontSize: "clamp(0.82rem, 1vw, 0.98rem)", color: "rgba(255,253,244,0.7)" }}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0 mt-[0.5em]" style={{ background: GOLD }} />
                  {meeting}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      id="join"
      className="relative overflow-hidden bg-black px-6 sm:px-10 md:px-16 py-20 md:py-28 text-center"
    >
      <GridOverlay opacity={0.1} />
      <Glow color="rgba(195,0,0,0.28)" className="left-1/2 -translate-x-1/2 -bottom-48" size={640} />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <Reveal show={inView} delay={0.1}>
          <SectionLabel>Ready to join?</SectionLabel>
        </Reveal>
        <Reveal show={inView} delay={0.22}>
          <h2
            className="text-white mt-5"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 900,
              fontSize: "clamp(1.6rem, 4vw, 3.4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Just show up to a meeting<br />
            and <span style={{ color: GOLD }}>start your engine</span>
          </h2>
        </Reveal>
        <Reveal show={inView} delay={0.4} className="mt-10 w-full">
          <div className="h-px w-40 mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
        </Reveal>
      </div>

      <CornerAccent at="br" />
    </section>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function Members() {
  return (
    <>
      <style>{FONTS}</style>
      <div className="bg-black text-white overflow-x-hidden" style={themeVars("members")}>
        <NavBar />
        <Hero />
        <Requirements />
        {/* Middle: Commitment + Teams side by side */}
        <div className="grid grid-cols-2 max-[768px]:grid-cols-1">
          <Commitment />
          <Teams />
        </div>
        <Footer />
      </div>
    </>
  );
}
