import { useState } from "react";

import Reveal from "./reveal";
import CountUp from "./countup";
import { Scene, useParallax, useSpotlight } from "./cinematic";

/**
 * Active aerodynamics + the rest of the 2026 technical-innovation story.
 *
 * Headline numbers are the race-proven figures from the team's 2026 Excellence
 * in Technical Innovation Award submission. The Q&A is the team's own
 * active-aero explainer (written for TR25, still accurate for the system).
 */

const AERO_STATS: { value: number; prefix?: string; suffix: string; decimals?: number; label: string }[] = [
  { value: 52, prefix: ">", suffix: "%", label: "Drag reduction under acceleration" },
  { value: 15.4, suffix: " s", decimals: 1, label: "Faster over endurance" },
  { value: 7.2, suffix: "%", decimals: 1, label: "Fuel efficiency gain" },
  { value: 6, suffix: "", label: "Onboard sensors, fused live" },
];

const INNOVATIONS = [
  {
    tag: "Human-centric",
    title: "A dashboard built around the driver",
    body: "A multi-layout touchscreen with an ambient alert border, a 16-LED tachometer and warning strip, live active-aero status, and a custom gear calculation broadcast back to the ECU. Revised paddles, cut-by-gear shifting and an adjustable pedal box round it out.",
  },
  {
    tag: "Sustainability",
    title: "Simulate first. Build once.",
    body: "FEA validates the structure and CFD replaces wind-tunnel prototyping. 3D printing is for fit-checks only, aluminium stock is reclaimed, and the shop runs a zero single-use tooling policy.",
  },
  {
    tag: "Outreach",
    title: ">800 students reached in 2026",
    body: "K–12 shop tours, STEM outreach to communities under-represented in engineering, and cross-discipline recruiting, so any student can find a way into motorsport.",
  },
];

const AERO_QA = [
  {
    q: "What is active aerodynamics?",
    a: "Racecar aero lives with a conflict: downforce presses the car into the track and lets it corner harder, but the angle of attack that generates it also generates drag. Active aero resolves that by actuating the wings — maximum downforce when the car is grip-limited in a corner, wings open to shed drag when it's power-limited down a straight.",
  },
  {
    q: "How does the car know when to move the wings?",
    a: "A custom finite state machine fuses six onboard sensors live — speed, throttle, brake, steering, and lateral and longitudinal G — and decides in real time whether the car is grip-limited or power-limited, then sets the wings accordingly.",
  },
  {
    q: "How do the wings actuate?",
    a: "High-torque waterproof servos are hidden completely inside the main wing elements so they don't disturb the airflow. They drive custom waterjet-cut aluminium linkages whose slots convert rotation into a linear push-pull, snapping the flaps open or closed in a fraction of a second.",
  },
  {
    q: "Is this like DRS in Formula 1?",
    a: "Similar idea, but ours is autonomous where F1's DRS is manually triggered by the driver. Our system reads the car's own data and drives six wings open or closed without the driver lifting a finger.",
  },
  {
    q: "Doesn't it add mass?",
    a: "The servos, linkages and electronics add 0.9 kg. Cutting drag by 49% on the straights crushes that penalty — and rigorous light-weighting made the whole TR25 carbon fibre package 23% lighter than TR24's static design.",
  },
  {
    q: "What happens if it fails mid-lap?",
    a: "There's a mechanical fail-safe. The rotation axis is placed so that if anything fails, oncoming air naturally forces the wings closed into the high-grip position that's safe for cornering.",
  },
  {
    q: "How much faster does it make the car?",
    a: "Simulations put it at 1.5 seconds in autocross, 40 seconds over endurance, 0.08 s in acceleration and a 7% gain in fuel efficiency — together a projected 34-point swing, roughly ten places in the overall standings.",
  },
  {
    q: "What's next?",
    a: "TR26 moved from binary open/closed wings to a three-state system with front and rear angles tuned independently, including speed-variant aero balance. For TR27 the team is growing the onboard sensor suite for richer real-time aero control, and investigating models that predict optimal wing angles from the track map before the car starts its lap.",
  },
];

function QaItem({
  item,
  index,
}: {
  item: (typeof AERO_QA)[number];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <Reveal variant="up" delay={index * 70}>
      <div className="border-b border-white/[0.08]">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className={`flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left transition-colors duration-300 ${
            open ? "text-white" : "text-white/65 hover:text-white"
          }`}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "clamp(0.95rem, 1.8vw, 1.12rem)",
            letterSpacing: "-0.01em",
          }}
        >
          {item.q}
          <span
            aria-hidden="true"
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-tr-gold/60 text-tr-gold transition-transform duration-400 ease-[var(--tr-ease)]"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          >
            +
          </span>
        </button>

        <div
          className="grid transition-[grid-template-rows,opacity] duration-[420ms] ease-[var(--tr-ease)]"
          style={{
            gridTemplateRows: open ? "1fr" : "0fr",
            opacity: open ? 1 : 0,
          }}
        >
          <div className="overflow-hidden">
            <p
              className="pb-5 text-white/60"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.96rem",
                lineHeight: 1.75,
              }}
            >
              {item.a}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function ActiveAero({ image }: { image: string }) {
  const { ref, targetRef } = useParallax<HTMLDivElement>(0.16, { scale: 1.16 });
  const { ref: cardRef, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="tr-on-dark tr-grain relative overflow-hidden"
      aria-labelledby="aero-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0">
        <img
          src={image}
          ref={targetRef as React.RefObject<HTMLImageElement>}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--tr-ink) 0%, rgba(8,8,10,0.9) 22%, rgba(8,8,10,0.94) 78%, var(--tr-ink) 100%)",
          }}
        />
      </div>

      <div className="tr-shell relative py-[clamp(56px,9vw,128px)]">
        <Scene
          id="aero-title"
          eyebrow="2026 Technical Innovation"
          title="Active Aerodynamics"
          ghost="Aero"
        >
          <p
            className="mb-12 max-w-[68ch] text-white/70"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.98rem,1.6vw,1.15rem)",
              lineHeight: 1.75,
            }}
          >
            The wings reconfigure themselves for accelerating, braking and
            cornering. A finite state machine reads the car live and moves them
            with no driver input and no lag. It fails safe by design: if
            anything goes wrong, air pressure returns the wings to
            high-downforce, so the driver never loses grip unexpectedly.
          </p>
        </Scene>

        {/* Headline numbers */}
        <div className="mb-14 grid grid-cols-2 gap-6 md:grid-cols-4">
          {AERO_STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              variant="up"
              delay={i * 100}
              className="border-l-2 border-tr-gold/40 pl-4"
            >
              <span
                className="tr-text-gold tr-display block"
                style={{ fontSize: "clamp(1.9rem, 5vw, 3.2rem)" }}
              >
                {stat.prefix}
                {stat.decimals ? (
                  `${stat.value.toFixed(stat.decimals)}${stat.suffix}`
                ) : (
                  <CountUp value={stat.value} suffix={stat.suffix} />
                )}
              </span>
              <span
                className="mt-1 block text-white/55"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(0.64rem, 1.1vw, 0.74rem)",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  lineHeight: 1.5,
                }}
              >
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>

        {/* The rest of the 2026 innovation submission */}
        <div className="mb-14 grid gap-3 md:grid-cols-3">
          {INNOVATIONS.map((item, i) => (
            <Reveal key={item.title} variant="up" delay={i * 100}>
              <div className="h-full border border-white/[0.08] bg-black/35 p-6 backdrop-blur-sm">
                <span className="tr-eyebrow">{item.tag}</span>
                <h3
                  className="mt-3 text-white"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: "clamp(1rem, 1.8vw, 1.18rem)",
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-white/60"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.65 }}
                >
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Q&A */}
        <div
          ref={cardRef}
          onMouseMove={onMouseMove}
          className="tr-card tr-spotlight mx-auto max-w-4xl !bg-black/40 p-6 backdrop-blur sm:p-9"
        >
          <div className="relative z-10">
            {AERO_QA.map((item, i) => (
              <QaItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
