const mongoose = require('mongoose');

const miniAdminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['content_moderator', 'user_moderator', 'game_manager', 'community_manager'],
    required: true
  },
  permissions: [{
    type: String,
    enum: [
      'manage_posts',
      'manage_users',
      'manage_games',
      'manage_badges',
      'view_statistics',
      'manage_content',
      'manage_community'
    ]
  }],
  assignedSections: [{
    type: String,
    enum: ['posts', 'users', 'games', 'badges', 'community']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastActive: {
    type: Date
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

const MiniAdmin = mongoose.model('MiniAdmin', miniAdminSchema);

module.exports = MiniAdmin; 