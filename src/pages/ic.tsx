import { useState } from "react";
import NavBar from "~/components/navbar";

import race_car_image from "../public/images/IC/ic_racecar_image.png"

import Header from "~/components/header";
import Paragraph from "~/components/paragraph";
import statsOverlayImage from "../public/images/IC/stats_overlay_image.png"

import SponsorKenesto  from "../public/images/IC/sponsors/Platinum/KenestoPNG.png"
import SponsorSiemens  from "../public/images/IC/sponsors/Platinum/Siemens.png"
import SponsorMRAS     from "../public/images/IC/sponsors/Gold/MRAS.jpg"
import SponsorDevcom   from "../public/images/IC/sponsors/Gold/Devcom.png"
import SponsorVR3      from "../public/images/IC/sponsors/Silver/vr3.Cartesian.Large_.png"
import SponsorTicon    from "../public/images/IC/sponsors/Silver/Ticon.png"
import SponsorDewalt   from "../public/images/IC/sponsors/Silver/dewalt-logo.png"
import SponsorSTEng    from "../public/images/IC/sponsors/Silver/STeng.png"
import SponsorPlascore from "../public/images/IC/sponsors/Silver/Plascore.png"
import SponsorAirtech  from "../public/images/IC/sponsors/Bronze/Airtech.png"
import SponsorIntralox from "../public/images/IC/sponsors/Bronze/Intralox.jpg"
import SponsorEandD    from "../public/images/IC/sponsors/Bronze/e-and-d-auto-cropped.jpg"

import Chasis from "../public/images/IC/subteams/Chassis.png"
import Powertrain from "../public/images/IC/subteams/Manufacturing.png"
import Manufacturing from "../public/images/IC/subteams/Manufacturing.png"
import Electronics from "../public/images/IC/subteams/Electronics.png"
import Testing from "../public/images/IC/subteams/Testing.png"
import ECS from "../public/images/IC/subteams/ECS.png"
import Business from "../public/images/IC/subteams/Business.png"
import Aerodynamics from "../public/images/IC/subteams/Aerodynamics.png"
import VehicleDynamics from "../public/images/IC/subteams/Vehicle_Dynamics.png"

// ── Top Image ─────────────────────────────────────────────────────────────────
function TopImage() {
  return (
    <div className="relative">
      <img
        src={race_car_image}
        alt="Cool race car"
        className="mt-[72px] w-full object-cover"
      />
      <div
        className="absolute bottom-[2%] right-[4%] text-black"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.5rem, 5vw, 4.8rem)",
          transform: "scaleY(1.5)",
          fontStyle: "italic",
          letterSpacing: "-0.05em",
        }}
      >
        Formula IC
      </div>
    </div>
  );
}

// ── Who We Are ────────────────────────────────────────────────────────────────
function WhoWeAre() {
  const whoWeAreText =
    "Terps Racing Formula Internal Combustion is the University of Maryland's Formula SAE team. Since 1983, we've provided hands-on project-based engineering experiences for students. We are always looking to use our prior innovations and experience to further enhance our projects to continue to excel on the elite level.";

  return (
    <div className="bg-black px-[clamp(20px,5vw,80px)] py-10">
      <Header text="Who We Are" />
      <Paragraph text={whoWeAreText} />
    </div>
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
        ))}
      </div>
    </div>
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
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
      <img
        src={image}
        alt="Terps Racing car on track at night"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 p-[clamp(12px,4vw,48px)]">
        {stats.map(({ topLeft, heading, sub }, index) => (
          <div
            key={sub}
            className={`flex flex-col gap-[2px]
              ${topLeft ? "items-start" : "items-end"}
              ${index >= 2 ? "justify-end" : "justify-start"}
              ${!topLeft && "text-right"}
            `}
          >
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(1rem, 4.5vw, 3.8rem)",
              color: "#ffd200",
              lineHeight: 1.1,
              textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
            }}>
              {heading}
            </span>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(0.6rem, 2vw, 1.5rem)",
              color: "#ffd200",
              lineHeight: 1.2,
              textShadow: "1px 1px 6px rgba(0,0,0,0.9)",
            }}>
              {sub}
            </span>
          </div>
        ))}
      </div>
    </div>
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
  return (
    <div className="bg-black w-full pt-10 px-[clamp(20px,5vw,80px)] pb-10">
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
        {SUBTEAMS.map(({ name, image, area }) => (
          <SubteamCell key={name} name={name} image={image} area={area} />
        ))}
      </div>

      {/* Mobile grid — simple 2 col */}
      <div className="grid md:hidden grid-cols-2 gap-2 w-full">
        {SUBTEAMS.map(({ name, image }) => (
          <div key={name} className="relative overflow-hidden rounded-lg cursor-pointer group" style={{ height: "clamp(80px, 28vw, 160px)" }}>
            <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontStyle: "italic",
                fontSize: "clamp(0.9rem, 4vw, 1.4rem)",
                color: "white",
                textShadow: "2px 2px 8px rgba(0,0,0,0.9)",
                letterSpacing: "-0.02em",
              }}>
                {name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubteamCell({ name, image, area }: { name: string; image: string; area: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      style={{ gridArea: area }}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: "clamp(0.9rem, 2.5vw, 2rem)",
          color: "white",
          textShadow: "2px 2px 8px rgba(0,0,0,0.9)",
          letterSpacing: "-0.02em",
        }}>
          {name}
        </span>
      </div>
    </div>
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
    amountColor: "#C30000",
    desktopCols: 2,
    sponsors: [
      { name: "Kenesto", logo: SponsorKenesto, href: "https://www.kenesto.com/" },
      { name: "Siemens", logo: SponsorSiemens, href: "https://www.siemens.com/global/en.html" },
    ],
  },
  {
    label: "Gold",
    labelColor: "#ffd200",
    amount: "$5,000 - $10,000",
    amountColor: "#C30000",
    desktopCols: 2,
    sponsors: [
      { name: "MRAS",   logo: SponsorMRAS,   href: "https://mras-usa.com/", logoSize: "max-h-32" },
      { name: "DEVCOM", logo: SponsorDevcom, href: "https://devcom.army.mil/" },
    ],
  },
  {
    label: "Silver",
    labelColor: "#c0c0c0",
    amount: "$1,000 - $5,000",
    amountColor: "#C30000",
    desktopCols: 3,
    sponsors: [
      { name: "VR3 Engineering", logo: SponsorVR3,      href: "https://vr3.ca/" },
      { name: "TiCON",           logo: SponsorTicon,    href: "https://www.ticonindustries.com/" },
      { name: "DeWalt",          logo: SponsorDewalt,   href: "http://www.dewalt.com/" },
      { name: "ST Engineering",  logo: SponsorSTEng,    href: "https://mras-usa.com/" },
      { name: "Plascore",        logo: SponsorPlascore, href: "https://www.plascore.com/", logoSize: "max-h-24" },
    ],
  },
  {
    label: "Bronze",
    labelColor: "#cd7f32",
    amount: "$0 - $1,000",
    amountColor: "#C30000",
    desktopCols: 3,
    sponsors: [
      { name: "Airtech",  logo: SponsorAirtech,  href: "https://airtech.com/",                                logoSize: "max-h-32" },
      { name: "Intralox", logo: SponsorIntralox, href: "http://www.intralox.com/",                             logoSize: "max-h-32" },
      { name: "E&D Auto", logo: SponsorEandD,    href: "https://explorekensington.com/e-d-auto-care-center/" },
    ],
  },
];

function SponsorLogoCell({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center bg-white p-4 min-h-[80px] md:min-h-[100px] transition-all duration-200 hover:brightness-90 hover:scale-[1.03]"
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

function SponsorTierSection({ tier }: { tier: SponsorTierData }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className="text-center mb-3"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
        }}
      >
        <span style={{ color: tier.labelColor }}>{tier.label}: </span>
        <span style={{ color: tier.amountColor }}>{tier.amount}</span>
      </div>
      <div
        className="border border-white overflow-hidden"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${tier.desktopCols}, 1fr)`,
          gap: "1px",
          backgroundColor: "white",
        }}
      >
        {tier.sponsors.map((sponsor) => (
          <SponsorLogoCell key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}

function SponsorsSection() {
  return (
    <div className="bg-black px-[clamp(20px,5vw,80px)] py-12">
      <h2
        className="text-white mb-10"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: "clamp(1.8rem, 5vw, 3rem)",
          letterSpacing: "-0.02em",
        }}
      >
        Our Sponsors
      </h2>
      <div className="flex flex-col gap-10">
        {SPONSOR_TIERS.map((tier) => (
          <SponsorTierSection key={tier.label} tier={tier} />
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function IC() {
  return (
    <div className="bg-black">
      <NavBar/>
      <TopImage />
      <WhoWeAre />
      <Season2026 />
      <StatsOverlay image={statsOverlayImage} />
      <SubteamsGrid />
      <SponsorsSection />
    </div>
  );
}