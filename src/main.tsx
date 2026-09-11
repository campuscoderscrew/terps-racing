import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "./app.css";

import Home from "./pages/home";
import Members from "./pages/members";
import Baja from "./pages/baja";
import IC from "./pages/ic";
import EV from "./pages/ev";
import Gallery from "./pages/gallery";
import Sponsors from "./pages/sponsors";
import NotFound from "./pages/notfound";

/** Jump to the top of the page on every navigation. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<Home />} />
        <Route path="members" element={<Members />} />
        <Route path="baja" element={<Baja />} />
        <Route path="ic" element={<IC />} />
        <Route path="ev" element={<EV />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="sponsors" element={<Sponsors />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* basename comes from vite's `base`, so this works at / and at /terps-racing/ */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
