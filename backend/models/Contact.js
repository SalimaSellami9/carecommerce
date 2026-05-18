const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Veuillez fournir votre nom'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Veuillez fournir votre email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email invalide'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Veuillez fournir votre téléphone']
  },
  city: {
    type: String
  },
  message: {
    type: String,
    required: [true, 'Veuillez fournir un message']
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  status: {
    type: String,
    enum: ['nouveau', 'en cours', 'traité'],
    default: 'nouveau'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);