import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./app.css";

import { ThemeProvider } from "./components/theme";
import { MotionProvider } from "./components/motion";
import RouteTransition from "./components/transition";

import Home from "./pages/home";
import Members from "./pages/members";
import Baja from "./pages/baja";
import IC from "./pages/ic";
import EV from "./pages/ev";
import Gallery from "./pages/gallery";
import Sponsors from "./pages/sponsors";
import NotFound from "./pages/notfound";

/**
 * Every navigation goes through the blade wipe in `RouteTransition`, which also
 * owns the scroll reset: it jumps to the top *while the viewport is covered*,
 * so the new hero is already in place by the time it is uncovered. (The old
 * smooth `scrollTo` meant the incoming page animated in mid-slide.) Routes are
 * rendered against the transition's own lagging location, not the live one.
 */
export default function App() {
  return (
    <RouteTransition>
      {(location) => (
        <Routes location={location}>
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
      )}
    </RouteTransition>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* basename comes from vite's `base`, so this works at / and at /terps-racing/ */}
    <ThemeProvider>
      <MotionProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      </MotionProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
