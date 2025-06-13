const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validateRequest } = require('../middleware/validateRequest');
const { auth } = require('../middleware/auth');

// Import controllers
const {
  getCommunities,
  getCommunityById,
  createCommunity,
  updateCommunity,
  deleteCommunity,
  getCommunityMembers,
  getCommunityStats
} = require('../controllers/communityController');

// Validation middleware
const communityValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('adminId').isMongoId().withMessage('Invalid admin ID'),
  body('adminUsername').trim().notEmpty().withMessage('Admin username is required')
];

const idValidation = [
  param('id').isMongoId().withMessage('Invalid community ID')
];

// Routes
router.get('/', auth, getCommunities);
router.get('/:id', auth, idValidation, validateRequest, getCommunityById);
router.post('/', auth, communityValidation, validateRequest, createCommunity);
router.put('/:id', auth, [...idValidation, ...communityValidation], validateRequest, updateCommunity);
router.delete('/:id', auth, idValidation, validateRequest, deleteCommunity);

// Additional routes
router.get('/:id/members', auth, idValidation, validateRequest, getCommunityMembers);
router.get('/:id/stats', auth, idValidation, validateRequest, getCommunityStats);

module.exports = router; 