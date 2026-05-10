const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@700&family=Roboto:wght@700&display=swap');`;
import NavBar2
 from "~/components/navbar2";



import heroImg   from "https://campuscoderscrew.github.io/terps-racing/public/newMembers/heroTRNM2400.jpeg";
import sparksImg from "https://campuscoderscrew.github.io/terps-racing/public/newMembers/sparks.jpg";
import outsideImg from "https://campuscoderscrew.github.io/terps-racing/public/newMembers/outside.jpg";
import weldImg   from "https://campuscoderscrew.github.io/terps-racing/public/newMembers/weld.jpg";
import collabImg from "https://campuscoderscrew.github.io/terps-racing/public/newMembers/collab.jpg";
import rqbgImg   from "https://campuscoderscrew.github.io/terps-racing/public/newMembers/rqbg.jpg";


// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative w-full flex items-center justify-center p-[3rem_4%]"
      style={{
        minHeight: "calc(100dvh - 3.5rem)",
        background:
          `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('${heroImg}') center 80% / cover no-repeat`,
      }}
    >
      <p
        className="text-white text-center max-w-[88%] mb-[15%]"
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 3.6vw, 5rem)",
          textShadow: "0 2px 10px rgba(0,0,0,0.75)",
        }}
      >
        COME REPRESENT UMD ON THE INTERNATIONAL STAGE
      </p>
    </section>
  );
}

// ── Requirements ──────────────────────────────────────────────────────────────
interface ReqCard {
  label: string;
  img:   string;
  alt:   string;
  desc:  string;
}
const REQ_CARDS: ReqCard[] = [
  { label: "Hands on drive",       img: sparksImg,  alt: "Welding sparks",          desc: "Eager to build, test, and solve real engineering problems." },
  { label: "Team Player",          img: outsideImg, alt: "Team working together",    desc: "We collaborate across disciplines and depend on each other." },
  { label: "Willingness to Learn", img: weldImg,    alt: "Student learning in shop", desc: "We'll teach CAD, machining, and engineering — bring curiosity." },
  { label: "Any Major is Welcome", img: collabImg,  alt: "Students at computers",    desc: "Engineering, computer science, business, design — every skill has a place here." },
];

function Requirements() {
  return (
    <section
      className="px-8 pt-14 pb-12"
      style={{
        background:
          `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url('${rqbgImg}') center 60% / cover no-repeat #111`,
      }}
    >
      <p
        className="uppercase tracking-[0.06em] text-[#C30000]"
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1rem, 1.5vw, 2rem)",
        }}
      >
        Requirements
      </p>
      <h1
        className="text-white mt-1 mb-1"
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.2rem, 2.2vw, 2.5rem)",
        }}
      >
        What we're looking for
      </h1>
      <p
        className="text-[#FFD200] mb-12"
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1rem, 1.2vw, 1.5rem)",
        }}
      >
        No experience needed — just show up ready to work and learn.
      </p>

      <div className="grid grid-cols-4 gap-8 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1">
        {REQ_CARDS.map(({ label, img, alt, desc }) => (
          <div key={label}>
            <p
              className="text-[#C30000] mb-2"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1rem, 1.5vw, 1.8rem)",
              }}
            >
              {label}
            </p>
            <img
              src={img}
              alt={alt}
              className="w-full object-cover block mb-3 bg-[#222]"
              style={{ aspectRatio: "3 / 2" }}
            />
            <p
              className="text-white leading-[1.45]"
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.8rem, 1.2vw, 1.5rem)",
              }}
            >
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Commitment ────────────────────────────────────────────────────────────────
function Commitment() {
  const bullets = [
    "2-3 Meetings per week",
    "High time commitment (5-10+ hours weekly)",
    "Seasonal competitions",
  ];

  return (
    <section
      className="relative px-10 py-16"
      style={{
        background: "url('https://campuscoderscrew.github.io/terps-racing/public/newMembers/sparks.jpg') center / cover no-repeat #111",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-[1]">
        <p
          className="uppercase tracking-[0.06em] text-[#C30000]"
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1rem, 1.5vw, 2rem)",
          }}
        >
          Commitment
        </p>
        <h2
          className="text-white mt-1 mb-12"
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.2rem, 2.2vw, 2.5rem)",
          }}
        >
          What to expect
        </h2>
        <ul className="flex flex-col gap-4 list-none">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-white"
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.9rem, 1.2vw, 1.5rem)",
              }}
            >
              <span className="w-4 h-4 rounded-full bg-[#FFD200] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Teams ─────────────────────────────────────────────────────────────────────
interface TeamEntry {
  name:    string;
  desc:    string;
  meeting: string;
}

const TEAMS: TeamEntry[] = [
  {
    name: "Baja",
    desc: "Terps Racing Baja SAE is an engineering project team that designs, builds, and races an off-road vehicle to compete in the SAE Collegiate Baja Design Series.",
    meeting: "Baja meets in J.M Patterson Hall 1225 on Tuesdays and Thursdays at 6:30 PM and Sundays at 11 AM",
  },
  {
    name: "Formula IC",
    desc: "Terps Racing Formula SAE is an engineering project team that designs, builds, and races a formula style racecar to compete in the SAE Collegiate Formula Design Series.",
    meeting: "IC meets in J.M Patterson Hall 1225 on Mondays and Wednesdays at 5 PM and Saturdays at 10 AM",
  },
  {
    name: "Formula EV",
    desc: "Founded in 2019, Terps Racing Formula SAE Electric is Terps Racing's newest branch, faced with a modern challenge: convert the classic formula-style experience into something sustainable and clean.",
    meeting: "EV meets in the Cypress Building from 6-8 PM on Mondays and Wednesdays",
  },
];

function Teams() {
  return (
    <section className="bg-black px-10 py-16">
      <p
        className="uppercase tracking-[0.06em] text-[#C30000]"
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1rem, 1.5vw, 2rem)",
        }}
      >
        Teams
      </p>
      <h2
        className="text-white mt-1 mb-12"
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.2rem, 2.2vw, 2.5rem)",
        }}
      >
        Which team is right for you?
      </h2>

      {TEAMS.map(({ name, desc, meeting }) => (
        <div key={name} className="mb-10">
          <p
            className="text-[#C30000]"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1rem, 1.5vw, 2rem)",
            }}
          >
            {name}
          </p>
          <hr
            className="border-none border-t-[3px] border-t-[#FFD200] my-[0.3rem] mb-[0.6rem]"
            style={{ borderTopWidth: 3, borderTopColor: "#FFD200", width: "clamp(4rem, 10rem, 25rem)" }}
          />
          <p
            className="text-[#FFFDF4] leading-[1.55] mb-3"
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.9rem, 1.2vw, 1.5rem)",
            }}
          >
            {desc}
          </p>
          <div
            className="flex items-start gap-[0.65rem] text-[#FFFDF4] leading-[1.5]"
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.9rem, 1.2vw, 1.5rem)",
            }}
          >
            <span className="w-4 h-4 rounded-full bg-[#FFD200] flex-shrink-0 mt-[0.45em]" />
            {meeting}
          </div>
        </div>
      ))}
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <section id="join" className="bg-black px-8 pt-16 pb-14 text-center">
      <h2
        className="text-white leading-[1.2]"
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.2rem, 2.2vw, 2.5rem)",
        }}
      >
        Ready to Join?<br />
        Just show up to a meeting and start your engine!
      </h2>
    </section>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function Members() {
  return (
    <>
      <style>{FONTS}</style>
      <div className="bg-black text-white">
        <NavBar2 currentPage="" />
        <Hero />
        <Requirements />
        {/* Middle: Commitment + Teams side by side */}
        <div className="grid grid-cols-2 max-[768px]:grid-cols-1">
          <Commitment />
          <Teams />
        </div>
        <Footer />
      </div>
    </>
  );
}