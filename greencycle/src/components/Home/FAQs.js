import React, { useState } from 'react';
import faqsContent from './Faqscontent.js'; // Import the FAQ content
import './FAQs.css';

const FAQs = () => {
    // State to track which FAQ is open
    const [openIndex, setOpenIndex] = useState(null);

    // Toggle the FAQ item (open/close)
    const toggleFAQ = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <section id="faq">
            <h2>Frequently Asked Questions</h2>
            {faqsContent.map((faq, index) => (
                <div
                    key={index}
                    className={`faq-item ${openIndex === index ? 'open' : ''}`} // Add 'open' class when it's clicked
                >
                    <h3 onClick={() => toggleFAQ(index)}>{faq.question}</h3>
                    {openIndex === index && <p>{faq.answer}</p>} {/* Show answer if the FAQ is open */}
                </div>
            ))}
        </section>
    );
}

export default FAQs;