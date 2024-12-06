import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img
            src="https://via.placeholder.com/150x50"
            alt="Logo"
            style={{ height: '40px' }}
          />
        </a>

        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links and Sign-In Button */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/weather">
              WeatherPage
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/emergency">
              Emergensy
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Book">
              Book
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/budget-tracker">
              Budget Tracker
              </a>
            </li>
           
          </ul>
          <NavLink to="/signin" className="btn btn-primary">
            Sign In
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
