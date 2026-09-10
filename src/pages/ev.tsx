import { useEffect, useRef, useState } from "react";
import ev_car from "../public/images/EV/ev_car.png"
import ev_hero_background from "../public/images/EV/ev_hero_background.png"
import middle_background from "../public/images/EV/ev_middle_background.png"
import ev_compete_background from "../public/images/EV/bottom_background.png"
import NavBar from "~/components/navbar";

// ── Sponsor Imports ───────────────────────────────────────────────────────────
import SponsorAboutEnergy from "../public/images/EV/sponsors/Title/about_energy.png"
import SponsorAltium from "../public/images/EV/sponsors/Title/altium.png"
import SponsorFJB from "../public/images/EV/sponsors/Title/fjb.png"
import SponsorUMDECE from "../public/images/EV/sponsors/Title/umd_ece.png"

import SponsorCardinal from "../public/images/EV/sponsors/Platinum/cardinal_scientific.png"
import SponsorHerrmann from "../public/images/EV/sponsors/Platinum/herrmann_ultrasonics.png"
import SponsorTesla from "../public/images/EV/sponsors/Platinum/tesla.png"

import SponsorGeneHaas from "../public/images/EV/sponsors/Gold/gene_haas_foundation.png"
import SponsorGoEngineer from "../public/images/EV/sponsors/Gold/go_engineer.png"
import SponsorPreciscion from "../public/images/EV/sponsors/Gold/precision_auto_research.png"
import SponsorProtocase from "../public/images/EV/sponsors/Gold/terrapin_works.png"
import SponsorTerrapinWorks from "../public/images/EV/sponsors/Gold/terrapin_works.png"
import SponsorTexasInst from "../public/images/EV/sponsors/Gold/texas_instruments.png"

import SponsorEastPlating from "../public/images/EV/sponsors/Silver/eastern_plating_company.png"
import SponsorIzze from "../public/images/EV/sponsors/Silver/izze.png"
import SponsorMohr from "../public/images/EV/sponsors/Silver/mohr_composites.png"
import SponsorRapidHarness from "../public/images/EV/sponsors/Silver/rapid_harness.png"
import SponsorTTControl from "../public/images/EV/sponsors/Silver/tt_control.png"

import SponsorBender from "../public/images/EV/sponsors/Bronze/bender.png"
import SponsorGoodwinds from "../public/images/EV/sponsors/Bronze/goodwinds_composites.png"
import SponsorProwireUSA from "../public/images/EV/sponsors/Bronze/prowire_usa.png"
import SponsorVR3 from "../public/images/EV/sponsors/Bronze/vr3_engineering.png"

function EVParagraph({ text }: { text: string }) {
  return (
    <p
      className="mb-8 md:mb-12 max-w-xl"
      style={{
        color: "rgba(200,200,200,0.8)",
        fontFamily: "'Georgia', serif",
        lineHeight: 1.8,
        fontSize: "0.875rem",
      }}
    >
      {text}
    </p>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center mt-10">
      {/* Background */}
      <img
        src={ev_hero_background}
        alt="background"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.7) saturate(1.4)" }}
      />

      {/* Grid overlay */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-10 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, transparent 70%)" }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* Car — hidden on mobile, shown md+ */}
      <div
        className="hidden md:flex absolute right-0 z-20 w-3/5 h-full items-center justify-end"
        style={{
          transform: mounted ? "translateX(0)" : "translateX(8%)",
          opacity: mounted ? 1 : 0,
          transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 1.1s ease",
        }}
      >
        <img
          src={ev_car}
          alt="Terps Racing EV Car"
          className="absolute right-0 w-full object-contain"
          style={{ maxHeight: "85vh", mixBlendMode: "lighten", top: "50%", transform: "translateY(-55%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-30 w-full max-w-6xl mx-auto px-[clamp(20px,5vw,80px)] py-16 flex flex-col justify-center">
        {/* Eyebrow */}
        <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
          <span
            className="text-xs font-bold uppercase mb-6 block"
            style={{ color: "#e8180e", fontFamily: "'Courier New', monospace", letterSpacing: "0.28em" }}
          >
            University of Maryland
          </span>
        </div>

        {/* Heading */}
        <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s" }}>
          <h1
            className="text-white leading-none mb-8 select-none"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontWeight: 900,
              fontSize: "clamp(3rem, 10vw, 8rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              textShadow: "0 0 80px rgba(192,16,10,0.35), 0 4px 32px rgba(0,0,0,0.8)",
            }}
          >
            Terps<br />
            <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)", color: "transparent", textShadow: "none" }}>
              Racing
            </span>{" "}
            <span style={{ color: "#e8180e" }}>EV</span>
          </h1>
        </div>

        {/* Divider */}
        <div className="mb-8" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s" }}>
          <div className="h-px w-48" style={{ background: "linear-gradient(90deg, #c0100a, transparent)" }} />
        </div>

        {/* Body */}
        <div className="max-w-xs" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.9s ease 0.65s, transform 0.9s ease 0.65s" }}>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(210,210,210,0.82)", fontFamily: "'Georgia', serif", lineHeight: 1.75, fontSize: "0.85rem" }}>
            Founded in 2019, Terps Racing Formula SAE is Terps Racing's newest branch, and is faced
            with a modern challenge: convert the classic formula-style experience that has been around
            for decades into something sustainable and clean.
          </p>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 z-30 w-20 h-1 bg-red-600" />
      <div className="absolute top-0 left-0 z-30 w-1 h-20 bg-red-600" />
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

const IconElectrical = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M23 4L8 22h13l-4 14 15-18H19L23 4z" fill="#e8a010" stroke="#e8a010" strokeWidth="0.5" strokeLinejoin="round" />
  </svg>
);
const IconAero = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M4 14 Q14 10 26 16 Q34 20 38 14" stroke="#e8a010" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M4 20 Q14 16 26 22 Q34 26 38 20" stroke="#e8a010" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M4 26 Q14 22 26 28 Q34 32 38 26" stroke="#e8a010" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <polygon points="34,11 40,14 34,17" fill="#e8a010" />
  </svg>
);
const IconMechanical = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="15" cy="15" r="6" stroke="#e8a010" strokeWidth="2.5" fill="none" />
    <line x1="19" y1="19" x2="36" y2="36" stroke="#e8a010" strokeWidth="4" strokeLinecap="round" />
    <line x1="9" y1="15" x2="2" y2="15" stroke="#e8a010" strokeWidth="2" strokeLinecap="round" />
    <line x1="15" y1="9" x2="15" y2="2" stroke="#e8a010" strokeWidth="2" strokeLinecap="round" />
    <line x1="21" y1="9" x2="23" y2="4" stroke="#e8a010" strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="21" x2="4" y2="23" stroke="#e8a010" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconBusiness = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="3" y="18" width="8" height="18" rx="1" fill="none" stroke="#e8a010" strokeWidth="2" />
    <rect x="16" y="10" width="8" height="26" rx="1" fill="none" stroke="#e8a010" strokeWidth="2" />
    <rect x="29" y="4" width="8" height="32" rx="1" fill="none" stroke="#e8a010" strokeWidth="2" />
    <polyline points="5,16 18,8 31,2" stroke="#e8a010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="27,2 31,2 31,6" stroke="#e8a010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  visible: boolean;
}

const FeatureCard = ({ icon, title, description, delay, visible }: FeatureCardProps) => (
  <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
    <div className="mb-4">{icon}</div>
    <h3 className="text-base font-bold mb-3" style={{ color: "#e8a010", fontFamily: "'Courier New', monospace", letterSpacing: "0.05em" }}>
      {title}
    </h3>
    <p className="text-sm leading-relaxed" style={{ color: "rgba(200,200,200,0.78)", fontFamily: "'Georgia', serif", lineHeight: 1.75, fontSize: "0.82rem" }}>
      {description}
    </p>
  </div>
);

const features = [
  { icon: <IconElectrical />, title: "Electrical", description: "Our car is powered by a team-built, team-made battery pack with a 3-phase electric motor and inductor, outputting over 55 kilowatts at the driveshaft." },
  { icon: <IconAero />, title: "Aerodynamics", description: "Custom carbon fiber parts are manufactured from CFD analysis to develop a dedicated aerodynamics package, generating over 100 pounds of downforce." },
  { icon: <IconMechanical />, title: "Mechanical", description: "For each vehicle made, our team develops and manufactures a chassis and suspension package — featuring both independent front and rear suspension — to both optimize performance and driver safety." },
  { icon: <IconBusiness />, title: "Business", description: "We manage sponsor relations (engaging with existing and prospective organizations), financial planning, budgeting and supply chain logistics, and assist with procurement, ensuring the team's operations run smoothly." },
];

function AboutSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-black overflow-hidden flex items-stretch">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={middle_background} alt="EV background" className="w-full h-full object-cover object-center" style={{ filter: "brightness(0.55) saturate(0.9)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 65%, rgba(0,0,0,0.92) 85%)" }} />
        {/* On mobile, also darken from top so text is readable */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 30%, transparent 60%)" }} />
      </div>

      {/* Top-left label */}
      <div className="absolute top-8 left-6 sm:left-8 z-20">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#e8a010", fontFamily: "'Courier New', monospace", letterSpacing: "0.25em" }}>
          About TREV
        </span>
      </div>

      {/* Content:
          - Mobile: full width, centered, padded
          - md+: right 60%, pushed to the right
      */}
      <div className="relative z-10 w-full flex">
        {/* Spacer — only on md+ */}
        <div className="hidden md:block md:w-2/5 shrink-0" />

        <div className="w-full md:w-3/5 px-[clamp(20px,5vw,80px)] pt-24 pb-16 flex flex-col justify-center">
          {/* Heading */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s" }}>
            <h2
              className="font-black leading-tight mb-6"
              style={{ color: "#e8a010", fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "clamp(1.6rem, 4vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.01em" }}
            >
              What sets the Terps Racing<br />EV team apart from the rest?
            </h2>
          </div>

          {/* Body */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s" }}>
            <EVParagraph text="With a fully electric, performance-oriented platform, Terps Racing's Formula SAE Electric contender is designed to push the limits of what is currently possible in electric racing. Powered by a custom battery pack and 3 phase electric motor, our vehicle outputs over 55 kilowatts at the driveshaft. With a dedicated aerodynamics package and independent front and rear suspension, our vehicle remains planted at speeds in excess of 100km/h through the tight turns of a race track." />
          </div>

          {/* Divider */}
          <div className="mb-8 md:mb-10" style={{ opacity: visible ? 1 : 0, transform: visible ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s" }}>
            <div className="h-px w-32" style={{ background: "linear-gradient(90deg, #e8a010, transparent)" }} />
          </div>

          {/* Feature grid — 1 col on mobile, 2 on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 md:gap-x-16 md:gap-y-12 max-w-xl">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} delay={0.45 + i * 0.1} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Compete ─────────────────────────────────────────────────────────────────

const ctaLinks = [
  { label: "Our Email",          href: "mailto:terpsracingev@gmail.com" },
  { label: "Instagram",          href: "https://www.instagram.com/terpsracing" },
  { label: "LinkedIn",           href: "https://www.linkedin.com/company/93344451" },
  { label: "Newsletter Sign-Up", href: "http://eepurl.com/iAS00Q" },
];

function CompeteSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-black overflow-hidden flex items-center">
      {/* Background */}
      <img src={ev_compete_background} alt="background" className="absolute inset-0 z-0 w-full h-full object-cover object-center" style={{ filter: "brightness(0.85)" }} />

      {/* Dark overlay on mobile so text is readable over the busy background */}
      <div className="absolute inset-0 z-10 md:hidden" style={{ background: "rgba(0,0,0,0.45)" }} />

      {/* Content — centered, constrained width */}
      <div className="relative z-20 w-full max-w-2xl mx-auto px-[clamp(20px,5vw,80px)] py-16 md:py-20 flex flex-col">
        {/* Heading */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s" }}>
          <h2
            className="font-black leading-tight mb-4"
            style={{ color: "#e8a010", fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", letterSpacing: "-0.01em" }}
          >
            Where does TREV compete?
          </h2>
        </div>

        {/* Intro */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s" }}>
          <EVParagraph text="The Terps Racing EV team builds, designs, and races an electric open-wheel vehicle built for Formula SAE competitions. Competitions comprise of static events (cost, design, and business presentations) and dynamic events (endurance, autocross, skidpad, and acceleration)." />
        </div>

        {/* Stat */}
        <div className="mb-6 md:mb-8" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s" }}>
          <p style={{ color: "#fff", fontFamily: "'Georgia', serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em" }}>
            &gt;100
          </p>
          <p style={{ color: "#fff", fontFamily: "'Georgia', serif", fontSize: "clamp(1rem, 2vw, 1.5rem)", fontWeight: 700, letterSpacing: "0.02em" }}>
            members
          </p>
        </div>

        {/* Body */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s" }}>
          <EVParagraph text="Our team is made up of undergraduate students from a wide range of disciplines, including engineering and business. Our alumni have gone on to work at leading companies and startups around the world — including Tesla, SpaceX, Rivian, Honda, General Motors, and NVIDIA. If you're passionate about shaping the next generation of FSAE vehicles, join us. If you'd like to help develop the next generation of engineers and leaders, we'd love to hear from you!" />
        </div>

        {/* CTA buttons — wrap on mobile */}
        <div
          className="flex flex-wrap gap-3 md:gap-4 mt-2"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s" }}
        >
          {ctaLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 md:px-5 py-2 text-xs font-bold uppercase"
              style={{ color: "#e8a010", border: "1.5px solid #e8a010", fontFamily: "'Courier New', monospace", letterSpacing: "0.12em", textDecoration: "none", transition: "background 0.2s, color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#e8a010"; (e.currentTarget as HTMLAnchorElement).style.color = "#000"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#e8a010"; }}
            >
              {link.label}
            </a>
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
    label: "Title",
    labelColor: "#57E8FF",
    amount: "$10,000+",
    amountColor: "#C30000",
    desktopCols: 2,
    sponsors: [
      {name: "About:Energy", logo: SponsorAboutEnergy, href: "https://www.aboutenergy.io/"},
      {name: "Altium", logo: SponsorAltium, href: "https://www.altium.com/"},
      {name: "FJB Engineering", logo: SponsorFJB, href: "https://www.altium.com/"},
      {name: "UMD Dept. of Electrical & Computer Engineering", logo: SponsorUMDECE, href: "https://ece.umd.edu/"},
    ],
  },
  {
    label: "Platinum",
    labelColor: "#E5E4E2",
    amount: "$5,000 - $10,000",
    amountColor: "#C30000",
    desktopCols: 3,
    sponsors: [
      {name: "Cardinal Scientific", logo: SponsorCardinal, href: "https://cardinalscientific.com/"},
      {name: "Herrmann Ultrasonics", logo: SponsorHerrmann, href: "https://www.herrmannultrasonics.com/en-us/products/ultrasonic-components"},
      {name: "Tesla", logo: SponsorTesla, href: "https://www.tesla.com/"},
    ],
  },
  {
    label: "Gold",
    labelColor: "#FFD700",
    amount: "$2,500 - $5,000",
    amountColor: "#C30000",
    desktopCols: 3,
    sponsors: [
      {name: "Gene Haas Foundation", logo: SponsorGeneHaas, href: "Unkown site"},
      {name: "go engineer", logo: SponsorGoEngineer, href: "https://www.goengineer.com/"},
      {name: "Precision Auto Research", logo: SponsorPreciscion, href: "https://precisionautoresearch.com/"},
      {name: "Protocase", logo: SponsorProtocase, href: "https://www.protocase.com/"},
      {name: "Terrapin Works", logo: SponsorTerrapinWorks, href: "https://terrapinworks.umd.edu/"},
      {name: "Texas Instruments", logo: SponsorTexasInst, href: "https://www.ti.com/"},
    ],
  },
  {
    label: "Silver",
    labelColor: "#c0c0c0",
    amount: "$1,000 - $2,500",
    amountColor: "#C30000",
    desktopCols: 3,
    sponsors: [
      {name: "Eastern Plating Company", logo: SponsorEastPlating, href: "https://easternplatingcompany.com/"},
      {name: "Izze Racing", logo: SponsorIzze, href: "https://www.famaengineering.com/it/brand-produttori/izze/"},
      {name: "Mohr Composites", logo: SponsorMohr, href: "https://www.mohrcomposites.com/"},
      {name: "Rapid Harness", logo: SponsorRapidHarness, href: "https://rapidharness.com/"},
      {name: "TTControl", logo: SponsorTTControl, href: "https://www.ttcontrol.com/"},
    ],
  },
  {
    label: "Bronze",
    labelColor: "#CD7F32",
    amount: "500 - $1,000",
    amountColor: "#C30000",
    desktopCols: 2,
    sponsors: [
      {name: "Bender", logo: SponsorBender, href: "https://www.benderinc.com/"},
      {name: "Goodwinds Composites", logo: SponsorGoodwinds, href: "https://goodwinds.com/"},
      {name: "Prowireusa", logo: SponsorProwireUSA, href: "https://goodwinds.com/"},
      {name: "VR3", logo: SponsorVR3, href: "https://vr3.ca/"},
    ],
  },
];

function SponsorLogoCell({ sponsor } : {sponsor : Sponsor}) {
  return (
    <a
    href = {sponsor.href}
    target = "_blank"
    rel = "noopener noreferrer"
    className = "flex items-center justify-center bg-white p-4 min-h-[80px] md:min-h-[100px] transition-all duration-200 hover:brightness-90 hover:scale-[1.03]"
    >
      <img
      src = {sponsor.logo}
      alt = {sponsor.name}
      className = {`${sponsor.logoSize ?? "max-h-16"} w-full object-contain`}
      loading = "lazy"
      />
    </a>
  );
}

function SponsorTierSection({ tier } : {tier : SponsorTierData}) {
  return (
    <div className = "w-full max-w-4xl mx-auto">
      <div
        className = "text-center mb-3"
        style = {{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
        }}
      >
        <span style = {{color: tier.labelColor}}> {tier.label}: </span> 
        <span style = {{color: tier.amountColor}}> {tier.amount}: </span>
      </div>
      <div
        className = "border border-white overflow-hidden"
        style = {{
          display: "grid",
          gridTemplateColumns: `repeat(${tier.desktopCols}, 1fr)`,
          gap: "1px",
          backgroundColor: "white",
        }}
      >
        {tier.sponsors.map((sponsor) => (
          <SponsorLogoCell key = {sponsor.name} sponsor = {sponsor} />
        ))}
      </div>
    </div>
  );
}

function SponsorsSection() {
  return(
    <div className = "bg-black px-[clamp(20px,5vw,80px)] py-12">
      <h2
        className = "text-white mb-10"
        style = {{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: "clamp(1.8rem, 5vw, 3rem)",
          letterSpacing: "-0.02em",
        }}
      >
        Our Sponsors
      </h2>
      <div className = "flex flex-col gap-10">
        {SPONSOR_TIERS.map((tier) => (
          <SponsorTierSection key = {tier.label} tier = {tier} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EV() {
  return (
    <div className="bg-black">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <CompeteSection />
      <SponsorsSection />
    </div>
  );
}