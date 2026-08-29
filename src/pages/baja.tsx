import { useState, useEffect } from "react";
import NavBar from "~/components/navbar";
import {
  useInView, Reveal, GridOverlay, Glow, HazardBand, CornerAccent,
  SectionLabel, FONT_LABEL, SNAP, STAGGER,
} from "~/components/accents";
import { themeVars } from "~/theme";

import BajaSponsorKenesto  from "../public/images/Baja/sponsors/Platinum/KenestoPNG.png"
import BajaSponsorViveLab  from "../public/images/Baja/sponsors/Gold/vivelab-blue-bottom-grey-slogan-SVG.svg"
import BajaSponsorDewalt   from "../public/images/Baja/sponsors/Silver/dewalt-logo.png"
import BajaSponsorPrecision from "../public/images/Baja/sponsors/Bronze/precision.jpg.webp"
import BajaSponsorKodiak   from "../public/images/Baja/sponsors/Bronze/kodiak.jpg"
import BajaSponsorGMN      from "../public/images/Baja/sponsors/Bronze/GMN-Logo-Stacked-Blue-Text-Transparent.png"
import BajaSponsorASCo     from "../public/images/Baja/sponsors/Bronze/American-Stripping-Company-Logo.png"
import BajaSponsorEandD    from "../public/images/Baja/sponsors/Bronze/e-and-d-auto-cropped.jpg"

// ── Types ─────────────────────────────────────────────────────────────────────
interface AccordionItem { title: string; body: string; }
interface EventItem { name: string; desc: string; }
interface StaticCard { img: string; alt: string; title: string; desc: string; }

// ── Data ──────────────────────────────────────────────────────────────────────
const ACCORDION_ITEMS: AccordionItem[] = [
  {
    title: "Design Process",
    body: "The design process goes through three stages of review before the final design is chosen: the Preliminary Review, the Critical Review, and the Final Review. The team also modifies older cars to test new designs on prior years' vehicles. Following the final review, the team moves into the build phase, continually innovating and redesigning even the smallest components.",
  },
  {
    title: "Competition Challenge",
    body: "The competition requires students to balance design and cost with dynamic performance while following strict safety guidelines and standardized rules. The team balances hard work with a passion for their car and believes that passion makes a significant difference in the competition.",
  },
];

const DYNAMIC_EVENTS: EventItem[] = [
  { name: "Time Trials", desc: "Teams compete individually on the third day in time-trial events that test specific aspects of vehicle performance." },
  { name: "Specialized Performance", desc: "Often focuses on suspension, traction, or rock crawling — pushing teams to adapt to different terrain and design demands." },
  { name: "Endurance Race", desc: "On the final day, all teams compete wheel-to-wheel in a four-hour endurance race testing durability, reliability, and overall performance." },
];

const STATIC_CARDS: StaticCard[] = [
  { img: "https://racing.umd.edu/files/2026/03/sales_presentation-e1775000595550.png", alt: "Sales Presentation", title: "Sales Presentation", desc: "Teams market their car as a highly specialized vehicle to a series of industry judges." },
  { img: "https://racing.umd.edu/files/2026/03/design_presentation.png", alt: "Design Presentation", title: "Design Presentation", desc: "Teams present the design, research, and testing done throughout the year to technical judges." },
  { img: "https://racing.umd.edu/files/2026/04/technical_inspection-1-e1775005735832.png", alt: "Technical Inspection", title: "Technical Inspection", desc: "Judges inspect every aspect of the car to make sure it meets competition rules and specifications." },
  { img: "https://racing.umd.edu/files/2026/04/talking0-2.png", alt: "Design Judging", title: "Design Judging", desc: "Teams explain what separates their car, what testing drove decisions, and highlight innovations." },
];

const GALLERY_IMGS = [
  { src: "https://racing.umd.edu/files/2024/06/IMG_6908-1.jpg", alt: "Baja team" },
  { src: "https://racing.umd.edu/files/2026/03/anjali-picture.jpg", alt: "Team member" },
  { src: "https://racing.umd.edu/files/2026/04/Team-Picture.jpg", alt: "Team picture" },
  { src: "https://racing.umd.edu/files/2026/03/kenesto.jpg", alt: "Competition" },
  { src: "https://racing.umd.edu/files/2024/06/Ben-loan-killing-it.jpg", alt: "Driver" },
];

// Baja's display voice: wide and blunt, deliberately not IC's condensed italic.
// Arial Black ships with macOS and Windows, so this renders as intended without
// pulling in another webfont.
const FONT_DISPLAY = '"Arial Black", "Helvetica Neue", Helvetica, Arial, sans-serif';
const FONT_BODY    = "'Source Sans 3', 'Source Sans Pro', Helvetica, Arial, sans-serif";

const display = (size: string): React.CSSProperties => ({
  fontFamily: FONT_DISPLAY,
  fontWeight: 900,
  fontSize: size,
  letterSpacing: "-0.03em",
  lineHeight: 1.03,
  textTransform: "uppercase",
});

const bodyText: React.CSSProperties = {
  fontFamily: FONT_BODY,
  color: "#aaaaaa",
  lineHeight: 1.7,
};

/** Blunt unskewed bar. IC's accent shape is a raked slash; Baja's sits flat and
 *  heavy, which is the whole difference between tarmac and trail. */
function Bar({ width = 72, height = 5, className = "" }: { width?: number; height?: number; className?: string }) {
  return <div className={className} aria-hidden="true" style={{ width, height, background: "var(--accent)" }} />;
}

// ── Accordion ─────────────────────────────────────────────────────────────────
function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="border-t border-[#2a2a2a] overflow-hidden">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title} className="border-b border-[#2a2a2a]">
            <button
              onClick={() => setOpenIndex(i)}
              className="w-full bg-transparent border-none text-[#f0f0f0] py-[13px] cursor-pointer flex justify-between items-center gap-2 text-[clamp(0.85rem,1.5vw,0.95rem)] font-semibold"
              style={{ fontFamily: "inherit", transition: `padding-left 0.12s ${SNAP}` }}
              onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "8px"; }}
              onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0px"; }}
            >
              {item.title}
              <span
                className="flex-shrink-0 w-[22px] h-[22px] border flex items-center justify-center text-[1.1rem] leading-none"
                style={{
                  borderColor: "var(--accent)",
                  color: isOpen ? "#0a0a0a" : "var(--accent)",
                  background: isOpen ? "var(--accent)" : "transparent",
                  transition: `background 0.12s ${SNAP}, color 0.12s ${SNAP}`,
                }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-[350ms] ease-in-out text-[clamp(0.82rem,1.4vw,0.9rem)]"
              style={{ height: isOpen ? "auto" : 0, paddingBottom: isOpen ? 14 : 0, ...bodyText }}
            >
              {item.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      className="relative w-full overflow-hidden flex items-end"
      style={{ minHeight: "clamp(460px, 50vw, 780px)" }}
    >
      <img
        src="https://racing.umd.edu/files/2024/06/Ben-loan-killing-it.jpg"
        alt="Terps Racing Baja car number 31 climbing a dirt hill during competition"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        style={{ objectPosition: "center 45%", filter: "brightness(0.68) saturate(0.85) contrast(1.05)" }}
      />
      {/* Warm wash — pushes the greens toward the page's earth palette */}
      <div className="absolute inset-0 z-0" aria-hidden="true"
        style={{ background: "rgba(90,55,25,0.3)", mixBlendMode: "multiply" }} />
      <GridOverlay opacity={0.1} size={120} />
      <div className="absolute inset-0 z-0" aria-hidden="true"
        style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.75) 0%, transparent 35%, rgba(10,10,10,0.95) 100%)" }} />
      <Glow color="rgba(184,115,51,0.35)" className="-left-32 bottom-10" size={560} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 md:px-16 pb-14 md:pb-20 pt-32">
        <Reveal show={mounted} from="left" delay={0.05}>
          <SectionLabel>University of Maryland · Baja SAE</SectionLabel>
        </Reveal>

        <Reveal show={mounted} from="up" delay={0.14} distance={40}>
          <h1 className="text-white select-none mt-5" style={display("clamp(2.4rem, 8.5vw, 7rem)")}>
            Terps Racing<br />
            <span style={{ color: "var(--accent)" }}>Baja</span>
          </h1>
        </Reveal>

        <Reveal show={mounted} from="up" delay={0.24}>
          <div className="flex items-center gap-4 mt-7">
            <Bar width={84} height={6} />
            <span
              className="uppercase"
              style={{ fontFamily: FONT_LABEL, fontSize: "0.7rem", letterSpacing: "0.26em", color: "rgba(255,255,255,0.78)" }}
            >
              Built for the dirt
            </span>
          </div>
        </Reveal>
      </div>

      <CornerAccent at="tl" />
      <HazardBand size={14} className="absolute inset-x-0 bottom-0 z-20" opacity={0.5} />
    </section>
  );
}

// ── Split band ────────────────────────────────────────────────────────────────
interface SplitBandProps {
  flip?: boolean;
  imgStyle: React.CSSProperties;
  children: (inView: boolean) => React.ReactNode;
}

/** Image on one side, content on the other. The content side animates in from
 *  whichever edge it sits against, so the two halves read as one movement. */
function SplitBand({ flip = false, imgStyle, children }: SplitBandProps) {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <GridOverlay opacity={0.06} size={120} />
      <div
        className="relative z-10 flex flex-col md:grid min-h-[420px]"
        style={{ gridTemplateColumns: flip ? "42% 58%" : "58% 42%" }}
      >
        <div
          className={`relative bg-cover bg-center bg-no-repeat min-h-[240px] md:min-h-[460px] ${flip ? "md:order-last" : ""}`}
          style={imgStyle}
        >
          <div className="absolute inset-0" aria-hidden="true" style={{
            background: flip
              ? "linear-gradient(to left, rgba(10,10,10,0) 55%, #0a0a0a 100%)"
              : "linear-gradient(to right, rgba(10,10,10,0) 40%, #0a0a0a 95%)",
          }} />
          <CornerAccent at={flip ? "tr" : "tl"} length={56} weight={3} />
        </div>

        <div className="px-[clamp(16px,5vw,48px)] py-[clamp(28px,5vw,64px)] flex flex-col justify-center">
          {children(inView)}
        </div>
      </div>
    </section>
  );
}

/** Label + heading + bar, the opening of every Baja section. */
function BandHeading({ label, title, inView, from = "right" }: {
  label: string; title: string; inView: boolean; from?: "left" | "right";
}) {
  return (
    <>
      <Reveal show={inView} from={from} delay={0.05}>
        <SectionLabel>{label}</SectionLabel>
      </Reveal>
      <Reveal show={inView} from={from} delay={0.12}>
        <h2 className="text-white mt-3" style={display("clamp(1.5rem, 3.2vw, 2.6rem)")}>{title}</h2>
      </Reveal>
      <Reveal show={inView} from={from} delay={0.18} className="mt-5 mb-7">
        <Bar />
      </Reveal>
    </>
  );
}

// ── What We Do ────────────────────────────────────────────────────────────────
function WhatWeDo() {
  return (
    <SplitBand imgStyle={{
      backgroundImage: "url('https://racing.umd.edu/files/2026/03/anjali-background2.png')",
      backgroundSize: "200%",
      backgroundPosition: "10% 60%",
    }}>
      {(inView) => (
        <>
          <BandHeading label="What We Do" title="Off-road, by design" inView={inView} />

          <Reveal show={inView} from="right" delay={0.24}>
            <p style={{ ...bodyText, fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", marginBottom: 22 }}>
              Terps Racing Baja SAE is an engineering project team that designs, builds, and races
              an off-road vehicle to compete in the SAE Collegiate Baja Design Series.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-7">
            {[
              <>Hands-on engineering for <strong style={{ color: "var(--accent)" }}>&gt;40</strong> students annually</>,
              <><strong style={{ color: "var(--accent)" }}>3</strong> yearly North American competitions with <strong style={{ color: "var(--accent)" }}>100s</strong> of teams</>,
            ].map((content, i) => (
              <Reveal key={i} show={inView} from="up" delay={0.3 + i * STAGGER} distance={28}>
                <div
                  className="bg-[#141414] border border-[#2a2a2a] border-l-[3px] px-[14px] py-3 h-full"
                  style={{ ...bodyText, borderLeftColor: "var(--accent)", fontSize: "clamp(0.82rem, 1.4vw, 0.9rem)" }}
                >
                  {content}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal show={inView} from="up" delay={0.44} distance={28}>
            <Accordion items={ACCORDION_ITEMS} />
          </Reveal>
        </>
      )}
    </SplitBand>
  );
}

// ── Dynamic Events ────────────────────────────────────────────────────────────
function DynamicEvents() {
  return (
    <SplitBand flip imgStyle={{
      backgroundImage: "url('https://racing.umd.edu/files/2026/04/Untitled-design.png')",
      backgroundSize: "130%",
      backgroundPosition: "100% 60%",
    }}>
      {(inView) => (
        <>
          <BandHeading label="Dynamic Events" title="Where it gets rough" inView={inView} from="left" />

          <Reveal show={inView} from="left" delay={0.24}>
            <p style={{ ...bodyText, fontSize: "clamp(0.85rem, 1.4vw, 0.92rem)", marginBottom: 24 }}>
              Cars take on a series of challenges such as maneuverability, acceleration, hill climb
              or tractor pull, and a special event unique to each competition.
            </p>
          </Reveal>

          <div className="flex flex-col">
            {DYNAMIC_EVENTS.map(({ name, desc }, i) => (
              <Reveal key={name} show={inView} from="left" delay={0.3 + i * STAGGER}>
                <div
                  className="flex gap-4 py-4"
                  style={{ borderTop: "1px solid #2a2a2a", transition: `padding-left 0.12s ${SNAP}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "8px"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0px"; }}
                >
                  <span style={{ fontFamily: FONT_LABEL, fontSize: "0.72rem", color: "var(--accent)", letterSpacing: "0.14em", paddingTop: "0.2rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="text-white block mb-1" style={display("clamp(0.92rem, 1.5vw, 1.15rem)")}>{name}</span>
                    <span style={{ ...bodyText, fontSize: "clamp(0.8rem, 1.4vw, 0.9rem)" }}>{desc}</span>
                  </div>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: "1px solid #2a2a2a" }} />
          </div>
        </>
      )}
    </SplitBand>
  );
}

// ── Static Events ─────────────────────────────────────────────────────────────
function StaticEventCard({ card, index, show }: { card: StaticCard; index: number; show: boolean }) {
  const [hover, setHover] = useState(false);
  const { img, alt, title, desc } = card;

  return (
    <Reveal show={show} from="up" delay={0.26 + index * STAGGER} distance={32} className="h-full">
      <div
        className="bg-[#141414] border overflow-hidden h-full flex flex-col"
        style={{
          borderColor: hover ? "var(--accent)" : "#2a2a2a",
          transform: hover ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hover ? "0 12px 30px rgba(0,0,0,0.6)" : "none",
          transition: `border-color 0.12s ${SNAP}, transform 0.12s ${SNAP}, box-shadow 0.12s ${SNAP}`,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative">
          <img src={img} alt={alt} className="w-full object-contain bg-[#181818] p-2 block" style={{ aspectRatio: "4/3" }} loading="lazy" />
          <div
            className="absolute bottom-0 left-0 h-[3px]"
            aria-hidden="true"
            style={{ width: hover ? "100%" : "0%", background: "var(--accent)", transition: `width 0.25s ${SNAP}` }}
          />
        </div>
        <div className="px-3 pt-[10px] pb-3 flex-1">
          <div className="text-white mb-1" style={display("clamp(0.8rem, 1.4vw, 0.95rem)")}>{title}</div>
          <p style={{ ...bodyText, fontSize: "clamp(0.78rem, 1.3vw, 0.82rem)", lineHeight: 1.5 }}>{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

function StaticEvents() {
  return (
    <SplitBand imgStyle={{
      backgroundImage: "url('https://racing.umd.edu/files/2026/04/Untitled-design-4.png')",
      backgroundSize: "250%",
      backgroundPosition: "20% 60%",
    }}>
      {(inView) => (
        <>
          <BandHeading label="Static Events" title="Judged off the track" inView={inView} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STATIC_CARDS.map((card, i) => (
              <StaticEventCard key={card.title} card={card} index={i} show={inView} />
            ))}
          </div>
        </>
      )}
    </SplitBand>
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
    amountColor: "var(--accent)",
    desktopCols: 1,
    boxMaxWidth: "max-w-md",
    sponsors: [
      { name: "Kenesto", logo: BajaSponsorKenesto, href: "https://www.kenesto.com/" },
    ],
  },
  {
    label: "Gold",
    labelColor: "#ffd200",
    amount: "$5,000 - $10,000",
    amountColor: "var(--accent)",
    desktopCols: 1,
    boxMaxWidth: "max-w-md",
    sponsors: [
      { name: "ViveLab Ergo", logo: BajaSponsorViveLab, href: "https://www.vivelab.cloud/" },
    ],
  },
  {
    label: "Silver",
    labelColor: "#c0c0c0",
    amount: "$1,000 - $5,000",
    amountColor: "var(--accent)",
    desktopCols: 1,
    boxMaxWidth: "max-w-md",
    sponsors: [
      { name: "DeWalt", logo: BajaSponsorDewalt, href: "http://www.dewalt.com/" },
    ],
  },
  {
    label: "Bronze",
    labelColor: "#cd7f32",
    amount: "$0 - $1,000",
    amountColor: "var(--accent)",
    desktopCols: 3,
    sponsors: [
      { name: "Precision Heat Treating", logo: BajaSponsorPrecision, href: "https://www.phtc.net/",                                  logoSize: "max-h-24" },
      { name: "Kodiak Cutting Tools",    logo: BajaSponsorKodiak,    href: "https://www.kodiakcuttingtools.com/",                    logoSize: "max-h-24" },
      { name: "GMN Bearing USA",         logo: BajaSponsorGMN,       href: "https://www.gmnbt.com/",                                logoSize: "max-h-24" },
      { name: "ASCo",                    logo: BajaSponsorASCo,      href: "https://www.ascoweb.com/" },
      { name: "E&D Auto",                logo: BajaSponsorEandD,     href: "https://explorekensington.com/e-d-auto-care-center/" },
    ],
  },
];


// ── Gallery ───────────────────────────────────────────────────────────────────
function Gallery() {
  const [pos, setPos] = useState(0);
  const [perView, setPerView] = useState(4);
  const { ref, inView } = useInView(0.1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w <= 560 ? 1 : w <= 860 ? 2 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const max = GALLERY_IMGS.length - perView;

  const move = (dir: number) => {
    setPos((p) => {
      const next = p + dir;
      if (next > max) return 0;
      if (next < 0) return max;
      return next;
    });
  };

  const arrow = "absolute top-1/2 -translate-y-1/2 z-[2] bg-black/70 border border-white/25 text-white text-[1.8rem] w-12 h-12 cursor-pointer flex items-center justify-center";

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] overflow-hidden pt-[clamp(30px,5vw,60px)]">
      <Glow color="rgba(184,115,51,0.2)" className="-right-40 top-0" size={480} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 md:px-16 mb-8">
        <Reveal show={inView} from="left" delay={0.05}>
          <SectionLabel>On The Trail</SectionLabel>
        </Reveal>
        <Reveal show={inView} from="left" delay={0.12}>
          <h2 className="text-white mt-3" style={display("clamp(1.5rem, 3.2vw, 2.6rem)")}>The Team</h2>
        </Reveal>
        <Reveal show={inView} from="left" delay={0.18} className="mt-5">
          <Bar />
        </Reveal>
      </div>

      <Reveal show={inView} from="up" delay={0.24} distance={32}>
        <div className="relative overflow-hidden">
          <button
            onClick={() => move(-1)}
            aria-label="Previous images"
            className={`${arrow} left-[14px]`}
            style={{ transition: `background 0.12s ${SNAP}, border-color 0.12s ${SNAP}` }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.borderColor = ""; }}
          >
            ‹
          </button>

          <div className="flex" style={{ transform: `translateX(-${pos * (100 / perView)}%)`, transition: `transform 0.45s ${SNAP}` }}>
            {GALLERY_IMGS.map(({ src, alt }) => (
              <div key={src} className="flex-none overflow-hidden group relative" style={{ flex: `0 0 ${100 / perView}%`, aspectRatio: "16/9" }}>
                <img src={src} alt={alt} className="w-full h-full object-cover block transition-transform duration-[400ms] group-hover:scale-[1.04]" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-hidden="true" style={{ background: "rgba(120,70,25,0.28)" }} />
              </div>
            ))}
          </div>

          <button
            onClick={() => move(1)}
            aria-label="Next images"
            className={`${arrow} right-[14px]`}
            style={{ transition: `background 0.12s ${SNAP}, border-color 0.12s ${SNAP}` }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.borderColor = ""; }}
          >
            ›
          </button>
        </div>
      </Reveal>
    </section>
  );
}

// ── Video ─────────────────────────────────────────────────────────────────────
function Video() {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] overflow-hidden px-[clamp(16px,8vw,8%)] py-[clamp(32px,5vw,64px)]">
      <GridOverlay opacity={0.06} size={120} />
      <Glow color="rgba(184,115,51,0.2)" className="-left-40 bottom-0" size={460} />

      <div className="relative z-10">
        <Reveal show={inView} from="left" delay={0.05}>
          <SectionLabel>Watch</SectionLabel>
        </Reveal>
        <Reveal show={inView} from="left" delay={0.12}>
          <h2 className="text-white mt-3 mb-6" style={display("clamp(1.5rem, 3.2vw, 2.6rem)")}>Butler Bash 2022</h2>
        </Reveal>

        <Reveal show={inView} from="up" delay={0.2} distance={32}>
          <div className="relative" style={{ border: "1px solid #2a2a2a" }}>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute inset-0 w-full h-full border-none"
                src="https://www.youtube.com/embed/Pyz2je1ebBc"
                title="Baja Butler Bash 2022"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <CornerAccent at="tl" length={56} weight={3} />
            <CornerAccent at="br" length={56} weight={3} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BajaSponsorLogoCell({ sponsor }: { sponsor: BajaSponsor }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center px-5 py-4 min-h-[92px] md:min-h-[110px]"
      style={{
        background: "#000000",
        border: `1px solid ${hover ? "var(--accent)" : "rgba(184,115,51,0.35)"}`,
        boxShadow: hover ? "0 0 26px rgba(184,115,51,0.4)" : "none",
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

const tierMinCellWidth = (desktopCols: number) => (desktopCols <= 2 ? "300px" : "240px");

function BajaSponsorTierSection({ tier, delay, show }: { tier: BajaSponsorTierData; delay: number; show: boolean }) {
  return (
    <Reveal show={show} from="left" delay={delay}>
      <div className="flex items-center gap-4 mb-4">
        <span
          className="text-xs font-bold uppercase whitespace-nowrap"
          style={{ color: tier.labelColor, fontFamily: FONT_LABEL, letterSpacing: "0.22em" }}
        >
          {tier.label}
        </span>
        <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(184,115,51,0.55), transparent)" }} />
        <span
          className="text-xs whitespace-nowrap"
          style={{ color: tier.amountColor, fontFamily: FONT_LABEL, letterSpacing: "0.1em" }}
        >
          {tier.amount}
        </span>
      </div>
      {/* boxMaxWidth keeps the single-sponsor tiers from stretching one logo
          across the full width of the section. */}
      <div
        className={tier.boxMaxWidth ?? ""}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(${tierMinCellWidth(tier.desktopCols)}, 1fr))`,
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
  const { ref, inView } = useInView(0.05);

  return (
    <section ref={ref} className="relative bg-black overflow-hidden px-6 sm:px-10 md:px-16 py-20 md:py-24">
      <GridOverlay opacity={0.07} size={120} />
      <Glow color="rgba(184,115,51,0.22)" className="-left-40 top-1/4" size={520} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <Reveal show={inView} from="left" delay={0.05}>
          <SectionLabel>Our Partners</SectionLabel>
        </Reveal>
        <Reveal show={inView} from="left" delay={0.12}>
          <h2 className="text-white mt-3" style={display("clamp(1.5rem, 3.2vw, 2.6rem)")}>Our Sponsors</h2>
        </Reveal>
        <Reveal show={inView} from="left" delay={0.18} className="mt-5 mb-12">
          <Bar />
        </Reveal>

        <div className="flex flex-col gap-10 md:gap-12">
          {BAJA_SPONSOR_TIERS.map((tier, i) => (
            <BajaSponsorTierSection key={tier.label} tier={tier} delay={0.24 + i * STAGGER} show={inView} />
          ))}
        </div>
      </div>

      <CornerAccent at="br" />
    </section>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function Baja() {
  return (
    <div
      className="text-[#f0f0f0] leading-[1.8] bg-[#0a0a0a] overflow-x-hidden"
      style={{ ...themeVars("baja"), fontFamily: FONT_BODY }}
    >
      <NavBar/>
      <Hero />
      <WhatWeDo />
      <DynamicEvents />
      <StaticEvents />
      <Gallery />
      <Video />
      <BajaSponsorsSection />
    </div>
  );
}
