const Mentorship = require('../models/Mentorship');

// List mentorships for authenticated user (where user is mentor or mentee)
exports.getMentorshipsForUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const mentorships = await Mentorship.find({
      $or: [{ mentor: userId }, { mentee: userId }]
    })
      .populate('mentor', 'name email')
      .populate('mentee', 'name email');
    res.json(mentorships);
  } catch (err) {
    next(err);
  }
};

// Create mentorship request — mentee requests mentor
exports.createMentorship = async (req, res, next) => {
  try {
    const { mentor, mentee, notes } = req.body;

    // Enforce mentee is requestor user ID
    if (req.user._id.toString() !== mentee) {
      return res.status(403).json({ message: 'Forbidden: you can only request mentorship for yourself' });
    }

    const mentorship = new Mentorship({ mentor, mentee, notes });
    await mentorship.save();
    res.status(201).json(mentorship);
  } catch (err) {
    next(err);
  }
};

// Update mentorship status & notes (mentor or admin only)
exports.updateMentorship = async (req, res, next) => {
  try {
    const mentorship = await Mentorship.findById(req.params.mentorshipId);
    if (!mentorship) return res.status(404).json({ message: 'Mentorship not found' });

    if (!mentorship.mentor.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: not authorized to update this mentorship' });
    }

    const { status, notes } = req.body;
    if (status) mentorship.status = status;
    if (notes) mentorship.notes = notes;

    await mentorship.save();
    res.json(mentorship);
  } catch (err) {
    next(err);
  }
};

// Delete mentorship (mentor or admin)
exports.deleteMentorship = async (req, res, next) => {
  try {
    const mentorship = await Mentorship.findById(req.params.mentorshipId);
    if (!mentorship) return res.status(404).json({ message: 'Mentorship not found' });

    if (!mentorship.mentor.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: not authorized to delete this mentorship' });
    }

    await mentorship.remove();
    res.json({ message: 'Mentorship deleted successfully' });
  } catch (err) {
    next(err);
  }
};
