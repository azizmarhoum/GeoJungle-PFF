const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String },
  progressStats: {
    quizzesCompleted: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 }
  },
  achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }],
  userGeneratedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommunityPost' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 