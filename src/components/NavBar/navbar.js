import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="nav-container">
      <header>Green Cycle</header>
      <div className="navbar">
        <nav className="menuNav">
          <ul>
            <li>
              <NavLink className="navigator" to="/Home">Home</NavLink>
            </li>
            <li>
              <NavLink className="navigator" to="/Map">Map</NavLink>
            </li>
            <li>
              <NavLink className="navigator" to="/Quiz">Quiz</NavLink>
            </li>
            <li>
              <NavLink className="navigator" to="/Community">Community</NavLink>
            </li>
            <li>
              <NavLink className="navigator" to="/About">About</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
