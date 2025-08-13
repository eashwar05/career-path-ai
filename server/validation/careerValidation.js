const Joi = require('joi');

const careerSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  company: Joi.string().min(2).max(100).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional().allow(null),  // Allow null for present jobs
  description: Joi.string().max(1000).optional()
});

module.exports = careerSchema;
