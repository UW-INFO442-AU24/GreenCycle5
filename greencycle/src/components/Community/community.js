import React, { useState } from 'react';

export default function Community(props) {
    // Manage details for events and articles
    const [eventDetails, setEventDetails] = useState(null);
    const [articleDetails, setArticleDetails] = useState(null);

    // Event details (can be dynamically loaded)
    const events = [
        { id: 1, title: "Beach Cleanup Day", date: "March 15, 2024", location: "Puget Sound Beach", description: "Join the community for a beach cleanup to keep our shores clean. Supplies provided!" },
        // Add more events as needed
    ];

    // Articles details (can be dynamically loaded)
    const articles = [
        { id: 1, title: "5 Simple Ways to Reduce Plastic Use", description: "Learn how to minimize plastic waste in your daily life with these easy tips.", content: "Detailed content about reducing plastic use..." },
        // Can add more articles
    ];

    
    const showEventDetails = (event) => {
        setEventDetails(event);
    };

    const showArticleDetails = (article) => {
        setArticleDetails(article);
    };

    return (
        <div>
            <header>
                <h1>Welcome to the Community Page!</h1>
                <p>Stay updated on local recycling events, explore articles on sustainability, and join the conversation.</p>
            </header>

            <main>
                {/* Events Section */}
                <section className="community-events">
                    <h2>Upcoming Recycling Events</h2>
                    {events.map(event => (
                        <div key={event.id} className="event-card">
                            <h3>{event.title}</h3>
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <button onClick={() => showEventDetails(event)}>More Info</button>
                        </div>
                    ))}
                </section>

                {/* Articles Section */}
                <section className="community-articles">
                    <h2>Recycling Tips & Articles</h2>
                    {articles.map(article => (
                        <div key={article.id} className="article-card">
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <button onClick={() => showArticleDetails(article)}>Read More</button>
                        </div>
                    ))}
                </section>

                {/* Event Details Modal */}
                {eventDetails && (
                    <div className="modal">
                        <h2>{eventDetails.title}</h2>
                        <p><strong>Date:</strong> {eventDetails.date}</p>
                        <p><strong>Location:</strong> {eventDetails.location}</p>
                        <p>{eventDetails.description}</p>
                        <button onClick={() => setEventDetails(null)}>Close</button>
                    </div>
                )}

                {/* Article Details Modal */}
                {articleDetails && (
                    <div className="modal">
                        <h2>{articleDetails.title}</h2>
                        <p>{articleDetails.content}</p>
                        <button onClick={() => setArticleDetails(null)}>Close</button>
                    </div>
                )}
            </main>

            <footer>
                <small>&copy; 2024 Green Cycle 5</small>
            </footer>
        </div>
    );
}
