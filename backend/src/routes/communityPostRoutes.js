const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const CommunityPost = require('../models/CommunityPost');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Get all community posts
router.get('/', async (req, res) => {
  try {
    const posts = await CommunityPost.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific community post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id)
      .populate('userId', 'name'); // Populate user information
    if (!post) return res.status(404).json({ message: 'Community post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new community post
router.post('/', auth, upload.single('media'), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const postData = {
      ...req.body,
      media: req.file ? `/uploads/${req.file.filename}` : undefined,
      type: 'culture',
      userId: user._id,
      userName: user.username,
      engagementMetrics: {
        likes: 0,
        dislikes: 0,
        comments: 0
      },
      likedBy: [],
      dislikedBy: []
    };
    
    const post = new CommunityPost(postData);
    const newPost = await post.save();

    // Add the post to the user's userGeneratedPosts array
    user.userGeneratedPosts.push(newPost._id);
    await user.save();
    
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(400).json({ 
      message: err.message,
      details: err.errors
    });
  }
});

// Update a community post
router.patch('/:id', upload.single('media'), async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Community post not found' });
    
    const updateData = {
      ...req.body,
      media: req.file ? `/uploads/${req.file.filename}` : post.media
    };
    
    Object.assign(post, updateData);
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a community post
router.delete('/:id', async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Community post not found' });
    await post.remove();
    res.json({ message: 'Community post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like a post
router.patch('/:id/like', async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Community post not found' });
    
    const userId = req.body.userId || '65f1a1b1c1d1e1f1a1b1c1d1'; // Replace with actual user ID
    
    // Check if user already liked
    if (post.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }
    
    // Remove from dislikes if exists
    if (post.dislikedBy.includes(userId)) {
      post.dislikedBy = post.dislikedBy.filter(id => id.toString() !== userId);
      post.engagementMetrics.dislikes -= 1;
    }
    
    // Add to likes
    post.likedBy.push(userId);
    post.engagementMetrics.likes += 1;
    
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Dislike a post
router.patch('/:id/dislike', async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Community post not found' });
    
    const userId = req.body.userId || '65f1a1b1c1d1e1f1a1b1c1d1'; // Replace with actual user ID
    
    // Check if user already disliked
    if (post.dislikedBy.includes(userId)) {
      return res.status(400).json({ message: 'You have already disliked this post' });
    }
    
    // Remove from likes if exists
    if (post.likedBy.includes(userId)) {
      post.likedBy = post.likedBy.filter(id => id.toString() !== userId);
      post.engagementMetrics.likes -= 1;
    }
    
    // Add to dislikes
    post.dislikedBy.push(userId);
    post.engagementMetrics.dislikes += 1;
    
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 