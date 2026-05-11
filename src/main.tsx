import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter  } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
// import Crew from './src/pages/Crew';

import Home from './pages/home.js';
import Members from './pages/members.js';
import Baja from './pages/baja.js';
import IC from './pages/ic.js';
import Sponsors from './pages/sponsors.js';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<Home />} />
        <Route path="members" element={<Members />} />
        <Route path="baja" element={<Baja />} />
        <Route path="IC" element={<IC />} />
        <Route path="sponsors" element={<Sponsors />} />
      </Routes>
    </>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <HashRouter >
    <App />
  </HashRouter >
);