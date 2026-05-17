import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { 
  FaRoad, FaGasPump, FaCog, FaCalendar, FaPalette, 
  FaDoorOpen, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaCheckCircle, FaHeart
} from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Simuler le chargement des données
    const carData = {
      id: id,
      brand: 'Mercedes-Benz',
      model: 'Classe C 220d',
      year: 2023,
      price: 85000,
      mileage: 0,
      fuel: 'Diesel',
      transmission: 'Automatique',
      condition: 'neuf',
      color: 'Noir métallisé',
      doors: 4,
      seats: 5,
      power: '194 ch',
      images: [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
        'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
        'https://images.unsplash.com/photo-1617531653520-bd466cc2b8a8?w=800',
        'https://images.unsplash.com/photo-1617531653520-bd466cc2b831?w=800'
      ],
      description: 'Mercedes-Benz Classe C en parfait état. Véhicule neuf avec garantie constructeur complète. Equipements haut de gamme, intérieur cuir, système de navigation, aide au stationnement, régulateur de vitesse adaptatif.',
      features: [
        'Climatisation automatique',
        'Sièges en cuir',
        'Navigation GPS',
        'Caméra de recul',
        'Régulateur de vitesse adaptatif',
        'Système audio premium',
        'Phares LED',
        'Jantes alliage 18"',
        'Toit ouvrant panoramique',
        'Détection angles morts',
        'Freinage automatique d\'urgence',
        'Apple CarPlay / Android Auto'
      ],
      seller: {
        name: 'AutoMobile Premium',
        phone: '+216 XX XXX XXX',
        email: 'contact@automobile.tn',
        location: 'Tunis, Tunisie'
      }
    };

    setCar(carData);
  }, [id]);

  if (!car) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="car-details">
      <div className="container">
        <div className="details-grid">
          {/* Galerie d'images */}
          <div className="gallery-section">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="main-slider"
            >
              {car.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`${car.brand} ${car.model}`} />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="thumbs-slider"
            >
              {car.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Informations principales */}
          <div className="info-section">
            <div className="info-card">
              <div className="car-header">
                <div>
                  <span className="badge">{car.condition}</span>
                  <h1>{car.brand} {car.model}</h1>
                </div>
                <button className="btn-favorite">
                  <FaHeart />
                </button>
              </div>

              <div className="price-section">
                <div className="price">{car.price.toLocaleString()} TND</div>
                <div className="price-note">Prix négociable</div>
              </div>

              <div className="specs-grid">
                <div className="spec-box">
                  <FaCalendar className="spec-icon" />
                  <div>
                    <div className="spec-label">Année</div>
                    <div className="spec-value">{car.year}</div>
                  </div>
                </div>

                <div className="spec-box">
                  <FaRoad className="spec-icon" />
                  <div>
                    <div className="spec-label">Kilométrage</div>
                    <div className="spec-value">{car.mileage.toLocaleString()} km</div>
                  </div>
                </div>

                <div className="spec-box">
                  <FaGasPump className="spec-icon" />
                  <div>
                    <div className="spec-label">Carburant</div>
                    <div className="spec-value">{car.fuel}</div>
                  </div>
                </div>

                <div className="spec-box">
                  <FaCog className="spec-icon" />
                  <div>
                    <div className="spec-label">Transmission</div>
                    <div className="spec-value">{car.transmission}</div>
                  </div>
                </div>

                <div className="spec-box">
                  <FaPalette className="spec-icon" />
                  <div>
                    <div className="spec-label">Couleur</div>
                    <div className="spec-value">{car.color}</div>
                  </div>
                </div>

                <div className="spec-box">
                  <FaDoorOpen className="spec-icon" />
                  <div>
                    <div className="spec-label">Portes</div>
                    <div className="spec-value">{car.doors}</div>
                  </div>
                </div>
              </div>

              {/* Contact du vendeur */}
              <div className="seller-card">
                <h3>Contacter le vendeur</h3>
                <div className="seller-info">
                  <div className="seller-name">{car.seller.name}</div>
                  <div className="seller-detail">
                    <FaMapMarkerAlt /> {car.seller.location}
                  </div>
                </div>
                
                <div className="contact-buttons">
                  <a href={`tel:${car.seller.phone}`} className="btn-contact primary">
                    <FaPhone /> Appeler
                  </a>
                  <a href={`mailto:${car.seller.email}`} className="btn-contact secondary">
                    <FaEnvelope /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description et équipements */}
        <div className="details-content">
          <div className="content-section">
            <h2>Description</h2>
            <p>{car.description}</p>
          </div>

          <div className="content-section">
            <h2>Équipements et options</h2>
            <div className="features-grid">
              {car.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <FaCheckCircle className="check-icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="content-section">
            <h2>Caractéristiques techniques</h2>
            <div className="tech-specs">
              <div className="tech-item">
                <span className="tech-label">Puissance:</span>
                <span className="tech-value">{car.power}</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">Nombre de places:</span>
                <span className="tech-value">{car.seats}</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">Année de mise en circulation:</span>
                <span className="tech-value">{car.year}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="contact-form-section">
          <h2>Demander plus d'informations</h2>
          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <input type="text" placeholder="Nom complet" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" required />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <input type="tel" placeholder="Téléphone" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Ville" />
              </div>
            </div>

            <div className="form-group">
              <textarea 
                placeholder="Votre message..." 
                rows="5"
                defaultValue={`Je suis intéressé par ${car.brand} ${car.model}`}
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">
              Envoyer la demande
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;