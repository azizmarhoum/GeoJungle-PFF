const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const badgeRoutes = require('./badgeRoutes');
const achievementRoutes = require('./achievementRoutes');
const communityRoutes = require('./communityRoutes');
const gameSessionRoutes = require('./gameSessionRoutes');

// Mount routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/badges', badgeRoutes);
router.use('/achievements', achievementRoutes);
router.use('/communities', communityRoutes);
router.use('/game-sessions', gameSessionRoutes);

module.exports = router; 