const express = require('express');
const { uploadResume, getUserResumes } = require('../controllers/resumeController');
const router = express.Router();

router.post('/upload', uploadResume);
router.get('/:userId', getUserResumes);

module.exports = router;
