import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NavBar from "~/components/navbar";
import Reveal from "~/components/reveal";
import ActiveAero from "~/components/activeaero";
import Backdrop, { Seam } from "~/components/backdrop";

import race_car_image from "../public/images/IC/ic_hero_night.webp";
import tr26_campus from "../public/images/IC/tr26_campus.webp";
import race_schedule_car from "../public/images/IC/race_schedule_car.webp";
import { Link } from "react-router-dom";

import Header from "~/components/header";
import Paragraph from "~/components/paragraph";
import statsOverlayImage from "../public/images/IC/stats_overlay_image.webp";
import { MarqueeBand } from "~/components/cinematic";
import car_model_simcenter_bg from "../public/images/IC/car_model_simcenter.webp";

import SponsorRELI from "../public/images/IC/sponsors/Platinum/RELI_Group.webp";
import SponsorXcorp from "../public/images/IC/sponsors/Platinum/X_Corp.webp";
import SponsorChell from "../public/images/IC/sponsors/Gold/Chell_Instruments.webp";
import SponsorDC from "../public/images/IC/sponsors/Gold/DC_SAE.webp";
import SponsorLockheed from "../public/images/IC/sponsors/Gold/Lockheed_Martin.webp";
import SponsorMoTech from "../public/images/IC/sponsors/Gold/MotionTech.webp";
import SponsorGrumman from "../public/images/IC/sponsors/Gold/Northrop_Grumman.webp";
import SponsorRapid from "../public/images/IC/sponsors/Gold/Rapid_Harness.webp";
import SponsorSiemens from "../public/images/IC/sponsors/Gold/SIEMENS.webp";
import SponsorSKF from "../public/images/IC/sponsors/Gold/SKF.webp";
import SponsorST from "../public/images/IC/sponsors/Gold/ST_Engineering.webp";
import SponsorSurrey from "../public/images/IC/sponsors/Gold/Surrey_Sensors.webp";
import SponsorEpson from "../public/images/IC/sponsors/Silver/EPSON.webp";
import SponsorGill from "../public/images/IC/sponsors/Silver/Gill_Corp.webp";
import SponsorIzze from "../public/images/IC/sponsors/Silver/IZZE.webp";
import SponsorClark from "../public/images/IC/sponsors/Silver/James_Clark.webp";
import SponsorL3 from "../public/images/IC/sponsors/Silver/L3_Harris.webp";
import SponsorNGP from "../public/images/IC/sponsors/Silver/NGP.webp";
import SponsorScanivalve from "../public/images/IC/sponsors/Silver/Scanivalve.webp";
import SponsorTerpWorks from "../public/images/IC/sponsors/Silver/Terrapin_Works.webp";
import SponsorTeslong from "../public/images/IC/sponsors/Silver/Teslong.webp";
import Sponsor1987 from "../public/images/IC/sponsors/Bronze/1987.webp";
import SponsorCardinal from "../public/images/IC/sponsors/Bronze/Cardinal_Scientific.webp";
import SponsorDeWalt from "../public/images/IC/sponsors/Bronze/DeWalt.webp";
import SponsorFK from "../public/images/IC/sponsors/Bronze/FK.webp";
import SponsorPetVet from "../public/images/IC/sponsors/Bronze/Healthy_Pet_Mobile_Vet.webp";
import SponsorIntralox from "../public/images/IC/sponsors/Bronze/Intralox.webp";
import SponsorMSBR from "../public/images/IC/sponsors/Bronze/MSBR_alt.webp";
import SponsorSAE from "../public/images/IC/sponsors/Bronze/SAE_International.webp";
import SponsorSHD from "../public/images/IC/sponsors/Bronze/SHD_Composites.webp";
import SponsorSunlu from "../public/images/IC/sponsors/Bronze/SUNLU.webp";

import Chasis from "../public/images/IC/subteams/Chassis.webp";
import Powertrain from "../public/images/IC/subteams/Powertrain.webp";
import Manufacturing from "../public/images/IC/subteams/Manufacturing.webp";
import Electronics from "../public/images/IC/subteams/Electronics.webp";
import Testing from "../public/images/IC/subteams/Testing.webp";
import ECS from "../public/images/IC/subteams/ECS.webp";
import Business from "../public/images/IC/subteams/Business.webp";
import Aerodynamics from "../public/images/IC/subteams/Aerodynamics.webp";
import VehicleDynamics from "../public/images/IC/subteams/Vehicle_Dynamics.webp";

// ── Top Image ─────────────────────────────────────────────────────────────────
function TopImage() {
  return (
    // overflow-hidden is what lets the plate below push in past its frame.
    <div className="tr-on-dark tr-cam-bars relative overflow-hidden">
      <img
        src={race_car_image}
        alt="A Terps Racing Formula SAE car at speed during a night test session"
        className="mt-[72px] max-h-[86svh] w-full object-cover object-[center_60%]"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,10,0.55) 0%, transparent 30%, transparent 55%, var(--tr-ink) 100%)",
        }}
      />
      <div className="tr-shell absolute inset-x-0 bottom-[6%]">
        <Reveal variant="up">
          <span className="tr-eyebrow">
            University of Maryland · Since 1982
          </span>
        </Reveal>
        <Reveal variant="up" delay={120}>
          <h1
            className="tr-mega tr-stamp mt-3 text-white"
            style={{ fontSize: "clamp(2.4rem, 10vw, 8rem)" }}
          >
            Formula <span className="tr-text-gold">IC</span>
          </h1>
        </Reveal>
      </div>
    </div>
  );
}

// ── Who We Are ────────────────────────────────────────────────────────────────
// Leads with the car and its 2026 result, then hands off to the divisions below.
// Source: TR26 sponsorship packet (2025–26) and the 2026 Excellence in Technical
// Innovation Award submission.
const TR26_RESULTS = [
  { value: "11th", label: "In the world", sub: "FSAE Michigan 2026 · ~140 teams" },
  { value: "9th", label: "In the nation", sub: "Best finish in two decades" },
  { value: "P11", label: "Design finalists", sub: "First finals in ~20 years" },
  { value: "P3", label: "Cummins award", sub: "Sustainable Power & Performance" },
];

const TR26_FEATURES = [
  {
    kicker: "Active aerodynamics",
    title: "Autonomous active aero — on a combustion car",
    body: "One of the only FSAE teams running active aero on a combustion car. A three-state system moves the wings in real time from six onboard sensors, with no driver input.",
  },
  {
    kicker: "Carbon monocoque",
    title: "An in-house carbon-fibre chassis",
    body: "Laid up, machined and FEA-validated by students. A lighter, stiffer platform that raises the ceiling on suspension, aero loads and driver protection.",
  },
  {
    kicker: "Electronics & controls",
    title: "A custom electronics stack, built from scratch",
    body: "Dual Raspberry Pi controllers on a CANBUS network run aero actuation, telemetry and a custom driver dashboard. No off-the-shelf ECU, no black boxes.",
  },
];

function WhoWeAre() {
  return (
    <section className="tr-shell tr-section relative z-10 !py-[clamp(40px,6vw,88px)]">
      <Header text="Who We Are" eyebrow="TR26 · The 2026 car" />

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <Paragraph text="Terps Racing Formula IC is the University of Maryland's Formula SAE combustion team. Since 1982, students have designed, built and raced a new open-wheel car nearly every year. It is one of the longest continuous Formula SAE programs in the country." />
          <Paragraph
            delay={80}
            text="TR26 is our strongest car in two decades. At FSAE Michigan 2026 it finished 11th in the world and 9th in the nation, made the design finals for the first time in roughly twenty years, and completed every lap of the 22 km endurance event, where many teams fail to finish."
          />
          <Paragraph
            delay={140}
            text="Today 150+ engineers across nine divisions, from aerodynamics to business, build every part of the car. Pick a division below to see what each one owns."
          />
        </div>

        <Reveal variant="left" delay={120}>
          <figure className="tr-on-dark relative overflow-hidden rounded-2xl border border-white/[0.08]">
            <img
              src={tr26_campus}
              alt="TR26, car #111, parked in front of the flower-bed M on the University of Maryland campus"
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
            <figcaption
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-5 pb-4 pt-10 text-white/80"
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              TR26 · Car #111
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* 2026 performance */}
      <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {TR26_RESULTS.map((r, i) => (
          <Reveal key={r.label} variant="up" delay={i * 90}>
            <div className="tr-card h-full border-l-2 !border-l-tr-gold p-5">
              <span
                className="tr-display block text-tr-gold"
                style={{ fontSize: "clamp(1.8rem, 4.4vw, 2.8rem)", lineHeight: 1.05 }}
              >
                {r.value}
              </span>
              <span
                className="mt-1 block text-white"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.98rem" }}
              >
                {r.label}
              </span>
              <span className="mt-1 block text-white/50" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}>
                {r.sub}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* What makes TR26 different */}
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {TR26_FEATURES.map((f, i) => (
          <Reveal key={f.kicker} variant="up" delay={i * 100}>
            <div className="tr-card h-full p-6">
              <span className="tr-eyebrow">{`0${i + 1} · ${f.kicker}`}</span>
              <h3
                className="mt-3 text-white"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(1.02rem, 1.8vw, 1.2rem)", lineHeight: 1.25 }}
              >
                {f.title}
              </h3>
              <p className="mt-3 text-white/60" style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", lineHeight: 1.65 }}>
                {f.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── 2026 Season ───────────────────────────────────────────────────────────────
const SEASON_TABS = ["General", "Chassis Build", "Races", "Results"] as const;
type SeasonTab = (typeof SEASON_TABS)[number];

const CHEVRON_STEPS = [
  { date: "08/23/2026", label: "Chassis Design", color: "#c01818" },
  { date: "02/07/2027", label: "Rolling Chassis", color: "#ef3a1a" },
  { date: "02/28/2027", label: "Dynoable Car", color: "#f59e0b" },
  { date: "03/15/2027", label: "Testable Car", color: "#f2e600" },
  { date: "04/15/2027", label: "Competition Ready", color: "#3bd11a" },
];

const KEY_CHASSIS_DATES = [
  { date: "June 26", label: "Suspension Geometry Finalized" },
  { date: "July 1", label: "Structural Equivalency Spreadsheet" },
  { date: "August 23", label: "Monocoque and rear frame CAD finalized" },
  { date: "September 1", label: "VR3 order in" },
  { date: "October 15", label: "Chassis molds complete" },
  { date: "November 15", label: "Frame Jigs Complete, SES Submitted" },
  { date: "February 7", label: "Rolling Chassis" },
];

const RACE_EVENTS = [
  {
    title: "Michigan SAE",
    location: "Michigan International Speedway, Brooklyn, Michigan",
    lines: [
      "May 12 - Arrival, Registration & Paddocking",
      "May 13 - Registration, Tech Inspection Begins, Driver Meeting",
      "May 14 - Cost & Design Judging, Tilt/Noise/Brake Tests",
      "May 15 - Skid Pad, Acceleration, Autocross, Design Finals",
      "May 16 - Endurance, Fuel Efficiency, Awards Ceremony",
      "May 17 - Transporter pick-up",
    ],
  },
  {
    title: "Pittsburgh Shootout",
    location: "Summit Point Motorsports Park, Summit Point, West Virginia",
    lines: ["August 21-22"],
  },
  {
    title: "Freedom 250 Grand Prix of Washington D.C., NTT INDYCAR Series",
    location: "National Mall, Washington D.C.",
    lines: ["August 22-23"],
  },
];

const SEASON_RESULTS = [
  { value: "11", label: "International Placement", sub: "Michigan SAE 2026" },
  { value: "9", label: "National Placement", sub: "Michigan SAE 2026" },
];

function ChevronTimeline() {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4 md:gap-0">
      {CHEVRON_STEPS.map((step, index) => (
        <div key={step.label} className="flex-1 flex flex-col items-center">
          <div
            className="font-bold text-white text-center mb-2"
            style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.25rem)" }}
          >
            {step.date}
          </div>
          <div
            className="w-full flex items-center justify-center text-white font-bold"
            style={{
              backgroundColor: step.color,
              height: "clamp(32px, 4vw, 44px)",
              clipPath:
                index === CHEVRON_STEPS.length - 1
                  ? "polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%, 12% 50%)"
                  : "polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%, 12% 50%)",
              marginLeft: index === 0 ? 0 : "-6%",
            }}
          />
          <div
            className="font-bold text-white text-center mt-2"
            style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)" }}
          >
            {step.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="shrink-0"
      style={{ width: "0.9em", height: "0.9em" }}
      fill="#ffd200"
      aria-hidden="true"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

function GeneralTab() {
  return (
    <div className="py-4">
      <h3
        className="text-white font-bold mb-6"
        style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)" }}
      >
        General Timeline
      </h3>
      <ChevronTimeline />
    </div>
  );
}

function ChassisBuildTab() {
  return (
    <div className="flex flex-col gap-12 py-4">
      <div>
        <h3
          className="text-white font-bold mb-8"
          style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)" }}
        >
          Key Chassis Dates
        </h3>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:flex w-full items-stretch">
          {KEY_CHASSIS_DATES.map((item) => (
            <div key={item.date} className="flex-1 flex flex-col items-center">
              <div
                className="font-bold text-white text-center mb-3"
                style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)" }}
              >
                {item.date}
              </div>
              <div className="relative w-full flex items-center justify-center">
                <div className="absolute left-0 right-0 h-[6px] bg-yellow-400" />
                <div className="relative w-4 h-4 rounded-full bg-red-600 border-2 border-red-700" />
              </div>
              <div
                className="text-white text-center mt-3 px-1"
                style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)" }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <div className="flex md:hidden flex-col gap-4">
          {KEY_CHASSIS_DATES.map((item) => (
            <div key={item.date} className="flex items-start gap-3">
              <div className="w-3 h-3 mt-1 rounded-full bg-red-600 shrink-0" />
              <div>
                <div className="font-bold text-white">{item.date}</div>
                <div className="text-white text-sm">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RacesTab() {
  return (
    <div className="py-4">
      <h3
        className="text-white font-bold mb-6"
        style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)" }}
      >
        2026 Race Calendar
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {RACE_EVENTS.map((event) => (
          <div
            key={event.title}
            className="bg-tr-surface rounded-lg p-5 flex flex-col gap-3"
          >
            <h4
              className="text-yellow-400 font-bold italic"
              style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)" }}
            >
              {event.title}
            </h4>
            <div className="flex items-start gap-1 text-white text-sm">
              <PinIcon />
              <span>{event.location}</span>
            </div>
            <div className="flex flex-col gap-1 text-white text-sm">
              {event.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Year-over-year competition placings at FSAE Michigan, with the team's
// stated TR27 targets. Source: Fall 2026 General Interest Meeting slides,
// "Past → Present → Future". (TR24/TR25 pending a corrected results doc from
// the team — update here when it arrives.)
const PROGRESSION: {
  event: string;
  tr24: string;
  tr25: string;
  tr26: string;
  tr27: string;
}[] = [
  { event: "Design", tr24: "T-30th", tr25: "T-11th", tr26: "11th (Finals)", tr27: "7th (Finals)" },
  { event: "Acceleration", tr24: "24th", tr25: "24th", tr26: "17th", tr27: "Top 10" },
  { event: "Skidpad", tr24: "3rd", tr25: "T-21st", tr26: "13th", tr27: "Top 5" },
  { event: "Autocross", tr24: "43rd", tr25: "25th", tr26: "18th", tr27: "Top 5" },
  { event: "Endurance", tr24: "DNS", tr25: "35th", tr26: "14th", tr27: "Top 10" },
  { event: "Overall", tr24: "43rd", tr25: "25th", tr26: "11th", tr27: "Top 5" },
];

function ResultsTab() {
  return (
    <div className="py-4">
      <h3
        className="text-white font-bold mb-6"
        style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)" }}
      >
        Michigan SAE — Competition Results
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SEASON_RESULTS.map((result) => (
          <div
            key={result.label}
            className="bg-tr-surface rounded-lg flex flex-col items-center justify-center text-center p-10 gap-2"
          >
            <span
              className="text-yellow-400 font-bold leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
            >
              {result.value}
            </span>
            <span
              className="text-white font-bold"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
            >
              {result.label}
            </span>
            <span className="text-gray-400 text-sm">{result.sub}</span>
          </div>
        ))}
      </div>

      {/* Year-over-year progression */}
      <div className="mt-12">
        <div className="mb-5 flex items-center gap-4">
          <span
            className="whitespace-nowrap text-xs font-bold uppercase text-tr-gold"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.22em" }}
          >
            Past · Present · Future
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-tr-gold/40 to-transparent" />
        </div>

        <Reveal variant="up">
          <div className="tr-card overflow-x-auto !p-0">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <caption className="sr-only">
                Formula SAE placings by event for TR24, TR25 and TR26, with
                TR27 targets
              </caption>
              <thead>
                <tr>
                  {["Event", "TR24", "TR25", "TR26", "TR27 Goal"].map((h, i) => (
                    <th
                      key={h}
                      scope="col"
                      className={`border-b border-white/[0.09] p-4 ${
                        i > 0 ? "border-l text-center" : ""
                      }`}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        fontWeight: 400,
                        color:
                          i === 4 ? "var(--tr-gold-ink)" : "rgb(var(--tr-fg) / 0.5)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROGRESSION.map((row) => {
                  const isOverall = row.event === "Overall";
                  return (
                    <tr
                      key={row.event}
                      className="transition-colors duration-300 hover:bg-white/[0.03]"
                      style={
                        isOverall
                          ? { background: "rgba(255,210,0,0.05)" }
                          : undefined
                      }
                    >
                      <th
                        scope="row"
                        className="border-b border-white/[0.06] p-4 text-white/80"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.95rem",
                          fontWeight: isOverall ? 700 : 400,
                        }}
                      >
                        {row.event}
                      </th>
                      {[row.tr24, row.tr25, row.tr26, row.tr27].map((cell, i) => (
                        <td
                          key={i}
                          className="border-b border-l border-white/[0.06] p-4 text-center"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            color:
                              i === 3
                                ? "var(--tr-gold-ink)"
                                : i === 2
                                ? "var(--tr-text)"
                                : "rgb(var(--tr-fg) / 0.45)",
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p
          className="mt-4 text-white/40"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem" }}
        >
          TR27 figures are team targets, not results.
        </p>
      </div>
    </div>
  );
}

function Season2026() {
  const [activeTab, setActiveTab] = useState<SeasonTab>("General");

  return (
    <section className="relative overflow-hidden">
      <Backdrop variant="circuit" fade intensity={0.75} />

        <div className="tr-shell tr-section relative z-10 !py-[clamp(40px,6vw,88px)]">
        <h2
          className="text-white text-center font-bold italic mb-10"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
          }}
        >
          The Season
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-10">
          {SEASON_TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={isActive}
                className={`relative rounded-full border px-6 py-2 font-bold italic transition-all duration-400 ease-[var(--tr-ease)] ${
                  isActive
                    ? "border-tr-gold bg-tr-gold/10 text-tr-gold shadow-[0_0_28px_-8px_rgba(255,210,0,0.6)]"
                    : "border-white/10 bg-tr-surface text-white/55 hover:border-white/25 hover:text-white"
                }`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.05rem, 2.3vw, 1.5rem)",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab content — keyed so it re-mounts and fades on every switch */}
        <div
          key={activeTab}
          style={{ animation: "tr-fade-up 0.5s var(--tr-ease) both" }}
        >
          {activeTab === "General" && <GeneralTab />}
          {activeTab === "Chassis Build" && <ChassisBuildTab />}
          {activeTab === "Races" && <RacesTab />}
          {activeTab === "Results" && <ResultsTab />}
        </div>
        </div>
    </section>
  );
}

// ── Stats band ────────────────────────────────────────────────────────────────
// Two tickers running opposite ways over the car: this season on top, the
// program's heritage underneath. Uses the shared MarqueeBand, which pauses
// itself off-screen and animates transform only.
const TICKER_SEASON = [
  "11th in the world · FSAE Michigan 2026",
  "9th in the nation",
  "Design finalists — first time in ~20 years",
  "3rd · Cummins Sustainable Power & Performance Award",
  "Endurance — every lap completed",
  "Top 11 · Cost & Manufacturing",
];
const TICKER_HERITAGE = [
  "Est. 1982",
  "65+ trophies",
  "150+ student engineers",
  "9 divisions",
  "1st place · Formula SAE 1987",
  "1st place · Formula SAE West 2008",
  "44 years of racing",
];

function StatsOverlay({ image }: { image: string }) {
  return (
    <section
      className="tr-on-dark relative w-full overflow-hidden"
      aria-label="Terps Racing by the numbers"
    >
      <img
        src={image}
        alt="Terps Racing car on track at night"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,10,0.7), rgba(8,8,10,0.2) 35%, rgba(8,8,10,0.2) 65%, rgba(8,8,10,0.75))",
        }}
      />
      <div className="relative flex min-h-[clamp(300px,52vw,640px)] flex-col justify-between py-[clamp(14px,3vw,36px)]">
        <MarqueeBand
          items={TICKER_SEASON}
          duration={46}
          color="#ffd200"
          background="rgba(8,8,10,0.55)"
        />
        <MarqueeBand
          items={TICKER_HERITAGE}
          duration={40}
          reverse
          color="#ffffff"
          background="rgba(226,24,51,0.78)"
        />
      </div>
      <ul className="sr-only">
        {[...TICKER_SEASON, ...TICKER_HERITAGE].map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}

// ── Subteams Grid ─────────────────────────────────────────────────────────────

const SUBTEAMS = [
  {
    name: "Chassis",
    image: Chasis,
    area: "chassis",
    description:
      "Designs and manufactures the car's in-house carbon fibre monocoque and rear frame — the structural backbone that carries every load on the vehicle. The subteam runs structural analysis and composite design-for-manufacture, submits the Structural Equivalency Spreadsheet to SAE, and builds the moulds and jigs the chassis is laid up in.",
  },
  {
    name: "Powertrain",
    image: Powertrain,
    area: "powertrain",
    description:
      "Owns everything that turns fuel into forward motion: the engine, intake and exhaust, drivetrain, cooling and oil systems. The subteam validates its work on the dyno before the car ever reaches a track.",
  },
  {
    name: "Manufacturing",
    image: Manufacturing,
    area: "manufacturing",
    description:
      "Turns CAD into hardware. The subteam owns design-for-manufacture, CNC machining, welding and fabrication — every component on the car is made by students at the Clark School.",
  },
  {
    name: "Electronics",
    image: Electronics,
    area: "electronics",
    description:
      "Builds the car's nervous system: the wiring harness, fusebox, dashboard controls and data acquisition stack. Its dual Raspberry Pi controllers talk over CANBUS and run the finite state machine that reads six onboard sensors live and drives the active aero.",
  },
  {
    name: "Testing",
    image: Testing,
    area: "testing",
    description:
      "Plans and runs test days, then turns what happens on track into decisions. The subteam writes test plans, trains drivers, integrates sensors and runs data acquisition, feeding hard numbers back to every other division.",
  },
  {
    name: "Ergonomics & Controls",
    image: ECS,
    area: "ecs",
    description:
      "ECS designs everything the driver touches: the steering wheel and paddle shifters, dashboard, seat and pedal box. TR26's multi-layout touchscreen dash, LED tachometer and alert system, and cut-by-gear shifting all came out of this division.",
  },
  {
    name: "Business",
    image: Business,
    area: "business",
    description:
      "Runs the side of the team that keeps the cars funded and the doors open: sponsorships, logistics, events, social media and merchandise. The subteam also delivers the cost and business presentations scored at competition.",
  },
  {
    name: "Aerodynamics",
    image: Aerodynamics,
    area: "aerodynamics",
    description:
      "Designs the aero package — wings, undertray and bodywork — in CAD, proves it in CFD and validates it with track data. The team's active aero, developed over 280 CFD iterations on the university's Zaratan cluster, won second place for Innovation at competition.",
  },
  {
    name: "Vehicle Dynamics",
    image: VehicleDynamics,
    area: "dynamics",
    description:
      "Defines how the car behaves at the limit: suspension, wheels and tyres, tuning and the mathematical validation behind them, all designed in CAD. The subteam sets the targets that chassis and testing then build and validate against.",
  },
];

function SubteamsGrid() {
  const [selectedTeam, setSelectedTeam] = useState<
    (typeof SUBTEAMS)[number] | null
  >(null);

  return (
    <>
      <div className="tr-shell tr-section relative z-10 !py-[clamp(40px,6vw,88px)]">
        <Header text="Our Divisions" />

        {/* Desktop grid */}
        <div
          className="hidden md:grid gap-2 w-full"
          style={{
            gridTemplateAreas: `
              "chassis    powertrain    powertrain    manufacturing    manufacturing    electronics"
              "chassis    testing       testing       testing          testing          electronics"
              "business   testing       testing       testing          testing          ecs"
              "business   aerodynamics  aerodynamics  dynamics         dynamics         dynamics"
            `,
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "repeat(4, clamp(70px, 12vw, 160px))",
          }}
        >
          {SUBTEAMS.map((team) => (
            <SubteamCell
              key={team.name}
              {...team}
              onClick={() => setSelectedTeam(team)}
            />
          ))}
        </div>

        {/* Mobile grid */}
        <div className="grid md:hidden grid-cols-2 gap-2 w-full">
          {SUBTEAMS.map((team) => (
            <div
              key={team.name}
              onClick={() => setSelectedTeam(team)}
              className="tr-on-dark relative overflow-hidden rounded-lg cursor-pointer group"
              style={{
                height: "clamp(80px, 28vw, 160px)",
              }}
            >
              <img
                src={team.image}
                alt={team.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-tr-ink/40 group-hover:bg-tr-ink/20 transition-colors duration-300" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: "clamp(0.9rem, 4vw, 1.4rem)",
                    color: "white",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.9)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {team.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*popup*/}
      {selectedTeam && (
        <DivisionPopup
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </>
  );
}

function SubteamCell({
  name,
  image,
  area,
  onClick,
}: {
  name: string;
  image: string;
  area: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      className="tr-on-dark tr-headlight relative rounded-xl border border-white/[0.06] cursor-pointer group"
      style={{ gridArea: area }}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-tr-ink/45 transition-colors duration-500 group-hover:bg-tr-ink/15" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="transition-transform duration-500 ease-[var(--tr-ease)] group-hover:-translate-y-1"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: "clamp(0.9rem, 2.5vw, 2rem)",
            color: "white",
            textShadow: "2px 2px 8px rgba(0,0,0,0.9)",
            letterSpacing: "-0.02em",
          }}
        >
          {name}
        </span>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-600 ease-[var(--tr-ease)] group-hover:scale-x-100"
        style={{
          background: "linear-gradient(90deg, var(--tr-red), var(--tr-gold))",
        }}
      />
    </div>
  );
}

function DivisionPopup({
  team,
  onClose,
}: {
  team: (typeof SUBTEAMS)[number];
  onClose: () => void;
}) {
  // Escape to dismiss, and stop the page scrolling behind the dialog.
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
      aria-label={team.name}
    >
      {/*bg*/}
      <div className="tr-on-dark absolute inset-0 bg-tr-ink/80 backdrop-blur-sm" />

      {/*popup*/}
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-tr-surface border border-white/10 shadow-[var(--tr-shadow-lg)]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "tr-fade-up 0.5s var(--tr-ease) both" }}
      >
        {/*image*/}
        <div className="relative h-48 sm:h-64">
          <img
            src={team.image}
            alt={team.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-tr-surface via-black/25 to-transparent" />

          {/*popup exit button*/}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-tr-ink/60 text-white text-2xl transition-all duration-300 hover:rotate-90 hover:bg-tr-ink/85"
            aria-label="Close popup"
          >
            ×
          </button>

          {/*popup title*/}
          <div className="absolute bottom-5 left-6">
            <h2
              className="text-4xl sm:text-5xl text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontStyle: "italic",
              }}
            >
              {team.name}
            </h2>
          </div>
        </div>

        {/*popup content*/}
        <div className="p-6 sm:p-8">
          <p
            className="text-white/70 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {team.description}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

// -- GALLERY TEAMS CARDS -------------------
import team_pic from "../public/images/IC/team_pic.webp";
import car_highlights from "../public/images/IC/car_scenic_zoomedin.webp";
import process_pic from "../public/images/IC/car_model_simcenter.webp";
import track_pic from "../public/images/IC/track_pic.webp";

const ASSETS = {
  team_gallery: team_pic,
  highlights_gallery: car_highlights,
  carprocess_gallery: process_pic,
  track_gallery: track_pic,
};
const GALLERY = [
  {
    id: "team-gallery",
    name: "The Team",
    // TODO: point at the per-collection gallery routes once they exist.
    to: "/gallery",
    img: ASSETS.team_gallery,
    alt: "The Terps Racing team at competition",
    accent: "#e21833",
  },
  {
    id: "highlights-gallery",
    name: "Highlights",
    to: "/gallery",
    img: ASSETS.highlights_gallery,
    alt: "Highlights from the Terps Racing season",
    accent: "#ffd200",
  },
  {
    id: "carprocess-gallery",
    name: "The Car / Process",
    to: "/gallery",
    img: ASSETS.carprocess_gallery,
    alt: "The Terps Racing car through its build process",
    accent: "var(--tr-amber)",
  },
];

function Gallery() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      id="ic-gallery"
      aria-labelledby="ic-gallery-title"
    >
      <Backdrop variant="darkroom" fade />
      <div className="tr-shell relative z-10">
        <Header
          id="ic-gallery-title"
          text="Gallery"
          eyebrow="Season in pictures"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((card, i) => (
            <Reveal key={card.id} variant="up" delay={i * 120}>
              <Link
                to={card.to}
                aria-label={`${card.name} gallery`}
                className="tr-on-dark group relative block h-[clamp(320px,42vw,450px)] overflow-hidden rounded-2xl border border-white/[0.07] shadow-[var(--tr-shadow-md)]"
              >
                <img
                  src={card.img}
                  alt={card.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--tr-ease)] group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25 transition-opacity duration-500 group-hover:opacity-90" />

                <div className="relative z-10 flex h-full flex-col items-center justify-end p-7 text-center">
                  <h3
                    className="tr-display mb-4 text-white"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)" }}
                  >
                    {card.name}
                  </h3>
                  <span
                    className="inline-flex items-center gap-2 rounded-full border px-6 py-2 text-[0.78rem] uppercase tracking-[0.14em] backdrop-blur transition-all duration-400 group-hover:gap-3.5"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: card.accent,
                      borderColor: `${card.accent}55`,
                      background: "rgba(0,0,0,0.45)",
                    }}
                  >
                    View Gallery <span aria-hidden="true">→</span>
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-700 ease-[var(--tr-ease)] group-hover:scale-x-100"
                  style={{ background: card.accent }}
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Sponsors ──────────────────────────────────────────────────────────────────
interface Sponsor {
  name: string;
  logo: string;
  href: string;
  logoSize?: string;
}

interface SponsorTierData {
  label: string;
  labelColor: string;
  amount: string;
  amountColor: string;
  sponsors: Sponsor[];
  desktopCols: number;
}

const SPONSOR_TIERS: SponsorTierData[] = [
  {
    label: "Platinum",
    labelColor: "var(--tr-metal-platinum)",
    amount: "$10,000 +",
    amountColor: "var(--tr-red-ink)",
    desktopCols: 2,
    sponsors: [
      {
        name: "RELI Group",
        logo: SponsorRELI,
        href: "https://www.religroupinc.com/",
      },
      {
        name: "X Corp Solutions",
        logo: SponsorXcorp,
        href: "https://xcorpsolutions.com/",
        logoSize: "max-h-32",
      },
    ],
  },
  {
    label: "Gold",
    labelColor: "var(--tr-gold-ink)",
    amount: "$5,000 - $10,000",
    amountColor: "var(--tr-red-ink)",
    desktopCols: 2,
    sponsors: [
      {
        name: "Chell Instruments",
        logo: SponsorChell,
        href: "https://chell.co.uk/",
        logoSize: "max-h-32",
      },
      {
        name: "DC SAE",
        logo: SponsorDC,
        href: "https://www.sae.org/memberships/find-your-section/doc-washington-dc",
        logoSize: "max-h-24",
      },
      {
        name: "Lockheed Martin",
        logo: SponsorLockheed,
        href: "https://www.lockheedmartin.com/en-us/index.html",
      },
      {
        name: "MotionTech",
        logo: SponsorMoTech,
        href: "https://www.motiontech.com/",
      },
      {
        name: "Northrop Grumman",
        logo: SponsorGrumman,
        href: "https://www.northropgrumman.com/",
      },
      {
        name: "Rapid Harness",
        logo: SponsorRapid,
        href: "https://rapidharness.com/",
      },
      {
        name: "SIEMENS",
        logo: SponsorSiemens,
        href: "https://www.siemens.com/en-us/",
      },
      { name: "SKF", logo: SponsorSKF, href: "https://www.skf.com/group" },
      {
        name: "ST Engineering",
        logo: SponsorST,
        href: "https://www.stengg.com/",
      },
      {
        name: "SurreySensors",
        logo: SponsorSurrey,
        href: "https://www.surreysensors.com/",
        logoSize: "max-h-32",
      },
    ],
  },
  {
    label: "Silver",
    labelColor: "var(--tr-metal-silver)",
    amount: "$1,000 - $5,000",
    amountColor: "var(--tr-red-ink)",
    desktopCols: 3,
    sponsors: [
      { name: "EPSON", logo: SponsorEpson, href: "https://epson.com/usa" },
      {
        name: "The Gill Corporation",
        logo: SponsorGill,
        href: "https://www.thegillcorp.com/",
      },
      {
        name: "IZZE Racing",
        logo: SponsorIzze,
        href: "https://www.izzeracing.com/",
      },
      {
        name: "A. James Clark School of Engineering",
        logo: SponsorClark,
        href: "https://eng.umd.edu/",
      },
      { name: "L3 Harris", logo: SponsorL3, href: "https://www.l3harris.com/" },
      {
        name: "New German Performance",
        logo: SponsorNGP,
        href: "https://www.ngpracing.com/",
      },
      {
        name: "Scanivalve",
        logo: SponsorScanivalve,
        href: "https://scanivalve.com/",
      },
      {
        name: "Terrapin Works",
        logo: SponsorTerpWorks,
        href: "https://terrapinworks.umd.edu/",
      },
      {
        name: "Teslong",
        logo: SponsorTeslong,
        href: "https://teslong.com/",
        logoSize: "max-h-36",
      },
    ],
  },
  {
    label: "Bronze",
    labelColor: "var(--tr-metal-bronze)",
    amount: "$0 - $1,000",
    amountColor: "var(--tr-red-ink)",
    desktopCols: 2,
    sponsors: [
      {
        name: "1987 Machinery",
        logo: Sponsor1987,
        href: "https://1987machinery.com/",
        logoSize: "max-h-32",
      },
      {
        name: "Cardinal Scientific",
        logo: SponsorCardinal,
        href: "https://cardinalscientific.com/",
        logoSize: "max-h-32",
      },
      {
        name: "DeWalt",
        logo: SponsorDeWalt,
        href: "https://www.dewalt.com/en-us",
      },
      {
        name: "FK Bearings",
        logo: SponsorFK,
        href: "https://www.fk-bearing.com/",
      },
      {
        name: "Healthy Pet Mobile Vet",
        logo: SponsorPetVet,
        href: "https://www.healthypetmobilevet.com/",
        logoSize: "max-h-32",
      },
      {
        name: "Intalox",
        logo: SponsorIntralox,
        href: "https://www.intralox.com/",
      },
      {
        name: "MSBR",
        logo: SponsorMSBR,
        href: "https://mdspace.org/",
        logoSize: "max-h-24",
      },
      {
        name: "SAE International",
        logo: SponsorSAE,
        href: "https://www.sae.org/",
      },
      {
        name: "SHD Composites",
        logo: SponsorSHD,
        href: "https://shdcomposites.com/us",
        logoSize: "max-h-24",
      },
      { name: "SUNLU", logo: SponsorSunlu, href: "https://www.sunlu.com/" },
    ],
  },
];

// Wider minimum cells for the top tiers so their logos keep the visual
// hierarchy the old fixed column counts encoded — while still reflowing to a
// single column on a phone.
const tierMinCellWidth = (desktopCols: number) =>
  desktopCols <= 2 ? "280px" : desktopCols === 3 ? "220px" : "180px";

function SponsorLogoCell({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      title={sponsor.name}
      className="group flex min-h-[92px] items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 transition-all duration-400 ease-[var(--tr-ease)] hover:-translate-y-1 hover:border-tr-gold/50 hover:bg-white/[0.07] hover:shadow-[0_18px_40px_-20px_rgba(255,210,0,0.5)] md:min-h-[112px]"
    >
      <img
        src={sponsor.logo}
        alt={sponsor.name}
        loading="lazy"
        className={`${
          sponsor.logoSize ?? "max-h-16"
        } w-full object-contain opacity-80 transition-all duration-400 group-hover:opacity-100 group-hover:scale-[1.04]`}
      />
    </a>
  );
}

function SponsorTierSection({
  tier,
  index,
}: {
  tier: SponsorTierData;
  index: number;
}) {
  return (
    <Reveal
      variant="up"
      delay={index * 110}
      className="mx-auto w-full max-w-4xl"
    >
      {/* Tier header — label, hairline rule, amount */}
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
            background: `linear-gradient(90deg, color-mix(in srgb, ${tier.labelColor} 33%, transparent), transparent)`,
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
          gridTemplateColumns: `repeat(auto-fit, minmax(${tierMinCellWidth(
            tier.desktopCols
          )}, 1fr))`,
          gap: "12px",
        }}
      >
        {tier.sponsors.map((sponsor) => (
          <SponsorLogoCell key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </Reveal>
  );
}

function SponsorsSection() {
  return (
    <section
      className="tr-section relative overflow-hidden"
      aria-labelledby="ic-sponsors-title"
    >
      <Backdrop variant="hud" corners cornerColor="var(--tr-red)" fade />
      <div className="tr-shell relative z-10">
        <Header
          id="ic-sponsors-title"
          text="Our Sponsors"
          eyebrow="Partners"
          center
        />
        <div className="flex flex-col gap-12">
          {SPONSOR_TIERS.map((tier, i) => (
            <SponsorTierSection key={tier.label} tier={tier} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function IC() {

  return (
    <div className="relative overflow-x-hidden bg-tr-ink">
      <NavBar />
      <Backdrop
        variant="hud"
        vignette={false}
        intensity={0.35}
        className="!fixed"
      />
      {/* Lean wraps content only — a transformed ancestor would become the
          containing block for the fixed navbar and backdrop above. */}
      <div>
        <TopImage />
        <WhoWeAre />
        <SubteamsGrid />
        <StatsOverlay image={statsOverlayImage} />
        <Season2026 />
        <ActiveAero image={car_model_simcenter_bg} />
        <Seam />
        <Gallery />
        <SponsorsSection />
      </div>
    </div>
  );
}
