/* ============================================================================
   In the news — articles published about Terps Racing.

   Newest first. To add one, copy an entry and fill it in; the News page and the
   "In the news" strip on the home page both read from this list. This file is
   deliberately plain data so the weekly update task (or anyone on the team)
   can append to it without touching any layout code.

   team: "all" | "ic" | "ev" | "baja"
   date: ISO yyyy-mm-dd, the article's own publication date
   ========================================================================= */

export type NewsTeam = "all" | "ic" | "ev" | "baja";

export interface NewsItem {
  title: string;
  outlet: string;
  date: string;
  url: string;
  team: NewsTeam;
  summary: string;
}

export const NEWS: NewsItem[] = [
  {
    title: "The Future of Terps Racing Is Electric",
    outlet: "Maryland Today",
    date: "2026-06-12",
    url: "https://today.umd.edu/the-future-of-terps-racing-is-electric",
    team: "ev",
    summary:
      "Terps Racing EV heads to Formula SAE Electric at Michigan International Speedway with a student-built car that does 0–60 mph in under 3.5 seconds.",
  },
  {
    title:
      "From Classroom to Racetrack: Honors Engineer Duncan Kuchar ’26 Leads Breakthrough in Active Aerodynamics",
    outlet: "UMD Honors College",
    date: "2026-03-31",
    url: "https://honors.umd.edu/2026/03/from-classroom-to-racetrack-honors-engineer-duncan-kuchar-26-leads-breakthrough-in-active-aerodynamics/",
    team: "ic",
    summary:
      "The autonomous active aero system behind the IC car's second-place Innovation Award at FSAE Michigan 2025 — and the honors thesis that built it.",
  },
  {
    title:
      "Design and Implementation of a Six-Element Autonomous Active Aerodynamics System for Formula SAE",
    outlet: "Digital Repository at the University of Maryland",
    date: "2026-01-01",
    url: "https://drum.lib.umd.edu/items/239475f2-f580-4ad8-9f84-d99fe41c566c",
    team: "ic",
    summary:
      "The full technical write-up of the team's active aerodynamics system, published as an Aerospace Engineering honors thesis.",
  },
  {
    title: "Terps Racing Competes in Formula SAE Michigan",
    outlet: "UMD Mechanical Engineering",
    date: "2013-05-15",
    url: "https://me.umd.edu/news/story/terps-racing-competes-in-formula-sae-michigan",
    team: "ic",
    summary:
      "Tied 10th in design against 120 international teams, with some of the fastest laps of the event, before an engine failure on the penultimate endurance lap.",
  },
  {
    title:
      "Terps Racing Formula SAE Competes in FSAE West, Learns Lessons for Future Competitions",
    outlet: "UMD Mechanical Engineering",
    date: "2012-06-28",
    url: "https://me.umd.edu/news/story/terps-racing-formula-sae-competes-in-fsae-west-learns-lessons-for-future-competitions",
    team: "ic",
    summary:
      "A tough weekend in Nebraska, and the lessons the team carried into the next car.",
  },
  {
    title: "Terps Racing #1 in National Competition",
    outlet: "A. James Clark School of Engineering",
    date: "2011-09-19",
    url: "https://eng.umd.edu/news/story/terps-racing-1-in-national-competition",
    team: "ic",
    summary:
      "Terps Racing drivers took first and third in the Formula SAE class at the SCCA Solo National Championships.",
  },
];

/** Year only for entries where the outlet gives no exact day. */
export const YEAR_ONLY = new Set([
  "https://drum.lib.umd.edu/items/239475f2-f580-4ad8-9f84-d99fe41c566c",
]);

export function formatNewsDate(item: NewsItem) {
  const d = new Date(item.date + "T12:00:00");
  if (YEAR_ONLY.has(item.url)) return String(d.getFullYear());
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export const TEAM_LABEL: Record<NewsTeam, string> = {
  all: "Terps Racing",
  ic: "Formula IC",
  ev: "EV",
  baja: "Baja",
};
