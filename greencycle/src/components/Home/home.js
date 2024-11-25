import React from 'react';
import { useNavigate } from "react-router-dom";
import EducationalCards from './Educationalcards.js'; // Import the EducationalCards component
import Whyrecycle from './Whyrecycle.js'; // Import the WhyRecycle component
import FAQs from './FAQs.js'; // Updated import path

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            {/* Navigation Bar */}
            <header className="navbar">
                <h1>Welcome to GreenCycles</h1>
                <nav>
                    <ul>
                        <li><a href="#why-recycle">Why Recycle?</a></li>
                        <li><a href="#educational-cards">Educational Cards</a></li>
                        <li><a href="#faq">FAQs</a></li>
                        <li><a href="#about-us">About Us</a></li>
                    </ul>
                </nav>
            </header>

            {/* Main Content */}
            <Whyrecycle />
            <EducationalCards />
            <FAQs /> {/* Render FAQ component here */}

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 GreenCycles. All rights reserved.</p>
                <p>Contact us: info@greencycles.com</p>
            </footer>
        </div>
    );
}

export default Home;