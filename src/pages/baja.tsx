import { useState, useEffect, useRef, useCallback } from "react";
import NavBar2 from "~/components/navbar2";

// ── Types ─────────────────────────────────────────────────────────────────────
interface AccordionItem {
  title: string;
  body:  string;
}

interface EventItem {
  name: string;
  desc: string;
}

interface StaticCard {
  img:   string;
  alt:   string;
  title: string;
  desc:  string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const ACCORDION_ITEMS: AccordionItem[] = [
  {
    title: "Design Process",
    body:  "The design process goes through three stages of review before the final design is chosen: the Preliminary Review, the Critical Review, and the Final Review. The team also modifies older cars to test new designs on prior years' vehicles. Following the final review, the team moves into the build phase, continually innovating and redesigning even the smallest components.",
  },
  {
    title: "Competition Challenge",
    body:  "The competition requires students to balance design and cost with dynamic performance while following strict safety guidelines and standardized rules. The team balances hard work with a passion for their car and believes that passion makes a significant difference in the competition.",
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
    img:   "https://racing.umd.edu/files/2026/03/sales_presentation-e1775000595550.png",
    alt:   "Sales Presentation",
    title: "Sales Presentation",
    desc:  "Teams market their car as a highly specialized vehicle to a series of industry judges.",
  },
  {
    img:   "https://racing.umd.edu/files/2026/03/design_presentation.png",
    alt:   "Design Presentation",
    title: "Design Presentation",
    desc:  "Teams present the design, research, and testing done throughout the year to technical judges.",
  },
  {
    img:   "https://racing.umd.edu/files/2026/04/technical_inspection-1-e1775005735832.png",
    alt:   "Technical Inspection",
    title: "Technical Inspection",
    desc:  "Judges inspect every aspect of the car to make sure it meets competition rules and specifications.",
  },
  {
    img:   "https://racing.umd.edu/files/2026/04/talking0-2.png",
    alt:   "Design Judging",
    title: "Design Judging",
    desc:  "Teams explain what separates their car, what testing drove decisions, and highlight innovations.",
  },
];

const GALLERY_IMGS = [
  { src: "https://racing.umd.edu/files/2024/06/IMG_6908-1.jpg",          alt: "Baja team" },
  { src: "https://racing.umd.edu/files/2026/03/anjali-picture.jpg",      alt: "Team member" },
  { src: "https://racing.umd.edu/files/2026/04/Team-Picture.jpg",        alt: "Team picture" },
  { src: "https://racing.umd.edu/files/2026/03/kenesto.jpg",             alt: "Competition" },
  { src: "https://racing.umd.edu/files/2024/06/Ben-loan-killing-it.jpg", alt: "Driver" },
];

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
              className="w-full bg-transparent border-none text-[#f0f0f0] py-[13px] cursor-pointer flex justify-between items-center gap-2 text-[0.95rem] font-semibold"
              style={{ fontFamily: "inherit" }}
            >
              {item.title}
              <span
                className="flex-shrink-0 w-[22px] h-[22px] rounded-full border border-[#e31933] text-[#e31933] flex items-center justify-center text-[1.1rem] leading-none"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-[350ms] ease-in-out text-[0.9rem] text-[#aaaaaa]"
              style={{ height: isOpen ? "auto" : 0, paddingBottom: isOpen ? 14 : 0 }}
            >
              {item.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Hero Section (reusable layout) ───────────────────────────────────────────
interface HeroSectionProps {
  flip?:      boolean;
  imgStyle:   React.CSSProperties;
  children:   React.ReactNode;
}

function HeroSection({ flip = false, imgStyle, children }: HeroSectionProps) {
  return (
    <div
      className={`grid min-h-[420px] max-[860px]:grid-cols-1`}
      style={{ gridTemplateColumns: flip ? "42% 58%" : "58% 42%" }}
    >
      {/* Image side */}
      <div
        className={`relative bg-cover bg-center bg-no-repeat min-h-[420px] max-[860px]:min-h-[260px] ${flip ? "order-last max-[860px]:order-first" : ""}`}
        style={imgStyle}
      >
        {/* gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: flip
              ? "linear-gradient(to left, rgba(10,10,10,0) 55%, #0a0a0a 100%)"
              : "linear-gradient(to right, rgba(10,10,10,0) 40%, #0a0a0a 95%)",
          }}
        />
      </div>

      {/* Content side */}
      <div className="px-12 py-14 flex flex-col justify-center max-[560px]:px-5 max-[560px]:py-8">
        {children}
      </div>
    </div>
  );
}

// ── Section Title ─────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[2rem] font-bold text-[#e31933] text-center mb-5">
      {children}
    </h2>
  );
}

// ── What We Do ────────────────────────────────────────────────────────────────
function WhatWeDo() {
  return (
    <section>
      <HeroSection
        imgStyle={{
          backgroundImage: "url('https://racing.umd.edu/files/2026/03/anjali-background2.png')",
          backgroundSize: "200%",
          backgroundPosition: "10% 60%",
        }}
      >
        <SectionTitle>What We Do</SectionTitle>
        <p className="text-[1.05rem] text-[#aaaaaa] mb-[22px]">
          Terps Racing Baja SAE is an engineering project team that designs, builds, and races
          an off-road vehicle to compete in the SAE Collegiate Baja Design Series.
        </p>
        <div className="grid grid-cols-2 gap-[14px] mb-7 max-[560px]:grid-cols-1">
          {[
            <>Hands-on engineering for <strong className="text-[#e31933]">&gt;40</strong> students annually</>,
            <><strong className="text-[#e31933]">3</strong> yearly North American competitions with <strong className="text-[#e31933]">100s</strong> of teams</>,
          ].map((content, i) => (
            <div
              key={i}
              className="bg-[#141414] border border-[#2a2a2a] border-l-[3px] border-l-[#e31933] px-[14px] py-3 text-[0.9rem] text-[#aaaaaa] rounded-sm"
            >
              {content}
            </div>
          ))}
        </div>
        <Accordion items={ACCORDION_ITEMS} />
      </HeroSection>
    </section>
  );
}

// ── Dynamic Events ────────────────────────────────────────────────────────────
function DynamicEvents() {
  return (
    <section>
      <HeroSection
        flip
        imgStyle={{
          backgroundImage: "url('https://racing.umd.edu/files/2026/04/Untitled-design.png')",
          backgroundSize: "130%",
          backgroundPosition: "100% 60%",
        }}
      >
        <SectionTitle>Dynamic Events</SectionTitle>
        <p className="text-[0.9rem] text-[#aaaaaa] mb-5">
          Cars take on a series of challenges such as maneuverability, acceleration, hill climb
          or tractor pull, and a special event unique to each competition.
        </p>
        <div className="flex flex-col gap-4">
          {DYNAMIC_EVENTS.map(({ name, desc }) => (
            <div key={name}>
              <span className="font-bold text-[#e31933] text-[0.95rem] block mb-[2px]">{name}</span>
              <span className="text-[0.9rem] text-[#aaaaaa]">{desc}</span>
            </div>
          ))}
        </div>
      </HeroSection>
    </section>
  );
}

// ── Static Events ─────────────────────────────────────────────────────────────
function StaticEvents() {
  return (
    <section>
      <HeroSection
        imgStyle={{
          backgroundImage: "url('https://racing.umd.edu/files/2026/04/Untitled-design-4.png')",
          backgroundSize: "250%",
          backgroundPosition: "20% 60%",
        }}
      >
        <SectionTitle>Static Events</SectionTitle>
        <div className="grid grid-cols-2 gap-4 mt-1 max-[560px]:grid-cols-1">
          {STATIC_CARDS.map(({ img, alt, title, desc }) => (
            <div key={title} className="bg-[#141414] border border-[#2a2a2a] rounded overflow-hidden">
              <img
                src={img}
                alt={alt}
                className="w-full object-contain bg-[#181818] p-2 block"
                style={{ aspectRatio: "4/3" }}
              />
              <div className="px-3 pt-[10px] pb-3">
                <div className="font-bold text-[#e31933] text-[0.88rem] mb-1">{title}</div>
                <p className="text-[0.82rem] text-[#aaaaaa] leading-[1.5]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </HeroSection>
    </section>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────
function Gallery() {
  const [pos, setPos] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const perView = width <= 560 ? 1 : width <= 860 ? 2 : 4;
  const max = GALLERY_IMGS.length - perView;

  const move = (dir: number) => {
    setPos((p) => {
      const next = p + dir;
      if (next > max) return 0;
      if (next < 0) return max;
      return next;
    });
  };

  return (
    <section className="bg-[#0a0a0a] mt-[60px]">
      <div className="relative overflow-hidden">
        <button
          onClick={() => move(-1)}
          className="absolute left-[14px] top-1/2 -translate-y-1/2 z-[2] bg-black/70 border border-white/20 text-white text-[1.8rem] w-12 h-12 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#e31933] hover:border-[#e31933]"
        >
          ‹
        </button>

        <div
          className="flex transition-transform duration-[450ms]"
          style={{ transform: `translateX(-${pos * (100 / perView)}%)` }}
        >
          {GALLERY_IMGS.map(({ src, alt }) => (
            <div
              key={src}
              className="flex-none overflow-hidden"
              style={{ flex: `0 0 ${100 / perView}%`, aspectRatio: "16/9" }}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover block transition-transform duration-[400ms] hover:scale-[1.04]"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => move(1)}
          className="absolute right-[14px] top-1/2 -translate-y-1/2 z-[2] bg-black/70 border border-white/20 text-white text-[1.8rem] w-12 h-12 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#e31933] hover:border-[#e31933]"
        >
          ›
        </button>
      </div>
    </section>
  );
}

// ── Video ─────────────────────────────────────────────────────────────────────
function Video() {
  return (
    <section className="bg-[#0a0a0a] px-[8%] py-12 max-[560px]:px-[4%] max-[560px]:py-8">
      <div className="relative pb-[56.25%] h-0">
        <iframe
          className="absolute inset-0 w-full h-full border-none rounded"
          src="https://www.youtube.com/embed/Pyz2je1ebBc"
          title="Baja Butler Bash 2022"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function Baja() {
  return (
    <div
      className="text-[#f0f0f0] leading-[1.8] bg-[#0a0a0a]"
      style={{ fontFamily: "'Source Sans 3', 'Source Sans Pro', Helvetica, Arial, sans-serif" }}
    >
        <br></br>
        <NavBar2 currentPage="Baja"/>
        <WhatWeDo />
        <DynamicEvents />
        <StaticEvents />
        <Gallery />
        <Video />
    </div>
  );
}