const express = require('express');
const { body } = require('express-validator');
const MiniAdmin = require('../models/MiniAdmin');
const User = require('../models/User');

const router = express.Router();

// Get all mini-admins
router.get('/', async (req, res) => {
  try {
    const miniAdmins = await MiniAdmin.find()
      .populate('user', 'username email')
      .sort({ createdAt: -1 });
    res.json(miniAdmins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mini-admins' });
  }
});

// Get mini-admin by ID
router.get('/:id', async (req, res) => {
  try {
    const miniAdmin = await MiniAdmin.findById(req.params.id)
      .populate('user', 'username email');
    if (!miniAdmin) {
      return res.status(404).json({ message: 'Mini-admin not found' });
    }
    res.json(miniAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mini-admin' });
  }
});

// Create new mini-admin
router.post('/', [
  body('user').isMongoId(),
  body('role').isIn(['content_moderator', 'user_moderator', 'game_manager', 'community_manager']),
  body('permissions').isArray(),
  body('assignedSections').isArray()
], async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is already a mini-admin
    const existingMiniAdmin = await MiniAdmin.findOne({ user: req.body.user });
    if (existingMiniAdmin) {
      return res.status(400).json({ message: 'User is already a mini-admin' });
    }

    const miniAdmin = new MiniAdmin(req.body);
    await miniAdmin.save();
    res.status(201).json(miniAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Error creating mini-admin' });
  }
});

// Update mini-admin
router.put('/:id', [
  body('role').optional().isIn(['content_moderator', 'user_moderator', 'game_manager', 'community_manager']),
  body('permissions').optional().isArray(),
  body('assignedSections').optional().isArray(),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const miniAdmin = await MiniAdmin.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!miniAdmin) {
      return res.status(404).json({ message: 'Mini-admin not found' });
    }
    res.json(miniAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Error updating mini-admin' });
  }
});

// Delete mini-admin
router.delete('/:id', async (req, res) => {
  try {
    const miniAdmin = await MiniAdmin.findByIdAndDelete(req.params.id);
    if (!miniAdmin) {
      return res.status(404).json({ message: 'Mini-admin not found' });
    }
    res.json({ message: 'Mini-admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting mini-admin' });
  }
});

// Update mini-admin activity
router.post('/:id/activity', async (req, res) => {
  try {
    const miniAdmin = await MiniAdmin.findById(req.params.id);
    if (!miniAdmin) {
      return res.status(404).json({ message: 'Mini-admin not found' });
    }

    miniAdmin.lastActive = new Date();
    await miniAdmin.save();
    res.json({ message: 'Activity updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating activity' });
  }
});

module.exports = router; 