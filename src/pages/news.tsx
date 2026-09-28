import { useState } from "react";
import SiteCredit from "~/components/sitecredit";
import { Link } from "react-router-dom";

import NavBar from "~/components/navbar";
import Header from "~/components/header";
import Reveal from "~/components/reveal";
import Backdrop from "~/components/backdrop";
import { NEWS, TEAM_LABEL, formatNewsDate, type NewsItem, type NewsTeam } from "~/data/news";

const FILTERS: (NewsTeam | "every")[] = ["every", "ic", "ev", "baja"];

export function NewsCard({ item, index = 0 }: { item: NewsItem; index?: number }) {
  return (
    <Reveal variant="up" delay={Math.min(index, 6) * 70}>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="tr-card group flex h-full flex-col p-6 transition-all duration-400 ease-[var(--tr-ease)] hover:-translate-y-1 hover:border-tr-gold/40"
      >
        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/50"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          <span className="text-tr-gold">{item.outlet}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={item.date}>{formatNewsDate(item)}</time>
          <span className="ml-auto rounded-full border border-white/15 px-2 py-0.5 text-white/60">
            {TEAM_LABEL[item.team]}
          </span>
        </div>
        <h3
          className="mt-4 text-white"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.3 }}
        >
          {item.title}
        </h3>
        <p className="mt-3 flex-1 text-white/60" style={{ fontFamily: "var(--font-body)", fontSize: "0.93rem", lineHeight: 1.65 }}>
          {item.summary}
        </p>
        <span
          className="mt-5 inline-flex items-center gap-2 text-tr-gold transition-all duration-300 group-hover:gap-3"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          Read the article <span aria-hidden="true">↗</span>
        </span>
      </a>
    </Reveal>
  );
}

export default function News() {
  const [filter, setFilter] = useState<NewsTeam | "every">("every");
  const items = NEWS.filter((n) => filter === "every" || n.team === filter || n.team === "all");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-tr-ink text-white">
      <NavBar overMedia={false} />
      <Backdrop variant="hud" className="!fixed" intensity={0.4} />
      <main className="tr-section relative z-10 !pt-[calc(var(--tr-nav-h)+clamp(32px,6vw,72px))]">
        <div className="tr-shell">
          <Header text="In the News" eyebrow="Press & publications" />

          <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter by team">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-1.5 text-[0.75rem] uppercase tracking-[0.12em] transition-colors ${
                  filter === f ? "border-tr-gold bg-tr-gold/10 text-white" : "border-white/10 text-white/55 hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {f === "every" ? "All teams" : TEAM_LABEL[f]}
              </button>
            ))}
          </div>

          {items.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((item, i) => (
                <NewsCard key={item.url} item={item} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-white/55" style={{ fontFamily: "var(--font-body)" }}>
              Nothing for this team yet. Check back soon.
            </p>
          )}

          <p className="mt-10 text-white/50" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
            Written about Terps Racing?{" "}
            <a href="mailto:terpsracing@umd.edu" className="tr-link text-tr-gold">
              Send us the link
            </a>{" "}
            and we'll add it here. <Link to="/" className="tr-link text-white/70">Back to home</Link>
          </p>
        </div>
      </main>
      <SiteCredit />
    </div>
  );
}
