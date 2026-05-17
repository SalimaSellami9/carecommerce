import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCar, FaFacebook, FaInstagram, FaTwitter, 
  FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt 
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* À propos */}
            <div className="footer-col">
              <div className="footer-logo">
                <FaCar className="logo-icon" />
                <span>AutoMobile.tn</span>
              </div>
              <p>
                Votre plateforme de confiance pour l'achat et la vente 
                de véhicules en Tunisie. Des milliers de voitures neuves 
                et d'occasion disponibles.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Facebook"><FaFacebook /></a>
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              </div>
            </div>

            {/* Liens rapides */}
            <div className="footer-col">
              <h3>Liens rapides</h3>
              <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/cars">Véhicules</Link></li>
                <li><Link to="/cars?condition=neuf">Neufs</Link></li>
                <li><Link to="/cars?condition=occasion">Occasions</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Marques populaires */}
            <div className="footer-col">
              <h3>Marques populaires</h3>
              <ul>
                <li><Link to="/cars?brand=Mercedes-Benz">Mercedes-Benz</Link></li>
                <li><Link to="/cars?brand=BMW">BMW</Link></li>
                <li><Link to="/cars?brand=Audi">Audi</Link></li>
                <li><Link to="/cars?brand=Toyota">Toyota</Link></li>
                <li><Link to="/cars?brand=Volkswagen">Volkswagen</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h3>Contactez-nous</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>Tunis, Tunisie</span>
                </div>
                <div className="contact-item">
                  <FaPhone />
                  <span>+216 XX XXX XXX</span>
                </div>
                <div className="contact-item">
                  <FaEnvelope />
                  <span>contact@automobile.tn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; 2024 AutoMobile.tn. Tous droits réservés.</p>
            <div className="footer-links">
              <Link to="/privacy">Politique de confidentialité</Link>
              <Link to="/terms">Conditions d'utilisation</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;