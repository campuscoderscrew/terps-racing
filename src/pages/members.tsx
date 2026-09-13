import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "~/components/navbar";
import Backdrop, { Seam } from "~/components/backdrop";
import { useSlipstream } from "~/components/velocity";

import heroImg from "../public/images/newMembers/heroTRNM2400.webp";
import sparksImg from "../public/images/newMembers/sparks.webp";
import outsideImg from "../public/images/newMembers/outside.webp";
import weldImg from "../public/images/newMembers/weld.webp";
import collabImg from "../public/images/newMembers/collab.webp";
import rqbgImg from "../public/images/newMembers/rqbg.webp";
import driveImg from "../public/images/newMembers/drive.webp";

// Maryland red/gold — this is a house page, so it keeps the school palette
// rather than borrowing EV's amber. What it borrows from EV is the structure:
// layered background accents, monospace eyebrow labels, gradient rules and
// scroll-triggered reveals.
const RED = "var(--tr-red-ink)";
/* Fills and rules keep the brand gold; text takes the ink variant, which is a
   legible bronze on the light theme and the same gold inside `.tr-on-dark`. */
const GOLD = "var(--tr-gold)";
const GOLD_TEXT = "var(--tr-gold-ink)";

const FONT_DISPLAY = "var(--font-display)";
const FONT_BODY = "var(--font-body)";
const FONT_LABEL = "var(--font-mono)";

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Reveal({
  show,
  delay = 0,
  distance = 20,
  className,
  children,
}: {
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
function GridOverlay({
  opacity = 0.1,
  size = 80,
}: {
  opacity?: number;
  size?: number;
}) {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(rgb(var(--tr-fg) / 0.15) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--tr-fg) / 0.15) 1px, transparent 1px)",
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

function Glow({
  color,
  className,
  size = 480,
}: {
  color: string;
  className: string;
  size?: number;
}) {
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
      <div
        className={`absolute ${pos} z-20 w-20 h-1`}
        style={{ background: RED }}
      />
      <div
        className={`absolute ${pos} z-20 w-1 h-20`}
        style={{ background: RED }}
      />
    </>
  );
}

// ── Type primitives ───────────────────────────────────────────────────────────
function SectionLabel({
  children,
  color = RED,
}: {
  children: React.ReactNode;
  color?: string;
}) {
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

function Rule({
  color = GOLD,
  className = "w-32",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`h-px ${className}`}
      style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
    />
  );
}

const bodyText: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontWeight: 400,
  color: "rgb(var(--tr-fg) / 0.82)",
  lineHeight: 1.65,
};

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="about"
      className="tr-on-dark tr-cam-bars relative w-full flex items-center justify-center overflow-hidden py-[3rem] px-[clamp(20px,5vw,80px)]"
      style={{
        minHeight: "calc(100dvh - 3.5rem)",
        background: "var(--tr-ink)",
      }}
    >
      <img
        src={heroImg}
        alt="Terps Racing members on the international competition stage"
        className="tr-cam-push absolute inset-0 z-0 w-full h-full object-cover"
        style={{
          objectPosition: "center 80%",
          filter: "brightness(0.62) saturate(1.15)",
        }}
      />
      <GridOverlay opacity={0.16} />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.12) 78%)",
        }}
      />
      <Scanlines />
      <Backdrop
        variant="carbon"
        embers={9}
        emberColor="#FFD200"
        beams
        vignette={false}
        intensity={0.6}
      />
      <Glow
        color="rgba(195,0,0,0.38)"
        className="-left-40 top-1/4"
        size={560}
      />

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
            COME REPRESENT
            <br />
            <span
              style={{
                WebkitTextStroke: "2px rgb(var(--tr-fg) / 0.9)",
                color: "transparent",
              }}
            >
              UMD
            </span>{" "}
            ON THE
            <br />
            <span style={{ color: GOLD_TEXT }}>INTERNATIONAL STAGE</span>
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
        <span
          style={{
            fontFamily: FONT_LABEL,
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "rgb(var(--tr-fg) / 0.6)",
          }}
        >
          SCROLL
        </span>
        <div
          className="w-px h-10"
          style={{
            background: `linear-gradient(180deg, ${GOLD}, transparent)`,
          }}
        />
      </div>

      <CornerAccent at="tl" />
    </section>
  );
}

// ── Requirements ──────────────────────────────────────────────────────────────
interface ReqCard {
  label: string;
  img: string;
  alt: string;
  desc: string;
}

const REQ_CARDS: ReqCard[] = [
  {
    label: "Hands on Drive",
    img: sparksImg,
    alt: "Welding sparks",
    desc: "Eager to build, test, and solve real engineering problems.",
  },
  {
    label: "Team Player",
    img: outsideImg,
    alt: "Team working together",
    desc: "We collaborate across disciplines and depend on each other.",
  },
  {
    label: "Willingness to Learn",
    img: weldImg,
    alt: "Student learning in shop",
    desc: "We'll teach CAD, machining, and engineering — bring curiosity.",
  },
  {
    label: "Any Major is Welcome",
    img: collabImg,
    alt: "Students at computers",
    desc: "Engineering, computer science, business, design — every skill has a place here.",
  },
];

const CARD_IDLE = {
  borderColor: "rgb(var(--tr-fg) / 0.1)",
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
      className="tr-on-dark relative overflow-hidden px-6 sm:px-10 md:px-16 py-20 md:py-28"
    >
      <img
        src={rqbgImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        style={{
          objectPosition: "center 60%",
          filter: "brightness(0.3) saturate(0.7)",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{ background: "rgba(0,0,0,0.72)" }}
      />
      <GridOverlay opacity={0.1} />
      <Glow
        color="rgba(255,210,0,0.16)"
        className="-right-32 -top-24"
        size={520}
      />
      <Glow
        color="rgba(195,0,0,0.2)"
        className="-left-40 bottom-0"
        size={460}
      />

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
            style={{
              ...bodyText,
              color: GOLD_TEXT,
              fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)",
            }}
          >
            No experience needed — just show up ready to work and learn.
          </p>
        </Reveal>

        <div className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {REQ_CARDS.map(({ label, img, alt, desc }, i) => (
            <Reveal
              key={label}
              show={inView}
              delay={0.45 + i * 0.1}
              className="h-full"
            >
              <article
                className="group h-full flex flex-col overflow-hidden"
                style={{
                  border: `1px solid ${CARD_IDLE.borderColor}`,
                  background: "rgb(var(--tr-fg) / 0.02)",
                  transition:
                    "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) =>
                  applyCardState(e.currentTarget, CARD_HOVER)
                }
                onMouseLeave={(e) => applyCardState(e.currentTarget, CARD_IDLE)}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3 / 2" }}
                >
                  <img
                    src={img}
                    alt={alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "saturate(0.85)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 45%, rgba(0,0,0,0.6) 100%)",
                    }}
                  />
                  <span
                    className="absolute top-3 left-3"
                    style={{
                      fontFamily: FONT_LABEL,
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      color: GOLD_TEXT,
                    }}
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
                  <p
                    style={{
                      ...bodyText,
                      fontSize: "clamp(0.85rem, 1vw, 1rem)",
                    }}
                  >
                    {desc}
                  </p>
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
    <section
      ref={ref}
      className="relative overflow-hidden bg-tr-ink px-[clamp(20px,5vw,80px)] py-[clamp(48px,7vw,96px)]"
    >
      <GridOverlay opacity={0.1} />
      <Glow color="rgba(195,0,0,0.28)" className="-left-24 top-10" size={420} />
      <Glow
        color="rgba(255,210,0,0.16)"
        className="-right-24 bottom-0"
        size={380}
      />

      {/* Centred two-column block: the expectations on the left, the image
          beside them on the right, vertically aligned to each other. */}
      <div className="relative z-10 mx-auto w-full max-w-[1180px]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal show={inView} delay={0.1}>
              <SectionLabel>Commitment</SectionLabel>
            </Reveal>
            <Reveal show={inView} delay={0.2}>
              <SectionHeading>What to expect</SectionHeading>
            </Reveal>
            <Reveal show={inView} delay={0.3} className="mt-5">
              <Rule />
            </Reveal>

            <ul className="mt-9 flex list-none flex-col gap-3">
              {COMMITMENT_BULLETS.map((item, i) => (
                <Reveal key={item} show={inView} delay={0.4 + i * 0.1}>
                  <li
                    className="flex items-center gap-4 py-2 pl-5 text-white transition-colors duration-300 hover:bg-white/[0.03]"
                    style={{
                      ...bodyText,
                      color: "var(--tr-text)",
                      fontSize: "clamp(0.9rem, 1.1vw, 1.1rem)",
                      borderLeft: `2px solid ${GOLD}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_LABEL,
                        fontSize: "0.7rem",
                        letterSpacing: "0.15em",
                        color: GOLD_TEXT,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal show={inView} delay={0.55}>
            <figure className="group relative m-0 overflow-hidden rounded-xl border border-white/[0.08]">
              <img
                src={driveImg}
                alt="A driver in helmet and race suit climbing into the car at night in the rain while teammates look on"
                loading="lazy"
                className="w-full object-cover transition-transform duration-[900ms] ease-[var(--tr-ease)] group-hover:scale-105"
                style={{ aspectRatio: "4 / 3", filter: "saturate(0.95)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 38%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              <figcaption className="absolute bottom-4 left-6 flex items-center gap-3">
                <span className="h-px w-8" style={{ background: GOLD }} />
                <span
                  className="uppercase"
                  style={{
                    fontFamily: FONT_LABEL,
                    fontSize: "0.62rem",
                    letterSpacing: "0.24em",
                    color: "rgb(var(--tr-fg) / 0.9)",
                  }}
                >
                  Late nights, all weather
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      <CornerAccent at="bl" />
    </section>
  );
}

// ── Teams ─────────────────────────────────────────────────────────────────────
interface TeamEntry {
  name: string;
  to: string;
  desc: string;
  meeting: string;
}

const TEAMS: TeamEntry[] = [
  {
    name: "Baja",
    to: "/baja",
    desc: "Terps Racing Baja SAE is an engineering project team that designs, builds, and races an off-road vehicle to compete in the SAE Collegiate Baja Design Series.",
    meeting:
      "Baja meets in J.M Patterson Hall 1225 on Tuesdays and Thursdays at 6:30 PM and Sundays at 11 AM",
  },
  {
    name: "Formula IC",
    to: "/ic",
    desc: "Terps Racing Formula SAE is an engineering project team that designs, builds, and races a formula style racecar to compete in the SAE Collegiate Formula Design Series.",
    meeting:
      "IC meets in J.M Patterson Hall 1225 on Mondays and Wednesdays at 5 PM and Saturdays at 10 AM",
  },
  {
    name: "Formula EV",
    to: "/ev",
    desc: "Founded in 2019, Terps Racing Formula SAE Electric is Terps Racing's newest branch, faced with a modern challenge: convert the classic formula-style experience into something sustainable and clean.",
    meeting:
      "EV meets in the Cypress Building from 6-8 PM on Mondays and Wednesdays",
  },
];

function Teams() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-tr-ink px-[clamp(20px,5vw,80px)] py-[clamp(48px,7vw,96px)]"
    >
      <Backdrop variant="carbon" fade intensity={0.7} />

      <div className="relative z-10 mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col items-center text-center">
          <Reveal show={inView} delay={0.1}>
            <SectionLabel>Teams</SectionLabel>
          </Reveal>
          <Reveal show={inView} delay={0.2}>
            <SectionHeading>Which team is right for you?</SectionHeading>
          </Reveal>
          <Reveal show={inView} delay={0.3} className="mt-5 mb-12">
            <Rule className="mx-auto w-32" />
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {TEAMS.map(({ name, to, desc, meeting }, i) => (
            <Reveal key={name} show={inView} delay={0.4 + i * 0.12}>
              <Link
                to={to}
                className="group flex h-full flex-col p-6"
                style={{
                  border: `1px solid ${CARD_IDLE.borderColor}`,
                  background: "rgb(var(--tr-fg) / 0.02)",
                  textDecoration: "none",
                  transition:
                    "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) =>
                  applyCardState(e.currentTarget, CARD_HOVER)
                }
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
                    style={{
                      fontFamily: FONT_LABEL,
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      color: GOLD_TEXT,
                    }}
                  >
                    VIEW TEAM →
                  </span>
                </div>

                <div
                  className="h-[3px] my-3"
                  style={{
                    width: "clamp(4rem, 10rem, 25rem)",
                    background: `linear-gradient(90deg, ${GOLD}, transparent)`,
                  }}
                />

                <p
                  className="flex-1"
                  style={{
                    ...bodyText,
                    fontSize: "clamp(0.88rem, 1.05vw, 1.05rem)",
                  }}
                >
                  {desc}
                </p>

                <div
                  className="flex items-start gap-3 mt-4"
                  style={{
                    ...bodyText,
                    fontSize: "clamp(0.82rem, 1vw, 0.98rem)",
                    color: "rgb(var(--tr-fg) / 0.7)",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-[0.5em]"
                    style={{ background: GOLD }}
                  />
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
      className="relative overflow-hidden bg-tr-ink px-6 sm:px-10 md:px-16 py-20 md:py-28 text-center"
    >
      <GridOverlay opacity={0.1} />
      <Glow
        color="rgba(195,0,0,0.28)"
        className="left-1/2 -translate-x-1/2 -bottom-48"
        size={640}
      />

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
            Just show up to a meeting
            <br />
            and <span style={{ color: GOLD_TEXT }}>start your engine</span>
          </h2>
        </Reveal>
        <Reveal show={inView} delay={0.4} className="mt-10 w-full">
          <div
            className="h-px w-40 mx-auto"
            style={{
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            }}
          />
        </Reveal>

        <Reveal show={inView} delay={0.55} className="mt-10">
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:terpsracing@umd.edu" className="tr-btn tr-btn-gold">
              Email the Team
            </a>
            <a
              href="https://www.instagram.com/terpsracing"
              target="_blank"
              rel="noopener noreferrer"
              className="tr-btn tr-btn-ghost"
            >
              Instagram
            </a>
            <Link to="/" className="tr-btn tr-btn-ghost">
              Back to Home
            </Link>
          </div>
        </Reveal>
      </div>

      <CornerAccent at="br" />
    </section>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function Members() {
  useSlipstream(true);

  return (
    <div className="bg-tr-ink text-white overflow-x-hidden">
      <NavBar />
      {/* Lean wraps content only — a transformed ancestor would become the
          containing block for the fixed navbar above. */}
      <div>
        <Hero />
        <Requirements />
        <Commitment />
        <Seam />
        <Teams />
        <Footer />
      </div>
    </div>
  );
}
