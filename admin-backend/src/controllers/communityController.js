const Community = require('../models/Community');
const User = require('../models/User');

// Get all communities
exports.getCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get community by ID
exports.getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    res.json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new community
exports.createCommunity = async (req, res) => {
  try {
    const community = new Community(req.body);
    const savedCommunity = await community.save();
    
    // Update admin user's communityId
    await User.findByIdAndUpdate(req.body.adminId, {
      communityId: savedCommunity._id,
      isMiniAdmin: true
    });
    
    res.status(201).json(savedCommunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update community
exports.updateCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    res.json(community);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete community
exports.deleteCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    // Update all users in this community
    await User.updateMany(
      { communityId: req.params.id },
      { 
        $unset: { communityId: 1 },
        $set: { isMiniAdmin: false }
      }
    );
    
    await community.deleteOne();
    res.json({ message: 'Community deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get community members
exports.getCommunityMembers = async (req, res) => {
  try {
    const members = await User.find({ communityId: req.params.id })
      .select('-password')
      .populate('badges')
      .populate('achievements');
    
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get community stats
exports.getCommunityStats = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    const memberCount = await User.countDocuments({ communityId: req.params.id });
    const totalScore = await User.aggregate([
      { $match: { communityId: req.params.id } },
      { $group: { _id: null, total: { $sum: '$score' } } }
    ]);
    
    const stats = {
      name: community.name,
      description: community.description,
      memberCount,
      totalScore: totalScore[0]?.total || 0,
      adminId: community.adminId,
      adminUsername: community.adminUsername,
      createdDate: community.createdDate
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 