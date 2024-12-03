import React from 'react'

export default function About(props) {
    return (
        <div id="about-me">
            <h1>About Us</h1>
            <p>We are a group of college students driven to solve a problem we've noticed in our 
                communities: Recycling. Recycling is essential to a sustainable future, but we have 
                observed challenges to recycling that make it hard for people to participate.
                Confusion on varying recycling rules as well as lack of knowledge on where to deposit
                recyclable items can discourage people from contributing. That's why we've made King County
                recycling information available on this singular platform.</p>
            <h1>Our Team:</h1>
            <p>Kevin Nguyen, Carl Searle, Kaylina Saetern, Paul Gialis, Jayden Set</p>
            <iframe id="recycling" width="600" height="415" src="https://www.youtube.com/embed/b7GMpjx2jDQ"></iframe>
        </div>
    );
}