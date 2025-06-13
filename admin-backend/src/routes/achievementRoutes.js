const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validateRequest } = require('../middleware/validateRequest');
const { auth } = require('../middleware/auth');

// Import controllers
const {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getAchievementsByLevel,
  getAchievementsByUser
} = require('../controllers/achievementController');

// Validation middleware
const achievementValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('icon').trim().notEmpty().withMessage('Icon is required'),
  body('color').trim().notEmpty().withMessage('Color is required'),
  body('level').isIn(['beginner', 'intermediate', 'advanced', 'expert']).withMessage('Invalid achievement level'),
  body('points').isInt({ min: 0 }).withMessage('Points must be a positive number'),
  body('requirements').trim().notEmpty().withMessage('Requirements are required')
];

const idValidation = [
  param('id').isMongoId().withMessage('Invalid achievement ID')
];

// Routes
router.get('/', auth, getAchievements);
router.get('/:id', auth, idValidation, validateRequest, getAchievementById);
router.post('/', auth, achievementValidation, validateRequest, createAchievement);
router.put('/:id', auth, [...idValidation, ...achievementValidation], validateRequest, updateAchievement);
router.delete('/:id', auth, idValidation, validateRequest, deleteAchievement);

// Additional routes
router.get('/level/:level', auth, getAchievementsByLevel);
router.get('/user/:userId', auth, getAchievementsByUser);

module.exports = router; 