const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Veuillez fournir une marque'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Veuillez fournir un modèle'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Veuillez fournir l\'année']
  },
  price: {
    type: Number,
    required: [true, 'Veuillez fournir le prix']
  },
  mileage: {
    type: Number,
    required: [true, 'Veuillez fournir le kilométrage'],
    default: 0
  },
  fuel: {
    type: String,
    required: [true, 'Veuillez spécifier le type de carburant'],
    enum: ['Essence', 'Diesel', 'Hybride', 'Électrique', 'GPL']
  },
  transmission: {
    type: String,
    required: [true, 'Veuillez spécifier le type de transmission'],
    enum: ['Manuelle', 'Automatique']
  },
  condition: {
    type: String,
    required: [true, 'Veuillez spécifier l\'état du véhicule'],
    enum: ['neuf', 'occasion'],
    default: 'occasion'
  },
  color: {
    type: String,
    required: [true, 'Veuillez spécifier la couleur']
  },
  doors: {
    type: Number,
    default: 4
  },
  seats: {
    type: Number,
    default: 5
  },
  power: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'Veuillez fournir une description']
  },
  features: [{
    type: String
  }],
  images: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['Berline', 'SUV', 'Sport', 'Utilitaire', 'Citadine', 'Familiale'],
    default: 'Berline'
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    city: String,
    address: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }
  },
  status: {
    type: String,
    enum: ['disponible', 'vendu', 'réservé'],
    default: 'disponible'
  },
  views: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search
carSchema.index({ brand: 'text', model: 'text', description: 'text' });
carSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Car', carSchema);