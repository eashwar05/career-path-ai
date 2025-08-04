const Resume = require('../models/Resume');

exports.uploadResume = async (req, res) => {
  try {
    // Here we only store the file path. In practice, you'd use a package like multer for real file uploads.
    const { userId, filepath } = req.body;
    const resume = new Resume({ user: userId, filepath });
    await resume.save();
    res.status(201).json({ message: "Resume uploaded", resume });
  } catch (err) {
    res.status(500).json({ message: "Resume upload failed", error: err.message });
  }
};

exports.getUserResumes = async (req, res) => {
  try {
    const { userId } = req.params;
    const resumes = await Resume.find({ user: userId });
    res.json({ resumes });
  } catch (err) {
    res.status(500).json({ message: "Cannot fetch resumes", error: err.message });
  }
};
