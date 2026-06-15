import NavBar from "~/components/navbar";

import race_car_image from "../public/images/IC/ic_racecar_image.png"
import race_schedule_car from "../public/images/IC/race_schedule_car.png"

import Header from "~/components/header";
import { header2_className, header2_style } from "~/siteInfo";
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

// ── Race Schedule ─────────────────────────────────────────────────────────────
function RaceSchedule() {
  const sections = [
    { title: "Pre-Comp Preparation", caption: "Online | May 4 | 6:00pm - 7:30pm",        bg: "bg-red-600" },
    { title: "Suspension",           caption: "Michigan Int. Speedway | May 13 - 16",     bg: "bg-yellow-400" },
    { title: "Powertrain",           caption: "Location | Time | Date",                   bg: "bg-red-600" },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full overflow-hidden bg-black">
      {/* Left: Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={race_schedule_car}
          alt="Race car"
          className="w-full object-cover p-[clamp(16px,4vw,40px)]"
        />
      </div>

      {/* Right: Content */}
      <div className="flex-1 flex flex-col gap-4 p-[clamp(16px,4vw,40px)] bg-black">
        <h2 className={header2_className} style={header2_style}>
          RACE SCHEDULE
        </h2>
        {sections.map((section) => (
          <div key={section.title} className={`${section.bg} rounded-lg p-3`}>
            <Header text={section.title} />
            <Paragraph text={section.caption} />
          </div>
        ))}
      </div>
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
      { name: "RELI Group", logo: SponsorRELI, href: "https://www.religroupinc.com/" },
      { name: "X Corp Solutions", logo: SponsorXcorp, href: "https://xcorpsolutions.com/", logoSize: "max-h-32" },
    ],
  },
  {
    label: "Gold",
    labelColor: "#ffd200",
    amount: "$5,000 - $10,000",
    amountColor: "#C30000",
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
    amountColor: "#C30000",
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
    amountColor: "#C30000",
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
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center bg-black p-4 min-h-[80px] md:min-h-[100px] transition-all duration-200 hover:brightness-90 hover:scale-[1.03]"
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
          backgroundColor: "black",
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
      <RaceSchedule />
      <StatsOverlay image={statsOverlayImage} />
      <SubteamsGrid />
      <SponsorsSection />
    </div>
  );
}