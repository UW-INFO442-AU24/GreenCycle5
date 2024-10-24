import React from 'react'
import { NavLink } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap"
import '../../index.css';
import { InputGroup, Button, Input } from 'reactstrap';
import { useState } from "react"

export default function NavBar(props) {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const handleToggle = () => {
        setHamburgerOpen(previousValue => !previousValue)
    }

    return (
        <div className="nav-container">
           <div className="navbar">
             <img src="..\..\..\img\hamburger.png" className="logo" alt="logo of Source" href="/Home" />
            <nav>
            <button className="hamburgerButton" state={hamburgerOpen ? "Close" : "Open"} onClick={handleToggle}><img src="img/hamburger-download.png" className="ham-icon" alt="hamburger icon" /></button>
              <ul className={`menuNav ${hamburgerOpen ? " showMenu" : ""}`}>
                <li>
                    <a className="navigator" href="/Home">Home</a>
                    <a className="navigator" href="/About">About</a>
                    <a className="navigator" href="/Map">Map</a>
                    <a className="navigator" href="/Quiz">Quiz</a>
                    <a className="navigator" href="/Community">Community</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      );
}