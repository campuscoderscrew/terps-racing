import { useEffect, useState } from "react";

const SEEN_KEY = "tr-lights-seen";
const TOTAL_MS = 2750;

/**
 * NASCAR/F1 start-light sequence: five reds light one at a time, all cut out,
 * green flag. Runs once per browser session, is skippable, and unmounts itself
 * afterwards so it costs nothing for the rest of the visit.
 */
export default function StartLights() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // private mode / storage blocked — just skip the intro
      seen = true;
    }
    if (reduced || seen) return;

    setShow(true);
    document.body.style.overflow = "hidden";
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* non-fatal */
    }

    const done = () => setShow(false);
    const timer = window.setTimeout(done, TOTAL_MS);
    window.addEventListener("wheel", done, { once: true, passive: true });
    window.addEventListener("touchstart", done, { once: true, passive: true });
    window.addEventListener("keydown", done, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", done);
      window.removeEventListener("touchstart", done);
      window.removeEventListener("keydown", done);
      document.body.style.overflow = "";
    };
  }, []);

  // Restore scrolling the moment the overlay goes away.
  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  if (!show) return null;

  return (
    <div className="tr-lights" role="presentation" aria-hidden="true">
      <div className="tr-lights-rig">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} style={{ ["--i" as string]: i }} />
        ))}
      </div>
      <span className="tr-lights-go">Green Flag</span>
      <button
        type="button"
        className="tr-lights-skip"
        onClick={() => setShow(false)}
      >
        Skip
      </button>
    </div>
  );
}
