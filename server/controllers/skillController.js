const Skill = require('../models/Skill');

exports.getSkillsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const skills = await Skill.find({ user: userId });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch skills', error: err.message });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const { name, proficiency, user } = req.body;
    const skill = new Skill({ name, proficiency, user });
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add skill', error: err.message });
  }
};
