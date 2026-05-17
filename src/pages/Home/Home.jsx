import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SearchBar from '../../components/SearchBar/SearchBar';
import CarCard from '../../components/CarCard/CarCard';
import './Home.css';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);

  // Données de démo
  const heroSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200',
      title: 'Trouvez votre voiture idéale',
      subtitle: 'Large sélection de véhicules neufs et d\'occasion'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200',
      title: 'Les meilleures offres',
      subtitle: 'Prix compétitifs et financement disponible'
    }
  ];

  const demoCars = [
    {
      id: 1,
      brand: 'Mercedes-Benz',
      model: 'Classe C',
      year: 2023,
      price: 85000,
      mileage: 0,
      fuel: 'Diesel',
      transmission: 'Automatique',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500',
      condition: 'neuf'
    },
    {
      id: 2,
      brand: 'BMW',
      model: 'Serie 3',
      year: 2022,
      price: 72000,
      mileage: 15000,
      fuel: 'Essence',
      transmission: 'Automatique',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
      condition: 'occasion'
    },
    {
      id: 3,
      brand: 'Audi',
      model: 'A4',
      year: 2023,
      price: 78000,
      mileage: 0,
      fuel: 'Diesel',
      transmission: 'Automatique',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500',
      condition: 'neuf'
    },
    {
      id: 4,
      brand: 'Toyota',
      model: 'Corolla',
      year: 2022,
      price: 45000,
      mileage: 20000,
      fuel: 'Essence',
      transmission: 'Manuelle',
      image: 'https://images.unsplash.com/photo-1623869675781-80aa3a537dbc?w=500',
      condition: 'occasion'
    }
  ];

  useEffect(() => {
    setFeaturedCars(demoCars);
  }, []);

  return (
    <div className="home">
      {/* Hero Slider */}
      <section className="hero-section">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation
          className="hero-slider"
        >
          {heroSlides.map(slide => (
            <SwiperSlide key={slide.id}>
              <div className="hero-slide" style={{ backgroundImage: `url(${slide.image})` }}>
                <div className="hero-overlay">
                  <div className="container">
                    <div className="hero-content">
                      <h1>{slide.title}</h1>
                      <p>{slide.subtitle}</p>
                      <Link to="/cars" className="btn-primary">
                        Voir les véhicules
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Search Bar */}
        <div className="search-container">
          <div className="container">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Véhicules en vedette</h2>
            <Link to="/cars" className="view-all">Voir tout</Link>
          </div>
          
          <div className="cars-grid">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2>Rechercher par catégorie</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">🚗</div>
              <h3>Berlines</h3>
              <p>150+ véhicules</p>
            </div>
            <div className="category-card">
              <div className="category-icon">🚙</div>
              <h3>SUV</h3>
              <p>120+ véhicules</p>
            </div>
            <div className="category-card">
              <div className="category-icon">🏎️</div>
              <h3>Sport</h3>
              <p>45+ véhicules</p>
            </div>
            <div className="category-card">
              <div className="category-icon">🚐</div>
              <h3>Utilitaires</h3>
              <p>80+ véhicules</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="container">
          <h2>Pourquoi nous choisir?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Garantie qualité</h3>
              <p>Tous nos véhicules sont inspectés</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Meilleurs prix</h3>
              <p>Prix compétitifs garantis</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Service après-vente</h3>
              <p>Support et maintenance</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>Financement</h3>
              <p>Solutions de financement flexibles</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;