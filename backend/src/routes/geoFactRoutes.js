const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const GeoFact = require('../models/geoFact');
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

// Get all geo facts
router.get('/', async (req, res) => {
  try {
    const facts = await GeoFact.find().sort({ createdAt: -1 });
    res.json(facts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single geo fact
router.get('/:id', async (req, res) => {
  try {
    const fact = await GeoFact.findById(req.params.id);
    if (!fact) {
      return res.status(404).json({ message: 'Fact not found' });
    }
    res.json(fact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get fact image
router.get('/:id/image', async (req, res) => {
  try {
    const fact = await GeoFact.findById(req.params.id);
    if (!fact || !fact.image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.set('Content-Type', fact.image.contentType);
    res.send(fact.image.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new geo fact
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const fact = new GeoFact({
      title: req.body.title,
      country: req.body.country,
      category: req.body.category,
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

    const newFact = await fact.save();

    // Add the fact to the user's userGeneratedPosts array
    user.userGeneratedPosts.push(newFact._id);
    await user.save();

    res.status(201).json(newFact);
  } catch (error) {
    console.error('Error creating fact:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update a geo fact
router.patch('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const fact = await GeoFact.findById(req.params.id);
    if (!fact) {
      return res.status(404).json({ message: 'Fact not found' });
    }

    // Check if user is the owner of the fact
    if (fact.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this fact' });
    }

    // Update fields
    if (req.body.title) fact.title = req.body.title;
    if (req.body.country) fact.country = req.body.country;
    if (req.body.category) fact.category = req.body.category;
    if (req.body.content) fact.content = req.body.content;
    if (req.file) {
      fact.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const updatedFact = await fact.save();
    res.json(updatedFact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a geo fact
router.delete('/:id', auth, async (req, res) => {
  try {
    const fact = await GeoFact.findById(req.params.id);
    if (!fact) {
      return res.status(404).json({ message: 'Fact not found' });
    }

    // Check if user is the owner of the fact
    if (fact.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this fact' });
    }

    await fact.deleteOne();
    res.json({ message: 'Fact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like a geo fact
router.patch('/:id/like', auth, async (req, res) => {
  try {
    const fact = await GeoFact.findById(req.params.id);
    if (!fact) {
      return res.status(404).json({ message: 'Fact not found' });
    }

    fact.engagementMetrics.likes += 1;
    const updatedFact = await fact.save();
    res.json(updatedFact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Dislike a geo fact
router.patch('/:id/dislike', auth, async (req, res) => {
  try {
    const fact = await GeoFact.findById(req.params.id);
    if (!fact) {
      return res.status(404).json({ message: 'Fact not found' });
    }

    fact.engagementMetrics.dislikes += 1;
    const updatedFact = await fact.save();
    res.json(updatedFact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 