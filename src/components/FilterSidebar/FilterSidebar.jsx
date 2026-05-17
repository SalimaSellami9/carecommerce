import React, { useState } from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 200000],
    years: [],
    fuel: [],
    transmission: []
  });

  const brands = ['Mercedes-Benz', 'BMW', 'Audi', 'Toyota', 'Volkswagen', 'Peugeot'];
  const fuelTypes = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
  const transmissions = ['Manuelle', 'Automatique'];

  const handleBrandChange = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    setFilters({...filters, brands: newBrands});
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3>Filtres</h3>
        <button className="btn-reset">Réinitialiser</button>
      </div>

      {/* Marques */}
      <div className="filter-section">
        <h4>Marque</h4>
        {brands.map(brand => (
          <label key={brand} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      {/* Prix */}
      <div className="filter-section">
        <h4>Prix</h4>
        <div className="price-inputs">
          <input type="number" placeholder="Min" />
          <span>-</span>
          <input type="number" placeholder="Max" />
        </div>
      </div>

      {/* Carburant */}
      <div className="filter-section">
        <h4>Carburant</h4>
        {fuelTypes.map(fuel => (
          <label key={fuel} className="checkbox-label">
            <input type="checkbox" />
            <span>{fuel}</span>
          </label>
        ))}
      </div>

      {/* Transmission */}
      <div className="filter-section">
        <h4>Transmission</h4>
        {transmissions.map(trans => (
          <label key={trans} className="checkbox-label">
            <input type="checkbox" />
            <span>{trans}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;