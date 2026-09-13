import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./themetoggle";
import MotionToggle from "./motiontoggle";
import logo from "../public/images/homePage/TR_logo.webp";

const NAV_ITEMS = [
  { label: "Home", route: "/", style: "" },
  { label: "Formula IC", route: "/ic", style: "" },
  { label: "EV", route: "/ev", style: "" },
  { label: "Baja", route: "/baja", style: "" },
  { label: "Gallery", route: "/gallery", style: "" },
  { label: "Sponsors", route: "/sponsors", style: "" },
  { label: "Join Us", route: "/members", style: "cta" },
];

export default function NavBar({
  /**
   * Whether the page opens on a dark hero (a photograph or a dark plate).
   * Before the bar solidifies it is transparent, so its links take their colour
   * from whatever is behind them: `true` pins them white-on-dark, `false` lets
   * them follow the theme. Most pages open on a hero photo, hence the default.
   */
  overMedia = true,
}: {
  overMedia?: boolean;
} = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const { pathname } = useLocation();

  // Solidify the bar and drive the reading-progress rail on scroll.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on navigation, and lock the page behind it.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (route: string) =>
    route === "/"
      ? pathname === "/"
      : pathname.toLowerCase().startsWith(route.toLowerCase());

  const linkClass = (route: string, style: string) => {
    const active = isActive(route);
    if (style === "cta") {
      return "tr-btn tr-btn-gold !px-6 !py-2 !text-[0.82rem]";
    }
    return [
      "relative inline-flex items-center px-3.5 py-2 rounded-full text-[0.88rem] font-medium leading-none",
      "transition-colors duration-300",
      active ? "tr-nav-active" : "text-white/75 hover:text-white",
    ].join(" ");
  };

  const renderLink = (label: string, route: string, style: string) => (
    <Link
      to={route}
      className={linkClass(route, style)}
      style={style === "cta" ? undefined : { fontFamily: "var(--font-mono)" }}
      aria-current={isActive(route) ? "page" : undefined}
    >
      {label}
      {style !== "cta" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full origin-left transition-transform duration-300"
          style={{
            background: "var(--tr-accent)",
            transform: isActive(route) ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      )}
    </Link>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled || menuOpen
          ? "tr-glass shadow-[0_8px_32px_-16px_var(--tr-nav-shadow)]"
          : `bg-transparent ${overMedia ? "tr-on-dark" : ""}`
      }`}
      role="banner"
    >
      {/* Tachometer: fills green through gold to red, and lights the redline
          once you are deep into the page. */}
      <div
        className="tr-tach"
        aria-hidden="true"
        data-redline={progress > 0.82}
      >
        <div
          className="tr-tach-fill"
          style={{ transform: `scaleX(${progress})` }}
        />
        <div className="tr-tach-redline" />
      </div>

      <div
        className="tr-shell flex items-center justify-between transition-[height] duration-500"
        style={{ height: scrolled ? "62px" : "var(--tr-nav-h)" }}
      >
        <Link
          to="/"
          aria-label="Terps Racing home"
          className="group flex-shrink-0 flex items-center"
          style={{
            height: scrolled ? 36 : 44,
            transition: "height 500ms var(--tr-ease)",
          }}
        >
          <img
            src={logo}
            alt="Terps Racing"
            className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1.5">
            {NAV_ITEMS.map(({ label, route, style }) => (
              <li key={label}>{renderLink(label, route, style)}</li>
            ))}
            <li className="ml-2 flex items-center gap-1.5">
              <MotionToggle />
              <ThemeToggle />
            </li>
          </ul>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <MotionToggle />
          <ThemeToggle />
          <button
            className="relative flex flex-col justify-center items-center w-11 h-11 gap-[6px] rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-[20px] h-[2px] rounded-full bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`block w-[20px] h-[2px] rounded-full bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-[20px] h-[2px] rounded-full bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden border-t border-white/[0.07] transition-[max-height,opacity] duration-500 ${
          menuOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "var(--tr-drawer-bg)" }}
      >
        <nav aria-label="Mobile">
          <ul className="tr-shell flex flex-col py-5 gap-1">
            {NAV_ITEMS.map(({ label, route, style }, i) => (
              <li
                key={label}
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-12px)",
                  transition: `opacity 420ms var(--tr-ease) ${
                    i * 55
                  }ms, transform 420ms var(--tr-ease) ${i * 55}ms`,
                }}
              >
                {style === "cta" ? (
                  <div className="pt-3">{renderLink(label, route, style)}</div>
                ) : (
                  <Link
                    to={route}
                    className={`block px-2 py-3 text-[1.05rem] border-b border-white/[0.06] transition-colors ${
                      isActive(route)
                        ? "tr-nav-active"
                        : "text-white/80 hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
