import React from 'react';
import { useNavigate } from "react-router-dom";
import EducationalCards from './Educationalcards.js'; // Import the EducationalCards component
import Whyrecycle from './Whyrecycle.js'; // Import the WhyRecycle component
import FAQs from './FAQs.js'; // Updated import path
import './home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            {/* Navigation Bar */}
            <header
                className="navbar"
                style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    backgroundImage: "url('/images/recycling.jpg')", // Reference from public folder
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    borderBottom: '3px solid #a5d6a7',
                    borderRadius: '0 0 30px 30px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
            >
                <h1>Welcome to GreenCycle</h1>
                <nav>
                    <ul>
                        <li><a href="#why-recycle">Why Recycle?</a></li>
                        <li><a href="#educational-cards">Quick Tips!</a></li>
                        <li><a href="#faq">FAQs</a></li>
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