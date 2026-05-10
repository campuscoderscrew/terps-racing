import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter  } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// import Crew from './src/pages/Crew';

import Home from './pages/home.js';
import Members from './pages/members.js';
import Baja from './pages/baja.js';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<Home />} />
      <Route path="members" element={<Members />} />
      <Route path="baja" element={<Baja />} />
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <HashRouter >
    <App />
  </HashRouter >
);