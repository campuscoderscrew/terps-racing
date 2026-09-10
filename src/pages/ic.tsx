import { useEffect, useState } from "react";
import NavBar from "~/components/navbar";
import {
  useInView, Reveal, GridOverlay, Scanlines, Glow, SpeedLines, CheckerBand,
  CornerAccent, SectionLabel, FONT_LABEL, SNAP, STAGGER,
} from "~/components/accents";
import { themeVars } from "~/theme";

import race_car_image from "../public/images/IC/ic_racecar_image.png"

import Header from "~/components/header";
import Paragraph from "~/components/paragraph";
import statsOverlayImage from "../public/images/IC/stats_overlay_image.png"

import SponsorRELI from "../public/images/IC/sponsors/Platinum/RELI_Group.png"
import SponsorXcorp from "../public/images/IC/sponsors/Platinum/X_Corp.png"
import SponsorChell from "../public/images/IC/sponsors/Gold/Chell_Instruments.png"
import SponsorDC from "../public/images/IC/sponsors/Gold/DC_SAE.png"
import SponsorLockheed from "../public/images/IC/sponsors/Gold/Lockheed_Martin.png"
import SponsorMoTech from "../public/images/IC/sponsors/Gold/MotionTech.png"
import SponsorGrumman from "../public/images/IC/sponsors/Gold/Northrop_Grumman.png"
import SponsorRapid from "../public/images/IC/sponsors/Gold/Rapid_Harness.png"
import SponsorSiemens from "../public/images/IC/sponsors/Gold/SIEMENS.png"
import SponsorSKF from "../public/images/IC/sponsors/Gold/SKF.png"
import SponsorST from "../public/images/IC/sponsors/Gold/ST_Engineering.png"
import SponsorSurrey from "../public/images/IC/sponsors/Gold/Surrey_Sensors.png"
import SponsorEpson from "../public/images/IC/sponsors/Silver/EPSON.png"
import SponsorGill from "../public/images/IC/sponsors/Silver/Gill_Corp.png"
import SponsorIzze from "../public/images/IC/sponsors/Silver/IZZE.png"
import SponsorClark from "../public/images/IC/sponsors/Silver/James_Clark.png"
import SponsorL3 from "../public/images/IC/sponsors/Silver/L3_Harris.png"
import SponsorNGP from "../public/images/IC/sponsors/Silver/NGP.png"
import SponsorScanivalve from "../public/images/IC/sponsors/Silver/Scanivalve.png"
import SponsorTerpWorks from "../public/images/IC/sponsors/Silver/Terrapin_Works.png"
import SponsorTeslong from "../public/images/IC/sponsors/Silver/Teslong.png"
import Sponsor1987 from "../public/images/IC/sponsors/Bronze/1987.png"
import SponsorCardinal from "../public/images/IC/sponsors/Bronze/Cardinal_Scientific.png"
import SponsorDeWalt from "../public/images/IC/sponsors/Bronze/DeWalt.png"
import SponsorFK from "../public/images/IC/sponsors/Bronze/FK.png"
import SponsorPetVet from "../public/images/IC/sponsors/Bronze/Healthy_Pet_Mobile_Vet.png"
import SponsorIntralox from "../public/images/IC/sponsors/Bronze/Intralox.png"
import SponsorMSBR from "../public/images/IC/sponsors/Bronze/MSBR_alt.png"
import SponsorSAE from "../public/images/IC/sponsors/Bronze/SAE_International.png"
import SponsorSHD from "../public/images/IC/sponsors/Bronze/SHD_Composites.png"
import SponsorSunlu from "../public/images/IC/sponsors/Bronze/SUNLU.png"

import Chasis from "../public/images/IC/subteams/Chassis.png"
import Powertrain from "../public/images/IC/subteams/Manufacturing.png"
import Manufacturing from "../public/images/IC/subteams/Manufacturing.png"
import Electronics from "../public/images/IC/subteams/Electronics.png"
import Testing from "../public/images/IC/subteams/Testing.png"
import ECS from "../public/images/IC/subteams/ECS.png"
import Business from "../public/images/IC/subteams/Business.png"
import Aerodynamics from "../public/images/IC/subteams/Aerodynamics.png"
import VehicleDynamics from "../public/images/IC/subteams/Vehicle_Dynamics.png"

// IC's display face: condensed, heavy, raked forward. The italic is the team's
// signature — Baja and EV deliberately don't use it.
const FONT_DISPLAY = "'Barlow Condensed', sans-serif";
const FONT_BODY    = "'Roboto Condensed', sans-serif";

const display = (size: string, weight = 900): React.CSSProperties => ({
  fontFamily: FONT_DISPLAY,
  fontWeight: weight,
  fontStyle: "italic",
  fontSize: size,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
});

const bodyText: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontWeight: 400,
  color: "rgba(232,232,232,0.8)",
  lineHeight: 1.7,
};

/** Red slash — the page's repeating accent shape. Angular, never rounded. */
function Slash({ className = "", height = 4, width = 64 }: { className?: string; height?: number; width?: number }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ width, height, background: "var(--accent)", transform: "skewX(-24deg)" }}
    />
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      className="relative w-full overflow-hidden flex items-end"
      style={{ minHeight: "clamp(420px, 46vw, 760px)" }}
    >
      <img
        src={race_car_image}
        alt="Terps Racing Formula IC car"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.72) saturate(1.1) contrast(1.05)" }}
      />
      <GridOverlay opacity={0.14} />
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{ background: "linear-gradient(100deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 42%, rgba(0,0,0,0.05) 75%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-0 h-1/2"
        aria-hidden="true"
        style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.9))" }}
      />
      <Scanlines />
      <Glow color="rgba(195,0,0,0.4)" className="-left-32 bottom-0" size={560} />
      <SpeedLines className="left-0 top-1/3 w-[38%] hidden md:block" count={6} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 md:px-16 pb-14 md:pb-20 pt-28">
        <Reveal show={mounted} from="left" delay={0.05}>
          <SectionLabel>University of Maryland · Formula SAE</SectionLabel>
        </Reveal>

        <Reveal show={mounted} from="left" delay={0.14} distance={64}>
          <h1 className="text-white select-none mt-5" style={display("clamp(2.6rem, 9vw, 7.5rem)")}>
            FORMULA{" "}
            <span style={{ color: "var(--accent)", textShadow: "0 0 48px rgba(195,0,0,0.55)" }}>IC</span>
          </h1>
        </Reveal>

        <Reveal show={mounted} from="left" delay={0.24}>
          <div className="flex items-center gap-4 mt-6">
            <Slash width={72} />
            <span
              className="uppercase"
              style={{ fontFamily: FONT_LABEL, fontSize: "0.7rem", letterSpacing: "0.28em", color: "rgba(255,255,255,0.75)" }}
            >
              Racing since 1983
            </span>
          </div>
        </Reveal>
      </div>

      <CornerAccent at="tl" />
      <CheckerBand size={9} className="absolute inset-x-0 bottom-0 z-20" opacity={0.4} />
    </section>
  );
}

// ── Who We Are ────────────────────────────────────────────────────────────────
// Only figures verifiable from the page's own content: the founding year comes
// from the body copy below, the division count from the SUBTEAMS list.
const IC_STATS = [
  { value: "1983", label: "Founded" },
  { value: "9",    label: "Divisions" },
];

function WhoWeAre() {
  const { ref, inView } = useInView();
  const whoWeAreText =
    "Terps Racing Formula Internal Combustion is the University of Maryland's Formula SAE team. Since 1983, we've provided hands-on project-based engineering experiences for students. We are always looking to use our prior innovations and experience to further enhance our projects to continue to excel on the elite level.";

  return (
    <section ref={ref} className="relative bg-black overflow-hidden px-6 sm:px-10 md:px-16 py-20 md:py-24">
      <GridOverlay opacity={0.08} />
      <Glow color="rgba(195,0,0,0.22)" className="-right-40 -top-20" size={520} />

      <div className="relative z-10 max-w-6xl mx-auto grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-20">
        <div>
          <Reveal show={inView} from="left" delay={0.05}>
            <SectionLabel>Who We Are</SectionLabel>
          </Reveal>
          <Reveal show={inView} from="left" delay={0.12}>
            <h2 className="text-white mt-4" style={display("clamp(1.7rem, 4vw, 3.2rem)", 900)}>
              BUILT IN COLLEGE PARK,<br />
              <span style={{ color: "var(--accent)" }}>PROVEN ON TRACK</span>
            </h2>
          </Reveal>
          <Reveal show={inView} from="left" delay={0.2} className="mt-6">
            <Slash width={88} height={5} />
          </Reveal>
          <Reveal show={inView} from="left" delay={0.26}>
            <p className="mt-7 max-w-2xl" style={{ ...bodyText, fontSize: "clamp(0.92rem, 1.1vw, 1.05rem)" }}>
              {whoWeAreText}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center gap-6">
          {IC_STATS.map((stat, i) => (
            <Reveal key={stat.label} show={inView} from="right" delay={0.2 + i * STAGGER}>
              <div className="pl-5" style={{ borderLeft: "3px solid var(--accent)" }}>
                <div className="text-white" style={display("clamp(1.8rem, 3.4vw, 3rem)")}>{stat.value}</div>
                <div
                  className="uppercase mt-1"
                  style={{ fontFamily: FONT_LABEL, fontSize: "0.66rem", letterSpacing: "0.24em", color: "rgba(255,255,255,0.55)" }}
                >
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 2026 Season ───────────────────────────────────────────────────────────────
const SEASON_TABS = ["General", "Chassis Build", "Races", "Results"] as const;
type SeasonTab = (typeof SEASON_TABS)[number];

const CHEVRON_STEPS = [
  { date: "08/23/2026", label: "Chassis Design",     color: "#c01818" },
  { date: "02/07/2027", label: "Rolling Chassis",    color: "#ef3a1a" },
  { date: "02/28/2027", label: "Dynoable Car",       color: "#f59e0b" },
  { date: "03/15/2027", label: "Testable Car",       color: "#f2e600" },
  { date: "04/15/2027", label: "Competition Ready",  color: "#3bd11a" },
];

const KEY_CHASSIS_DATES = [
  { date: "June 26",     label: "Suspension Geometry Finalized" },
  { date: "July 1",      label: "Structural Equivalency Spreadsheet" },
  { date: "August 23",   label: "Monocoque and rear frame CAD finalized" },
  { date: "September 1", label: "VR3 order in" },
  { date: "October 15",  label: "Chassis molds complete" },
  { date: "November 15", label: "Frame Jigs Complete, SES Submitted" },
  { date: "February 7",  label: "Rolling Chassis" },
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
  { value: "9",  label: "National Placement",      sub: "Michigan SAE 2026" },
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
          <div key={event.title} className="bg-neutral-900 rounded-lg p-5 flex flex-col gap-3">
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
        </Reveal>

        <div className="flex-1 w-full">
          <Reveal show={inView} from="right" delay={0.1}>
            <SectionLabel>2025 Season</SectionLabel>
          </Reveal>
          <Reveal show={inView} from="right" delay={0.16}>
            <h2 className="text-white mt-4" style={display("clamp(1.6rem, 3.4vw, 2.8rem)")}>RACE SCHEDULE</h2>
          </Reveal>
          <Reveal show={inView} from="right" delay={0.22} className="mt-5 mb-8">
            <Slash width={72} />
          </Reveal>

          {/* Timing-sheet rows rather than filled blocks — reads like a paddock
              schedule, and lets the accent do the work instead of a colour fill. */}
          <div className="flex flex-col">
            {RACE_SCHEDULE.map((race, i) => (
              <Reveal key={race.title} show={inView} from="right" delay={0.28 + i * STAGGER}>
                <div
                  className="group flex items-baseline gap-4 py-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.12)", transition: `padding 0.12s ${SNAP}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "10px"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0px"; }}
                >
                  <span style={{ fontFamily: FONT_LABEL, fontSize: "0.7rem", color: "var(--accent)", letterSpacing: "0.15em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="text-white" style={display("clamp(1rem, 1.7vw, 1.5rem)", 700)}>{race.title}</div>
                    <div
                      className="mt-1 uppercase"
                      style={{ fontFamily: FONT_LABEL, fontSize: "0.64rem", letterSpacing: "0.16em", color: "rgba(255,255,255,0.5)" }}
                    >
                      {race.where}
                    </div>
                  </div>
                  <span
                    className="whitespace-nowrap"
                    style={{ fontFamily: FONT_LABEL, fontSize: "0.7rem", color: "rgba(255,255,255,0.75)" }}
                  >
                    {race.when}
                  </span>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

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
            className="bg-neutral-900 rounded-lg flex flex-col items-center justify-center text-center p-10 gap-2"
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
    </div>
  );
}

function Season2026() {
  const [activeTab, setActiveTab] = useState<SeasonTab>("General");

  return (
    <div className="bg-black px-[clamp(20px,5vw,80px)] py-10">
      <h2
        className="text-white text-center font-bold italic mb-10"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
        }}
      >
        2026 Season
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
              className={`rounded-lg px-5 py-2 font-bold italic transition-all duration-200 ${
                isActive
                  ? "bg-neutral-700 ring-2 ring-yellow-400"
                  : "bg-neutral-900 hover:bg-neutral-800"
              }`}
              style={{
                color: "#ffd200",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "General" && <GeneralTab />}
      {activeTab === "Chassis Build" && <ChassisBuildTab />}
      {activeTab === "Races" && <RacesTab />}
      {activeTab === "Results" && <ResultsTab />}
    </div>
  );
}

// ── Stats Overlay ─────────────────────────────────────────────────────────────
const stats = [
  { topLeft: true,  heading: "Top 10",    sub: "in Aerodynamics" },
  { topLeft: false, heading: "Top 25",    sub: "at Formula SAE 2025" },
  { topLeft: true,  heading: "1st Place", sub: "at Formula SAE West 2008" },
  { topLeft: false, heading: "1st Place", sub: "at Formula SAE 1987" },
];

function StatsOverlay({ image }: { image: string }) {
  const { ref, inView } = useInView(0.2);

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
      <img
        src={image}
        alt="Terps Racing car on track at night"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 px-[clamp(20px,5vw,80px)] py-[clamp(12px,4vw,48px)]">
        {stats.map(({ topLeft, heading, sub }, index) => (
          <Reveal
            key={sub}
            show={inView}
            from={topLeft ? "left" : "right"}
            delay={0.08 + index * STAGGER}
            className={`flex flex-col
              ${topLeft ? "items-start" : "items-end"}
              ${index >= 2 ? "justify-end" : "justify-start"}
              ${topLeft ? "" : "text-right"}
            `}
          >
            <span
              className="text-white"
              style={{ ...display("clamp(1.1rem, 4.6vw, 3.8rem)"), textShadow: "0 2px 14px rgba(0,0,0,0.9), 0 0 40px rgba(195,0,0,0.35)" }}
            >
              {heading}
            </span>
            <div className={`flex items-center gap-3 mt-2 ${topLeft ? "" : "flex-row-reverse"}`}>
              <Slash width={26} height={3} />
              <span
                className="uppercase"
                style={{
                  fontFamily: FONT_LABEL,
                  fontSize: "clamp(0.55rem, 1.1vw, 0.78rem)",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.85)",
                  textShadow: "0 1px 6px rgba(0,0,0,0.95)",
                }}
              >
                {sub}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <CornerAccent at="tr" length={64} weight={3} />
      <CornerAccent at="bl" length={64} weight={3} />
    </section>
  );
}

// ── Subteams Grid ─────────────────────────────────────────────────────────────
const SUBTEAMS = [
  { name: "Chassis",          image: Chasis,          area: "chassis" },
  { name: "Powertrain",       image: Powertrain,      area: "powertrain" },
  { name: "Manufacturing",    image: Manufacturing,   area: "manufacturing" },
  { name: "Electronics",      image: Electronics,     area: "electronics" },
  { name: "Testing",          image: Testing,         area: "testing" },
  { name: "ECS",              image: ECS,             area: "ecs" },
  { name: "Business",         image: Business,        area: "business" },
  { name: "Aerodynamics",     image: Aerodynamics,    area: "aerodynamics" },
  { name: "Vehicle Dynamics", image: VehicleDynamics, area: "dynamics" },
];

function SubteamsGrid() {
  const { ref, inView } = useInView(0.05);

  return (
    <section ref={ref} className="relative bg-black w-full overflow-hidden px-6 sm:px-10 md:px-16 py-20 md:py-24">
      <GridOverlay opacity={0.08} />
      <Glow color="rgba(195,0,0,0.2)" className="-right-40 bottom-0" size={520} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Reveal show={inView} from="left" delay={0.05}>
          <SectionLabel>Our Divisions</SectionLabel>
        </Reveal>
        <Reveal show={inView} from="left" delay={0.12}>
          <h2 className="text-white mt-4" style={display("clamp(1.6rem, 3.4vw, 2.8rem)")}>NINE DIVISIONS, ONE CAR</h2>
        </Reveal>
        <Reveal show={inView} from="left" delay={0.18} className="mt-5 mb-10">
          <Slash width={72} />
        </Reveal>

        {/* Desktop mosaic */}
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
          {SUBTEAMS.map(({ name, image, area }, i) => (
            <SubteamCell key={name} name={name} image={image} area={area} index={i} show={inView} />
          ))}
        </div>

        {/* Mobile — 2 up */}
        <div className="grid md:hidden grid-cols-2 gap-2 w-full">
          {SUBTEAMS.map(({ name, image }, i) => (
            <SubteamCell key={name} name={name} image={image} index={i} show={inView} mobileHeight />
          ))}
        </div>
      </div>
    </section>
  );
}

function SubteamCell({ name, image, area, index, show, mobileHeight = false }: {
  name: string; image: string; area?: string; index: number; show: boolean; mobileHeight?: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Reveal
      show={show}
      from={index % 2 === 0 ? "left" : "right"}
      delay={index * STAGGER}
      distance={36}
      className="h-full"
      style={{ gridArea: area }}
    >
      <div
        className="relative overflow-hidden cursor-default group h-full"
        style={{
          height: mobileHeight ? "clamp(80px, 28vw, 160px)" : undefined,
          outline: hover ? "2px solid var(--accent)" : "2px solid transparent",
          outlineOffset: "-2px",
          transition: `outline-color 0.12s ${SNAP}`,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0 transition-colors duration-300"
          aria-hidden="true"
          style={{ background: hover ? "rgba(120,0,0,0.35)" : "rgba(0,0,0,0.45)" }}
        />
        {/* Red wipe along the bottom edge on hover */}
        <div
          className="absolute bottom-0 left-0 h-[3px]"
          aria-hidden="true"
          style={{ width: hover ? "100%" : "0%", background: "var(--accent)", transition: `width 0.25s ${SNAP}` }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-2">
          <span
            className="text-white text-center"
            style={{
              ...display(mobileHeight ? "clamp(0.9rem, 4vw, 1.4rem)" : "clamp(0.9rem, 2.5vw, 2rem)"),
              textShadow: "2px 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            {name}
          </span>
        </div>
      </div>
    </Reveal>
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
    labelColor: "#e5e4e2",
    amount: "$10,000 +",
    amountColor: "var(--accent)",
    desktopCols: 2,
    sponsors: [
      { name: "RELI Group", logo: SponsorRELI, href: "https://www.religroupinc.com/" },
      { name: "X Corp Solutions", logo: SponsorXcorp, href: "https://xcorpsolutions.com/", logoSize: "max-h-32" },
    ],
  },
  {
    label: "Gold",
    labelColor: "var(--accent-alt)",
    amount: "$5,000 - $10,000",
    amountColor: "var(--accent)",
    desktopCols: 2,
    sponsors: [
      { name: "Chell Instruments",   logo: SponsorChell,   href: "https://chell.co.uk/", logoSize: "max-h-32" },
      { name: "DC SAE", logo: SponsorDC, href: "https://www.sae.org/memberships/find-your-section/doc-washington-dc", logoSize: "max-h-24" },
      { name: "Lockheed Martin", logo: SponsorLockheed, href: "https://www.lockheedmartin.com/en-us/index.html" },
      { name: "MotionTech", logo: SponsorMoTech, href: "https://www.motiontech.com/" },
      { name: "Northrop Grumman", logo: SponsorGrumman, href: "https://www.northropgrumman.com/" },
      { name: "Rapid Harness", logo: SponsorRapid, href: "https://rapidharness.com/" },
      { name: "SIEMENS", logo: SponsorSiemens, href: "https://www.siemens.com/en-us/" },
      { name: "SKF", logo: SponsorSKF, href: "https://www.skf.com/group" },
      { name: "ST Engineering", logo: SponsorST, href: "https://www.stengg.com/" },
      { name: "SurreySensors", logo: SponsorSurrey, href: "https://www.surreysensors.com/", logoSize: "max-h-32" }
    ],
  },
  {
    label: "Silver",
    labelColor: "#c0c0c0",
    amount: "$1,000 - $5,000",
    amountColor: "var(--accent)",
    desktopCols: 3,
    sponsors: [
      { name: "EPSON", logo: SponsorEpson, href: "https://epson.com/usa" },
      { name: "The Gill Corporation", logo: SponsorGill, href: "https://www.thegillcorp.com/" },
      { name: "IZZE Racing", logo: SponsorIzze, href: "https://www.izzeracing.com/" },
      { name: "A. James Clark School of Engineering", logo: SponsorClark, href: "https://eng.umd.edu/" },
      { name: "L3 Harris", logo: SponsorL3, href: "https://www.l3harris.com/" },
      { name: "New German Performance", logo: SponsorNGP, href: "https://www.ngpracing.com/" },
      { name: "Scanivalve", logo: SponsorScanivalve, href: "https://scanivalve.com/" },
      { name: "Terrapin Works", logo: SponsorTerpWorks, href: "https://terrapinworks.umd.edu/" },
      { name: "Teslong", logo: SponsorTeslong, href: "https://teslong.com/", logoSize: "max-h-36" }
    ],
  },
  {
    label: "Bronze",
    labelColor: "#cd7f32",
    amount: "$0 - $1,000",
    amountColor: "var(--accent)",
    desktopCols: 2,
    sponsors: [
      { name: "1987 Machinery",  logo: Sponsor1987,  href: "https://1987machinery.com/", logoSize: "max-h-32" },
      { name: "Cardinal Scientific", logo: SponsorCardinal, href: "https://cardinalscientific.com/", logoSize: "max-h-32" },
      { name: "DeWalt", logo: SponsorDeWalt,    href: "https://www.dewalt.com/en-us" },
      { name: "FK Bearings", logo: SponsorFK, href: "https://www.fk-bearing.com/" },
      { name: "Healthy Pet Mobile Vet", logo: SponsorPetVet, href: "https://www.healthypetmobilevet.com/", logoSize: "max-h-32" },
      { name: "Intalox", logo: SponsorIntralox, href: "https://www.intralox.com/" },
      { name: "MSBR", logo: SponsorMSBR, href: "https://mdspace.org/", logoSize: "max-h-24" },
      { name: "SAE International", logo: SponsorSAE, href: "https://www.sae.org/" },
      { name: "SHD Composites", logo: SponsorSHD, href: "https://shdcomposites.com/us", logoSize: "max-h-24" },
      { name: "SUNLU", logo: SponsorSunlu, href: "https://www.sunlu.com/" }
    ],
  },
];

function SponsorLogoCell({ sponsor }: { sponsor: Sponsor }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center px-5 py-4 min-h-[92px] md:min-h-[110px]"
      style={{
        background: "#000000",
        border: `1px solid ${hover ? "var(--accent)" : "rgba(195,0,0,0.35)"}`,
        boxShadow: hover ? "0 0 26px rgba(195,0,0,0.35)" : "none",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: `border-color 0.12s ${SNAP}, box-shadow 0.12s ${SNAP}, transform 0.12s ${SNAP}`,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={sponsor.logo}
        alt={sponsor.name}
        className={`${sponsor.logoSize ?? "max-h-16"} w-full object-contain`}
        loading="lazy"
      />
    </a>
  );
}

// Wider minimum for the top tiers so their logos read larger, while still
// reflowing to one column on a phone.
const tierMinCellWidth = (desktopCols: number) => (desktopCols <= 2 ? "300px" : "240px");

function SponsorTierSection({ tier, delay, show }: { tier: SponsorTierData; delay: number; show: boolean }) {
  return (
    <Reveal show={show} from="left" delay={delay}>
      <div className="flex items-center gap-4 mb-4">
        <span
          className="text-xs font-bold uppercase whitespace-nowrap"
          style={{ color: tier.labelColor, fontFamily: FONT_LABEL, letterSpacing: "0.22em" }}
        >
          {tier.label}
        </span>
        <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(195,0,0,0.5), transparent)" }} />
        <span
          className="text-xs whitespace-nowrap"
          style={{ color: tier.amountColor, fontFamily: FONT_LABEL, letterSpacing: "0.1em" }}
        >
          {tier.amount}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(${tierMinCellWidth(tier.desktopCols)}, 1fr))`,
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
  const { ref, inView } = useInView(0.05);

  return (
    <section ref={ref} className="relative bg-black overflow-hidden px-6 sm:px-10 md:px-16 py-20 md:py-24">
      <GridOverlay opacity={0.08} />
      <Glow color="rgba(195,0,0,0.22)" className="-left-40 top-1/4" size={520} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <Reveal show={inView} from="left" delay={0.05}>
          <SectionLabel>Our Partners</SectionLabel>
        </Reveal>
        <Reveal show={inView} from="left" delay={0.12}>
          <h2 className="text-white mt-4" style={display("clamp(1.6rem, 3.4vw, 2.8rem)")}>OUR SPONSORS</h2>
        </Reveal>
        <Reveal show={inView} from="left" delay={0.18} className="mt-5 mb-12">
          <Slash width={72} />
        </Reveal>

        <div className="flex flex-col gap-10 md:gap-12">
          {SPONSOR_TIERS.map((tier, i) => (
            <SponsorTierSection key={tier.label} tier={tier} delay={0.24 + i * STAGGER} show={inView} />
          ))}
        </div>
      </div>

      <CornerAccent at="br" />
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function IC() {
  return (
    <div className="bg-black overflow-x-hidden" style={themeVars("ic")}>
      <NavBar/>
      <Hero />
      <WhoWeAre />
      <Season2026 />
      <StatsOverlay image={statsOverlayImage} />
      <SubteamsGrid />
      <SponsorsSection />
    </div>
  );
}
