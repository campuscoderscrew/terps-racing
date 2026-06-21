import { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "../components/navbar"
import { Link } from "react-router-dom";
const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Roboto+Condensed:wght@400;700&family=Roboto+Mono:wght@400;500&family=Goldman&family=Inter:wght@400;500;600&family=Roboto:ital,wght@0,400;0,500;0,700;1,900&display=swap');
`;

import logo from "../public/images/homePage/TR_logo.png"
import hero_bg from "../public/images/homePage/hero_bg.png"

import caraousel_1 from "../public/images/homePage/carousel/IC_car_zoom_in.jpg"
import caraousel_2 from "../public/images/homePage/carousel/IC_car_zoom_in_sponsors.jpg"
import caraousel_3 from "../public/images/homePage/carousel/racing_cones_2.jpg"
import caraousel_4 from "../public/images/homePage/carousel/racing_cones_3.jpg"
import caraousel_5 from "../public/images/homePage/carousel/racing_cones.jpg"
import caraousel_6 from "../public/images/homePage/carousel/racer_head_shot.png"

const caraousel = [caraousel_1, caraousel_2, caraousel_3, caraousel_4, caraousel_5, caraousel_6]

import design_image from "../public/images/homePage/design.png"
import build_image from "../public/images/homePage/build.png"
import test_image from "../public/images/homePage/test.png"
import race_image from "../public/images/homePage/race.png"
import ic_image from "../public/images/homePage/IC.png"
import ev_image from "../public/images/homePage/EV.png"
import baja_image from "../public/images/homePage/baja.png"
import { header2_style, header2_className, p_className, p_style } from "~/siteInfo";
import Header from "~/components/header";
import Paragraph from "~/components/paragraph";
import footerImage from "../public/images/homePage/Footer.png"

const ASSETS = {
  processDesign: design_image,
  processBuild:  build_image,
  processTest:   test_image,
  processRace:   race_image,
  teamIC:        ic_image,
  teamEV:        ev_image,
  teamBaja:      baja_image,
};

// News thingy
function ImageTicker({ slides }: { slides: string[] }) {
  const REPEATS = 4;
  const tiled = Array.from({ length: REPEATS }, () => slides).flat();

  return (
    <div
      className="overflow-hidden bg-[#1f1f1f] rounded-[18px] w-full"
      style={{ height: "clamp(200px, 30vw, 320px)" }}
    >
      <div
        className="flex h-full"
        style={{
          width: `${tiled.length * 100}%`,
          animation: `ticker ${slides.length * 8}s linear infinite`, //timing for how fast it goes
        }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
      >
        {tiled.map((src, i) => (
          <div
            key={i}
            className="h-full overflow-hidden"
            style={{ width: `${100 / tiled.length}%` }}
          >
            <img
              src={src}
              alt={`Slide ${(i % slides.length) + 1}`}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${100 / REPEATS}%); }
        }
      `}</style>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden pt-[72px]" style={{ height: "100svh" }} aria-label="Hero">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={hero_bg}
          alt="Terps Racing car on track during testing day"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(102,102,102,0) 0%, rgba(51,51,51,0.5) 75%, rgba(26,26,26,0.62) 87.5%, rgba(0,0,0,0.75) 100%)",
        }} />
      </div>
      <div
        className="absolute pointer-events-none opacity-30"
        style={{ left: "50%", top: "35%", width: "clamp(160px, 38%, 480px)", transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        <img src={logo} alt="" className="w-full" />
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="relative bg-black py-[clamp(40px,6vw,80px)]" id="about" aria-labelledby="about-title">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="flex flex-col gap-10">
          <div>
            <Header id="about-title" text="About Us" />
            <Paragraph text="Terps Racing is a student-run organization of over 120 members who participate in collegiate design
              competitions each year. We design, build, test, and race a formula-style racecar, an electric
              formula-style racecar, and a baja-style off-road vehicle." />
            <div className="flex gap-[10px] flex-wrap">
              
              {/** Learn More button seems unnecessary since we're already on the Home Page
               * Could potentially implement a more detailed about pages
                <a href="#about"
                  className="inline-flex items-center justify-center px-7 py-[10px] rounded-full bg-[#ffda13] text-[#1e1e1e] text-[clamp(0.8rem,1.2vw,0.9rem)] leading-[1.3] transition-all duration-200 hover:opacity-[0.88] hover:-translate-y-px"
                  style={{ fontFamily: "'Roboto Mono', monospace" }}>
                  Learn More
                </a>
               */}
              


              <Link to="/members"
                className="inline-flex items-center justify-center px-7 py-[10px] rounded-full bg-[#ffda13] text-[#1e1e1e] text-[clamp(0.8rem,1.2vw,0.9rem)] leading-[1.3] transition-all duration-200 hover:opacity-[0.88] hover:-translate-y-px"
                style={{ fontFamily: "'Roboto Mono', monospace" }}>
                New Members
              </Link>
            </div>
          </div>
          <ImageTicker slides={caraousel} />
          {/* Success col — stacks on mobile */}
          
          
            
            <div className="flex flex-col items-center text-center">
              <h3 className={header2_className} style={header2_style}>
                Competitive Success
              </h3>
              <div className="text-white leading-[1.7]"
                style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: "clamp(0.85rem,1.5vw,0.95rem)" }}>
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
    <section className="relative py-[clamp(40px,6vw,80px)] overflow-hidden" id="process" aria-labelledby="process-title">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
        <Header id="process-title" text="The Process" />
        <div className="flex flex-col gap-3">
          {PROCESS_STEPS.map(({ word, img, alt }) => (
            <div key={word} className="relative overflow-hidden rounded-[clamp(20px,4vw,50px)]"
              style={{ height: "clamp(80px,12vw,150px)" }}>
              <img src={img} alt={alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center px-[clamp(20px,5vw,60px)]">
                <span className="uppercase leading-none tracking-[-0.02em]" style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 6vw, 4.5rem)",
                  color: "transparent",
                  WebkitTextStroke: "2px white",
                  textShadow: "3px 3px 0 black",
                }}>
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
    to: "ic",
    img: ASSETS.teamIC,
    alt: "Terps Racing Formula IC car on track",
    desc: "Terps Racing Formula IC is a top-class team with both a high-performance, thoroughly validated aerodynamic package and lightweight, high strength carbon fiber composite chassis.",
    cardBg: "#ad0000", cardBorder: "#ad0000",
    nameCls: "text-white", descCls: "text-white", btnBg: "bg-black text-white", imgBg: "#050000",
  },
  {
    id: "ev",
    name: "EV",
    to: "/ev",
    img: ASSETS.teamEV,
    alt: "Terps Racing EV formula electric car on track",
    desc: "Founded in 2019, Terps Racing Formula SAE Electric is Terps Racing's newest branch, faced with a modern challenge: convert the classic formula-style experience into something sustainable and clean.",
    cardBg: "#000000", cardBorder: "#ffd084",
    nameCls: "text-[#ffd200]", descCls: "text-[#ffd200]", btnBg: "bg-[#ffd200] text-black", imgBg: "transparent",
  },
  {
    id: "baja",
    name: "Baja",
    to: "baja",
    img: ASSETS.teamBaja,
    alt: "Terps Racing Baja off-road vehicle navigating rough terrain",
    desc: "Terps Racing Baja SAE is an engineering project team that designs, builds, and races an off-road vehicle to compete in the SAE Collegiate Baja Design Series.",
    cardBg: "#ffd200", cardBorder: "#d9d9d9",
    nameCls: "text-black", descCls: "text-black", btnBg: "bg-black text-white", imgBg: "#ffd200",
  },
];

function Teams() {
  return (
    <section className="py-[clamp(40px,6vw,80px)] relative overflow-hidden" id="teams" aria-labelledby="teams-title">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="mb-10">
          <Header text="The Teams" />
          <Paragraph text="Terps Racing is made up of four teams: Formula SAE, Formula SAE Electric, Baja SAE, and a Business
            Operations Team. Formula SAE and Formula SAE Electric challenge students to design, build, and race a
            formula style race car. Baja SAE has a similar structure, but the goal is to design, build, and race an
            off-road vehicle that will survive the severe punishment of rough terrain." />
        </div>

        {/* 1 col mobile → 2 col tablet → 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAMS.map((team) => (
            <article key={team.id}
              className="rounded-[14px] overflow-hidden flex flex-col shadow-[0_8px_24px_rgba(0,0,0,0.45)] border-[1.5px]"
              style={{ background: team.cardBg, borderColor: team.cardBorder }}
              aria-label={`${team.name} team`}>
              <div className="w-full overflow-hidden relative" style={{ aspectRatio: "16/9", background: team.imgBg }}>
                <img src={team.img} alt={team.alt} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 pb-6 flex flex-col flex-1">
                <h3 className={`leading-[1.4] mb-[10px] ${team.nameCls}`} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
                }}>
                  {team.name}
                </h3>
                <p className={`leading-[1.5] flex-1 mb-5 ${team.descCls}`} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(0.78rem, 1.1vw, 0.88rem)",
                }}>
                  {team.desc}
                </p>
                <Link to={team.to}
                  className={`self-center px-8 py-[10px] rounded-full text-[0.875rem] font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-85 ${team.btnBg}`}
                  style={{ fontFamily: "'Roboto', sans-serif" }}>
                    Learn More
                </Link>
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
    <section className="relative py-[clamp(40px,6vw,80px)] pb-[clamp(60px,8vw,120px)] overflow-hidden"
      id="history" aria-labelledby="history-title">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)]">
        <Header text="History" />
        <Paragraph text="At Maryland, Terps Racing is one of the most popular student projects in both the Department of Mechanical
          Engineering and the A. James Clark School of Engineering. Established in 1982, Terps Racing has participated
          in over 60 races. The program allows students to develop fabrication, project management, and teamwork
          skills." />
      </div>
    </section>
  );
}

// ── CTA Row ───────────────────────────────────────────────────────────────────
// TODO: Implement Donate & Sponsor buttons
function CtaRow() {
  return (
    <div className="flex bg-[#ffd200] flex-wrap justify-center min-h-fit p-[clamp(8px,2vw,10px)]">
      <div className="flex gap-4 flex-wrap justify-center">
        {[/*"Donate", */"Join Us", /*"Sponsor"*/].map((label) => (
          <Link
            key={label}
            to={label == "Join Us" ? "/members" : "/404"}
            className="inline-flex items-center justify-center px-[clamp(24px,6vw,56px)] py-[10px] rounded-full border-2 border-black bg-black text-white tracking-[0.01em] transition-all duration-200 hover:bg-[#111] cursor-pointer"
            style={{ fontFamily: "'Goldman', cursive", fontSize: "clamp(0.85rem, 1.8vw, 1.35rem)" }}>
              {label}
            </Link>
  
        ))}
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black" id="contact" role="contentinfo">
      <div className="relative w-full overflow-hidden" style={{ minHeight: 100 }}>
        <img src={footerImage} alt="Terps Racing cars lined up at competition" className="w-full object-cover" />
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
        <NavBar />
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