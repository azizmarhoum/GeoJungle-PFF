const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const CulturePost = require('../models/CulturePost');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  },
});

// Create a new culture post
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const post = new CulturePost({
      title: req.body.title,
      country: req.body.country,
      type: req.body.type,
      content: req.body.content,
      image: req.file ? {
        data: req.file.buffer,
        contentType: req.file.mimetype
      } : null,
      userId: user._id,
      userName: user.username,
      engagementMetrics: {
        likes: 0,
        dislikes: 0,
        comments: 0
      }
    });

    const newPost = await post.save();

    // Add the post to the user's userGeneratedPosts array
    user.userGeneratedPosts.push(newPost._id);
    await user.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all culture posts
router.get('/', async (req, res) => {
  try {
    const posts = await CulturePost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single culture post
router.get('/:id', async (req, res) => {
  try {
    const post = await CulturePost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get post image
router.get('/:id/image', async (req, res) => {
  try {
    const post = await CulturePost.findById(req.params.id);
    if (!post || !post.image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.set('Content-Type', post.image.contentType);
    res.send(post.image.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a culture post
router.patch('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const post = await CulturePost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the owner of the post
    if (post.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    // Update fields
    if (req.body.title) post.title = req.body.title;
    if (req.body.country) post.country = req.body.country;
    if (req.body.type) post.type = req.body.type;
    if (req.body.content) post.content = req.body.content;
    if (req.file) {
      post.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a culture post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await CulturePost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the owner of the post
    if (post.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like a culture post
router.patch('/:id/like', auth, async (req, res) => {
  try {
    const post = await CulturePost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.engagementMetrics.likes += 1;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Dislike a culture post
router.patch('/:id/dislike', auth, async (req, res) => {
  try {
    const post = await CulturePost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.engagementMetrics.dislikes += 1;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 