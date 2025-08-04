const express = require('express');
const router = express.Router();
const { getMentorships, createMentorship } = require('../controllers/mentorshipController');

router.get('/', getMentorships);
router.post('/create', createMentorship);

module.exports = router;
