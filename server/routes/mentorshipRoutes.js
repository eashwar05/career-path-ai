const express = require('express');
const router = express.Router();

const {
  getMentorshipsForUser,
  createMentorship,
  updateMentorship,
  deleteMentorship
} = require('../controllers/mentorshipController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const mentorshipSchema = require('../validation/mentorshipValidation');

router.get('/', protect, getMentorshipsForUser);
router.post('/', protect, validate(mentorshipSchema), createMentorship);
router.put('/:mentorshipId', protect, validate(mentorshipSchema), updateMentorship);
router.delete('/:mentorshipId', protect, authorizeRoles('admin'), deleteMentorship);

module.exports = router;
