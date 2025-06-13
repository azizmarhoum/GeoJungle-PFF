const Badge = require('../models/Badge');
const User = require('../models/User');

// Get all badges
exports.getBadges = async (req, res) => {
  try {
    const badges = await Badge.find();
    res.json(badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get badge by ID
exports.getBadgeById = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }
    
    res.json(badge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new badge
exports.createBadge = async (req, res) => {
  try {
    const badge = new Badge(req.body);
    const savedBadge = await badge.save();
    res.status(201).json(savedBadge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update badge
exports.updateBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }
    
    res.json(badge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete badge
exports.deleteBadge = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }
    
    // Remove badge from all users who have it
    await User.updateMany(
      { badges: req.params.id },
      { $pull: { badges: req.params.id } }
    );
    
    await badge.deleteOne();
    res.json({ message: 'Badge deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get badges by level
exports.getBadgesByLevel = async (req, res) => {
  try {
    const badges = await Badge.find({ level: req.params.level });
    res.json(badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get badges by user
exports.getBadgesByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('badges');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 