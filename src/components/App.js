import React from 'react';
import './app.css';
import NavBar from './NavBar/navbar.js';
import Home from './Home/home.js';
import About from './About/about.js';
import Map from './Map/map.js';
import Quiz from './Quiz/quiz.js';
import Community from './Community/community.js';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import 'leaflet/dist/leaflet.css';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/home" />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}
