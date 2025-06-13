const User = require('../models/User');
const Post = require('../models/Post');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate('badges')
      .populate('achievements')
      .populate('communityId');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('badges')
      .populate('achievements')
      .populate('communityId');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete all posts by this user
    await Post.deleteMany({ authorId: req.params.id });
    
    res.json({ message: 'User and associated posts deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's posts
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ authorId: req.params.id })
      .sort({ createdDate: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user stats
exports.getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const stats = {
      postCount: user.postCount,
      score: user.score,
      level: user.level,
      badgeCount: user.badges.length,
      achievementCount: user.achievements.length,
      isMiniAdmin: user.isMiniAdmin,
      communityId: user.communityId
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 