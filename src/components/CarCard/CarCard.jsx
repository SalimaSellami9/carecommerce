import React from 'react';
import { Link } from 'react-router-dom';
import { FaRoad, FaGasPump, FaCog, FaCalendar } from 'react-icons/fa';
import './CarCard.css';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <div className="car-image">
        <img src={car.image} alt={`${car.brand} ${car.model}`} />
        <div className="car-badge">{car.condition}</div>
      </div>
      
      <div className="car-info">
        <h3 className="car-title">
          {car.brand} {car.model}
        </h3>
        
        <div className="car-price">
          {car.price.toLocaleString()} TND
        </div>
        
        <div className="car-specs">
          <div className="spec-item">
            <FaCalendar />
            <span>{car.year}</span>
          </div>
          <div className="spec-item">
            <FaRoad />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="spec-item">
            <FaGasPump />
            <span>{car.fuel}</span>
          </div>
          <div className="spec-item">
            <FaCog />
            <span>{car.transmission}</span>
          </div>
        </div>
        
        <Link to={`/car/${car.id}`} className="btn-details">
          Voir détails
        </Link>
      </div>
    </div>
  );
};

export default CarCard;