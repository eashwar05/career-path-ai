const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('CareerPath', careerSchema);
