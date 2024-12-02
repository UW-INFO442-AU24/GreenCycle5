import React from 'react';
import Flashcard from './Flashcards';  // Import the Flashcard component

const EducationalCards = () => {
    const flashcardsData = [
        { question: "What is the importance of recycling?", answer: "Recycling reduces waste, saves energy, and conserves natural resources." },
        { question: "What materials can be recycled?", answer: "Paper, plastic, glass, and metal are commonly recyclable materials." },
        { question: "How does recycling help the environment?", answer: "It reduces pollution, saves landfill space, and lowers energy consumption." },
        { question: "What happens if we don't recycle?", answer: "Waste piles up in landfills, and more resources are wasted." },

    ];

    return (
        <section id="educational-cards" className="section">
            <h2>Educational Cards</h2>
            <p>Get quick tips and information on recycling best practices.</p>
            <div className="flashcard-container">
                {flashcardsData.map((card, index) => (
                    <Flashcard key={index} question={card.question} answer={card.answer} />
                ))}
            </div>
        </section>
    );
};

export default EducationalCards;