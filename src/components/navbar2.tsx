import { Link } from "react-router-dom";

const logo = "https://www.figma.com/api/mcp/asset/2c8310c2-238d-48a5-b611-2122a12163d3"
const NAV_ITEMS = [
  { label: "Home",       route: "/",     style: "" },
  { label: "Formula IC", route: "/ic",   style: "" },
  { label: "EV",         route: "/ev",   style: "" },
  { label: "Baja",       route: "/baja", style: "" },
  { label: "Members",    route: "/members",     style: "members" },
  { label: "Sponsors",   route: "/sponsors",     style: "sponsors" },
];


export default function NavBar2({currentPage}: {currentPage: string}) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] h-[72px] bg-black border-b border-[#222] flex items-center"
      role="banner"
    >
      <div className="w-full max-w-[1440px] mx-auto px-[80px] flex items-center justify-between">
        <a href="#" aria-label="Terps Racing Home" className="flex-shrink-0 h-[44px]">
          <img src={logo} alt="Terps Racing logo" className="h-full w-auto object-contain" />
        </a>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-[6px]">
            {NAV_ITEMS.map(({ label, route, style }) => {
              const className = `inline-flex items-center px-4 py-2 rounded-full text-[0.92rem] font-normal leading-[1.3] transition-all duration-200
                ${style === "members"
                  ? "bg-[#ffda13] text-[#1e1e1e] hover:bg-[#ffe94a]"
                  : style === "sponsors"
                  ? "bg-[#c30000] text-white hover:bg-[#e00000]"
                  : "text-white hover:bg-white/[0.08]"
                }`;
              const fontStyle = { fontFamily: "'Roboto Mono', monospace" };

              const isCurrentPage = currentPage === label;
              console.log(isCurrentPage)

              return (
                <li key={label}>
                  {isCurrentPage ? (
                    // Already on this page — use a plain anchor to scroll to #about
                    <a href="#about" style={fontStyle} className={className}>
                      {label}
                    </a>
                  ) : (
                    // Navigate to the route via React Router
                    <Link to={route} style={fontStyle} className={className}>
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
