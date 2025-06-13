const GameSession = require('../models/GameSession');
const User = require('../models/User');

// Get all game sessions
exports.getGameSessions = async (req, res) => {
  try {
    const gameSessions = await GameSession.find()
      .sort({ completedAt: -1 });
    res.json(gameSessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get game session by ID
exports.getGameSessionById = async (req, res) => {
  try {
    const gameSession = await GameSession.findById(req.params.id)
      .populate('achievements')
      .populate('badges');
    
    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }
    
    res.json(gameSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new game session
exports.createGameSession = async (req, res) => {
  try {
    const gameSession = new GameSession(req.body);
    const savedGameSession = await gameSession.save();
    
    // Update user's score
    await User.findByIdAndUpdate(req.body.playerId, {
      $inc: { score: req.body.score }
    });
    
    res.status(201).json(savedGameSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update game session
exports.updateGameSession = async (req, res) => {
  try {
    const gameSession = await GameSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }
    
    res.json(gameSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete game session
exports.deleteGameSession = async (req, res) => {
  try {
    const gameSession = await GameSession.findById(req.params.id);
    
    if (!gameSession) {
      return res.status(404).json({ message: 'Game session not found' });
    }
    
    // Update user's score
    await User.findByIdAndUpdate(gameSession.playerId, {
      $inc: { score: -gameSession.score }
    });
    
    await gameSession.deleteOne();
    res.json({ message: 'Game session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get game sessions by player
exports.getGameSessionsByPlayer = async (req, res) => {
  try {
    const gameSessions = await GameSession.find({ playerId: req.params.playerId })
      .sort({ completedAt: -1 });
    res.json(gameSessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get game sessions by type
exports.getGameSessionsByType = async (req, res) => {
  try {
    const gameSessions = await GameSession.find({ gameType: req.params.type })
      .sort({ completedAt: -1 });
    res.json(gameSessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get game sessions by difficulty
exports.getGameSessionsByDifficulty = async (req, res) => {
  try {
    const gameSessions = await GameSession.find({ difficulty: req.params.difficulty })
      .sort({ completedAt: -1 });
    res.json(gameSessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get game sessions by country
exports.getGameSessionsByCountry = async (req, res) => {
  try {
    const gameSessions = await GameSession.find({ country: req.params.country })
      .sort({ completedAt: -1 });
    res.json(gameSessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 