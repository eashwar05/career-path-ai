const Resource = require('../models/Resource');

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch resources', error: err.message });
  }
};

exports.addResource = async (req, res) => {
  try {
    const { title, url, category } = req.body;
    const resource = new Resource({ title, url, category });
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add resource', error: err.message });
  }
};
