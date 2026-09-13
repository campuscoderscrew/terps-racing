/* ============================================================================
   FuelBanner — the "Fuel the Future" strip above the footer.

   This used to be `Footer.webp`: a baked image with the wordmark, the two
   handles and the URL flattened into it. Which meant the handles were not
   selectable, not linkable and not readable by a screen reader; the type
   re-sampled at every width instead of setting; and none of it followed the
   site's own fonts or palette. It is markup now. The only pixels left are the
   photograph, which is the one part that should be an image.
   ========================================================================= */

import carImage from "../public/images/homePage/carousel/IC_car_zoom_in.webp";

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect
        x="3.2"
        y="3.2"
        width="17.6"
        height="17.6"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.9" r="1.25" fill="currentColor" />
    </svg>
  );
}

function GlobeGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8.8" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.2 12h17.6M12 3.2c2.4 2.5 3.6 5.4 3.6 8.8s-1.2 6.3-3.6 8.8c-2.4-2.5-3.6-5.4-3.6-8.8S9.6 5.7 12 3.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function FuelBanner({
  image = carImage,
  alt = "The Terps Racing Formula IC car on track",
}: {
  image?: string;
  alt?: string;
}) {
  return (
    <section className="tr-fuel tr-on-dark" aria-label="Fuel the Future">
      <span className="tr-fuel-rail" aria-hidden="true" />

      <div className="tr-fuel-art">
        <img src={image} alt={alt} loading="lazy" decoding="async" />
        <span className="tr-fuel-art-scrim" aria-hidden="true" />
      </div>

      <div className="tr-fuel-copy">
        <p className="tr-fuel-word">Fuel the Future</p>

        <ul className="tr-fuel-meta">
          <li>
            <InstagramGlyph />
            <a
              href="https://www.instagram.com/terpsracing/"
              target="_blank"
              rel="noreferrer"
            >
              @terpsracing
            </a>
            <span aria-hidden="true" className="tr-fuel-sep">
              |
            </span>
            <a
              href="https://www.instagram.com/terpsracing_ic/"
              target="_blank"
              rel="noreferrer"
            >
              @terpsracing_ic
            </a>
          </li>
          <li>
            <GlobeGlyph />
            <a href="https://racing.umd.edu" target="_blank" rel="noreferrer">
              www.racing.umd.edu
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
