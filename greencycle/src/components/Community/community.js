import React, { useState } from 'react';

export default function Community(props) {
    // Manage details for events and articles
    const [eventDetails, setEventDetails] = useState(null);
    const [filter, setFilter] = useState("all");

    // Event details (can be dynamically loaded)
    const events = [
        { id: 1, title: "E-Waste Recycling Event", date: "December 7, 2024", time: "11 am - 2 pm", location: "InterConnection, North 35th St 1121 Seattle", county: "king", description: "Bring your electronics to recycle for free! Laptops, desktops, TVs, phones, and much more are accepted." },
        { id: 2, title: "Free Drive Thru Event", date: "December 14, 2024", time: "10 am - 2 pm", location: "South King Tool Library, 1700 S 340th St Federal Way", county: "king", description: "Residents are able to drop off up to 3 mattresses for free, they are also offering free document shredding!" },
        { id: 3, title: "Scouting For Trees", date: "January 4, 2025", time: "10 am - 2 pm", location: "Pick Up (Must be in Federal Way city limits)", county: "king", description: "Register your holiday tree for PICK UP." },
    ];

    // Articles details (can be dynamically loaded)
    const articles = [
        { id: 1, title: "Recycle Right. It Matters.", description: "Learn the standards for recycling within the Seattle community.", url: "https://seattle.gov/utilities/your-services/collection-and-disposal/recycling/recycle-right"},
        { id: 2, title: "Top 5 Benefits of Recycling", description: "Explore the positive impact recycling has on the environment and community.", url: "https://example.com/recycling-benefits" },
    ];

    // Filter events based on selected county
    const filteredEvents = filter === "all" ? events : events.filter(event => event.county === filter);

    // Handle filter change
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
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
                    <div className="filter-container">
                        <label htmlFor="event-filter">Filter by County:</label>
                        <select id="event-filter" onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="king">King County</option>
                            <option value="pierce">Pierce County</option>
                            <option value="snohomish">Snohomish County</option>
                        </select>
                    </div>
                    <div id="event-list">
                        {filteredEvents.map(event => (
                            <div key={event.id} className="event-card">
                                <h3>{event.title}</h3>
                                <p><strong>Date:</strong> {event.date}</p>
                                <p><strong>Time:</strong> {event.time}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <button onClick={() => setEventDetails(event)}>More Info</button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Articles Section */}
                <section className="community-articles">
                    <h2>Recycling Tips & Articles</h2>
                    {articles.map(article => (
                        <div key={article.id} className="article-card">
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                <button>Read More</button>
                            </a>
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
            </main>

            <footer>
                <small>&copy; 2024 GreenCycle</small>
            </footer>
        </div>
    );
}
