const express = require('express');
const { body } = require('express-validator');
const Game = require('../models/Game');

const router = express.Router();

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games' });
  }
});

// Get game by ID
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game' });
  }
});

// Create new game
router.post('/', [
  body('name').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('type').isIn(['spelling', 'population', 'area', 'guess-country', 'wordle']),
  body('difficulty').isIn(['easy', 'medium', 'hard']),
  body('settings').isObject(),
  body('content').isObject()
], async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error creating game' });
  }
});

// Update game
router.put('/:id', [
  body('name').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty(),
  body('type').optional().isIn(['spelling', 'population', 'area', 'guess-country', 'wordle']),
  body('difficulty').optional().isIn(['easy', 'medium', 'hard']),
  body('settings').optional().isObject(),
  body('content').optional().isObject(),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error updating game' });
  }
});

// Delete game
router.delete('/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting game' });
  }
});

// Update game statistics
router.post('/:id/stats', [
  body('score').isNumeric(),
  body('completed').isBoolean()
], async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    const { score, completed } = req.body;
    game.statistics.totalPlays += 1;
    
    if (completed) {
      const currentAvg = game.statistics.averageScore;
      const totalPlays = game.statistics.totalPlays;
      game.statistics.averageScore = (currentAvg * (totalPlays - 1) + score) / totalPlays;
      game.statistics.completionRate = (game.statistics.completionRate * (totalPlays - 1) + 1) / totalPlays;
    }

    await game.save();
    res.json(game.statistics);
  } catch (error) {
    res.status(500).json({ message: 'Error updating game statistics' });
  }
});

module.exports = router; 