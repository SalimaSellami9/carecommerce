import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../../components/CarCard/CarCard';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import Pagination from '../../components/Pagination/Pagination';
import './CarListing.css';

const CarListing = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('recent');
  const carsPerPage = 12;

  // Données de démo étendues
  const demoCars = Array.from({length: 30}, (_, i) => ({
    id: i + 1,
    brand: ['Mercedes-Benz', 'BMW', 'Audi', 'Toyota', 'Volkswagen'][i % 5],
    model: ['Classe C', 'Serie 3', 'A4', 'Corolla', 'Golf'][i % 5],
    year: 2020 + (i % 4),
    price: 40000 + (i * 2000),
    mileage: i % 2 === 0 ? 0 : 10000 + (i * 1000),
    fuel: i % 2 === 0 ? 'Diesel' : 'Essence',
    transmission: i % 3 === 0 ? 'Manuelle' : 'Automatique',
    image: `https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80`,
    condition: i % 2 === 0 ? 'neuf' : 'occasion'
  }));

  useEffect(() => {
    setCars(demoCars);
    applyFilters(demoCars);
  }, [searchParams]);

  const applyFilters = (carsData) => {
    let filtered = [...carsData];

    // Appliquer les filtres depuis les paramètres URL
    const brand = searchParams.get('brand');
    const condition = searchParams.get('condition');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');

    if (brand) {
      filtered = filtered.filter(car => car.brand === brand);
    }

    if (condition) {
      filtered = filtered.filter(car => car.condition === condition);
    }

    if (priceMin) {
      filtered = filtered.filter(car => car.price >= parseInt(priceMin));
    }

    if (priceMax) {
      filtered = filtered.filter(car => car.price <= parseInt(priceMax));
    }

    // Tri
    switch(sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'year':
        filtered.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }

    setFilteredCars(filtered);
  };

  useEffect(() => {
    applyFilters(cars);
  }, [sortBy]);

  // Pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div className="car-listing">
      <div className="container">
        <div className="listing-header">
          <h1>Véhicules disponibles</h1>
          <p>{filteredCars.length} véhicule(s) trouvé(s)</p>
        </div>

        <div className="listing-container">
          <FilterSidebar onFilterChange={applyFilters} />
          
          <div className="listing-main">
            <div className="listing-toolbar">
              <div className="sort-options">
                <label>Trier par:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="recent">Plus récent</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="year">Année</option>
                </select>
              </div>
            </div>

            <div className="cars-grid">
              {currentCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalItems={filteredCars.length}
              itemsPerPage={carsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListing;