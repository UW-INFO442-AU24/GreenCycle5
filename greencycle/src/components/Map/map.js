import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../app.css';

import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const defaultIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const highlightedIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconSize: [30, 50],
    iconAnchor: [15, 50]
});

const LocateUser = ({ location }) => {
    const map = useMap();
    useEffect(() => {
        if (location) {
            map.flyTo(location, 13);
        }
    }, [location, map]);
    return null;
};

const MapComponent = () => {
    const [facilities, setFacilities] = useState([]);
    const [filteredFacilities, setFilteredFacilities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
    const [hoveredSidebarId, setHoveredSidebarId] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [userLocation, setUserLocation] = useState(null);
    const [showAutocomplete, setShowAutocomplete] = useState(false);

    const autocompleteRef = useRef(null);

    const counties = ["King", "Snohomish", "Pierce"];
    const citiesByCounty = {
        King: ["Seattle", "Bellevue", "Redmond"],
        Snohomish: ["Everett", "Lynnwood"],
        Pierce: ["Tacoma", "Puyallup"]
    };

    useEffect(() => {
        fetch('/facilities.json')
            .then((response) => response.json())
            .then((data) => {
                setFacilities(data);
                setFilteredFacilities(data);
            })
            .catch((error) => console.error('Error fetching facility data:', error));
    }, []);

    useEffect(() => {
        if (searchQuery && showAutocomplete) {
            const results = [];
            facilities.forEach(facility => {
                if (facility.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                    results.push({ type: 'facility', name: facility.name, facility });
                }
                facility.materials.forEach(material => {
                    if (material.toLowerCase().includes(searchQuery.toLowerCase()) && !results.some(r => r.name === material)) {
                        results.push({ type: 'material', name: material, facility });
                    }
                });
            });
            setAutocompleteResults(results);
        } else {
            setAutocompleteResults([]);
        }
    }, [searchQuery, facilities, showAutocomplete]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
                setShowAutocomplete(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = () => {
        const filtered = facilities.filter(facility =>
            facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            facility.materials.some(material => material.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredFacilities(filtered);
        setShowAutocomplete(false);
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                },
                (error) => console.error("Error getting location:", error)
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <div className="main-container">
            {/* Control Panel */}
            <div className="map-controls">
                <div style={{ position: 'relative', width: '100%' }}>
                    <input
                        type="text"
                        placeholder="Search materials or facilities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowAutocomplete(true)}
                        className="search-bar"
                    />
                    {autocompleteResults.length > 0 && showAutocomplete && (
                        <div className="autocomplete-dropdown" ref={autocompleteRef}>
                            {autocompleteResults.map((result, index) => (
                                <div
                                    key={index}
                                    className="autocomplete-item"
                                    onClick={() => {
                                        setSearchQuery(result.name);
                                        setFilteredFacilities([result.facility]);
                                        setAutocompleteResults([]);
                                        setShowAutocomplete(false);
                                    }}
                                >
                                    {result.type === 'material' ? `Material: ${result.name}` : `Facility: ${result.name}`}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={handleSearch} className="search-button">Search</button>
                <select onChange={(e) => setSelectedCounty(e.target.value)} value={selectedCounty} className="dropdown">
                    <option value="">Select County</option>
                    {counties.map(county => <option key={county} value={county}>{county}</option>)}
                </select>
                {selectedCounty && (
                    <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity} className="dropdown">
                        <option value="">Select City</option>
                        {citiesByCounty[selectedCounty].map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                )}
                <button onClick={getUserLocation} className="location-button">Use My Location</button>
            </div>

            {/* Flex Container for Map and Sidebar */}
            <div className="content-container">
                {/* Map Display */}
                <MapContainer center={[47.6567, -122.3166]} zoom={13} className="map">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {userLocation && <LocateUser location={userLocation} />}
                    {filteredFacilities.map((facility) => (
                        <Marker 
                            key={facility.id} 
                            position={[facility.latitude, facility.longitude]}
                            icon={facility.id === hoveredSidebarId ? highlightedIcon : defaultIcon}
                            eventHandlers={{
                                mouseover: () => setHoveredMarkerId(facility.id),
                                mouseout: () => setHoveredMarkerId(null)
                            }}
                        >
                            {hoveredMarkerId === facility.id && (
                                <Tooltip 
                                    direction="top" 
                                    offset={[0, -10]} 
                                    opacity={1} 
                                    interactive 
                                    permanent
                                >
                                    <div>
                                        <strong>{facility.name}</strong><br />
                                        {facility.address}<br />
                                        {facility.description}
                                    </div>
                                </Tooltip>
                            )}
                        </Marker>
                    ))}
                </MapContainer>

                {/* Sidebar with facility information */}
                <div className="sidebar">
                    <h3>Recycling Facilities</h3>
                    {filteredFacilities.map((facility) => (
                        <div 
                            key={facility.id} 
                            className="facility-card"
                            onMouseEnter={() => setHoveredSidebarId(facility.id)}
                            onMouseLeave={() => setHoveredSidebarId(null)}
                        >
                            <h4>{facility.name}</h4>
                            <p>{facility.address}</p>
                            <p>{facility.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
