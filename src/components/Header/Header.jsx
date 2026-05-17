import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaBars, FaTimes, FaPhone, FaUser } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="header">
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <FaPhone /> +216 XX XXX XXX
            </div>
            <div className="language">
              <select>
                <option>FR</option>
                <option>AR</option>
                <option>EN</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="navbar">
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="logo">
              <FaCar className="logo-icon" />
              <span>AutoMobile.tn</span>
            </Link>

            <div className={`nav-menu ${mobileMenu ? 'active' : ''}`}>
              <Link to="/" className="nav-link" onClick={() => setMobileMenu(false)}>Accueil</Link>
              <Link to="/cars" className="nav-link" onClick={() => setMobileMenu(false)}>Véhicules</Link>
              <Link to="/cars?condition=neuf" className="nav-link" onClick={() => setMobileMenu(false)}>Neufs</Link>
              <Link to="/cars?condition=occasion" className="nav-link" onClick={() => setMobileMenu(false)}>Occasions</Link>
              <Link to="/contact" className="nav-link" onClick={() => setMobileMenu(false)}>Contact</Link>
            </div>

            <div className="nav-actions">
              <button className="btn-user">
                <FaUser />
              </button>
              <button className="btn-mobile" onClick={() => setMobileMenu(!mobileMenu)}>
                {mobileMenu ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;