import React, { useState, useEffect } from "react";
import { FaHospital, FaShieldAlt, FaMoneyCheckAlt } from "react-icons/fa"; // Icons from FontAwesome
import "./Emergensy.css"; // External CSS for better styling

function Emergensy() {
  const [location, setLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("hospital");

  // Get user's current location using the Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => alert("Could not retrieve location")
      );
    }
  }, []);

  // Google Maps URL for embedding
  const getGoogleMapURL = (place) => {
    if (!location) return "";

    // Construct URL for searching nearby locations using Google Maps
    const { latitude, longitude } = location;
    const searchQuery = `${place} near ${latitude},${longitude}`;
    return `https://www.google.com/maps/embed/v1/search?q=${encodeURIComponent(
      searchQuery
    )}&key=AIzaSyDniv3C2EWJaHMl3TJlGnVm4XzPsX5ht8c`; // Replace with your Google Maps API key
  };

  // Handle button click to select a place
  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  return (
    <div className="emergency-container">
      <h1 className="heading">Find Emergency Locations Near You</h1>

      {/* Buttons for selecting places */}
      <div className="place-buttons">
        <button
          className={`place-button ${
            selectedPlace === "hospital" ? "active" : ""
          }`}
          onClick={() => handlePlaceClick("hospital")}
        >
          <FaHospital size={24} />
          <span>Hospital</span>
        </button>
        <button
          className={`place-button ${
            selectedPlace === "police station" ? "active" : ""
          }`}
          onClick={() => handlePlaceClick("police station")}
        >
          <FaShieldAlt size={24} />
          <span>Police</span>
        </button>
        <button
          className={`place-button ${selectedPlace === "ATM" ? "active" : ""}`}
          onClick={() => handlePlaceClick("ATM")}
        >
          <FaMoneyCheckAlt size={24} />
          <span>ATM</span>
        </button>
      </div>

      {/* Dynamic Content */}
      <div className="place-info">
        <h2 className="place-title">{selectedPlace.toUpperCase()}</h2>
        <p>{selectedPlace} nearby your location.</p>
      </div>

      {/* Embed Google Map with location */}
      {location ? (
        <iframe
          title="Google Map"
          width="100%"
          height="400"
          frameBorder="0"
          className="map-frame"
          style={{ border: "0", borderRadius: "10px" }}
          src={getGoogleMapURL(selectedPlace)}
          allowFullScreen
        ></iframe>
      ) : (
        <p className="loading-text">Fetching your location...</p>
      )}
    </div>
  );
}

export default Emergensy;
