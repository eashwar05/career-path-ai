const Joi = require('joi');

const mentorshipSchema = Joi.object({
  mentor: Joi.string().hex().length(24).required(),
  mentee: Joi.string().hex().length(24).required(),
  status: Joi.string().valid('pending', 'approved', 'rejected').optional(),
  notes: Joi.string().max(1000).optional()
});

module.exports = mentorshipSchema;
