const mongoose = require("mongoose");
const mentorshipSchema = new mongoose.Schema({
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "active", "completed"], default: "pending" }
});
module.exports = mongoose.model("Mentorship", mentorshipSchema);
