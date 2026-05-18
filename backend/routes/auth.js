const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// @desc    Create contact request
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, city, message, car } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      city,
      message,
      car
    });

    // Send email notification (optional)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Nouvelle demande de contact',
        html: `
          <h3>Nouvelle demande de contact</h3>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone}</p>
          <p><strong>Ville:</strong> ${city || 'Non spécifiée'}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      });
    } catch (emailError) {
      console.log('Erreur envoi email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Votre message a été envoyé avec succès',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private/Admin
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate('car', 'brand model year')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private/Admin
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('car', 'brand model year price');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin
exports.updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact non trouvé'
      });
    }

    await contact.deleteOne();

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