import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Set up the component to show a map centered on a location
const MapComponent = () => {
  const position = [51.505, -0.09]; // Example coordinates (London)
  
  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A sample place.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
