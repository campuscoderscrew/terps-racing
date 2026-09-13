import { Link } from "react-router-dom";
import NavBar from "~/components/navbar";
import Backdrop from "~/components/backdrop";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-tr-ink text-white">
      <NavBar />
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <Backdrop
          variant="floor"
          embers={6}
          corners
          beams
          cornerColor="var(--tr-red)"
        />

        <div
          className="relative"
          style={{ animation: "tr-fade-up 0.7s var(--tr-ease) both" }}
        >
          <span className="tr-eyebrow">Error 404</span>
          <h1
            className="tr-display tr-text-gold mt-4"
            style={{ fontSize: "clamp(4rem, 18vw, 12rem)" }}
          >
            404
          </h1>
          <p
            className="mx-auto mt-2 max-w-[46ch] text-white/60"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem,1.7vw,1.1rem)",
            }}
          >
            You've gone off track. That page doesn't exist — let's get you back
            on the racing line.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/" className="tr-btn tr-btn-gold">
              Back to Home
            </Link>
            <Link to="/gallery" className="tr-btn tr-btn-ghost">
              Browse the Gallery
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
