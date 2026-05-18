const express = require('express');
const router = express.Router();
const {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
  getFeaturedCars
} = require('../controllers/carController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getCars);
router.get('/featured', getFeaturedCars);
router.get('/:id', getCar);

// Protected routes
router.post('/', protect, upload.array('images', 10), createCar);
router.put('/:id', protect, updateCar);
router.delete('/:id', protect, deleteCar);

module.exports = router;