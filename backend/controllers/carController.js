const Car = require('../models/Car');

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
exports.getCars = async (req, res) => {
  try {
    let query = {};

    // Filter by brand
    if (req.query.brand) {
      query.brand = req.query.brand;
    }

    // Filter by condition
    if (req.query.condition) {
      query.condition = req.query.condition;
    }

    // Filter by price range
    if (req.query.priceMin || req.query.priceMax) {
      query.price = {};
      if (req.query.priceMin) {
        query.price.$gte = parseInt(req.query.priceMin);
      }
      if (req.query.priceMax) {
        query.price.$lte = parseInt(req.query.priceMax);
      }
    }

    // Filter by year
    if (req.query.year) {
      query.year = parseInt(req.query.year);
    }

    // Filter by fuel type
    if (req.query.fuel) {
      query.fuel = req.query.fuel;
    }

    // Filter by transmission
    if (req.query.transmission) {
      query.transmission = req.query.transmission;
    }

    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;

    // Sort
    let sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      sort = { createdAt: -1 };
    }

    const total = await Car.countDocuments(query);
    const cars = await Car.find(query)
      .populate('seller', 'name email phone')
      .sort(sort)
      .limit(limit)
      .skip(startIndex);

    res.status(200).json({
      success: true,
      count: cars.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: cars
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get single car
// @route   GET /api/cars/:id
// @access  Public
exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('seller', 'name email phone');

    if (!car) {
      return res.status(404).json({ 
        success: false, 
        message: 'Véhicule non trouvé' 
      });
    }

    // Increment views
    car.views += 1;
    await car.save();

    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Create car
// @route   POST /api/cars
// @access  Private
exports.createCar = async (req, res) => {
  try {
    // Add seller to req.body
    req.body.seller = req.user.id;

    // Handle uploaded images
    if (req.files) {
      req.body.images = req.files.map(file => file.path);
    }

    const car = await Car.create(req.body);

    res.status(201).json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Update car
// @route   PUT /api/cars/:id
// @access  Private
exports.updateCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ 
        success: false, 
        message: 'Véhicule non trouvé' 
      });
    }

    // Check ownership
    if (car.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Non autorisé' 
      });
    }

    car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ 
        success: false, 
        message: 'Véhicule non trouvé' 
      });
    }

    // Check ownership
    if (car.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Non autorisé' 
      });
    }

    await car.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get featured cars
// @route   GET /api/cars/featured
// @access  Public
exports.getFeaturedCars = async (req, res) => {
  try {
    const cars = await Car.find({ isFeatured: true })
      .populate('seller', 'name email phone')
      .limit(8)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};