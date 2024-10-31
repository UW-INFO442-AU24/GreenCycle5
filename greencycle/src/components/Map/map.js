import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
    //this is a dictionary that will store your lat/long coordinates and the supplementary text
    const locations = [
        { coords: [47.6567, -122.3066], description: "This is a special location!" },
        { coords: [47.6588, -122.3087], description: "Another interesting place here." },
        { coords: [47.6549, -122.3045], description: "Yet another point of interest." }
    ];
    return (
        //Here, you can specify what the map will look like (zoom, limits on edges, height, etc.
         <MapContainer center={[47.6567, -122.3066]} zoom={13} style={{ height: "50vh", width: "70%" }}>
             <TileLayer
                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
     //JS function to map locations to the actual map.
             {locations.map((location, index) => (
       //Marker/ Popup represents the pins that will appear on the map.
                 <Marker key={index} position={location.coords}>
                     <Popup>{location.description}</Popup>
                 </Marker>
             ))}
         </MapContainer>
     );
 };
 
 export default MapComponent; 