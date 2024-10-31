import React from 'react'
import NavBar from './components/NavBar/navbar.js';
import Home from './components/Home/home.js';
import About from './components/About/about.js';
import Map from './components/Account/map.js';
import Quiz from './components/Quiz/quiz.js';
import Community from './components/Community/community.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import 'leaflet/dist/leaflet.css';

export default function App(props) {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/Home" element={<Home/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Map" element={<Map/>} />
          <Route path="/Quiz" element={<Quiz/>} />
          <Route path="/Community" element={<Community/>} />
        </Routes>
      </Router> 
    </div>
  );
}