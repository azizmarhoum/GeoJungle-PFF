const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validateRequest } = require('../middleware/validateRequest');
const { auth } = require('../middleware/auth');

// Import controllers
const {
  getBadges,
  getBadgeById,
  createBadge,
  updateBadge,
  deleteBadge,
  getBadgesByLevel,
  getBadgesByUser
} = require('../controllers/badgeController');

// Validation middleware
const badgeValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('icon').trim().notEmpty().withMessage('Icon is required'),
  body('color').trim().notEmpty().withMessage('Color is required'),
  body('level').isIn(['bronze', 'silver', 'gold', 'platinum']).withMessage('Invalid badge level'),
  body('requirements').trim().notEmpty().withMessage('Requirements are required')
];

const idValidation = [
  param('id').isMongoId().withMessage('Invalid badge ID')
];

// Routes
router.get('/', auth, getBadges);
router.get('/:id', auth, idValidation, validateRequest, getBadgeById);
router.post('/', auth, badgeValidation, validateRequest, createBadge);
router.put('/:id', auth, [...idValidation, ...badgeValidation], validateRequest, updateBadge);
router.delete('/:id', auth, idValidation, validateRequest, deleteBadge);

// Additional routes
router.get('/level/:level', auth, getBadgesByLevel);
router.get('/user/:userId', auth, getBadgesByUser);

module.exports = router; 