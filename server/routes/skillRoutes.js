const express = require('express');
const router = express.Router();

const { getSkillsByUser, addSkill, deleteSkill } = require('../controllers/skillController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const validate = require('../middleware/validate');
const skillSchema = require('../validation/skillValidation');

// Get all skills for authenticated user
router.get('/', protect, getSkillsByUser);

// Add new skill with validation
router.post('/', protect, validate(skillSchema), addSkill);

// Delete skill (owner or admin)
// Only admin users can delete a skill
router.delete('/:skillId', protect, authorizeRoles('admin'), deleteSkill);

module.exports = router;