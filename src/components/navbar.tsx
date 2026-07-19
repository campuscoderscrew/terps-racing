import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../public/images/homePage/TR_logo.png";

const NAV_ITEMS = [
  { label: "Home",       route: "/",        style: "" },
  { label: "Formula IC", route: "/ic",       style: "" },
  { label: "EV",         route: "/ev",       style: "" },
  { label: "Baja",       route: "/baja",     style: "" },
  { label: "Members",    route: "/members",  style: "members" },
  { label: "Gallery",    route: "/gallery",  style: "" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const getClassName = (route: string, style: string) => {
    const isActive = pathname === route || (route !== "/" && pathname.startsWith(route));
    return `inline-flex items-center px-4 py-2 rounded-full text-[0.92rem] font-normal leading-[1.3] transition-all duration-200
      ${style === "members"
        ? `bg-[#ffda13] text-[#1e1e1e] hover:bg-[#ffe94a] ${isActive ? "underline underline-offset-4 decoration-[#1e1e1e]" : ""}`
        : style === "sponsors"
        ? `bg-[#c30000] text-white hover:bg-[#e00000] ${isActive ? "underline underline-offset-4 decoration-white" : ""}`
        : `text-white hover:bg-white/[0.08] ${isActive ? "underline underline-offset-4 decoration-[#ffda13]" : ""}`
      }
    `;
  };

  const fontStyle = { fontFamily: "'Roboto Mono', monospace" };

  const renderLink = (label: string, route: string, style: string, onClick?: () => void) => (
    <Link to={route} style={fontStyle} className={getClassName(route, style)} onClick={onClick}>
      {label}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-black border-b border-[#222]" role="banner">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(20px,5vw,80px)] h-[72px] flex items-center justify-between">
        <a href="#" aria-label="Terps Racing Home" className="flex-shrink-0 h-[44px]">
          <img src={logo} alt="Terps Racing logo" className="h-full w-auto object-contain" />
        </a>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-[6px]">
            {NAV_ITEMS.map(({ label, route, style }) => (
              <li key={label}>{renderLink(label, route, style)}</li>
            ))}
          </ul>
        </nav>

        <button
          className="md:hidden flex flex-col justify-center items-center w-[40px] h-[40px] gap-[6px] rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={`block w-[22px] h-[2px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`block w-[22px] h-[2px] bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-[22px] h-[2px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-black border-t border-[#222] ${menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col px-[clamp(20px,5vw,80px)] py-4 gap-2">
            {NAV_ITEMS.map(({ label, route, style }) => (
              <li key={label}>{renderLink(label, route, style, () => setMenuOpen(false))}</li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}