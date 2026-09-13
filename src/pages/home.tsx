import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import NavBar from "../components/navbar";
import FuelBanner from "~/components/fuelbanner";
import Paragraph from "~/components/paragraph";
import Reveal from "~/components/reveal";
import {
  MarqueeBand,
  Scene,
  useParallax,
  useSpotlight,
} from "~/components/cinematic";
import Backdrop, { Seam } from "~/components/backdrop";
import StartLights from "~/components/startlights";
import Gauge from "~/components/gauge";
import { useSlipstream } from "~/components/velocity";
import CountUp from "~/components/countup";
import { header2_style } from "~/siteInfo";

import logo from "../public/images/homePage/TR_logo.webp";
import hero_bg from "../public/images/homePage/hero_bg.webp";

import caraousel_1 from "../public/images/homePage/carousel/IC_car_zoom_in.webp";
import caraousel_2 from "../public/images/homePage/carousel/IC_car_zoom_in_sponsors.webp";
import caraousel_3 from "../public/images/homePage/carousel/racing_cones_2.webp";
import caraousel_4 from "../public/images/homePage/carousel/racing_cones_3.webp";
import caraousel_5 from "../public/images/homePage/carousel/racing_cones.webp";
import caraousel_6 from "../public/images/homePage/carousel/racer_head_shot.webp";

import design_image from "../public/images/homePage/design.webp";
import build_image from "../public/images/homePage/build.webp";
import test_image from "../public/images/homePage/test.webp";
import race_image from "../public/images/homePage/race.webp";
import ic_image from "../public/images/homePage/IC.webp";
import ev_image from "../public/images/homePage/EV.webp";
import baja_image from "../public/images/homePage/baja.webp";

const CAROUSEL = [
  caraousel_1,
  caraousel_2,
  caraousel_3,
  caraousel_4,
  caraousel_5,
  caraousel_6,
];

const ASSETS = {
  processDesign: design_image,
  processBuild: build_image,
  processTest: test_image,
  processRace: race_image,
  teamIC: ic_image,
  teamEV: ev_image,
  teamBaja: baja_image,
};

/* ── Marquee of team photography ─────────────────────────────────────────── */
function ImageTicker({ slides }: { slides: string[] }) {
  // Two copies back to back so the -50% translate loops seamlessly.
  const tiled = [...slides, ...slides];
  const boxRef = useRef<HTMLDivElement>(null);

  // Only animate the strip while it is on screen — it is a wide band of photos
  // and the cheapest win available is simply not moving it when unseen.
  useEffect(() => {
    const node = boxRef.current;
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
      ref={boxRef}
      className="tr-marquee relative overflow-hidden rounded-2xl border border-white/[0.07] bg-tr-surface"
      style={{ height: "clamp(200px, 30vw, 340px)" }}
    >
      <div
        className="tr-marquee-track h-full"
        style={{ ["--marquee-duration" as string]: `${slides.length * 7}s` }}
      >
        {tiled.map((src, i) => (
          <div
            key={i}
            className="group relative h-full overflow-hidden"
            style={{ width: "clamp(260px, 32vw, 460px)" }}
          >
            <img
              src={src}
              alt=""
              aria-hidden={i >= slides.length}
              className="h-full w-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
          </div>
        ))}
      </div>

      {/* Feather the edges into the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28"
        style={{
          background: "linear-gradient(90deg, var(--tr-ink), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28"
        style={{
          background: "linear-gradient(270deg, var(--tr-ink), transparent)",
        }}
      />
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  const { ref: heroRef, targetRef } = useParallax<HTMLElement>(0.28, {
    scale: 1.12,
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const enter = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(26px)",
    transition: `opacity 0.9s var(--tr-ease) ${delay}ms, transform 0.9s var(--tr-ease) ${delay}ms`,
  });

  return (
    <section
      ref={heroRef}
      className="tr-on-dark tr-grain tr-cam-bars relative overflow-hidden"
      style={{ minHeight: "100svh" }}
      aria-label="Terps Racing"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={hero_bg}
          ref={targetRef as React.RefObject<HTMLImageElement>}
          alt="Terps Racing car on track during a testing session"
          // `tr-cam-push` is the scroll-driven replacement for the parallax
          // above: same push-in, run by the compositor instead of a scroll
          // handler. Where the browser supports it, it wins (a CSS animation
          // beats the inline transform `useParallax` writes); where it does
          // not, the hook is still there doing the job.
          className="tr-cam-push h-full w-full object-cover object-center"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,8,10,0.72) 0%, rgba(8,8,10,0.34) 35%, rgba(8,8,10,0.72) 78%, var(--tr-ink) 100%)",
          }}
        />
        {/* Brand wash */}
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-80"
          style={{
            background:
              "radial-gradient(60% 55% at 18% 78%, rgba(226,24,51,0.6), transparent 65%), radial-gradient(50% 45% at 85% 20%, rgba(255,210,0,0.4), transparent 65%)",
          }}
        />
      </div>

      {/* Motion layers over the plate */}
      <Backdrop
        variant="aurora"
        embers={8}
        scanPass
        beams
        keylight
        keyPos={["34%", "22%"]}
        vignette={false}
        intensity={0.85}
      />
      <div
        aria-hidden="true"
        className="tr-bd-floor absolute inset-x-0 bottom-0 top-[58%] opacity-25"
        style={{ contain: "paint" }}
      />

      {/* Watermark logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute tr-float"
        style={{
          left: "50%",
          top: "34%",
          width: "clamp(150px, 34%, 440px)",
          transform: "translateX(-50%)",
          opacity: mounted ? 0.14 : 0,
          transition: "opacity 1.6s ease 400ms",
        }}
      >
        <img src={logo} alt="" className="w-full" />
      </div>

      {/* Copy */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-[clamp(72px,12vh,140px)] pt-[var(--tr-nav-h)]">
        {/* Dissolves as the hero leaves, so the shot changes rather than the
            copy simply sliding off the top of the screen. */}
        <div className="tr-shell tr-cam-fade">
          <div style={enter(120)}>
            <span className="tr-eyebrow">
              University of Maryland · Est. 1982
            </span>
          </div>

          <h1
            className="tr-mega mt-5 text-white"
            style={{ fontSize: "clamp(3.2rem, 13vw, 10.5rem)", ...enter(240) }}
          >
            <span className="tr-sweep tr-stamp block" data-text="Terps">
              Terps
            </span>
            <span className="tr-text-outline block">Racing</span>
          </h1>

          <div
            className="mt-6 max-w-[52ch] text-white/75"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.98rem, 1.7vw, 1.2rem)",
              lineHeight: 1.7,
              ...enter(420),
            }}
          >
            Three cars. One hundred and twenty students. We design, build, test
            and race formula and off-road vehicles against the best programs in
            the world.
          </div>

          <div className="mt-9 flex flex-wrap gap-3" style={enter(560)}>
            <Link to="/members" className="tr-btn tr-btn-gold">
              Join the Team
            </Link>
            <a href="#teams" className="tr-btn tr-btn-ghost">
              Meet the Teams
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
        style={{ opacity: mounted ? 1 : 0, transition: "opacity 1s ease 1.1s" }}
      >
        <div className="relative h-11 w-6 overflow-hidden rounded-full border border-white/25">
          <span
            className="absolute left-1/2 top-2 h-2 w-[3px] -translate-x-1/2 rounded-full bg-tr-gold"
            style={{ animation: "tr-scroll-hint 2.2s var(--tr-ease) infinite" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ── Stats ───────────────────────────────────────────────────────────────── */
const STATS = [
  {
    value: 120,
    suffix: "+",
    label: "Active members",
    dial: 0.8,
    color: "var(--tr-gold-line)",
  },
  {
    value: 60,
    suffix: "+",
    label: "Races entered",
    dial: 0.66,
    color: "var(--tr-red-ink)",
  },
  {
    value: 3,
    suffix: "",
    label: "Cars a year",
    dial: 0.3,
    color: "var(--tr-gold-line)",
  },
  {
    value: 1982,
    suffix: "",
    label: "Founded",
    dial: 0.95,
    color: "var(--tr-red-ink)",
    raw: true,
  },
];

function StatsBar() {
  return (
    <section
      className="relative overflow-hidden border-y border-white/[0.07] bg-tr-surface"
      aria-label="By the numbers"
    >
      <Backdrop variant="carbon" vignette={false} intensity={0.75} />

      {/* Dashboard strip */}
      <div className="tr-shell relative z-10 grid grid-cols-2 gap-y-8 py-[clamp(36px,5vw,68px)] md:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            variant="scale"
            delay={i * 110}
            className="flex flex-col items-center text-center"
          >
            <Gauge
              value={stat.dial}
              color={stat.color}
              label={stat.label}
              size={172}
            >
              <span
                className="tr-mega text-white"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
                  lineHeight: 1,
                }}
              >
                {stat.raw ? (
                  stat.value
                ) : (
                  <CountUp value={stat.value} suffix={stat.suffix} />
                )}
              </span>
            </Gauge>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── About ───────────────────────────────────────────────────────────────── */
const RESULTS_2025 = [
  ["25th", "Overall — top 20%"],
  ["11th", "Design"],
  ["12th", "Cost"],
  ["8th", "Business"],
  ["24th", "Acceleration"],
  ["21st", "Skidpad"],
  ["25th", "Autocross"],
];

function AboutSection() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      id="about"
      aria-labelledby="about-title"
    >
      <Backdrop variant="aurora" beams fade intensity={0.62} />
      <div className="tr-shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Scene
              id="about-title"
              eyebrow="Who we are"
              title="From Blueprint to Podium"
              ghost="About"
            />
            <Paragraph text="Founded in 1982, Terps Racing is the University of Maryland's premier collegiate motorsports program — over 120 driven engineers who design, build and race three high-performance vehicles each season: Formula IC, Formula Electric and Baja SAE." />
            <Paragraph
              delay={100}
              text="We fuse academic theory with hands-on grit, giving students real-world experience in CAD, FEA, CFD, fabrication and dynamic testing. Every vehicle is designed and manufactured entirely by students, then proven in national SAE competitions across acceleration, skidpad, autocross and endurance."
            />
            <Reveal variant="up" delay={120}>
              <Link to="/members" className="tr-btn tr-btn-gold">
                New Members
              </Link>
            </Reveal>
          </div>

          {/* Results card */}
          <Reveal variant="left" delay={140}>
            <div className="tr-card tr-card-glow h-full p-7">
              <span className="tr-eyebrow">2025 Formula SAE</span>
              <h3
                className="mt-3 mb-6 uppercase text-white"
                style={{
                  ...header2_style,
                  fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                }}
              >
                Competitive Success
              </h3>
              <ul className="flex flex-col">
                {RESULTS_2025.map(([place, what], i) => (
                  <li
                    key={what}
                    className="flex items-baseline justify-between gap-4 border-b border-white/[0.07] py-2.5 last:border-b-0 transition-colors hover:bg-white/[0.03]"
                    style={{
                      opacity: 0,
                      animation: `tr-fade-up 0.6s var(--tr-ease) ${
                        300 + i * 70
                      }ms forwards`,
                    }}
                  >
                    <span
                      className="text-tr-gold"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.35rem",
                      }}
                    >
                      {place}
                    </span>
                    <span
                      className="text-right text-white/60"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.92rem",
                      }}
                    >
                      {what}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* The photo strip arrives behind a raked curtain that slides off it,
            rather than fading up — it is the one full-width image in the
            section and it can carry the bigger entrance. */}
        <Reveal variant="wipe" delay={100} className="mt-14 block">
          <ImageTicker slides={CAROUSEL} />
        </Reveal>
      </div>
    </section>
  );
}

/* ── Process ─────────────────────────────────────────────────────────────── */
const PROCESS_STEPS = [
  {
    word: "Design",
    img: ASSETS.processDesign,
    alt: "Design phase — engineers reviewing CAD models",
    description:
      "Sketch concepts, brainstorm innovations and set the season's performance targets. Full CAD models of the chassis, suspension, powertrain and aero package are built and then validated with FEA and CFD before a single part is cut.",
  },
  {
    word: "Build",
    img: ASSETS.processBuild,
    alt: "Build phase — students fabricating car parts",
    description:
      "Fabricate custom parts in-house using CNC machining, composite layup and welding. Every component on the car is manufactured by students in the Clark School shops.",
  },
  {
    word: "Test",
    img: ASSETS.processTest,
    alt: "Test phase — car undergoing performance testing",
    description:
      "Run test days to push the car to its limits, gather telemetry and tune performance. Real data from real laps drives every iteration — tufting, pressure taps, flow-visualisation and coast-down testing validate what the simulations predicted.",
  },
  {
    word: "Race",
    img: ASSETS.processRace,
    alt: "Race phase — Terps Racing competing at an SAE event",
    description:
      "Race head-to-head at national SAE events across static and dynamic disciplines — design, cost and business presentations alongside acceleration, skidpad, autocross and endurance.",
  },
];

function Process() {
  const [selectedStep, setSelectedStep] = useState<
    (typeof PROCESS_STEPS)[number] | null
  >(null);

  return (
    <>
      <section
        className="tr-section relative overflow-hidden"
        id="process"
        aria-labelledby="process-title"
      >
        <Backdrop variant="speed" fade intensity={0.55} />
        <div className="tr-shell relative z-10">
          <Scene
            id="process-title"
            eyebrow="How a car gets made"
            title="The Process"
            ghost="Process"
          />

          <div className="flex flex-col gap-3">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.word} variant="up" delay={i * 90}>
                <button
                  type="button"
                  onClick={() => setSelectedStep(step)}
                  aria-label={`Read about the ${step.word} phase`}
                  className="tr-on-dark tr-headlight group relative block w-full cursor-pointer rounded-[clamp(16px,3vw,32px)] border border-white/[0.07] transition-[border-color,transform] duration-500 hover:border-white/25"
                  style={{ height: "clamp(100px,14vw,182px)" }}
                >
                  <span className="tr-checker" aria-hidden="true" />
                  <img
                    src={step.img}
                    alt={step.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--tr-ease)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-tr-ink/45 transition-colors duration-500 group-hover:bg-tr-ink/25" />

                  {/* Index */}
                  <span
                    className="absolute left-[clamp(18px,3vw,40px)] top-1/2 -translate-y-1/2 text-white/35 transition-colors duration-500 group-hover:text-tr-gold"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "clamp(0.7rem,1.2vw,0.85rem)",
                    }}
                  >
                    0{i + 1}
                  </span>

                  <span
                    className="tr-display absolute inset-0 flex items-center justify-center text-transparent transition-all duration-500"
                    style={{
                      fontSize: "clamp(1.9rem, 6.5vw, 4.6rem)",
                      WebkitTextStroke: "2px rgb(var(--tr-fg) / 0.95)",
                    }}
                  >
                    {step.word}
                  </span>

                  {/* Fill-on-hover overlay */}
                  <span
                    aria-hidden="true"
                    className="tr-display absolute inset-0 flex items-center justify-center text-tr-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ fontSize: "clamp(1.9rem, 6.5vw, 4.6rem)" }}
                  >
                    {step.word}
                  </span>

                  {/* Bottom sweep */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-700 ease-[var(--tr-ease)] group-hover:scale-x-100"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--tr-red), var(--tr-gold))",
                    }}
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {selectedStep && (
        <ProcessPopup
          step={selectedStep}
          onClose={() => setSelectedStep(null)}
        />
      )}
    </>
  );
}

function ProcessPopup({
  step,
  onClose,
}: {
  step: (typeof PROCESS_STEPS)[number];
  onClose: () => void;
}) {
  // Escape to dismiss, and keep the page from scrolling behind the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${step.word} phase`}
    >
      <div
        className="tr-on-dark absolute inset-0 bg-tr-ink/85 backdrop-blur-md"
        style={{ animation: "tr-fade-up 0.3s ease forwards" }}
      />

      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-tr-surface shadow-[var(--tr-shadow-lg)]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "tr-fade-up 0.5s var(--tr-ease) forwards" }}
      >
        <div className="relative h-[220px] sm:h-[320px]">
          <img
            src={step.img}
            alt={step.alt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tr-surface via-black/25 to-transparent" />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-tr-ink/60 text-2xl leading-none text-white transition-all duration-300 hover:rotate-90 hover:bg-tr-ink/85"
            aria-label="Close"
          >
            ×
          </button>

          <h2
            className="tr-display absolute bottom-5 left-6 text-white sm:left-8"
            style={{ fontSize: "clamp(2.4rem,7vw,4rem)", fontStyle: "italic" }}
          >
            {step.word}
          </h2>
        </div>

        <div className="p-6 sm:p-8">
          <span className="tr-rule mb-5" />
          <p
            className="text-white/70"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.02rem",
              lineHeight: 1.75,
            }}
          >
            {step.description}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ── Teams ───────────────────────────────────────────────────────────────── */
const TEAMS = [
  {
    id: "formula-ic",
    name: "Formula IC",
    to: "/ic",
    img: ASSETS.teamIC,
    alt: "Terps Racing Formula IC car on track",
    desc: "A top-class team with a thoroughly validated aerodynamic package and a lightweight, high-strength carbon fibre composite chassis.",
    accent: "#e21833",
    tag: "Combustion",
  },
  {
    id: "ev",
    name: "EV",
    to: "/ev",
    img: ASSETS.teamEV,
    alt: "Terps Racing EV formula electric car on track",
    desc: "Founded in 2019, Terps Racing Formula SAE Electric faces a modern challenge: convert the classic formula-style experience into something sustainable and clean.",
    accent: "#ffd200",
    tag: "Electric",
  },
  {
    id: "baja",
    name: "Baja",
    to: "/baja",
    img: ASSETS.teamBaja,
    alt: "Terps Racing Baja off-road vehicle navigating rough terrain",
    desc: "An engineering project team that designs, builds and races an off-road vehicle in the SAE Collegiate Baja Design Series.",
    accent: "var(--tr-amber)",
    tag: "Off-road",
  },
];

function Teams() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      id="teams"
      aria-labelledby="teams-title"
    >
      <Backdrop variant="floor" fade intensity={0.7} />
      <div className="tr-shell relative z-10">
        <Scene eyebrow="Three programs" title="The Teams" ghost="Teams" />
        <Paragraph text="Terps Racing is made up of four teams: Formula SAE, Formula SAE Electric, Baja SAE, and a Business Operations Team. Formula SAE and Formula SAE Electric challenge students to design, build and race a formula-style race car. Baja SAE has a similar structure, but the goal is an off-road vehicle that will survive the punishment of rough terrain." />

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAMS.map((team, i) => (
            <TeamCard key={team.id} team={team} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  team,
  index,
}: {
  team: (typeof TEAMS)[number];
  index: number;
}) {
  const { ref, onMouseMove } = useSpotlight<HTMLAnchorElement>();

  return (
    <Reveal variant="tilt" delay={index * 130}>
      <Link
        ref={ref}
        onMouseMove={onMouseMove}
        to={team.to}
        className="tr-card tr-card-glow tr-spotlight tr-headlight group flex h-full flex-col"
        aria-label={`${team.name} team`}
      >
        <div
          className="tr-gleam relative w-full overflow-hidden"
          style={{ aspectRatio: "16/10" }}
        >
          <img
            src={team.img}
            alt={team.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--tr-ease)] group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tr-surface-2 via-transparent to-transparent" />
          <span
            className="absolute left-4 top-4 rounded-full px-3 py-1 text-[0.66rem] uppercase tracking-[0.18em] backdrop-blur"
            style={{
              fontFamily: "var(--font-mono)",
              background: "rgba(0,0,0,0.55)",
              color: team.accent,
              border: `1px solid ${team.accent}44`,
            }}
          >
            {team.tag}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3
            className="tr-display mb-3 text-white transition-colors duration-300"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700 }}
          >
            {team.name}
          </h3>
          <p
            className="mb-6 flex-1 text-white/60"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.65,
            }}
          >
            {team.desc}
          </p>
          <span
            className="inline-flex items-center gap-2 text-[0.82rem] uppercase tracking-[0.14em] transition-all duration-300 group-hover:gap-3.5"
            style={{ fontFamily: "var(--font-mono)", color: team.accent }}
          >
            Learn more
            <span aria-hidden="true">→</span>
          </span>
        </div>

        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-700 ease-[var(--tr-ease)] group-hover:scale-x-100"
          style={{ background: team.accent }}
        />
      </Link>
    </Reveal>
  );
}

/* ── History ─────────────────────────────────────────────────────────────── */
function History() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      id="history"
      aria-labelledby="history-title"
    >
      <Backdrop variant="flag" fade intensity={0.8} />
      <div className="tr-shell relative z-10 max-w-[900px]">
        <Scene
          id="history-title"
          eyebrow="Since 1982"
          title="History"
          ghost="1982"
          center
        />
        <Paragraph
          className="!max-w-none text-center"
          text="At Maryland, Terps Racing is one of the most popular student projects in both the Department of Mechanical Engineering and the A. James Clark School of Engineering. Established in 1982, Terps Racing has participated in over 60 races. The program allows students to develop fabrication, project management and teamwork skills."
        />
      </div>
    </section>
  );
}

/* ── CTA ─────────────────────────────────────────────────────────────────── */
function SponsorBand() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      aria-labelledby="sponsor-band-title"
    >
      <Backdrop
        variant="hud"
        corners
        cornerColor="var(--tr-gold)"
        fade
        intensity={0.8}
      />
      <div className="tr-shell relative z-10 max-w-[900px] text-center">
        <Scene
          id="sponsor-band-title"
          eyebrow="Partner with us"
          title="Fuel the Future"
          ghost="Sponsor"
          center
        >
          <p
            className="mx-auto mb-9 max-w-[62ch] text-white/70"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem,1.6vw,1.12rem)",
              lineHeight: 1.75,
            }}
          >
            Maryland gives us lab and shop space. Everything else — parts,
            manufacturing and travel to competition — is funded by sponsors
            and donors. Partners get their logo on the cars, r\u00e9sum\u00e9
            book access and a front-row seat to what these students build.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/sponsors" className="tr-btn tr-btn-gold">
              Sponsorship Tiers
            </Link>
            <a
              href="mailto:terpsracing@umd.edu"
              className="tr-btn tr-btn-ghost"
            >
              Get in Touch
            </a>
          </div>
        </Scene>
      </div>
    </section>
  );
}

function CtaRow() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(120deg, #ffd200 0%, #ffe14a 50%, #ffd200 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #000 0 14px, transparent 14px 40px)",
        }}
      />
      <div className="tr-shell relative z-10 flex flex-col items-center gap-6 py-[clamp(40px,6vw,72px)] text-center">
        <Reveal variant="up">
          <h2
            className="tr-mega tr-stamp tr-stamp-dark text-black"
            data-text="Build something fast"
            style={{ fontSize: "clamp(2.1rem, 6.5vw, 4.2rem)" }}
          >
            Build something fast
          </h2>
        </Reveal>
        <Reveal variant="up" delay={110}>
          <p
            className="max-w-[52ch] text-black/70"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem,1.6vw,1.08rem)",
            }}
          >
            No experience required — just curiosity and a willingness to get
            your hands dirty.
          </p>
        </Reveal>
        <Reveal variant="up" delay={220}>
          <Link
            to="/members"
            className="tr-btn tr-btn-dark !px-[clamp(28px,6vw,60px)] !py-3"
            style={{
              fontFamily: "'Goldman', var(--font-mono)",
              fontSize: "clamp(0.9rem, 1.8vw, 1.2rem)",
            }}
          >
            Join Us
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      className="tr-on-dark relative overflow-hidden bg-tr-ink"
      id="contact"
      role="contentinfo"
    >
      <FuelBanner />

      <div className="tr-shell flex flex-col items-center gap-5 border-t border-white/[0.07] py-9 text-center sm:flex-row sm:justify-between sm:text-left">
        <img src={logo} alt="Terps Racing" className="h-10 w-auto opacity-80" />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              ["Formula IC", "/ic"],
              ["EV", "/ev"],
              ["Baja", "/baja"],
              ["Gallery", "/gallery"],
              ["Sponsors", "/sponsors"],
              ["Join Us", "/members"],
            ].map(([label, to]) => (
              <li key={label}>
                <Link
                  to={to}
                  className="tr-link text-[0.85rem] text-white/55 transition-colors hover:text-white"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p
          className="text-[0.75rem] text-white/55"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          © {new Date().getFullYear()} Terps Racing
        </p>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Home() {
  useSlipstream(true);

  return (
    <div className="min-h-screen overflow-x-hidden bg-tr-ink text-white">
      <StartLights />
      <NavBar />
      <main>
        <Hero />
        <StatsBar />
        <AboutSection />
        <Process />
        <Teams />
        <Seam />
        <MarqueeBand
          items={[
            "Design",
            "Build",
            "Test",
            "Race",
            "Built Not Bought",
            "Fear the Turtle",
          ]}
          duration={40}
        />
        <History />
        <Seam />
        <SponsorBand />
      </main>
      <CtaRow />
      <Footer />
    </div>
  );
}
