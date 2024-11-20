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


const userLocationIcon = new L.Icon({
    iconUrl: './icons/your location pin.png',
    iconSize: [30, 30], // Customize size as needed
    iconAnchor: [15, 30], // Point of the icon that will correspond to marker's location
});

const LocateUser = ({ location }) => {
    const map = useMap();
    useEffect(() => {
        if (location) {
            map.flyTo(location, 13);
        }
    }, [location, map]);

    return location ? (
        <Marker position={location} icon={userLocationIcon}>
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div>Your Location</div>
            </Tooltip>
        </Marker>
    ) : null;
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
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

    const counties = ['King', 'Snohomish', 'Pierce'];
    const citiesByCounty = {
        King: ['Seattle', 'Bellevue', 'Redmond'],
        Snohomish: ['Everett', 'Lynnwood'],
        Pierce: ['Tacoma', 'Puyallup'],
    };

    const facilityIcon = new L.Icon({
        iconUrl: './icons/recycle pin.png',
        iconSize: [30, 30], // Customize size as needed
        iconAnchor: [15, 30], // Point of the icon that will correspond to marker's location
    });
    
    

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
        if (searchQuery) {
            const facilityMatches = facilities
                .filter((facility) =>
                    facility.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((facility) => ({
                    type: 'facility',
                    name: facility.name,
                    facility,
                }));
    
            const materialMatches = facilities
                .flatMap((facility) =>
                    facility.materials.map((material) => ({
                        type: 'material',
                        name: material,
                        facility,
                    }))
                )
                .filter(
                    (item) =>
                        item.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
    
            // Deduplicate material matches by name
            const uniqueMaterials = Array.from(
                new Map(
                    materialMatches.map((item) => [item.name.toLowerCase(), item])
                ).values()
            );
    
            setAutocompleteResults([...facilityMatches, ...uniqueMaterials]);
        } else {
            setAutocompleteResults([]);
        }
    }, [searchQuery, facilities]);
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
                setShowAutocomplete(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = () => {
        const filtered = facilities.filter(
            (facility) =>
                facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                facility.materials.some((material) =>
                    material.toLowerCase().includes(searchQuery.toLowerCase())
                )
        );
        setFilteredFacilities(filtered); // Update the displayed facilities
    
        // Fly to the first result if it exists
        if (filtered.length > 0) {
            flyToLocation([filtered[0].latitude, filtered[0].longitude]);
            setSelectedFacilityId(filtered[0].id);
        }
    
        setShowAutocomplete(false); // Hide the autocomplete dropdown
    };

    
    
    // Sidebar click handler
    const [selectedFacilityId, setSelectedFacilityId] = useState(null);

    const flyToLocation = (location) => {
        const map = mapRef.current;
        if (map && location) {
            map.flyTo(location, 13); // Fly to the given location with a zoom level of 13
        }
    };

    const handleSidebarClick = (facility) => {
        console.log('Selected facility:', facility);
        setSelectedFacilityId(facility.id); // This triggers the useEffect
    };
    
    
    
    // Map reference
    const mapRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const location = [latitude, longitude];
                    setUserLocation(location);
                    const sortedFacilities = [...facilities].sort((a, b) => {
                        const distA = calculateDistance(location[0], location[1], a.latitude, a.longitude);
                        const distB = calculateDistance(location[0], location[1], b.latitude, b.longitude);
                        return distA - distB;
                    });
                    setFilteredFacilities(sortedFacilities);
                },
                (error) => console.error('Error getting location:', error)
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };

    return (
        <div className="main-container">
            <div className="map-controls">
                <div style={{ position: 'relative', width: '100%' }}>
                    <input
                        type="text"
                        placeholder="Search materials or facilities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowAutocomplete(true)}
                        onKeyDown={handleKeyDown}
                        className="search-bar"
                    />
                    {autocompleteResults.length > 0 && showAutocomplete && (
                        <div className="autocomplete-dropdown" ref={autocompleteRef}>
                            {autocompleteResults.map((result, index) => (
                                <div
                                    key={index}
                                    className="autocomplete-item"
                                    onClick={() => {
                                        setSearchQuery(result.name); // Set the search query to the selected autocomplete result
                                        setShowAutocomplete(false); // Hide the autocomplete dropdown
                                        handleSearch(); // Trigger the search logic
                                    }}
                                >
                                    {result.type === 'material' ? `Material: ${result.name}` : `Facility: ${result.name}`}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
                <select onChange={(e) => setSelectedCounty(e.target.value)} value={selectedCounty} className="dropdown">
                    <option value="">Select County</option>
                    {counties.map((county) => (
                        <option key={county} value={county}>
                            {county}
                        </option>
                    ))}
                </select>
                {selectedCounty && (
                    <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity} className="dropdown">
                        <option value="">Select City</option>
                        {citiesByCounty[selectedCounty].map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                )}
                <button onClick={getUserLocation} className="location-button">
                    Use My Location
                </button>
            </div>

            <div className="content-container">
                <div className="sidebar">
                    <h3>Recycling Facilities</h3>
                    {filteredFacilities.map((facility) => {
                        const distance = userLocation
                            ? calculateDistance(userLocation[0], userLocation[1], facility.latitude, facility.longitude).toFixed(2)
                            : null;
                        return (
                            <div
                                key={facility.id}
                                className={`facility-card ${
                                    selectedFacilityId === facility.id ? 'selected' : ''
                                }`}
                                onMouseEnter={() => setHoveredSidebarId(facility.id)}
                                onMouseLeave={() => setHoveredSidebarId(null)}
                                onClick={() => handleSidebarClick(facility)} // Fly to the clicked facility
                            >
                                <h4>{facility.name}</h4>
                                <p>{facility.address}</p>
                                <p>{facility.description}</p>
                                {distance && <p>Distance: {distance} km</p>}
                                <a href={facility.website} target="_blank" rel="noopener noreferrer" className="facility-link">
                                    Visit Website
                                </a>
                                <a
                                    href={facility.directions}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="facility-link"
                                >
                                    Find on Google Maps
                                </a>
                            </div>
                        );
                    })}
                </div>

                <MapContainer center={[47.6567, -122.3166]} zoom={13} className="map" 
                whenCreated={(mapInstance) => (mapRef.current = mapInstance)} >
                    <TileLayer
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {userLocation && <LocateUser location={userLocation} />}
                    {filteredFacilities.map((facility) => (
                        <Marker
                            key={facility.id}
                            position={[facility.latitude, facility.longitude]}
                            icon={facilityIcon}
                            eventHandlers={{
                                mouseover: () => setHoveredMarkerId(facility.id),
                                mouseout: () => setHoveredMarkerId(null),
                            }}
                        >
                            {hoveredMarkerId === facility.id && (
                                <Tooltip direction="top" offset={[0, -10]} opacity={1} interactive permanent>
                                    <div>
                                        <strong>{facility.name}</strong>
                                        <br />
                                        {facility.address}
                                        <br />
                                        {facility.description}
                                    </div>
                                </Tooltip>
                            )}
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapComponent;
