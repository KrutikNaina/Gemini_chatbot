import React, { useState } from 'react';
import axios from 'axios';

const WeatherPage = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const apiKey = 'e2ab53c046bb880ea3e7951884be290e'; // Replace with your Weather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setWeatherData(null);
      setError('City not found. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeather();
    }
  };

  const getWeatherImage = (description) => {
    const lowerDescription = description.toLowerCase();
    if (lowerDescription.includes('cloud')) return '/images/cloudy.png';
    if (lowerDescription.includes('rain')) return '/images/rainy.png';
    if (lowerDescription.includes('clear')) return '/images/sunny.png';
    if (lowerDescription.includes('snow')) return '/images/snowy.jpg';
    return '/images/default-weather.png'; // Fallback image
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Weather Checker</h2>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city name"
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>
            Get Weather
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {weatherData && (
          <div style={styles.weatherInfo} className="fade-in">
            <h3 style={styles.cityName}>{weatherData.name}</h3>
            <img
              src={getWeatherImage(weatherData.weather[0].description)}
              alt="Weather Icon"
              style={styles.weatherImage}
            />
            <p style={styles.info}>Temperature: {weatherData.main.temp}°C</p>
            <p style={styles.info}>Weather: {weatherData.weather[0].description}</p>
            <p style={styles.info}>Humidity: {weatherData.main.humidity}%</p>
            <p style={styles.info}>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '20px',
    animation: 'fadeIn 1s ease-in-out',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '400px',
    width: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.5rem',
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: '#ff4d4f',
    textAlign: 'center',
    marginBottom: '20px',
  },
  weatherInfo: {
    textAlign: 'center',
    color: '#333',
  },
  cityName: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  info: {
    fontSize: '1rem',
    margin: '5px 0',
  },
  weatherImage: {
    width: '100px',
    height: '100px',
    margin: '10px auto',
  },
};

// Global CSS (add to your styles.css or include in a <style> tag)
const globalCSS = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in {
    animation: fadeIn 1s ease-in-out;
  }
`;
const styleTag = document.createElement('style');
styleTag.innerHTML = globalCSS;
document.head.appendChild(styleTag);

export default WeatherPage;
