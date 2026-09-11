import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NavBar from "~/components/navbar";
import Reveal from "~/components/reveal";
import CountUp from "~/components/countup";
import Backdrop, { Seam } from "~/components/backdrop";
import { useSlipstream, useSpeedLean } from "~/components/velocity";
import { Words, useParallax, useSpotlight } from "~/components/cinematic";

import bajaHero from "../public/images/homePage/baja.webp";

import BajaSponsorKenesto from "../public/images/baja/sponsors/Platinum/KenestoPNG.webp";
import BajaSponsorViveLab from "../public/images/baja/sponsors/Gold/vivelab-blue-bottom-grey-slogan-SVG.svg";
import BajaSponsorDewalt from "../public/images/baja/sponsors/Silver/dewalt-logo.webp";
import BajaSponsorPrecision from "../public/images/baja/sponsors/Bronze/precision.jpg.webp";
import BajaSponsorKodiak from "../public/images/baja/sponsors/Bronze/kodiak.webp";
import BajaSponsorGMN from "../public/images/baja/sponsors/Bronze/GMN-Logo-Stacked-Blue-Text-Transparent.webp";
import BajaSponsorASCo from "../public/images/baja/sponsors/Bronze/American-Stripping-Company-Logo.webp";
import BajaSponsorEandD from "../public/images/baja/sponsors/Bronze/e-and-d-auto-cropped.webp";

// ── Types ─────────────────────────────────────────────────────────────────────
type AccordionBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };
interface AccordionItem {
  title: string;
  body: AccordionBlock[];
}
interface EventItem {
  name: string;
  desc: string;
}
interface StaticCard {
  img: string;
  alt: string;
  title: string;
  desc: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const ACCORDION_ITEMS: AccordionItem[] = [
  {
    title: "Design Process",
    body: [
      {
        type: "p",
        text: "The design process goes through three stages of review before the final design is chosen:",
      },
      {
        type: "ul",
        items: ["Preliminary Review", "Critical Review", "Final Review"],
      },
      {
        type: "p",
        text: "The team also modifies older cars to test new designs on prior years' vehicles. Following the final review, the team moves into the build phase, continually innovating and redesigning even the smallest components.",
      },
    ],
  },
  {
    title: "Competition Challenge",
    body: [
      {
        type: "p",
        text: "The competition requires students to balance design and cost with dynamic performance while following strict safety guidelines and standardized rules.",
      },
      {
        type: "p",
        text: "The team balances hard work with a passion for their car and believes that passion makes a significant difference in the competition.",
      },
    ],
  },
];

const DYNAMIC_EVENTS: EventItem[] = [
  {
    name: "Time Trials",
    desc: "Teams compete individually on the third day in time-trial events that test specific aspects of vehicle performance.",
  },
  {
    name: "Specialized Performance",
    desc: "Often focuses on suspension, traction, or rock crawling — pushing teams to adapt to different terrain and design demands.",
  },
  {
    name: "Endurance Race",
    desc: "On the final day, all teams compete wheel-to-wheel in a four-hour endurance race testing durability, reliability, and overall performance.",
  },
];

const STATIC_CARDS: StaticCard[] = [
  {
    img: "https://racing.umd.edu/files/2026/03/sales_presentation-e1775000595550.png",
    alt: "Sales Presentation",
    title: "Sales Presentation",
    desc: "Teams market their car as a highly specialized vehicle to a series of industry judges.",
  },
  {
    img: "https://racing.umd.edu/files/2026/03/design_presentation.png",
    alt: "Design Presentation",
    title: "Design Presentation",
    desc: "Teams present the design, research, and testing done throughout the year to technical judges.",
  },
  {
    img: "https://racing.umd.edu/files/2026/04/technical_inspection-1-e1775005735832.png",
    alt: "Technical Inspection",
    title: "Technical Inspection",
    desc: "Judges inspect every aspect of the car to make sure it meets competition rules and specifications.",
  },
  {
    img: "https://racing.umd.edu/files/2026/04/talking0-2.png",
    alt: "Design Judging",
    title: "Design Judging",
    desc: "Teams explain what separates their car, what testing drove decisions, and highlight innovations.",
  },
];

const GALLERY_IMGS = [
  {
    src: "https://racing.umd.edu/files/2024/06/IMG_6908-1.jpg",
    alt: "Baja team",
  },
  {
    src: "https://racing.umd.edu/files/2026/03/anjali-picture.jpg",
    alt: "Team member",
  },
  {
    src: "https://racing.umd.edu/files/2026/04/Team-Picture.jpg",
    alt: "Team picture",
  },
  {
    src: "https://racing.umd.edu/files/2026/03/kenesto.jpg",
    alt: "Competition",
  },
  {
    src: "https://racing.umd.edu/files/2024/06/Ben-loan-killing-it.jpg",
    alt: "Driver",
  },
];

// ── Accordion ─────────────────────────────────────────────────────────────────
function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="border-t border-white/[0.09]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title} className="border-b border-white/[0.09]">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-4 text-left uppercase transition-colors duration-300 ${
                isOpen ? "text-white" : "text-white/60 hover:text-white"
              }`}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1rem, 1.9vw, 1.22rem)",
                letterSpacing: "-0.01em",
              }}
            >
              {item.title}
              <span
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-[1.1rem] leading-none transition-transform duration-400 ease-[var(--tr-ease)]"
                style={{
                  borderColor: BAJA_RED,
                  color: BAJA_RED,
                  transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <div
              className="grid transition-[grid-template-rows,opacity] duration-[420ms] ease-[var(--tr-ease)]"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div
                className="overflow-hidden text-white/60"
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                  lineHeight: 1.75,
                  paddingBottom: isOpen ? 18 : 0,
                  transition: "padding 420ms var(--tr-ease)",
                }}
              >
                {item.body.map((block, bi) => {
                  const spacing =
                    bi < item.body.length - 1 ? "mb-3" : undefined;
                  return block.type === "ul" ? (
                    <ul
                      key={bi}
                      className={`flex flex-col gap-1.5 ${spacing ?? ""}`}
                    >
                      {block.items.map((li, li_i) => (
                        <li key={li_i} className="flex items-center gap-3">
                          <span
                            className="h-px w-5 flex-shrink-0"
                            style={{ background: BAJA_AMBER }}
                          />
                          {li}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={bi} className={spacing}>
                      {block.text}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Shared bits ───────────────────────────────────────────────────────────────
const BAJA_RED = "#e31933";
const BAJA_AMBER = "#e8a010";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Reveal variant="up">
      <span className="tr-eyebrow" style={{ color: BAJA_AMBER }}>
        {children}
      </span>
    </Reveal>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  const { ref, targetRef } = useParallax<HTMLElement>(0.26, { scale: 1.16 });

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const enter = (d: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(26px)",
    transition: `opacity .9s var(--tr-ease) ${d}ms, transform .9s var(--tr-ease) ${d}ms`,
  });

  return (
    <section
      ref={ref}
      className="tr-grain relative flex items-end overflow-hidden"
      style={{ minHeight: "92svh" }}
      aria-label="Terps Racing Baja"
    >
      <div className="absolute inset-0">
        <img
          src={bajaHero}
          ref={targetRef as React.RefObject<HTMLImageElement>}
          alt="The Terps Racing Baja vehicle on rough terrain"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,8,10,0.78) 0%, rgba(8,8,10,0.3) 34%, rgba(8,8,10,0.8) 74%, var(--tr-ink) 100%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(58% 52% at 20% 78%, rgba(232,160,16,0.65), transparent 66%), radial-gradient(44% 40% at 84% 20%, rgba(227,25,51,0.5), transparent 66%)",
          }}
        />
      </div>

      <Backdrop
        variant="terrain"
        embers={10}
        emberColor={BAJA_AMBER}
        vignette={false}
        intensity={0.9}
      />

      <div className="tr-shell relative z-10 pb-[clamp(56px,10vh,120px)] pt-[calc(var(--tr-nav-h)+48px)]">
        <div style={enter(120)}>
          <span className="tr-eyebrow" style={{ color: BAJA_AMBER }}>
            SAE Collegiate Baja Design Series
          </span>
        </div>

        <h1
          className="tr-mega mt-5 text-white"
          style={{ fontSize: "clamp(3.2rem, 14vw, 11rem)", ...enter(240) }}
        >
          <span className="tr-sweep tr-stamp block">Baja</span>
          <span className="tr-text-outline block">SAE</span>
        </h1>

        <p
          className="mt-6 max-w-[54ch] text-white/75"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.98rem, 1.8vw, 1.2rem)",
            lineHeight: 1.7,
            ...enter(420),
          }}
        >
          One car, built from nothing, to survive four hours of mud, rock and
          whoops against hundreds of teams. Designed, welded and driven by
          students.
        </p>

        <div className="mt-9 flex flex-wrap gap-3" style={enter(560)}>
          <Link to="/members" className="tr-btn tr-btn-gold">
            Join Baja
          </Link>
          <a href="#what-we-do" className="tr-btn tr-btn-ghost">
            What We Do
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="tr-rail absolute bottom-0 left-[clamp(20px,5vw,80px)] hidden h-24 sm:block"
      />
    </section>
  );
}

// ── Stats band ────────────────────────────────────────────────────────────────
const BAJA_STATS = [
  { value: 40, suffix: "+", label: "Students each year" },
  { value: 3, suffix: "", label: "North American competitions" },
  { value: 4, suffix: " hr", label: "Wheel-to-wheel endurance race" },
  { value: 100, suffix: "s", label: "Teams on the grid" },
];

function StatsBand() {
  return (
    <section
      className="relative overflow-hidden border-y border-white/[0.08] bg-tr-surface"
      aria-label="Baja by the numbers"
    >
      <Backdrop variant="carbon" vignette={false} intensity={0.8} />
      <div className="tr-shell relative z-10 grid grid-cols-2 gap-y-10 py-[clamp(36px,5vw,64px)] md:grid-cols-4">
        {BAJA_STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            variant="up"
            delay={i * 90}
            className="flex flex-col items-center text-center"
          >
            <span
              className="tr-display"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
                color: BAJA_AMBER,
              }}
            >
              <CountUp value={stat.value} suffix={stat.suffix} />
            </span>
            <span
              className="mt-2 max-w-[16ch] text-white/55"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(0.64rem, 1.2vw, 0.74rem)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                lineHeight: 1.5,
              }}
            >
              {stat.label}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── What We Do ────────────────────────────────────────────────────────────────
const WHAT_WE_DO_FACTS = [
  { k: ">40", v: "students get hands-on engineering every year" },
  { k: "3", v: "North American competitions against hundreds of teams" },
];

function WhatWeDo() {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <section
      id="what-we-do"
      className="tr-section relative overflow-hidden"
      aria-labelledby="what-we-do-title"
    >
      <Backdrop variant="terrain" fade intensity={0.85} />

      <div className="tr-shell relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Eyebrow>The team</Eyebrow>
            <Words
              as="h2"
              id="what-we-do-title"
              text="What We Do"
              delay={90}
              className="tr-h2 mt-3 text-white"
              style={{ fontSize: "clamp(1.9rem, 4.6vw, 3.2rem)" }}
            />
            <Reveal variant="rule" delay={260} className="mb-7 mt-5 block">
              <span className="tr-rule" />
            </Reveal>

            <Reveal variant="up" delay={200}>
              <p
                className="max-w-[52ch] text-white/70"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.98rem, 1.6vw, 1.15rem)",
                  lineHeight: 1.75,
                }}
              >
                Terps Racing Baja SAE is an engineering project team that
                designs, builds and races an off-road vehicle to compete in the
                SAE Collegiate Baja Design Series.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {WHAT_WE_DO_FACTS.map((fact, i) => (
                <Reveal key={fact.k} variant="up" delay={i * 110}>
                  <div
                    className="h-full border-l-2 pl-4"
                    style={{ borderColor: BAJA_RED }}
                  >
                    <span
                      className="tr-display block"
                      style={{
                        color: BAJA_RED,
                        fontSize: "clamp(1.8rem,4vw,2.6rem)",
                      }}
                    >
                      {fact.k}
                    </span>
                    <span
                      className="mt-1 block text-white/60"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.92rem",
                        lineHeight: 1.55,
                      }}
                    >
                      {fact.v}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal variant="left" delay={160}>
            <div
              ref={ref}
              onMouseMove={onMouseMove}
              className="tr-card tr-spotlight p-6 sm:p-8"
            >
              <div className="relative z-10">
                <span
                  className="mb-5 block text-[0.66rem] uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.22em",
                    color: BAJA_AMBER,
                  }}
                >
                  How the car gets made
                </span>
                <Accordion items={ACCORDION_ITEMS} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Dynamic Events ────────────────────────────────────────────────────────────
function DynamicEvents() {
  const { ref, targetRef } = useParallax<HTMLElement>(0.14, { scale: 1.16 });

  return (
    <section
      ref={ref}
      className="tr-grain relative overflow-hidden"
      aria-labelledby="dynamic-title"
    >
      <div className="absolute inset-0">
        <img
          src="https://racing.umd.edu/files/2026/04/Untitled-design.png"
          ref={targetRef as React.RefObject<HTMLImageElement>}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(8,8,10,0.86)" }}
        />
      </div>
      <Backdrop variant="terrain" vignette={false} intensity={0.5} />

      <div className="tr-shell relative z-10 py-[clamp(52px,8vw,120px)]">
        <div className="mb-12 max-w-[60ch]">
          <Eyebrow>On the course</Eyebrow>
          <Words
            as="h2"
            id="dynamic-title"
            text="Dynamic Events"
            delay={90}
            className="tr-h2 mt-3 text-white"
            style={{ fontSize: "clamp(1.9rem, 4.6vw, 3.2rem)" }}
          />
          <Reveal variant="up" delay={300}>
            <p
              className="mt-5 text-white/70"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.96rem, 1.6vw, 1.1rem)",
                lineHeight: 1.75,
              }}
            >
              Cars take on manoeuvrability, acceleration, hill climb or tractor
              pull, and a special event unique to each competition.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px bg-white/[0.09] md:grid-cols-3">
          {DYNAMIC_EVENTS.map(({ name, desc }, i) => (
            <Reveal key={name} variant="up" delay={i * 130}>
              <div className="tr-headlight group relative h-full bg-tr-ink p-7 transition-colors duration-500 hover:bg-white/[0.035]">
                <span
                  className="tr-display block text-white/10 transition-colors duration-500 group-hover:text-white/20"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 4rem)" }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="mb-3 mt-2 uppercase"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
                    color: BAJA_RED,
                  }}
                >
                  {name}
                </h3>
                <p
                  className="text-white/60"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                  }}
                >
                  {desc}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-700 ease-[var(--tr-ease)] group-hover:scale-x-100"
                  style={{
                    background: `linear-gradient(90deg, ${BAJA_RED}, ${BAJA_AMBER})`,
                  }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Static Events ─────────────────────────────────────────────────────────────
function StaticEvents() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      aria-labelledby="static-title"
    >
      <Backdrop variant="terrain" fade intensity={0.75} />

      <div className="tr-shell relative z-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-white/[0.09] pb-6">
          <div>
            <Eyebrow>Off the course</Eyebrow>
            <Words
              as="h2"
              id="static-title"
              text="Static Events"
              delay={90}
              className="tr-h2 mt-3 text-white"
              style={{ fontSize: "clamp(1.9rem, 4.6vw, 3.2rem)" }}
            />
          </div>
          <Reveal variant="up" delay={200}>
            <p
              className="max-w-[40ch] text-white/55"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.96rem",
                lineHeight: 1.7,
              }}
            >
              Half the points are won before the car turns a wheel — in front of
              judges, not on the track.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATIC_CARDS.map(({ img, alt, title, desc }, i) => (
            <Reveal key={title} variant="up" delay={i * 110}>
              <article className="tr-headlight group relative flex h-full flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] transition-all duration-500 ease-[var(--tr-ease)] hover:-translate-y-1.5 hover:border-white/20">
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={img}
                    alt={alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--tr-ease)] group-hover:scale-[1.07]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, rgba(8,8,10,0.9) 100%)",
                    }}
                  />
                  <span
                    className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[0.6rem] uppercase backdrop-blur"
                    style={{
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.16em",
                      background: "rgba(0,0,0,0.55)",
                      color: BAJA_AMBER,
                      border: `1px solid ${BAJA_AMBER}44`,
                    }}
                  >
                    0{i + 1}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3
                    className="mb-2 uppercase"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                      color: BAJA_RED,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-white/60"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      lineHeight: 1.65,
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

// ── Gallery ───────────────────────────────────────────────────────────────────
function Gallery() {
  const [pos, setPos] = useState(0);
  const [perView, setPerView] = useState(4);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w <= 560 ? 1 : w <= 860 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const max = Math.max(GALLERY_IMGS.length - perView, 0);

  const move = (dir: number) => {
    setPos((p) => {
      const next = p + dir;
      if (next > max) return 0;
      if (next < 0) return max;
      return next;
    });
  };

  return (
    <section
      className="tr-section relative overflow-hidden"
      aria-labelledby="gallery-title"
    >
      <Backdrop variant="darkroom" fade />

      <div className="tr-shell relative z-10">
        <div className="mb-8 flex items-center gap-5">
          <Words
            as="h2"
            id="gallery-title"
            text="The Season"
            className="tr-h2 text-white"
            style={{ fontSize: "clamp(1.6rem, 3.6vw, 2.5rem)" }}
          />
          <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          <div className="flex gap-2">
            <button
              onClick={() => move(-1)}
              aria-label="Previous photos"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/50 text-[1.5rem] text-white backdrop-blur transition-all duration-300 hover:-translate-x-0.5 hover:border-[#e31933] hover:bg-[#e31933]"
            >
              ‹
            </button>
            <button
              onClick={() => move(1)}
              aria-label="Next photos"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/50 text-[1.5rem] text-white backdrop-blur transition-all duration-300 hover:translate-x-0.5 hover:border-[#e31933] hover:bg-[#e31933]"
            >
              ›
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
          <div
            className="flex transition-transform duration-[650ms] ease-[var(--tr-ease)]"
            style={{ transform: `translateX(-${pos * (100 / perView)}%)` }}
          >
            {GALLERY_IMGS.map(({ src, alt }) => (
              <div
                key={src}
                className="group relative flex-none overflow-hidden"
                style={{ flex: `0 0 ${100 / perView}%`, aspectRatio: "4/3" }}
              >
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="block h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--tr-ease)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPos(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-400 ease-[var(--tr-ease)]"
              style={{
                width: i === pos ? 28 : 8,
                background: i === pos ? BAJA_RED : "rgba(255,255,255,0.22)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Video ─────────────────────────────────────────────────────────────────────
function Video() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      aria-labelledby="video-title"
    >
      <Backdrop
        variant="terrain"
        embers={6}
        emberColor={BAJA_AMBER}
        fade
        intensity={0.8}
      />

      <div className="tr-shell relative z-10">
        <div className="mb-8 text-center">
          <Eyebrow>Watch</Eyebrow>
          <Words
            as="h2"
            id="video-title"
            text="Butler Bash"
            delay={90}
            className="tr-h2 mt-3 text-white"
            style={{
              justifyContent: "center",
              fontSize: "clamp(1.7rem, 4vw, 2.8rem)",
            }}
          />
        </div>

        <Reveal variant="scale" delay={120}>
          <div className="relative mx-auto max-w-5xl">
            <div
              className="tr-corners pointer-events-none absolute -inset-3 z-20"
              style={{ ["--corner-color" as string]: BAJA_AMBER }}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="relative h-0 overflow-hidden rounded-2xl border border-white/10 pb-[56.25%]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/Pyz2je1ebBc"
                title="Baja Butler Bash 2022"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Sponsors ──────────────────────────────────────────────────────────────────
interface BajaSponsor {
  name: string;
  logo: string;
  href: string;
  logoSize?: string;
}

interface BajaSponsorTierData {
  label: string;
  labelColor: string;
  amount: string;
  amountColor: string;
  sponsors: BajaSponsor[];
  desktopCols: number;
  boxMaxWidth?: string;
}

const BAJA_SPONSOR_TIERS: BajaSponsorTierData[] = [
  {
    label: "Platinum",
    labelColor: "#e5e4e2",
    amount: "$10,000 +",
    amountColor: "#e31933",
    desktopCols: 1,
    boxMaxWidth: "max-w-md",
    sponsors: [
      {
        name: "Kenesto",
        logo: BajaSponsorKenesto,
        href: "https://www.kenesto.com/",
      },
    ],
  },
  {
    label: "Gold",
    labelColor: "#ffd200",
    amount: "$5,000 - $10,000",
    amountColor: "#e31933",
    desktopCols: 1,
    boxMaxWidth: "max-w-md",
    sponsors: [
      {
        name: "ViveLab Ergo",
        logo: BajaSponsorViveLab,
        href: "https://www.vivelab.cloud/",
      },
    ],
  },
  {
    label: "Silver",
    labelColor: "#c0c0c0",
    amount: "$1,000 - $5,000",
    amountColor: "#e31933",
    desktopCols: 1,
    boxMaxWidth: "max-w-md",
    sponsors: [
      {
        name: "DeWalt",
        logo: BajaSponsorDewalt,
        href: "http://www.dewalt.com/",
      },
    ],
  },
  {
    label: "Bronze",
    labelColor: "#cd7f32",
    amount: "$0 - $1,000",
    amountColor: "#e31933",
    desktopCols: 3,
    sponsors: [
      {
        name: "Precision Heat Treating",
        logo: BajaSponsorPrecision,
        href: "https://www.phtc.net/",
        logoSize: "max-h-24",
      },
      {
        name: "Kodiak Cutting Tools",
        logo: BajaSponsorKodiak,
        href: "https://www.kodiakcuttingtools.com/",
        logoSize: "max-h-24",
      },
      {
        name: "GMN Bearing USA",
        logo: BajaSponsorGMN,
        href: "https://www.gmnbt.com/",
        logoSize: "max-h-24",
      },
      { name: "ASCo", logo: BajaSponsorASCo, href: "https://www.ascoweb.com/" },
      {
        name: "E&D Auto",
        logo: BajaSponsorEandD,
        href: "https://explorekensington.com/e-d-auto-care-center/",
      },
    ],
  },
];

function BajaSponsorLogoCell({ sponsor }: { sponsor: BajaSponsor }) {
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      title={sponsor.name}
      className="flex min-h-[92px] items-center justify-center rounded-xl bg-white/95 p-4 transition-all duration-400 ease-[var(--tr-ease)] hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_40px_-20px_rgba(227,25,51,0.6)] md:min-h-[112px]"
    >
      <img
        src={sponsor.logo}
        alt={sponsor.name}
        className={`${
          sponsor.logoSize ?? "max-h-16"
        } w-full object-contain transition-transform duration-400 hover:scale-[1.03]`}
        loading="lazy"
      />
    </a>
  );
}

function BajaSponsorTierSection({
  tier,
  index,
}: {
  tier: BajaSponsorTierData;
  index: number;
}) {
  return (
    <Reveal
      variant="up"
      delay={index * 100}
      className="mx-auto w-full max-w-4xl"
    >
      <div className="mb-4 flex items-center gap-4">
        <span
          className="whitespace-nowrap text-xs font-bold uppercase"
          style={{
            color: tier.labelColor,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.22em",
          }}
        >
          {tier.label}
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${tier.labelColor}55, transparent)`,
          }}
        />
        <span
          className="whitespace-nowrap text-xs"
          style={{
            color: tier.amountColor,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
          }}
        >
          {tier.amount}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(${
            tier.desktopCols <= 2 ? "260px" : "200px"
          }, 1fr))`,
          gap: "12px",
        }}
      >
        {tier.sponsors.map((sponsor) => (
          <BajaSponsorLogoCell key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </Reveal>
  );
}

function BajaSponsorsSection() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      aria-labelledby="baja-sponsors-title"
    >
      <Backdrop variant="terrain" corners cornerColor={BAJA_AMBER} fade />

      <div className="tr-shell relative z-10">
        <div className="mb-12 flex flex-col items-center text-center">
          <Eyebrow>Partners</Eyebrow>
          <Words
            as="h2"
            id="baja-sponsors-title"
            text="Our Sponsors"
            delay={90}
            className="tr-h2 mt-3 text-white"
            style={{
              justifyContent: "center",
              fontSize: "clamp(1.7rem, 4vw, 2.8rem)",
            }}
          />
          <Reveal variant="rule" delay={260} className="mt-5 block">
            <span className="tr-rule mx-auto" />
          </Reveal>
        </div>

        <div className="flex flex-col gap-12">
          {BAJA_SPONSOR_TIERS.map((tier, i) => (
            <BajaSponsorTierSection key={tier.label} tier={tier} index={i} />
          ))}
        </div>

        <Reveal variant="up" delay={200} className="mt-14 flex justify-center">
          <Link to="/sponsors" className="tr-btn tr-btn-red">
            Sponsor Terps Racing
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Baja() {
  const leanRef = useSpeedLean<HTMLDivElement>(1);
  useSlipstream(true, "rgba(232,160,16,0.85)");

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-tr-ink text-white"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <NavBar />
      <main ref={leanRef} className="tr-lean">
        <Hero />
        <StatsBand />
        <WhatWeDo />
        <DynamicEvents />
        <StaticEvents />
        <Seam />
        <Gallery />
        <Video />
        <BajaSponsorsSection />
      </main>
    </div>
  );
}
