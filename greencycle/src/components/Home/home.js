import React from 'react';
import './Home.css'; // Import your CSS file
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div className="home">
            {/* Navigation Bar */}
            <header className="navbar">
                <h1>GreeCycles</h1>
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
            <main className="main-content">
                <section id="hero" className="hero">
                    <h2>Welcome to GreeCycles!</h2>
                    <p>Learn how to recycle properly and make your community greener!</p>
                </section>

                <section id="why-recycle" className="section">
                    <h2>Why Recycle?</h2>
                    <p>Learn the importance of recycling and how it benefits our environment.</p>
                </section>

                <section id="educational-cards" className="section">
                    <h2>Educational Cards</h2>
                    <p>Get quick tips and information on recycling best practices.</p>
                </section>

                <section id="faq" className="section">
                    <h2>FAQs for Recycling in Seattle</h2>
                    <p>Answers to frequently asked questions about recycling in the Puget Sound area.</p>
                </section>

                <section id="about-us" className="section">
                    <h2>About Us</h2>
                    <p>Meet the team behind GreeCycles and learn about our mission.</p>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 GreeCycles. All rights reserved.</p>
                <p>Contact us: info@greencycles.com</p>
            </footer>
        </div>
    );
};

export default Home;