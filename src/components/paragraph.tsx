import Reveal from "./reveal";
import { p_className, p_style } from "~/siteInfo";

interface ParagraphProps {
  text: string;
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
  dark?: boolean;
}

export default function Paragraph({
  text,
  delay = 0,
  className = "",
  dark = false,
}: ParagraphProps) {
  return (
    <Reveal variant="up" delay={delay}>
      <p
        className={`${p_className} ${
          dark ? "!text-black/75" : ""
        } ${className}`}
        style={p_style}
      >
        {text}
      </p>
    </Reveal>
  );
}
