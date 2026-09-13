/* ============================================================================
   RouteTransition — the cut between pages.

   Navigation used to be: jump the scroll position, swap the tree, done. The
   smooth `scrollTo` in particular meant the new page's hero animated in while
   the old page was still sliding away under it.

   Now a navigation is a cut. Three angled blades — gold, red, ink — sweep in
   from the left, each a beat behind the last, until the ink one covers the
   viewport. Under that cover the route actually swaps and the scroll resets
   *instantly*, which is the whole trick: the expensive, ugly part of a
   navigation happens where nobody can see it. The blades then continue off to
   the right in the reverse order, uncovering the new page, which settles the
   last few pixels into place.

   Timing is deliberately short. A page wipe that outstays its welcome stops
   reading as style and starts reading as latency.

   Structure notes:
   - The overlay is portalled to <body>. A transform anywhere above the page
     content makes that element the containing block for `position: fixed`
     children — the trap that once broke the navbar, and the reason `.tr-page`
     below animates opacity and nothing else.
   - It only exists in the DOM while a transition is running.
   - At motion level `reduced` there is no overlay at all: the route swaps and
     the scroll jumps, as before.
   ========================================================================= */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLocation, type Location } from "react-router-dom";
import { useMotion } from "./motion";

/**
 * Blades in (240ms, last one landing at 380ms) plus a short hold on full cover
 * — the hold is what makes the stamped page name readable rather than a flash.
 * Must match `--tr-xfade-cover` in app.css.
 */
const COVER_MS = 520;
/** Blades out; last one clears at 540ms. Must match `--tr-xfade-reveal`. */
const REVEAL_MS = 560;

type Phase = "idle" | "cover" | "reveal";

/** The word stamped on the ink blade mid-cut. */
function routeLabel(pathname: string): string {
  const seg = pathname.replace(/^\/+|\/+$/g, "").split("/")[0]?.toLowerCase();
  switch (seg) {
    case "":
    case "about":
      return "Terps Racing";
    case "ic":
      return "Formula IC";
    case "ev":
      return "Formula EV";
    case "baja":
      return "Baja SAE";
    case "gallery":
      return "Gallery";
    case "sponsors":
      return "Partners";
    case "members":
      return "Join Us";
    default:
      return "Terps Racing";
  }
}

/**
 * Jump, do not glide.
 *
 * `behavior: "auto"` does NOT mean "instant" — it means "whatever CSS says",
 * and `html` here carries `scroll-behavior: smooth`. So the reset under the
 * blades was animating: the wipe opened on a page still gliding up from the
 * previous scroll position, which is exactly the thing this component exists to
 * hide. `"instant"` is the value that overrides the stylesheet.
 */
function jumpToTop() {
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

function Blades({ phase, label }: { phase: Phase; label: string }) {
  return createPortal(
    <div className="tr-xfade" data-phase={phase} aria-hidden="true">
      <span className="tr-xfade-blade tr-xfade-blade-gold" />
      <span className="tr-xfade-blade tr-xfade-blade-red" />
      <span className="tr-xfade-blade tr-xfade-blade-ink">
        <span className="tr-xfade-mark">
          <span className="tr-xfade-checker" />
          <span className="tr-xfade-label">{label}</span>
        </span>
      </span>
    </div>,
    document.body,
  );
}

export default function RouteTransition({
  children,
}: {
  /** Rendered with the location to paint — which lags behind the real one
      while the blades are covering the viewport. */
  children: (location: Location) => ReactNode;
}) {
  const location = useLocation();
  const { atLeast } = useMotion();

  const [display, setDisplay] = useState<Location>(location);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    // Same page, different hash (`#teams`) — that is an in-page jump, not a
    // navigation. Leave the scroll position and the tree alone.
    if (location.pathname === display.pathname) {
      if (location.key !== display.key) setDisplay(location);
      return;
    }

    const clear = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    clear();

    if (!atLeast("standard")) {
      setDisplay(location);
      jumpToTop();
      return;
    }

    setPhase("cover");
    timers.current.push(
      window.setTimeout(() => {
        // Covered: do the jarring work where it cannot be seen.
        setDisplay(location);
        jumpToTop();
        setPhase("reveal");
      }, COVER_MS),
    );
    timers.current.push(
      window.setTimeout(() => setPhase("idle"), COVER_MS + REVEAL_MS),
    );

    return clear;
    // `display` is written by this effect; re-running on it would loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, atLeast]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  return (
    <>
      <div className="tr-page" data-phase={phase}>
        {children(display)}
      </div>

      {phase !== "idle" && (
        <Blades phase={phase} label={routeLabel(location.pathname)} />
      )}

      {/* Screen readers get no cue from a visual wipe. */}
      <span aria-live="polite" className="sr-only">
        {phase === "reveal" ? `${routeLabel(display.pathname)} page` : ""}
      </span>
    </>
  );
}
