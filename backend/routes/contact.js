const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

// Public route
router.post('/', createContact);

// Admin routes
router.get('/', protect, authorize('admin'), getContacts);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id', protect, authorize('admin'), updateContactStatus);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router;