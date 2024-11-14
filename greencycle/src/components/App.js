import React from 'react'
import './app.css';
import NavBar from './NavBar/navbar.js';
import Home from './Home/home.js';
import About from './About/about.js';
import Map from './Map/map.js';
import Quiz from './Quiz/quiz.js';
import Community from './Community/community.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import 'leaflet/dist/leaflet.css';

export default function App(props) {
  return (
    <div>
      <NavBar/>
      <Router>
        <Routes>
          <Route path="/Home" element={<Home/>} />
          <Route path="/Map" element={<Map/>} />
          <Route path="/Quiz" element={<Quiz/>} />
          <Route path="/Community" element={<Community/>} />
          <Route path="/About" element={<About/>} />
        </Routes>
      </Router> 
    </div>
  );
}