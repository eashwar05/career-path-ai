const mongoose = require("mongoose");
const careerPathSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  skillsRequired: [String],
});
module.exports = mongoose.model("CareerPath", careerPathSchema);
