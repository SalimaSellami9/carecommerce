const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Car = require('./models/Car');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  {
    name: 'Admin User',
    email: 'admin@automobile.tn',
    password: 'admin123',
    phone: '+216 12 345 678',
    role: 'admin'
  },
  {
    name: 'Vendeur Test',
    email: 'vendeur@automobile.tn',
    password: 'vendeur123',
    phone: '+216 98 765 432',
    role: 'seller'
  }
];

const cars = [
  {
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
    description: 'Mercedes-Benz Classe C en parfait état. Véhicule neuf avec garantie constructeur.',
    features: [
      'Climatisation automatique',
      'Sièges en cuir',
      'Navigation GPS',
      'Caméra de recul',
      'Régulateur de vitesse'
    ],
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800'
    ],
    category: 'Berline',
    location: {
      city: 'Tunis',
      address: 'Avenue Habib Bourguiba'
    },
    isFeatured: true
  },
  {
    brand: 'BMW',
    model: 'Serie 3',
    year: 2022,
    price: 72000,
    mileage: 15000,
    fuel: 'Essence',
    transmission: 'Automatique',
    condition: 'occasion',
    color: 'Blanc',
    doors: 4,
    seats: 5,
    power: '184 ch',
    description: 'BMW Serie 3 en excellent état, première main.',
    features: [
      'Toit ouvrant',
      'Jantes alliage',
      'Système audio premium',
      'Phares LED'
    ],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'
    ],
    category: 'Berline',
    location: {
      city: 'Sousse',
      address: 'Avenue Léopold Sédar Senghor'
    },
    isFeatured: true
  },
  {
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    price: 78000,
    mileage: 0,
    fuel: 'Diesel',
    transmission: 'Automatique',
    condition: 'neuf',
    color: 'Gris métallisé',
    doors: 4,
    seats: 5,
    power: '190 ch',
    description: 'Audi A4 neuve, dernière génération.',
    features: [
      'Système MMI',
      'Virtual Cockpit',
      'Aide au stationnement',
      'Sièges sport'
    ],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
    ],
    category: 'Berline',
    location: {
      city: 'Sfax',
      address: 'Avenue Hedi Chaker'
    },
    isFeatured: true
  },
  {
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
    price: 45000,
    mileage: 20000,
    fuel: 'Essence',
    transmission: 'Manuelle',
    condition: 'occasion',
    color: 'Argent',
    doors: 4,
    seats: 5,
    power: '122 ch',
    description: 'Toyota Corolla fiable et économique.',
    features: [
      'Climatisation',
      'Bluetooth',
      'Régulateur de vitesse',
      'Airbags multiples'
    ],
    images: [
      'https://images.unsplash.com/photo-1623869675781-80aa3a537dbc?w=800'
    ],
    category: 'Berline',
    location: {
      city: 'Tunis',
      address: 'Lac 2'
    },
    isFeatured: false
  }
];

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Car.deleteMany();

    // Create users
    const createdUsers = await User.create(users);
    console.log('✓ Utilisateurs créés');

    // Add seller to cars
    const adminUser = createdUsers[0];
    const carsWithSeller = cars.map(car => ({
      ...car,
      seller: adminUser._id
    }));

    // Create cars
    await Car.create(carsWithSeller);
    console.log('✓ Voitures créées');

    console.log('✓ Données importées avec succès!');
    console.log('\nComptes de test:');
    console.log('Admin: admin@automobile.tn / admin123');
    console.log('Vendeur: vendeur@automobile.tn / vendeur123');
    
    process.exit();
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Car.deleteMany();
    console.log('✓ Données supprimées');
    process.exit();
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}