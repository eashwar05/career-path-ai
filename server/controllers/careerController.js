const Career = require('../models/CareerPath');

// Get careers for authenticated user
exports.getCareersByUser = async (req, res, next) => {
  try {
    const careers = await Career.find({ user: req.user._id });
    res.json(careers);
  } catch (err) {
    next(err);
  }
};

// Add new career entry
exports.addCareer = async (req, res, next) => {
  try {
    const { title, company, startDate, endDate, description } = req.body;
    const career = new Career({
      title,
      company,
      startDate,
      endDate,
      description,
      user: req.user._id
    });
    await career.save();
    res.status(201).json(career);
  } catch (err) {
    next(err);
  }
};

// Update career entry (owner or admin)
exports.updateCareer = async (req, res, next) => {
  try {
    const career = await Career.findById(req.params.careerId);
    if (!career) return res.status(404).json({ message: 'Career not found' });

    if (!career.user.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: not authorized to update this career' });
    }

    const { title, company, startDate, endDate, description } = req.body;
    if (title) career.title = title;
    if (company) career.company = company;
    if (startDate) career.startDate = startDate;
    if (typeof endDate !== 'undefined') career.endDate = endDate;
    if (description) career.description = description;

    await career.save();
    res.json(career);
  } catch (err) {
    next(err);
  }
};

// Delete career entry (owner/admin)
exports.deleteCareer = async (req, res, next) => {
  try {
    const career = await Career.findById(req.params.careerId);
    if (!career) return res.status(404).json({ message: 'Career not found' });

    if (!career.user.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: not authorized to delete this career' });
    }

    await career.remove();
    res.json({ message: 'Career deleted successfully' });
  } catch (err) {
    next(err);
  }
};
