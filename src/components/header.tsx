import Reveal from "./reveal";
import { header2_className, header2_style } from "~/siteInfo";

interface HeaderProps {
  id?: string;
  text: string;
  /** Small mono label rendered above the heading. */
  eyebrow?: string;
  /** Render dark-on-light instead of light-on-dark. */
  dark?: boolean;
  /** Centre the block. */
  center?: boolean;
  className?: string;
}

/** Section heading: optional eyebrow, animated title and gradient rule. */
export default function Header({
  id,
  text,
  eyebrow,
  dark = false,
  center = false,
  className = "",
}: HeaderProps) {
  return (
    <div
      className={`${
        center ? "flex flex-col items-center text-center" : ""
      } ${className}`}
    >
      {eyebrow && (
        <Reveal variant="up" className="mb-3 block">
          <span
            className="tr-eyebrow"
            style={dark ? { color: "#9e0f22" } : undefined}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal variant="up" delay={eyebrow ? 90 : 0}>
        <h2
          id={id}
          className={`${header2_className} ${dark ? "!text-black" : ""}`}
          style={header2_style}
        >
          {text}
        </h2>
      </Reveal>

      <Reveal
        variant="rule"
        delay={eyebrow ? 220 : 150}
        className="mb-6 md:mb-8"
      >
        <span className="tr-rule" />
      </Reveal>
    </div>
  );
}
