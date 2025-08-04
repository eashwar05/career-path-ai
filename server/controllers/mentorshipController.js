const Mentorship = require('../models/Mentorship');

exports.getMentorships = async (req, res) => {
  try {
    const mentorships = await Mentorship.find()
      .populate('mentor', 'name email')
      .populate('mentee', 'name email');
    res.json(mentorships);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch mentorships', error: err.message });
  }
};

exports.createMentorship = async (req, res) => {
  try {
    const { mentor, mentee } = req.body;
    const mentorship = new Mentorship({ mentor, mentee });
    await mentorship.save();
    res.status(201).json(mentorship);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create mentorship', error: err.message });
  }
};
