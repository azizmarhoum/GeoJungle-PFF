const mongoose = require('mongoose');

const geoFactSchema = new mongoose.Schema({
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
  category: {
    type: String,
    required: true,
    enum: ['Geography', 'History', 'Culture', 'Science', 'Nature', 'Technology']
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
geoFactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const GeoFact = mongoose.model('GeoFact', geoFactSchema);

module.exports = GeoFact; 