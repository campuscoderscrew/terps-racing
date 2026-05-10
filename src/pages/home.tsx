import { useState, useEffect, useRef, useCallback } from "react";
import NavBar2 from "../components/navbar2"
import { Link } from "react-router-dom";
// ── Design tokens (mirroring original CSS vars) ──────────────────────────────
const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Roboto+Condensed:wght@400;700&family=Roboto+Mono:wght@400;500&family=Goldman&family=Inter:wght@400;500;600&family=Roboto:ital,wght@0,400;0,500;0,700;1,900&display=swap');
`;

// ── Image assets (Figma MCP URLs) ─────────────────────────────────────────────
const ASSETS = {
  logo:       "https://www.figma.com/api/mcp/asset/2c8310c2-238d-48a5-b611-2122a12163d3",
  heroBg:     "https://www.figma.com/api/mcp/asset/ac4b7ca2-e5ad-470c-9341-b433c3ff6386",
  carousel:  [
    "https://www.figma.com/api/mcp/asset/ce4e004e-c0ea-4bdf-bae3-031112006373",
    "https://www.figma.com/api/mcp/asset/de85b000-e744-4f5c-875f-ccecff21c7de",
    "https://www.figma.com/api/mcp/asset/0118e194-4491-45e2-928a-31159fd9f8eb",
    "https://www.figma.com/api/mcp/asset/1d879009-2778-42cb-a363-b0b4af641356",
  ],
  processDesign: "https://www.figma.com/api/mcp/asset/309a2c4d-ce08-4bdd-85e3-106f4328e642",
  processBuild:  "https://www.figma.com/api/mcp/asset/0118e194-4491-45e2-928a-31159fd9f8eb",
  processTest:   "https://www.figma.com/api/mcp/asset/de85b000-e744-4f5c-875f-ccecff21c7de",
  processRace:   "https://www.figma.com/api/mcp/asset/1d879009-2778-42cb-a363-b0b4af641356",
  teamIC:     "../public/images/homepage/drivingcar1.png",
  teamEV:     "https://www.figma.com/api/mcp/asset/e3b84c0a-8d7e-4438-80ae-9b52510e3e18",
  teamBaja:   "https://www.figma.com/api/mcp/asset/b5475b81-8c5e-4122-ba73-0b2c8cf730c5",
};

// ── Carousel ──────────────────────────────────────────────────────────────────
function Carousel({ slides }: { slides: string[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);


  const goTo = useCallback((idx: number) => {
    setCurrent((idx + slides.length) % slides.length);
  }, [slides.length]);

  const startAuto = useCallback(() => {
    timerRef.current = setInterval(() => goTo(current + 1), 4000);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
    return () => {if (timerRef.current) clearInterval(timerRef.current);}
  }, [slides.length]);

  const handleNav = (dir: number) => {
    {if (timerRef.current) clearInterval(timerRef.current);}
    setCurrent((c) => (c + dir + slides.length) % slides.length);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
  };

  return (
    <div
      className="relative rounded-[18px] overflow-hidden bg-[#1f1f1f] select-none"
      style={{ height: 320 }}
      role="region"
      aria-label="Competitive success photos"
    >
      {/* Track */}
      <div
        className="flex h-full transition-transform duration-[450ms]"
        style={{ transform: `translateX(-${current * 100}%)`, willChange: "transform" }}
      >
        {slides.map((src, i) => (
          <div key={i} className="flex-none w-full h-full overflow-hidden">
            <img src={src} alt={`Slide ${i + 1}`} className="w-full h-full object-cover pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Prev */}
      <button
        onClick={() => handleNav(-1)}
        aria-label="Previous slide"
        className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10 w-[38px] h-[38px] rounded-full
          bg-black/55 border border-white/25 text-white flex items-center justify-center
          hover:bg-[#ffd200]/85 hover:border-[#ffd200] hover:text-black transition-all text-lg leading-none"
      >
        ‹
      </button>

      {/* Next */}
      <button
        onClick={() => handleNav(1)}
        aria-label="Next slide"
        className="absolute right-[10px] top-1/2 -translate-y-1/2 z-10 w-[38px] h-[38px] rounded-full
          bg-black/55 border border-white/25 text-white flex items-center justify-center
          hover:bg-[#ffd200]/85 hover:border-[#ffd200] hover:text-black transition-all text-lg leading-none"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 flex gap-[7px] z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { {if (timerRef.current) clearInterval(timerRef.current);}; setCurrent(i); }}
            aria-label={`Slide ${i + 1}`}
            className={`w-2 h-2 rounded-full border-none p-0 transition-all duration-200
              ${i === current ? "bg-[#ffd200] scale-125" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}


// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden pt-[72px]" style={{ height: "120vh" }} aria-label="Hero">
      {/* BG image */}
      <div className="absolute inset-0 overflow-hidden -top-96">
        <img
          src={ASSETS.heroBg}
          alt="Terps Racing car on track during testing day"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(102,102,102,0) 0%, rgba(51,51,51,0.5) 75%, rgba(26,26,26,0.62) 87.5%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      </div>
      {/* Watermark */}
      <div
        className="absolute pointer-events-none opacity-30"
        style={{ left: "33%", top: "35%", width: "38%" }}
        aria-hidden="true"
      >
        <img src={ASSETS.logo} alt="" />
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="relative bg-black py-[80px]" id="about" aria-labelledby="about-title">
      <div className="w-full max-w-[1440px] mx-auto px-[80px]">
        <div className="flex flex-col gap-12">

          {/* Text col */}
          <div>
            <h2
              id="about-title"
              className="uppercase text-white mb-6 leading-[1.2] tracking-[-0.02em]"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              }}
            >
              About Us
            </h2>
            <p
              className="text-white leading-[1.6] mb-8 max-w-[900px]"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
              }}
            >
              Terps Racing is a student-run organization of over 120 members who participate in collegiate design
              competitions each year. We design, build, test, and race a formula-style racecar, an electric
              formula-style racecar, and a baja-style off-road vehicle.
            </p>
            <div className="flex gap-[10px] flex-wrap">
              <a
                href="#about"
                className="inline-flex items-center justify-center px-7 py-[10px] rounded-full bg-[#ffda13] text-[#1e1e1e] text-[0.9rem] leading-[1.3] transition-all duration-200 hover:opacity-[0.88] hover:-translate-y-px"
                style={{ fontFamily: "'Roboto Mono', monospace" }}
              >
                Learn More
              </a>
              <Link
                to="/newMembers"
                className="inline-flex items-center justify-center px-7 py-[10px] rounded-full bg-[#ffda13] text-[#1e1e1e] text-[0.9rem] leading-[1.3] transition-all duration-200 hover:opacity-[0.88] hover:-translate-y-px"
                style={{ fontFamily: "'Roboto Mono', monospace" }}
              >
                New Members
              </Link>
            </div>
          </div>

          {/* Success col */}
          <div className="grid grid-cols-2 gap-8 items-center">
            <Carousel slides={ASSETS.carousel} />

            <div className="flex flex-col justify-center text-left">
              <h3
                className="uppercase text-white leading-[1.2] tracking-[-0.02em] mb-4"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
                }}
              >
                Competitive<br />Success
              </h3>
              <div
                className="text-white leading-[1.7]"
                style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: "0.95rem" }}
              >
                <p className="mb-[6px] font-semibold">2025 Formula SAE Placings:</p>
                <ul className="list-disc pl-5">
                  <li>25th overall (top 20%)</li>
                  <li>11th in design</li>
                  <li>12th in cost</li>
                  <li>8th in business</li>
                  <li>24th in acceleration</li>
                  <li>21st in skidpad</li>
                  <li>25th in autocross</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Process ───────────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  { word: "Design", img: ASSETS.processDesign, alt: "Design phase – engineers reviewing CAD models" },
  { word: "Build",  img: ASSETS.processBuild,  alt: "Build phase – students fabricating car parts" },
  { word: "Test",   img: ASSETS.processTest,   alt: "Test phase – car undergoing performance testing" },
  { word: "Race",   img: ASSETS.processRace,   alt: "Race phase – Terps Racing competing at SAE event" },
];

function Process() {
  return (
    <section className="relative py-[80px] overflow-hidden" id="process" aria-labelledby="process-title">
      <div className="w-full max-w-[1440px] mx-auto px-[80px]">
        <h2
          id="process-title"
          className="uppercase text-white mb-8 leading-[1.2] tracking-[-0.02em]"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          }}
        >
          The Process
        </h2>
        <div className="flex flex-col gap-0">
          {PROCESS_STEPS.map(({ word, img, alt }) => (
            <div
              key={word}
              className="relative overflow-hidden rounded-[50px] mb-3"
              style={{ height: 150 }}
            >
              <img src={img} alt={alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center px-[60px]">
                <span
                  className="uppercase leading-none tracking-[-0.02em]"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                    color: "transparent",
                    WebkitTextStroke: "2px white",
                    textShadow: "3px 3px 0 black",
                  }}
                >
                  {word}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Teams ─────────────────────────────────────────────────────────────────────
const TEAMS = [
  {
    id: "formula-ic",
    name: "Formula IC",
    href: "./ic/index.html",
    img: ASSETS.teamIC,
    alt: "Terps Racing Formula IC car on track",
    desc: "Terps Racing Formula IC is a top-class team with both a high-performance, thoroughly validated aerodynamic package and lightweight, high strength carbon fiber composite chassis.",
    cardBg: "#ad0000",
    cardBorder: "#ad0000",
    nameCls: "text-white",
    descCls: "text-white",
    btnBg: "bg-black text-white",
    imgBg: "#050000",
  },
  {
    id: "ev",
    name: "EV",
    href: "./ev/index.html",
    img: ASSETS.teamEV,
    alt: "Terps Racing EV formula electric car on track",
    desc: "Founded in 2019, Terps Racing Formula SAE Electric is Terps Racing's newest branch, faced with a modern challenge: convert the classic formula-style experience into something sustainable and clean.",
    cardBg: "#000000",
    cardBorder: "#ffd084",
    nameCls: "text-[#ffd200]",
    descCls: "text-[#ffd200]",
    btnBg: "bg-[#ffd200] text-black",
    imgBg: "transparent",
  },
  {
    id: "baja",
    name: "Baja",
    href: "./baja/index.html",
    img: ASSETS.teamBaja,
    alt: "Terps Racing Baja off-road vehicle navigating rough terrain",
    desc: "Terps Racing Baja SAE is an engineering project team that designs, builds, and races an off-road vehicle to compete in the SAE Collegiate Baja Design Series. The baja car faces suspension, maneuverability, towing, and endurance challenges.",
    cardBg: "#ffd200",
    cardBorder: "#d9d9d9",
    nameCls: "text-black",
    descCls: "text-black",
    btnBg: "bg-black text-white",
    imgBg: "#ffd200",
  },
];

function Teams() {
  return (
    <section className="py-[80px] relative overflow-hidden" id="teams" aria-labelledby="teams-title">
      <div className="w-full max-w-[1440px] mx-auto px-[80px]">
        <div className="mb-10">
          <h2
            id="teams-title"
            className="uppercase text-white leading-[1.2] tracking-[-0.02em]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            }}
          >
            The Teams
          </h2>
          <p
            className="text-white leading-[1.6] max-w-[900px] mt-4"
            style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)" }}
          >
            Terps Racing is made up of four teams: Formula SAE, Formula SAE Electric, Baja SAE, and a Business
            Operations Team. Formula SAE and Formula SAE Electric challenge students to design, build, and race a
            formula style race car. Baja SAE has a similar structure, but the goal is to design, build, and race an
            off-road vehicle that will survive the severe punishment of rough terrain.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {TEAMS.map((team) => (
            <article
              key={team.id}
              className="rounded-[14px] overflow-hidden flex flex-col shadow-[0_8px_24px_rgba(0,0,0,0.45)] border-[1.5px]"
              style={{ background: team.cardBg, borderColor: team.cardBorder }}
              aria-label={`${team.name} team`}
            >
              <div
                className="w-full overflow-hidden relative"
                style={{ aspectRatio: "16/9", background: team.imgBg }}
              >
                <img src={team.img} alt={team.alt} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 pb-6 flex flex-col flex-1">
                <h3
                  className={`leading-[1.4] mb-[10px] ${team.nameCls}`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  }}
                >
                  {team.name}
                </h3>
                <p
                  className={`leading-[1.5] flex-1 mb-5 ${team.descCls}`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(0.78rem, 1.1vw, 0.88rem)",
                  }}
                >
                  {team.desc}
                </p>
                <a
                  href={team.href}
                  className={`self-center px-8 py-[10px] rounded-full text-[0.875rem] font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-85 ${team.btnBg}`}
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  Learn More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── History ───────────────────────────────────────────────────────────────────
function History() {
  return (
    <section
      className="relative py-[80px] pb-[120px] overflow-hidden"
      id="history"
      aria-labelledby="history-title"
    >
      <div className="w-full max-w-[1440px] mx-auto px-[80px]">
        <h2
          id="history-title"
          className="uppercase text-white leading-[1.2] tracking-[-0.02em]"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          }}
        >
          History
        </h2>
        <p
          className="text-white leading-[1.6] max-w-[960px] mt-5 mb-14"
          style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)" }}
        >
          At Maryland, Terps Racing is one of the most popular student projects in both the Department of Mechanical
          Engineering and the A. James Clark School of Engineering. Established in 1982, Terps Racing has participated
          in over 60 races. The program allows students to develop fabrication, project management, and teamwork
          skills. The Baja, Formula IC, and EV teams engage students through hands-on experience, team-building,
          collaboration, and much more. The team has a full machine shop and assembly space with a variety of
          metal-working manual machines and CNC machines to which we have exclusive access.
        </p>
      </div>
    </section>
  );
}

// ── CTA Row ───────────────────────────────────────────────────────────────────
function CtaRow() {
  return (
    <div className="flex bg-[#ffd200] flex-wrap justify-center min-h-fit p-[10px]">
      <div className="flex gap-6 flex-wrap justify-center">
        {["Donate", "Join Us", "Sponsor"].map((label) => (
          <a
            key={label}
            href={label === "Join Us" ? "./new-members/index.html" : `#${label.toLowerCase()}`}
            className="inline-flex items-center justify-center px-14 py-[10px] rounded-full border-2 border-black bg-black text-white text-[clamp(1rem,1.8vw,1.35rem)] tracking-[0.01em] transition-all duration-200 hover:bg-[#111] cursor-pointer"
            style={{ fontFamily: "'Goldman', cursive" }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

import footerImage from "../public/images/homePage/Footer.png"
// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black" id="contact" role="contentinfo">
      <div className="relative w-full overflow-hidden" style={{ minHeight: 100 }}>
        <img
          src={footerImage}
          alt="Terps Racing cars lined up at competition"
          className="w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{FONTS}</style>
      <div className="bg-black text-white overflow-x-hidden">
        <NavBar2 currentPage="Home"/>
        <main>
          <Hero />
          <AboutSection />
          <Process />
          <Teams />
          <History />
        </main>
        <CtaRow />
        <Footer />
      </div>
    </>
  );
}