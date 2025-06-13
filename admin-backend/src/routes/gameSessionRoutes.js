const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { validateRequest } = require('../middleware/validateRequest');
const { auth } = require('../middleware/auth');

// Import controllers
const {
  getGameSessions,
  getGameSessionById,
  createGameSession,
  updateGameSession,
  deleteGameSession,
  getGameSessionsByPlayer,
  getGameSessionsByType,
  getGameSessionsByDifficulty,
  getGameSessionsByCountry
} = require('../controllers/gameSessionController');

// Validation middleware
const gameSessionValidation = [
  body('playerId').isMongoId().withMessage('Invalid player ID'),
  body('playerUsername').trim().notEmpty().withMessage('Player username is required'),
  body('gameType').isIn(['quiz', 'exploration', 'challenge', 'tournament']).withMessage('Invalid game type'),
  body('gameName').trim().notEmpty().withMessage('Game name is required'),
  body('score').isInt({ min: 0 }).withMessage('Score must be a positive number'),
  body('duration').isInt({ min: 0 }).withMessage('Duration must be a positive number'),
  body('difficulty').isIn(['easy', 'medium', 'hard', 'expert']).withMessage('Invalid difficulty level')
];

const idValidation = [
  param('id').isMongoId().withMessage('Invalid game session ID')
];

// Routes
router.get('/', auth, getGameSessions);
router.get('/:id', auth, idValidation, validateRequest, getGameSessionById);
router.post('/', auth, gameSessionValidation, validateRequest, createGameSession);
router.put('/:id', auth, [...idValidation, ...gameSessionValidation], validateRequest, updateGameSession);
router.delete('/:id', auth, idValidation, validateRequest, deleteGameSession);

// Additional routes
router.get('/player/:playerId', auth, getGameSessionsByPlayer);
router.get('/type/:type', auth, getGameSessionsByType);
router.get('/difficulty/:difficulty', auth, getGameSessionsByDifficulty);
router.get('/country/:country', auth, getGameSessionsByCountry);

module.exports = router; 