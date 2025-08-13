const express = require('express');
const router = express.Router();

const {
  getResumesByUser,
  uploadResume,
  updateResume,
  deleteResume
} = require('../controllers/resumeController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const resumeSchema = require('../validation/resumeValidation');

router.get('/', protect, getResumesByUser);
router.post('/', protect, validate(resumeSchema), uploadResume);
router.put('/:resumeId', protect, validate(resumeSchema), updateResume);
router.delete('/:resumeId', protect, deleteResume);

module.exports = router;
