const Joi = require('joi');

const resumeSchema = Joi.object({
  filepath: Joi.string().uri().required(),
  description: Joi.string().max(500).optional()
});

module.exports = resumeSchema;
