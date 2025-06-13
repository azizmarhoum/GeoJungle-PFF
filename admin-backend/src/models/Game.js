const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['spelling', 'population', 'area', 'guess-country', 'wordle'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  settings: {
    timeLimit: Number,
    maxAttempts: Number,
    pointsPerQuestion: Number,
    requiredScore: Number
  },
  content: {
    questions: [{
      question: String,
      correctAnswer: String,
      options: [String],
      points: Number
    }],
    categories: [String],
    difficultyLevels: [String]
  },
  statistics: {
    totalPlays: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game; 