import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../app.css';
import '../Map/map.css';

import L from 'leaflet';

// Leaflet default marker configuration
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icons
const userLocationIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + '/icons/your location pin.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

const facilityIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + '/icons/recycle pin.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

// Component to locate and display the user's position
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

// Component to fly to a selected facility
const FlyToFacility = ({ facility }) => {
    const map = useMap();
    useEffect(() => {
        if (facility) {
            map.flyTo([facility.latitude, facility.longitude], 13);
        }
    }, [facility, map]);

    return null; // No rendering
};

// Helper function to calculate distance between two coordinates in miles
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8; // Earth's radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in miles
};

const MapComponent = () => {
    const [facilities, setFacilities] = useState([]);
    const [filteredFacilities, setFilteredFacilities] = useState([]);
    const [selectedFacilityId, setSelectedFacilityId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [userLocation, setUserLocation] = useState(null);
    const searchInputRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1); // Start on page 1
    const [facilitiesPerPage] = useState(10); // Show 10 facilities per page
    const [materials, setMaterials] = useState([]); // List of unique materials
    const [selectedMaterials, setSelectedMaterials] = useState([]);


    // Fetch facilities data and process it
    useEffect(() => {
        fetch('/facilities.json')
            .then((response) => response.json())
            .then((data) => {
                setFacilities(data);
                setFilteredFacilities(data);

                // Extract unique materials from the dataset
                const allMaterials = new Set();
                data.forEach((facility) => {
                    facility.materials.forEach((material) => {
                        allMaterials.add(material);
                    });
                });
                setMaterials(Array.from(allMaterials).sort());
            })
            .catch((error) => console.error('Error fetching facility data:', error));
    }, []);

    // Filter facilities based on search query (name or materials)
    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = facilities.filter((facility) => {
            return (
                facility.name.toLowerCase().includes(lowerCaseQuery) ||
                facility.materials.some((material) => material.toLowerCase().includes(lowerCaseQuery))
            );
        });

        // Apply filtering for selected materials as well
        let filteredByMaterials = filtered;
        if (selectedMaterials.length > 0) {
            filteredByMaterials = filtered.filter((facility) =>
                selectedMaterials.every((mat) => facility.materials.includes(mat))
            );
        }

        setFilteredFacilities(filteredByMaterials);
    }, [searchQuery, selectedMaterials, facilities]);

    // Pagination Logic
    const indexOfLastFacility = currentPage * facilitiesPerPage;
    const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage;
    const currentFacilities = filteredFacilities.slice(indexOfFirstFacility, indexOfLastFacility);
    const rightSidebarRef = useRef(null);


    useEffect(() => {
        if (rightSidebarRef.current) {
            rightSidebarRef.current.scrollTop = 0; // Scroll the right sidebar to the top
        }
    }, [currentPage]);
    
    

    // Pagination Functions
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredFacilities.length / facilitiesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
        



    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle material filter change
    const handleMaterialFilterChange = (material) => {
        const updatedMaterials = selectedMaterials.includes(material)
            ? selectedMaterials.filter((m) => m !== material)
            : [...selectedMaterials, material];
        setSelectedMaterials(updatedMaterials);
    };

    // Handle marker click
    const handleMarkerClick = (facility) => {
        setSelectedFacilityId(facility.id);
        reorderFacilitiesByProximity(facility);
    };

    // Reorder facilities by proximity and highlight the selected facility
    const reorderFacilitiesByProximity = (clickedFacility) => {
        // Sort the facilities by distance from the clicked facility
        const sortedFacilities = [...facilities].sort((a, b) => {
            const distA = calculateDistance(
                clickedFacility.latitude,
                clickedFacility.longitude,
                a.latitude,
                a.longitude
            );
            const distB = calculateDistance(
                clickedFacility.latitude,
                clickedFacility.longitude,
                b.latitude,
                b.longitude
            );
            return distA - distB;
        });

        // Move the clicked facility to the top and set the updated list
        const updatedList = [clickedFacility, ...sortedFacilities.filter((f) => f.id !== clickedFacility.id)];
        setFilteredFacilities(updatedList);
    };



    // Locate user and sort facilities by proximity
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

    const selectedFacility = facilities.find((facility) => facility.id === selectedFacilityId);


    const [showRightSidebar, setShowRightSidebar] = useState(true);
    const [showLeftSidebar, setShowLeftSidebar] = useState(true);


    return (
        <div id="map-page" className="main-container">
            {/* Sidebar */}
            <div className="left-sidebar">
                <h3>Filter by Materials</h3>
                <div className="material-filters">
                    {materials.map((material) => (
                        <div key={material}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={material}
                                    onChange={() => handleMaterialFilterChange(material)}
                                    checked={selectedMaterials.includes(material)}
                                />
                                {material}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Sidebar: Facility List */}
            <div className="right-sidebar" ref={rightSidebarRef}>
                <h3>Recycling Facilities</h3>
                {currentFacilities.length > 0 ? (
                    currentFacilities.map((facility) => {
                        const distance = userLocation
                            ? calculateDistance(
                                  userLocation[0],
                                  userLocation[1],
                                  facility.latitude,
                                  facility.longitude
                              ).toFixed(2)
                            : null;
                        return (
                            <div
                                key={facility.id}
                                className={`facility-card ${
                                    selectedFacilityId === facility.id ? 'selected' : ''
                                }`}
                                onClick={() => setSelectedFacilityId(facility.id)}
                            >
                                <h4>{facility.name}</h4>
                                <p>{facility.address}</p>
                                <p>{facility.description}</p>
                                {distance && <p>Distance: {distance} miles</p>}
                                <p>
                                    <strong>Hours:</strong> {facility.hours}
                                </p>
                                <p>
                                    <strong>Contact:</strong> {facility.contact}
                                </p>
                                <a href={facility.website} target="_blank" rel="noopener noreferrer">
                                    Visit Website
                                </a>
                                <a href={facility.directions} target="_blank" rel="noopener noreferrer">
                                    Get Directions
                                </a>
                            </div>
                        );
                    })
                ) : (
                    <p>No facilities match your search criteria.</p>
                )}

                {/* Pagination Controls */}
                <div className="pagination-controls">
                    <button onClick={prevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage}</span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(filteredFacilities.length / facilitiesPerPage)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Map and Search */}
            <div className="content-container">
                {/* Search bar */}
                <div className="map-controls" ref={searchInputRef}>
                    <input
                        type="text"
                        placeholder="Search facilities or materials..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="search-bar"
                    />
                    <button onClick={getUserLocation} className="location-button">
                        Use My Location
                    </button>
                </div>

                {/* Map */}
                <MapContainer
                    center={[47.6567, -122.3166]}
                    zoom={13}
                    className="map"
                    whenReady={(map) => {
                        map.target.invalidateSize(); // Ensures the map adjusts to its container
                    }}
                >
                    <TileLayer
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {userLocation && <LocateUser location={userLocation} />}
                    {selectedFacility && <FlyToFacility facility={selectedFacility} />}
                    {filteredFacilities.map((facility) => (
                        <Marker
                            key={facility.id}
                            position={[facility.latitude, facility.longitude]}
                            icon={facilityIcon}
                            eventHandlers={{
                                click: () => handleMarkerClick(facility),
                            }}
                        >
                            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                                <div>{facility.name}</div>
                            </Tooltip>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapComponent;
