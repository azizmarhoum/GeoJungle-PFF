const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// Get all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific achievement by ID
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ message: 'Achievement not found' });
    res.json(achievement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new achievement
router.post('/', async (req, res) => {
  const achievement = new Achievement(req.body);
  try {
    const newAchievement = await achievement.save();
    res.status(201).json(newAchievement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an achievement
router.patch('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ message: 'Achievement not found' });
    Object.assign(achievement, req.body);
    const updatedAchievement = await achievement.save();
    res.json(updatedAchievement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an achievement
router.delete('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ message: 'Achievement not found' });
    await achievement.remove();
    res.json({ message: 'Achievement deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 