import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaHotel } from "react-icons/fa";
import "./HotelSearch.css"; // External CSS for styling

const HotelSearch = () => {
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");

  const fetchHotels = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setError("");
    try {
      const response = await axios.get(
        "https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?amenities=WIFI%2CPARKING&meal_plan=FREE_BREAKFAST&available_filter=SHOW_AVAILABLE_ONLY&price_min=10&payment_type=PAY_LATER%2CFREE_CANCELLATION&star_rating_ids=3%2C4%2C5&guest_rating_min=8&children_ages=4%2C0%2C15&checkin_date=2025-05-26&locale=es_AR&adults_number=1&sort_order=REVIEW&page_number=1&domain=AR&price_max=500&region_id=2872&lodging_type=HOTEL%2CHOSTEL%2CAPART_HOTEL&checkout_date=2025-05-27",
        {
          params: { query: city },
          headers: {
            "X-RapidAPI-Key": "6e4d129fd6msh7fd26c2e137196fp105b62jsn6c3f5cabfc78", // Replace with your API key
            "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
          },
        }
      );

      if (response.data.suggestions && response.data.suggestions.length > 0) {
        setHotels(response.data.suggestions[0].entities || []);
      } else {
        setError("No hotels found.");
      }
    } catch (error) {
      if (error.response) {
        setError(`Error: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        setError("No response from server.");
      } else {
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="hotel-search-container">
      <h2 className="title">Find Hotels</h2>

      {/* Input and Search Button */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchHotels} className="search-button">
          <FaSearch size={20} />
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Hotel List */}
      <div className="hotel-list">
        {hotels.length > 0 ? (
          <ul>
            {hotels.map((hotel, index) => (
              <li key={index} className="hotel-item">
                <div className="hotel-card">
                  <FaHotel size={30} className="hotel-icon" />
                  <div className="hotel-info">
                    <h3 className="hotel-name">{hotel.name}</h3>
                    <p className="hotel-address">{hotel.address.line1}</p>
                    <p className="hotel-rating">
                      Rating: {hotel.guestRating || "N/A"}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-hotels">No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default HotelSearch;
