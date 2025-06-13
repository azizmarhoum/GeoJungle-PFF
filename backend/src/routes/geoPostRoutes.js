const express = require('express');
const router = express.Router();
const GeoFact = require('../models/geoFact');
const JourneyPost = require('../models/JourneyPost');
const CommunityPost = require('../models/CommunityPost');

// Get all posts for a specific country
router.get('/country/:countryName', async (req, res) => {
  try {
    const { countryName } = req.params;
    
    // Fetch posts from all collections
    const [geoFacts, journeyPosts, communityPosts] = await Promise.all([
      GeoFact.find({ country: countryName }),
      JourneyPost.find({ country: countryName }),
      CommunityPost.find({ country: countryName })
    ]);

    // Helper function to construct full media URL
    const getFullMediaUrl = (mediaPath) => {
      if (!mediaPath) return null;
      // If the path already starts with http, return as is
      if (mediaPath.startsWith('http')) return mediaPath;
      // Otherwise, construct the full URL
      return `${req.protocol}://${req.get('host')}${mediaPath}`;
    };

    // Transform the data to match the frontend interface
    const transformedPosts = [
      ...geoFacts.map(fact => ({
        _id: fact._id,
        title: fact.title,
        content: fact.content,
        country: fact.country,
        category: fact.category,
        userName: fact.userName,
        createdAt: fact.createdAt,
        media: getFullMediaUrl(fact.media),
        type: 'fact'
      })),
      ...journeyPosts.map(post => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        country: post.country,
        category: post.type,
        userName: post.userName,
        createdAt: post.createdAt,
        media: getFullMediaUrl(post.media),
        type: 'journey'
      })),
      ...communityPosts.map(post => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        country: post.country,
        category: post.type,
        userName: post.userName,
        createdAt: post.createdAt,
        media: getFullMediaUrl(post.media),
        type: 'culture'
      }))
    ];

    // Sort by creation date (newest first)
    transformedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(transformedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 