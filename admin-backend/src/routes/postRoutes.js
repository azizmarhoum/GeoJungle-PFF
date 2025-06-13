const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { validateRequest } = require('../middleware/validateRequest');
const { auth } = require('../middleware/auth');

// Import controllers
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByUser,
  getPostsByCountry,
  getPostsByType,
  searchPosts
} = require('../controllers/postController');

// Validation middleware
const postValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('body').trim().notEmpty().withMessage('Body is required'),
  body('postType').isIn(['fact', 'journey', 'tip', 'experience']).withMessage('Invalid post type'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('authorId').isMongoId().withMessage('Invalid author ID')
];

const idValidation = [
  param('id').isMongoId().withMessage('Invalid post ID')
];

// Routes
router.get('/', auth, getPosts);
router.get('/search', auth, searchPosts);
router.get('/:id', auth, idValidation, validateRequest, getPostById);
router.post('/', auth, postValidation, validateRequest, createPost);
router.put('/:id', auth, [...idValidation, ...postValidation], validateRequest, updatePost);
router.delete('/:id', auth, idValidation, validateRequest, deletePost);

// Additional routes
router.get('/user/:userId', auth, getPostsByUser);
router.get('/country/:country', auth, getPostsByCountry);
router.get('/type/:type', auth, getPostsByType);

module.exports = router; 