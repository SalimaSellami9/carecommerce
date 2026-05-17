import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    brand: '',
    model: '',
    priceMin: '',
    priceMax: '',
    year: '',
    condition: ''
  });

  const brands = ['Mercedes-Benz', 'BMW', 'Audi', 'Toyota', 'Volkswagen', 'Peugeot', 'Renault'];

  const handleSearch = (e) => {
    e.preventDefault();
    const queryString = new URLSearchParams(searchParams).toString();
    navigate(`/cars?${queryString}`);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <div className="search-grid">
          <div className="search-field">
            <label>Marque</label>
            <select 
              value={searchParams.brand}
              onChange={(e) => setSearchParams({...searchParams, brand: e.target.value})}
            >
              <option value="">Toutes les marques</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="search-field">
            <label>Modèle</label>
            <input 
              type="text" 
              placeholder="Tous les modèles"
              value={searchParams.model}
              onChange={(e) => setSearchParams({...searchParams, model: e.target.value})}
            />
          </div>

          <div className="search-field">
            <label>Prix min</label>
            <input 
              type="number" 
              placeholder="0"
              value={searchParams.priceMin}
              onChange={(e) => setSearchParams({...searchParams, priceMin: e.target.value})}
            />
          </div>

          <div className="search-field">
            <label>Prix max</label>
            <input 
              type="number" 
              placeholder="Illimité"
              value={searchParams.priceMax}
              onChange={(e) => setSearchParams({...searchParams, priceMax: e.target.value})}
            />
          </div>

          <div className="search-field">
            <label>Année</label>
            <select
              value={searchParams.year}
              onChange={(e) => setSearchParams({...searchParams, year: e.target.value})}
            >
              <option value="">Toutes</option>
              {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="search-field">
            <label>État</label>
            <select
              value={searchParams.condition}
              onChange={(e) => setSearchParams({...searchParams, condition: e.target.value})}
            >
              <option value="">Tous</option>
              <option value="neuf">Neuf</option>
              <option value="occasion">Occasion</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-search">
          <FaSearch /> Rechercher
        </button>
      </form>
    </div>
  );
};

export default SearchBar;