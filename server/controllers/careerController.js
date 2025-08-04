const CareerPath = require('../models/CareerPath');

exports.getCareers = async (req, res) => {
  try {
    const careers = await CareerPath.find();
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch careers', error: err.message });
  }
};

exports.addCareer = async (req, res) => {
  try {
    const { title, description, skillsRequired } = req.body;
    const career = new CareerPath({ title, description, skillsRequired });
    await career.save();
    res.status(201).json(career);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add career', error: err.message });
  }
};
