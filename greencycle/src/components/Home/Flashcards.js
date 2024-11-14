import React, { useState } from 'react';
import './Flashcard.css'; // We'll create the CSS file later

const Flashcard = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped); alert('umi');
    };

    return (
        <div className="flashcard" onClick={handleClick}>
            <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
                <div className="flashcard-front">
                    <p>{question}</p>
                </div>
                <div className="flashcard-back">
                    <p>{answer}</p>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;