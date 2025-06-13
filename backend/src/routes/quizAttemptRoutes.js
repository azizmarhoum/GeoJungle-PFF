const express = require('express');
const router = express.Router();
const QuizAttempt = require('../models/QuizAttempt');

// Get all quiz attempts
router.get('/', async (req, res) => {
  try {
    const quizAttempts = await QuizAttempt.find();
    res.json(quizAttempts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific quiz attempt by ID
router.get('/:id', async (req, res) => {
  try {
    const quizAttempt = await QuizAttempt.findById(req.params.id);
    if (!quizAttempt) return res.status(404).json({ message: 'Quiz attempt not found' });
    res.json(quizAttempt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new quiz attempt
router.post('/', async (req, res) => {
  const quizAttempt = new QuizAttempt(req.body);
  try {
    const newQuizAttempt = await quizAttempt.save();
    res.status(201).json(newQuizAttempt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a quiz attempt
router.patch('/:id', async (req, res) => {
  try {
    const quizAttempt = await QuizAttempt.findById(req.params.id);
    if (!quizAttempt) return res.status(404).json({ message: 'Quiz attempt not found' });
    Object.assign(quizAttempt, req.body);
    const updatedQuizAttempt = await quizAttempt.save();
    res.json(updatedQuizAttempt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a quiz attempt
router.delete('/:id', async (req, res) => {
  try {
    const quizAttempt = await QuizAttempt.findById(req.params.id);
    if (!quizAttempt) return res.status(404).json({ message: 'Quiz attempt not found' });
    await quizAttempt.remove();
    res.json({ message: 'Quiz attempt deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 