import { useState } from "react";
import { Link } from "react-router-dom";

import NavBar from "~/components/navbar";
import Reveal from "~/components/reveal";
import Backdrop, { Seam } from "~/components/backdrop";
import { useSlipstream } from "~/components/velocity";
import { Words, useParallax, useSpotlight } from "~/components/cinematic";
import { useTheme } from "~/components/theme";

import trackPic from "../public/images/IC/track_pic.webp";
import teamPic from "../public/images/IC/team_pic.webp";
import liveryCar from "../public/images/IC/ic_racecar_image.webp";

/* Marquee partners, reused from the per-team sponsor pages. */
import PartnerRELI from "../public/images/IC/sponsors/Platinum/RELI_Group.webp";
import PartnerXcorp from "../public/images/IC/sponsors/Platinum/X_Corp.webp";
import PartnerTesla from "../public/images/EV/sponsors/Platinum/tesla.webp";
import PartnerHerrmann from "../public/images/EV/sponsors/Platinum/herrmann_ultrasonics.webp";
import PartnerKenesto from "../public/images/baja/sponsors/Platinum/KenestoPNG.webp";
import PartnerAltium from "../public/images/EV/sponsors/Title/altium.webp";
import PartnerAboutEnergy from "../public/images/EV/sponsors/Title/about_energy.webp";
import PartnerUMDECE from "../public/images/EV/sponsors/Title/umd_ece.webp";
import PartnerLockheed from "../public/images/IC/sponsors/Gold/Lockheed_Martin.webp";
import PartnerGrumman from "../public/images/IC/sponsors/Gold/Northrop_Grumman.webp";
import PartnerSiemens from "../public/images/IC/sponsors/Gold/SIEMENS.webp";
import PartnerSKF from "../public/images/IC/sponsors/Gold/SKF.webp";
import PartnerST from "../public/images/IC/sponsors/Gold/ST_Engineering.webp";
import PartnerSurrey from "../public/images/IC/sponsors/Gold/Surrey_Sensors.webp";
import PartnerChell from "../public/images/IC/sponsors/Gold/Chell_Instruments.webp";
import PartnerMoTech from "../public/images/IC/sponsors/Gold/MotionTech.webp";

const TEAM_EMAIL = "terpsracing@umd.edu";

/* ── Tier data (2025–26 sponsorship packet) ──────────────────────────────── */
interface Tier {
  name: string;
  amount: string;
  /** Metal colour on the dark theme. */
  accent: string;
  /** Its light-theme counterpart: same metal, dark enough to read on white. */
  accentLight: string;
  /** Logo treatment on the vehicles, as printed in the packet. */
  livery: string;
  /** Approximate decal footprint, used by the livery diagram. */
  liveryScale: number;
  benefits: string[];
  headline: string;
}

const TIERS: Tier[] = [
  {
    name: "Pit Crew",
    amount: "$500",
    accent: "#9aa0aa",
    accentLight: "#5f6570",
    livery: "—",
    liveryScale: 0,
    headline: "Get in the garage",
    benefits: ["Shop tour & team thank-you", "Recognition on website"],
  },
  {
    name: "Bronze",
    amount: "$1,000+",
    accent: "#c98b52",
    accentLight: "#8a5420",
    livery: "Name listed",
    liveryScale: 0.42,
    headline: "Your name on the car",
    benefits: [
      "Shop tour & team thank-you",
      "Recognition on website",
      "Résumé book access",
      "Logo on team apparel",
      "Name listed on vehicles",
    ],
  },
  {
    name: "Silver",
    amount: "$5,000+",
    accent: "#c9ced8",
    accentLight: "#5d6472",
    livery: "Small logo",
    liveryScale: 0.62,
    headline: "Come to a test day",
    benefits: [
      "Everything in Bronze",
      "Small logo on vehicles",
      "1× social media feature",
      "Invitation to testing day",
    ],
  },
  {
    name: "Gold",
    amount: "$10,000+",
    accent: "#ffd200",
    accentLight: "#8a6800",
    livery: "Medium logo",
    liveryScale: 0.82,
    headline: "Talk to the engineers",
    benefits: [
      "Everything in Silver",
      "Medium logo on vehicles",
      "2× social media features",
      "Info session / tech talk",
    ],
  },
  {
    name: "Platinum",
    amount: "$15,000+",
    accent: "#e8e8ef",
    accentLight: "#55556a",
    livery: "Large logo",
    liveryScale: 1,
    headline: "Front of the car, front of the room",
    benefits: [
      "Everything in Gold",
      "Large logo on vehicles",
      "3× social media features",
      "Logo on the team trailer",
      "Invitation to competitions*",
    ],
  },
];

const PARTNERS = [
  { name: "RELI Group", logo: PartnerRELI },
  { name: "X Corp", logo: PartnerXcorp },
  { name: "Tesla", logo: PartnerTesla },
  { name: "Herrmann Ultrasonics", logo: PartnerHerrmann },
  { name: "Kenesto", logo: PartnerKenesto },
  { name: "Altium", logo: PartnerAltium },
  { name: "About:Energy", logo: PartnerAboutEnergy },
  { name: "UMD ECE", logo: PartnerUMDECE },
  { name: "Lockheed Martin", logo: PartnerLockheed },
  { name: "Northrop Grumman", logo: PartnerGrumman },
  { name: "Siemens", logo: PartnerSiemens },
  { name: "SKF", logo: PartnerSKF },
  { name: "ST Engineering", logo: PartnerST },
  { name: "Surrey Sensors", logo: PartnerSurrey },
  { name: "Chell Instruments", logo: PartnerChell },
  { name: "MotionTech", logo: PartnerMoTech },
];

/* ── Hero: split-screen, editorial, no centred display type ──────────────── */
function Hero() {
  const { ref, targetRef } = useParallax<HTMLDivElement>(0.2, { scale: 1.16 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-white/[0.08]"
      aria-label="Partner with Terps Racing"
    >
      <Backdrop
        variant="carbon"
        beams
        keylight
        vignette={false}
        intensity={0.9}
      />

      <div className="tr-shell relative z-10 grid items-center gap-10 pb-[clamp(48px,7vw,96px)] pt-[calc(var(--tr-nav-h)+clamp(48px,8vw,110px))] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left: the pitch */}
        <div>
          <Reveal variant="up">
            <span
              className="inline-block border-l-2 pl-3 text-[0.68rem] uppercase"
              style={{
                borderColor: "#e21833",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.26em",
                color: "rgb(var(--tr-fg) / 0.6)",
              }}
            >
              Corporate Partnerships · 2025–26
            </span>
          </Reveal>

          <Words
            as="h1"
            text="Fuel the Future"
            delay={100}
            className="tr-mega tr-stamp mt-6 text-white"
            style={{ fontSize: "clamp(2.8rem, 7.6vw, 6rem)" }}
          />

          <Reveal variant="up" delay={420}>
            <p
              className="mt-6 max-w-[52ch] text-white/70"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.98rem, 1.6vw, 1.15rem)",
                lineHeight: 1.75,
              }}
            >
              Maryland gives us lab and shop space. Every part, every layup,
              every tank of fuel and every mile to a competition is paid for by
              partners. In return your brand rides on three cars in front of
              thousands of engineers — and you get first look at the students
              building them.
            </p>
          </Reveal>

          <Reveal variant="up" delay={560}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${TEAM_EMAIL}`} className="tr-btn tr-btn-red">
                Start a Conversation
              </a>
              <a href="#tiers" className="tr-btn tr-btn-ghost">
                Compare Tiers
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right: the car, framed like a spec sheet */}
        <Reveal variant="right" delay={220}>
          <div className="relative">
            {/* Brackets frame the image only, not the spec line beneath it. */}
            <div className="relative overflow-hidden border border-white/[0.09] bg-black/40 p-6">
              <div
                className="tr-corners pointer-events-none absolute inset-0 z-20"
                style={{ ["--corner-color" as string]: "#e21833" }}
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
                <span />
              </div>
              <img
                src={liveryCar}
                ref={targetRef as React.RefObject<HTMLImageElement>}
                alt="The Terps Racing Formula IC car"
                className="w-full object-contain"
              />
            </div>
            <div className="mt-3 flex justify-between">
              {["3 cars", "120+ engineers", "Since 1982"].map((t) => (
                <span
                  key={t}
                  className="text-[0.66rem] uppercase text-white/60"
                  style={{
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.16em",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Livery placement — the thing sponsors actually buy ──────────────────── */
/** The tier's accent for the active theme. The metals are literal hex because
    they are concatenated with alpha suffixes (`${accent}66`), which a CSS
    variable cannot do — so the theme is resolved in JS instead. */
function useTierAccent(onDark = false) {
  const { theme } = useTheme();
  return (tier: Tier) =>
    theme === "light" && !onDark ? tier.accentLight : tier.accent;
}

function Livery() {
  const accentFor = useTierAccent();
  // The car panel below stays dark, so its decal keeps the dark metals.
  const accentOnDark = useTierAccent(true);
  const [active, setActive] = useState(4); // Platinum
  const tier = TIERS[active];

  return (
    <section
      className="tr-section relative overflow-hidden"
      aria-labelledby="livery-title"
    >
      <Backdrop variant="strata" fade intensity={0.6} />

      <div className="tr-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* Copy + tier selector */}
          <div>
            <Reveal variant="up">
              <span className="tr-eyebrow">
                What you actually get
              </span>
            </Reveal>
            <Words
              as="h2"
              id="livery-title"
              text="Your logo, on the car"
              delay={90}
              className="tr-h2 mt-3 text-white"
              style={{ fontSize: "clamp(1.7rem, 4vw, 2.9rem)" }}
            />
            <Reveal variant="up" delay={340}>
              <p
                className="mt-5 max-w-[46ch] text-white/65"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                }}
              >
                Decal size scales with your level. Pick a tier to see roughly
                how it lands on the bodywork — and what else comes with it.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-1.5">
              {TIERS.map((t, i) => (
                <Reveal key={t.name} variant="left" delay={i * 70}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className={`flex w-full items-baseline justify-between gap-4 border-l-2 px-4 py-3 text-left transition-all duration-400 ease-[var(--tr-ease)] ${
                      i === active ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                    }`}
                    style={{
                      borderColor:
                        i === active ? accentFor(t) : "rgb(var(--tr-fg) / 0.1)",
                    }}
                  >
                    <span
                      className="uppercase"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color:
                          i === active ? accentFor(t) : "rgb(var(--tr-fg) / 0.6)",
                      }}
                    >
                      {t.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.76rem",
                        color: i === active ? "var(--tr-text)" : "rgb(var(--tr-fg) / 0.68)",
                      }}
                    >
                      {t.amount}
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          {/* The car with a scaling decal */}
          <Reveal variant="scale" delay={160}>
            <div className="tr-on-dark relative overflow-hidden rounded-2xl border border-white/[0.09] bg-black/50 p-6 sm:p-10">
              <div className="relative">
                <img
                  src={liveryCar}
                  alt="Sponsor decal placement on the car"
                  className="w-full object-contain"
                />

                {/* Decal footprint */}
                {tier.liveryScale > 0 && (
                  <div
                    className="absolute flex items-center justify-center border-2 transition-all duration-[650ms] ease-[var(--tr-ease)]"
                    style={{
                      borderColor: accentOnDark(tier),
                      background: `${accentOnDark(tier)}1f`,
                      left: "34%",
                      top: "44%",
                      width: `${9 + tier.liveryScale * 17}%`,
                      height: `${6 + tier.liveryScale * 11}%`,
                      transform: "translate(-50%, -50%)",
                      boxShadow: `0 0 40px -8px ${accentOnDark(tier)}88`,
                    }}
                  >
                    <span
                      className="whitespace-nowrap px-1 text-center"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "clamp(0.5rem, 0.9vw, 0.7rem)",
                        color: accentOnDark(tier),
                        letterSpacing: "0.1em",
                      }}
                    >
                      YOUR LOGO
                    </span>
                  </div>
                )}
              </div>

              {/* Readout */}
              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(1.2rem,2.6vw,1.7rem)",
                      color: accentOnDark(tier),
                    }}
                  >
                    {tier.headline}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.74rem",
                      color: "rgb(var(--tr-fg) / 0.45)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    VEHICLE LOGO: {tier.livery.toUpperCase()}
                  </span>
                </div>

                <ul
                  key={tier.name}
                  className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2"
                >
                  {tier.benefits.map((b, i) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-white/70"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        lineHeight: 1.5,
                        opacity: 0,
                        animation: `tr-fade-up 0.5s var(--tr-ease) ${
                          i * 60
                        }ms forwards`,
                      }}
                    >
                      <span style={{ color: accentOnDark(tier) }}>▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <p
          className="mt-6 text-white/55"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}
        >
          Diagram is illustrative — exact placement is agreed with each partner.
          * Competition invitations are subject to event access and SAE
          regulations.
        </p>
      </div>
    </section>
  );
}

/* ── Tier cards ──────────────────────────────────────────────────────────── */
function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();
  const accent = useTierAccent()(tier);
  const top = tier.name === "Platinum";

  return (
    <Reveal variant="up" delay={index * 90}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="tr-spotlight tr-headlight relative flex h-full flex-col border p-6 transition-all duration-500 ease-[var(--tr-ease)] hover:-translate-y-1.5"
        style={{
          borderColor: top ? `${accent}66` : "rgb(var(--tr-fg) / 0.09)",
          background: top
            ? "rgb(var(--tr-fg) / 0.045)"
            : "rgb(var(--tr-fg) / 0.02)",
        }}
      >
        <span
          className="absolute left-0 top-0 h-full w-[3px]"
          style={{ background: accent, opacity: top ? 1 : 0.5 }}
          aria-hidden="true"
        />
        <span
          className="text-[0.66rem] uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.22em",
            color: accent,
          }}
        >
          {tier.name}
        </span>
        <span
          className="tr-display mt-1 text-white"
          style={{ fontSize: "clamp(1.5rem,3.4vw,2.1rem)" }}
        >
          {tier.amount}
        </span>
        <span
          className="mt-1 text-white/60"
          style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem" }}
        >
          {tier.headline}
        </span>

        <ul className="mt-5 flex flex-1 flex-col gap-2">
          {tier.benefits.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-white/65"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: accent }}>▸</span>
              {b}
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${TEAM_EMAIL}?subject=Terps%20Racing%20${encodeURIComponent(
            tier.name
          )}%20sponsorship`}
          className={`tr-btn mt-6 !py-2 !text-[0.76rem] ${
            top ? "tr-btn-gold" : "tr-btn-ghost"
          }`}
        >
          Enquire
        </a>
      </div>
    </Reveal>
  );
}

function Tiers() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      id="tiers"
      aria-labelledby="tiers-title"
    >
      <Backdrop variant="carbon" fade intensity={0.85} />
      <div className="tr-shell relative z-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-white/[0.09] pb-6">
          <div>
            <Reveal variant="up">
              <span className="tr-eyebrow">
                Levels
              </span>
            </Reveal>
            <Words
              as="h2"
              id="tiers-title"
              text="Pick a level"
              delay={80}
              className="tr-h2 mt-3 text-white"
              style={{ fontSize: "clamp(1.7rem, 4vw, 2.9rem)" }}
            />
          </div>
          <Reveal variant="up" delay={200}>
            <p
              className="max-w-[38ch] text-white/55"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                lineHeight: 1.65,
              }}
            >
              Cash or in-kind — donated parts, materials and services count at
              fair market value.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── In-kind ─────────────────────────────────────────────────────────────── */
const INKIND = [
  {
    title: "Materials",
    body: "Carbon fibre, composites, aluminium stock, fasteners, adhesives, consumables.",
  },
  {
    title: "Components",
    body: "Bearings, sensors, electronics, wiring, batteries, dampers, drivetrain parts.",
  },
  {
    title: "Services",
    body: "Machining, waterjet and CNC time, heat treating, plating, coating, printing.",
  },
  {
    title: "Software",
    body: "CAD, CFD and FEA licences, data acquisition tools, shop equipment.",
  },
];

function InKind() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      aria-labelledby="inkind-title"
    >
      <Backdrop variant="hud" fade intensity={0.45} />
      <div className="tr-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal variant="up">
              <span className="tr-eyebrow">
                Not just cash
              </span>
            </Reveal>
            <Words
              as="h2"
              id="inkind-title"
              text="Send parts, not cheques"
              delay={90}
              className="tr-h2 mt-3 text-white"
              style={{ fontSize: "clamp(1.7rem, 4vw, 2.9rem)" }}
            />
            <Reveal variant="up" delay={340}>
              <p
                className="mt-5 max-w-[48ch] text-white/65"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                }}
              >
                For a lot of our partners this is the easiest and highest-impact
                way in. Donated goods and services count toward your tier at
                fair market value — the same benefits apply.
              </p>
            </Reveal>
            <Reveal variant="up" delay={460}>
              <a
                href={`mailto:${TEAM_EMAIL}`}
                className="tr-btn tr-btn-red mt-8"
              >
                Offer an In-Kind Gift
              </a>
            </Reveal>
          </div>

          <div className="grid gap-px bg-white/[0.09] sm:grid-cols-2">
            {INKIND.map((item, i) => (
              <Reveal key={item.title} variant="up" delay={i * 90}>
                <div className="h-full bg-tr-ink p-6 transition-colors duration-400 hover:bg-white/[0.03]">
                  <span
                    className="text-[0.62rem] uppercase text-white/55"
                    style={{
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.22em",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="mb-2 mt-2 text-white"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: "1.15rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-white/55"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.88rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Current partners ────────────────────────────────────────────────────── */
function Partners() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      aria-labelledby="partners-title"
    >
      <Backdrop variant="darkroom" fade />
      <div className="tr-shell relative z-10">
        <div className="mb-10 flex items-center gap-5">
          <Words
            as="h2"
            id="partners-title"
            text="In good company"
            className="tr-h2 text-white"
            style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.4rem)" }}
          />
          <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <div className="grid grid-cols-2 gap-px bg-white/[0.07] sm:grid-cols-3 lg:grid-cols-4">
          {PARTNERS.map((partner, i) => (
            <Reveal
              key={partner.name}
              variant="scale"
              delay={Math.min(i, 10) * 55}
            >
              <div
                className="group flex h-full min-h-[110px] items-center justify-center bg-tr-ink p-6 transition-colors duration-400 hover:bg-white/[0.04]"
                title={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="max-h-12 w-full object-contain opacity-45 transition-all duration-500 ease-[var(--tr-ease)] group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" delay={200}>
          <p
            className="mt-6 text-white/60"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem" }}
          >
            A selection of the organisations backing Formula IC, Formula
            Electric and Baja. Full sponsor lists live on each team's page.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Talent ──────────────────────────────────────────────────────────────── */
const ALUMNI = [
  "Tesla",
  "SpaceX",
  "Ford",
  "Blue Origin",
  "Rivian",
  "Honda",
  "General Motors",
  "NVIDIA",
];

function Talent() {
  const { ref, targetRef } = useParallax<HTMLDivElement>(0.14, { scale: 1.16 });

  return (
    <section
      ref={ref}
      className="tr-on-dark tr-grain relative overflow-hidden"
      aria-labelledby="talent-title"
    >
      <div className="absolute inset-0">
        <img
          src={teamPic}
          ref={targetRef as React.RefObject<HTMLImageElement>}
          alt=""
          className="tr-cam-drift h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(8,8,10,0.86)" }}
        />
      </div>
      <Backdrop variant="carbon" vignette={false} intensity={0.4} />

      <div className="tr-shell relative z-10 grid items-center gap-10 py-[clamp(52px,8vw,110px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal variant="up">
            <span className="tr-eyebrow">
              Résumé book access
            </span>
          </Reveal>
          <Words
            as="h2"
            id="talent-title"
            text="Hire the people who built it"
            delay={90}
            className="tr-h2 mt-3 text-white"
            style={{ fontSize: "clamp(1.7rem, 4vw, 2.9rem)" }}
          />
          <Reveal variant="up" delay={360}>
            <p
              className="mt-5 max-w-[46ch] text-white/65"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.75,
              }}
            >
              Bronze and above gets you the résumé book — students who have
              already shipped hardware to a deadline. Our alumni went to:
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-px bg-white/[0.08] sm:grid-cols-4">
          {ALUMNI.map((company, i) => (
            <Reveal key={company} variant="up" delay={i * 60}>
              <div className="flex h-full min-h-[84px] items-center justify-center bg-tr-ink px-3 py-5 text-center transition-colors duration-400 hover:bg-white/[0.05]">
                <span
                  className="text-white/70"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}
                >
                  {company}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How to get involved ─────────────────────────────────────────────────── */
const STEPS = [
  {
    n: "01",
    title: "Email us",
    body: `Send a note to ${TEAM_EMAIL} telling us what you make and what you'd want out of a partnership. No form to fill in.`,
  },
  {
    n: "02",
    title: "We scope it together",
    body: "Cash, parts, services or shop time — we'll work out what's genuinely useful to the team and what level that lands at.",
  },
  {
    n: "03",
    title: "You're on the car",
    body: "Decals go on before the season's first event, your logo goes up on the site, and you start getting build updates from the team.",
  },
];

function GetInvolved() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      aria-labelledby="steps-title"
    >
      <Backdrop
        variant="hud"
        corners
        cornerColor="#e21833"
        fade
        intensity={0.6}
      />
      <div className="tr-shell relative z-10">
        <div className="mb-12">
          <Reveal variant="up">
            <span className="tr-eyebrow">
              Three steps
            </span>
          </Reveal>
          <Words
            as="h2"
            id="steps-title"
            text="How to get involved"
            delay={90}
            className="tr-h2 mt-3 text-white"
            style={{ fontSize: "clamp(1.7rem, 4vw, 2.9rem)" }}
          />
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} variant="up" delay={i * 130}>
              <div
                className="relative border-t-2 pt-6"
                style={{ borderColor: "#e21833" }}
              >
                <span
                  className="tr-display block text-white/15"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 4rem)" }}
                >
                  {step.n}
                </span>
                <h3
                  className="mb-3 mt-1 text-white"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-white/60"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.94rem",
                    lineHeight: 1.7,
                  }}
                >
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ─────────────────────────────────────────────────────────────── */
function Contact() {
  const { ref, targetRef } = useParallax<HTMLDivElement>(0.12, { scale: 1.16 });

  return (
    <section
      ref={ref}
      className="tr-on-dark relative overflow-hidden"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="absolute inset-0">
        <img
          src={trackPic}
          ref={targetRef as React.RefObject<HTMLImageElement>}
          alt=""
          className="tr-cam-drift h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--tr-ink) 0%, rgba(8,8,10,0.88) 34%, rgba(8,8,10,0.92) 100%)",
          }}
        />
      </div>
      <Backdrop
        variant="carbon"
        keylight
        keyPos={["50%", "30%"]}
        vignette={false}
        intensity={0.45}
      />

      <div className="tr-shell relative z-10 py-[clamp(56px,9vw,130px)]">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <Words
              as="h2"
              id="contact-title"
              text="Let's put you on the grid"
              className="tr-display text-white"
              style={{
                fontSize: "clamp(1.9rem, 5.5vw, 4rem)",
                maxWidth: "16ch",
              }}
            />
            <Reveal variant="up" delay={380}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${TEAM_EMAIL}`} className="tr-btn tr-btn-red">
                  {TEAM_EMAIL}
                </a>
                <a
                  href="https://www.linkedin.com/company/93344451"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tr-btn tr-btn-ghost"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/terpsracing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tr-btn tr-btn-ghost"
                >
                  Instagram
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal variant="left" delay={220}>
            <div className="border-l-2 border-white/15 pl-6">
              <p
                className="text-white/55"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.94rem",
                  lineHeight: 1.75,
                }}
              >
                Terps Racing is a registered non-profit. Contributions may be
                tax deductible — check with your tax advisor.
              </p>
              <p
                className="mt-4 text-white/40"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                }}
              >
                EIN 52-2197313
              </p>
              <p
                className="mt-1 text-white/40"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                }}
              >
                racing.umd.edu
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="tr-on-dark relative overflow-hidden bg-tr-ink" role="contentinfo">
      <div className="tr-shell flex flex-col items-center gap-4 border-t border-white/[0.07] py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link
          to="/"
          className="tr-link text-[0.85rem] text-white/55 hover:text-white"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ← Back to Terps Racing
        </Link>
        <p
          className="text-[0.75rem] text-white/55"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          © {new Date().getFullYear()} Terps Racing · University of Maryland
        </p>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Sponsors() {
  useSlipstream(true, "rgba(226,24,51,0.85)");

  return (
    <div className="min-h-screen overflow-x-hidden bg-tr-ink text-white">
      <NavBar overMedia={false} />
      <main>
        <Hero />
        <Livery />
        <Seam />
        <Tiers />
        <InKind />
        <Partners />
        <Talent />
        <GetInvolved />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
