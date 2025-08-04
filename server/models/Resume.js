const mongoose = require("mongoose");
const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filepath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Resume", resumeSchema);
