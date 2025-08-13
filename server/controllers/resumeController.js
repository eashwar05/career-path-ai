const Resume = require('../models/Resume');

// Get resumes belonging to authenticated user
exports.getResumesByUser = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (err) {
    next(err);
  }
};

// Upload new resume for authenticated user
exports.uploadResume = async (req, res, next) => {
  try {
    const { filepath, description } = req.body;
    const resume = new Resume({ filepath, description, user: req.user._id });
    await resume.save();
    res.status(201).json(resume);
  } catch (err) {
    next(err);
  }
};

// Update resume (owner or admin)
exports.updateResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    if (!resume.user.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: not authorized to update this resume' });
    }

    const { filepath, description } = req.body;
    if (filepath) resume.filepath = filepath;
    if (description) resume.description = description;
    await resume.save();

    res.json(resume);
  } catch (err) {
    next(err);
  }
};

// Delete resume (owner or admin)
exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    if (!resume.user.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: not authorized to delete this resume' });
    }

    await resume.remove();
    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    next(err);
  }
};
