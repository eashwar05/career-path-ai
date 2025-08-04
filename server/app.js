require('dotenv').config();         // Load environment variables from .env

const express = require('express'); // Import Express.js framework
const cors = require('cors');       // Middleware to enable CORS (Cross-Origin Resource Sharing)
const mongoose = require('mongoose'); // Mongoose for MongoDB connection

// Import authentication routes and feature routes
const authRoutes = require('./routes/authRoutes');
const careerRoutes = require('./routes/careerRoutes');
const mentorshipRoutes = require('./routes/mentorshipRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const skillRoutes = require('./routes/skillRoutes');

const app = express();

// Middleware configuration
app.use(cors());                    // Enable all CORS requests (allow calls from frontend)
app.use(express.json());            // Parse incoming JSON in request bodies

// Route registrations
app.use('/api/auth', authRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/resource', resourceRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/skills', skillRoutes);

// Connect to MongoDB database using MONGO_URI from environment variables
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  // Start Express server once DB connection is successful
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch((error) => {
  // Log connection error and exit process
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

module.exports = app; // Export app for testing or further setup if needed
