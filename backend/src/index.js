const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const quizAttemptRoutes = require('./routes/quizAttemptRoutes');
const gameRoutes = require('./routes/gameRoutes');
const communityPostRoutes = require('./routes/communityPostRoutes');
const journeyPostRoutes = require('./routes/journeyPostRoutes');
const commentRoutes = require('./routes/commentRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const geoFactRoutes = require('./routes/geoFactRoutes');
const geoPostRoutes = require('./routes/geoPostRoutes');
const culturePostRoutes = require('./routes/culturePostRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/GeoJungles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/quiz-attempts', quizAttemptRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/community-posts', communityPostRoutes);
app.use('/api/journey-posts', journeyPostRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/geofacts', geoFactRoutes);
app.use('/api/geoposts', geoPostRoutes);
app.use('/api/culture-posts', culturePostRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 