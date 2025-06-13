const Achievement = require('../models/Achievement');
const User = require('../models/User');

// Get all achievements
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get achievement by ID
exports.getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new achievement
exports.createAchievement = async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    const savedAchievement = await achievement.save();
    res.status(201).json(savedAchievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update achievement
exports.updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    
    res.json(achievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete achievement
exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    
    // Remove achievement from all users who have it
    await User.updateMany(
      { achievements: req.params.id },
      { $pull: { achievements: req.params.id } }
    );
    
    await achievement.deleteOne();
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get achievements by level
exports.getAchievementsByLevel = async (req, res) => {
  try {
    const achievements = await Achievement.find({ level: req.params.level });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get achievements by user
exports.getAchievementsByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('achievements');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 