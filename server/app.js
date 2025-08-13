require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const careerRoutes = require('./routes/careerRoutes');
const mentorshipRoutes = require('./routes/mentorshipRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const skillRoutes = require('./routes/skillRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());           // Enable CORS for all origins
app.use(express.json());   // Parse incoming JSON payloads
app.use(morgan('dev'));    // HTTP request logger

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/resource', resourceRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/skills', skillRoutes);

// Centralized error handler; must be after all routes
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

module.exports = app;
