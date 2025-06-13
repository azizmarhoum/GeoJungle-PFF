const mongoose = require('mongoose');

const culturePostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Festival', 'Food', 'Music', 'Tradition', 'Clothing', 'Art']
  },
  content: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  engagementMetrics: {
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    },
    comments: {
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

// Update the updatedAt timestamp before saving
culturePostSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const CulturePost = mongoose.model('CulturePost', culturePostSchema);

module.exports = CulturePost; 