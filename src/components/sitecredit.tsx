/* Copyright + credit line shared by every page's footer. */
const CCC_URL = "https://github.com/campuscoderscrew";

export function CreditText({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-[0.75rem] text-white/55 ${className}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      © {new Date().getFullYear()} Terps Racing · Built &amp; maintained by{" "}
      <a
        href={CCC_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="tr-link text-white/75 transition-colors hover:text-white"
      >
        Campus Coders Crew
      </a>
    </p>
  );
}

/** A slim footer bar for pages that don't have a footer of their own. */
export default function SiteCredit() {
  return (
    <footer className="tr-on-dark relative z-10 border-t border-white/[0.07] bg-tr-ink" role="contentinfo">
      <div className="tr-shell py-6 text-center">
        <CreditText />
      </div>
    </footer>
  );
}
