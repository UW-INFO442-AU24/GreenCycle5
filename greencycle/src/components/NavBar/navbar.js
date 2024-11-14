import React from 'react'
import { NavLink } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap"
import { InputGroup, Button, Input } from 'reactstrap';
import { useState } from "react"

export default function NavBar(props) {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const handleToggle = () => {
        setHamburgerOpen(previousValue => !previousValue)
    }

    return (
        <div className="nav-container">
          <header>Green Cycle</header>
           <div className="navbar">
            <nav>
              <ul className={`menuNav ${hamburgerOpen ? " showMenu" : ""}`}>
                <li>
                    <a className="navigator" href="/Home">Home</a>
                    <a className="navigator" href="/Map">Map</a>
                    <a className="navigator" href="/Quiz">Quiz</a>
                    <a className="navigator" href="/Community">Community</a>
                    <a className="navigator" href="/About">About</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      );
}