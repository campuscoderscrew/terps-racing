import NavBar from "~/components/navbar";

import race_car_image from "../public/images/IC/ic_racecar_image.png"
import race_schedule_car from "../public/images/IC/race_schedule_car.png"
import { Link } from "react-router-dom";


import Header from "~/components/header";
import { header2_className, header2_style } from "~/siteInfo";
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
import { useState } from "react";

const SUBTEAMS = [
  {
    name: "Chassis",
    image: Chasis,
    area: "chassis",
    description:
      "(chassis info here)",
  },
  {
    name: "Powertrain",
    image: Powertrain,
    area: "powertrain",
    description:
      "(powertrain info here)",
  },
  {
    name: "Manufacturing",
    image: Manufacturing,
    area: "manufacturing",
    description:
      "(manufacturing info here)",
  },
  {
    name: "Electronics",
    image: Electronics,
    area: "electronics",
    description:
      "(electronics info here)",
  },
  {
    name: "Testing",
    image: Testing,
    area: "testing",
    description:
      "(testing info here)",
  },
  {
    name: "ECS",
    image: ECS,
    area: "ecs",
    description:
      "(ecs info here)",
  },
  {
    name: "Business",
    image: Business,
    area: "business",
    description:
      "(business info here)",
  },
  {
    name: "Aerodynamics",
    image: Aerodynamics,
    area: "aerodynamics",
    description:
      "(aerodynamics info here)",
  },
  {
    name: "Vehicle Dynamics",
    image: VehicleDynamics,
    area: "dynamics",
    description:
      "(vehicle dynamics info here)",
  },
];

function SubteamsGrid() {
  const [selectedTeam, setSelectedTeam] = useState<
    (typeof SUBTEAMS)[number] | null
  >(null);

  return (
    <>
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
              className="relative overflow-hidden rounded-lg cursor-pointer group"
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

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
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
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
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
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/*bg*/}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/*popup*/}
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/*image*/}
        <div className="relative h-48 sm:h-64">
          <img
            src={team.image}
            alt={team.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/30 to-transparent" />

          {/*popup exit button*/}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white text-2xl hover:bg-black/80 transition-colors"
            aria-label="Close popup"
          >
            ×
          </button>

          {/*popup title*/}
          <div className="absolute bottom-5 left-6">
            <h2
              className="text-4xl sm:text-5xl text-white"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
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
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
            {team.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// -- GALLERY TEAMS CARDS -------------------
import team_pic from "../public/images/IC/team_pic.jpg"
import car_highlights from "../public/images/IC/car_scenic_zoomedin.jpg"
import process_pic from "../public/images/IC/car_model_simcenter.png"
import track_pic from "../public/images/IC/track_pic.jpg"

const ASSETS = {
  team_gallery: team_pic,
  highlights_gallery:  car_highlights,
  carprocess_gallery:   process_pic,
  track_gallery:   track_pic
};
const GALLERY = [
  {
    id: "team-gallery",
    name: "The Team",
    to: "team", /* will need to link to their respective gallery pages once made.*/
    img: ASSETS.team_gallery,
    alt: "Terps Racing Team",
    cardBg: "#ad0000", cardBorder: "#ad0000",
    nameCls: "text-white", descCls: "text-white", btnBg: "bg-black text-white", imgBg: "#050000",
  },
  {
    id: "highlights-gallery",
    name: "Highlights",
    to: "/ev",
    img: ASSETS.highlights_gallery,
    alt: "Terps Racing highlights of the electric car",
    cardBg: "#000000", cardBorder: "#ffd084",
    nameCls: "text-[#ffd200]", descCls: "text-[#ffd200]", btnBg: "bg-[#ffd200] text-black", imgBg: "transparent",
  },
  {
    id: "carprocess-gallery",
    name: "The Car/Process",
    to: "baja",
    img: ASSETS.carprocess_gallery,
    alt: "Terps Racing Car and Process Pics",
    cardBg: "#ffd200", cardBorder: "#d9d9d9",
    nameCls: "text-white", descCls: "text-white", btnBg: "bg-black text-white", imgBg: "#ffd200",
  },
];

function Gallery() {
  return (
    <section className="py-[clamp(40px,6vw,80px)] relative overflow-hidden" id="teams" aria-labelledby="teams-title">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="mb-10">
          <Header text="Gallery" />
        </div>

        {/* 1 col mobile → 2 col tablet → 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY.map((card) => (
            <article key={card.id}
              className="relative rounded-[14px] overflow-hidden h-[450px] shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
              aria-label={`${card.name} gallery`}
            >
              {/* Background image */}
              <img
                src={card.img}
                alt={card.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
                <h3
                  className={`leading-[1.4] mb-4 ${card.nameCls}`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
                  }}
                >
                  {card.name}
                </h3>

                <Link
                  to={card.to}
                  className={`px-8 py-[10px] rounded-full text-[0.875rem] font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-85 ${card.btnBg}`}
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  View Gallery
                </Link>
              </div>
              {/* // className="rounded-[14px] overflow-hidden flex flex-col shadow-[0_8px_24px_rgba(0,0,0,0.45)] border-[1.5px]"
              // style={{ background: card.cardBg, borderColor: card.cardBorder }}
              // aria-label={`${card.name} team`}>
              // <div className="w-full overflow-hidden relative" style={{ aspectRatio: "16/9", background: card.imgBg }}>
              //   <img src={card.img} alt={card.alt} className="w-full h-full object-cover" />
              // </div>
              // <div className="p-5 pb-6 flex flex-col flex-1">
              //   <h3 className={`leading-[1.4] mb-[10px] ${card.nameCls}`} style={{
              //     fontFamily: "'Inter', sans-serif",
              //     fontWeight: 500,
              //     fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
              //   }}>
              //     {card.name}
              //   </h3>
              //   <p className={`leading-[1.5] flex-1 mb-5 ${card.descCls}`} style={{
              //     fontFamily: "'Inter', sans-serif",
              //     fontWeight: 600,
              //     fontSize: "clamp(0.78rem, 1.1vw, 0.88rem)",
              //   }}>
                 
              //   </p>
              //   <Link to={card.to}
              //     className={`self-center px-8 py-[10px] rounded-full text-[0.875rem] font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-85 ${card.btnBg}`}
              //     style={{ fontFamily: "'Roboto', sans-serif" }}>
              //       View Gallery
              //   </Link>
              // </div> */}
            </article>
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
      <RaceSchedule />
      <StatsOverlay image={statsOverlayImage} />
      <SubteamsGrid />
      <Gallery />
      <SponsorsSection />
    </div>
  );
}