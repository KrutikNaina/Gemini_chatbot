// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Chatbot from './Chatbot';
import Navbar from './Navbar';
import WeatherPage from './WeatherPage';
import SignInForm from './SignInForm';
import Emergensy from './Emergensy';
// import MapComponent from './MapComponent'; // Adjust the import path as needed
import HotelRecommendations from './HotelRecommendations'; // Importing the HotelRecommendations page
import TravelBudgetTracker from "./TravelBudgetTracker";



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<h1><center>AI Trip Planner 🤖 <Chatbot /></center></h1>} />
          {/* <Route path="/chatbot" element={<Chatbot />} /> */}
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/emergency" element={<Emergensy />} />
          {/* <Route path="/MapComponent" element={<MapComponent />} /> */}
          <Route path="/Book" Component={HotelRecommendations} />
          <Route path="/budget-tracker" element={<TravelBudgetTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
