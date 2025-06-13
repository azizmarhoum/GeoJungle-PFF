const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  playerUsername: {
    type: String,
    required: true
  },
  gameType: {
    type: String,
    enum: ['quiz', 'exploration', 'challenge', 'tournament'],
    required: true
  },
  gameName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'expert'],
    required: true
  },
  country: {
    type: String
  },
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  badges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  }]
}, {
  timestamps: true
});

// Index for better query performance
gameSessionSchema.index({ playerId: 1, completedAt: -1 });
gameSessionSchema.index({ gameType: 1, difficulty: 1 });

module.exports = mongoose.model('GameSession', gameSessionSchema); 