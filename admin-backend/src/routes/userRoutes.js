const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validateRequest } = require('../middleware/validateRequest');
const { auth } = require('../middleware/auth');

// Import controllers
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserPosts,
  getUserStats
} = require('../controllers/userController');

// Validation middleware
const userValidation = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('isMiniAdmin').isBoolean().withMessage('isMiniAdmin must be a boolean')
];

const idValidation = [
  param('id').isMongoId().withMessage('Invalid user ID')
];

// Routes
router.get('/', auth, getUsers);
router.get('/:id', auth, idValidation, validateRequest, getUserById);
router.post('/', auth, userValidation, validateRequest, createUser);
router.put('/:id', auth, [...idValidation, ...userValidation], validateRequest, updateUser);
router.delete('/:id', auth, idValidation, validateRequest, deleteUser);

// Additional routes
router.get('/:id/posts', auth, idValidation, validateRequest, getUserPosts);
router.get('/:id/stats', auth, idValidation, validateRequest, getUserStats);

module.exports = router; 