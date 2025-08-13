const Skill = require('../models/Skill');

// Get all skills for the authenticated user (ownership)
exports.getSkillsByUser = async (req, res, next) => {
  try {
    // Use authenticated user ID for ownership, disregard URL param for security
    const skills = await Skill.find({ user: req.user._id });
    res.json(skills);
  } catch (err) {
    next(err);
  }
};

// Add skill for authenticated user (ignore user in request, use req.user)
exports.addSkill = async (req, res, next) => {
  try {
    const { name, proficiency } = req.body;
    const skill = new Skill({ name, proficiency, user: req.user._id });
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    next(err);
  }
};

// Delete skill with ownership or admin role check
exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.skillId);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });

    // Only owner or admin may delete
    if (!skill.user.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: not authorized to delete this skill' });
    }

    await skill.remove();
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    next(err);
  }
};
