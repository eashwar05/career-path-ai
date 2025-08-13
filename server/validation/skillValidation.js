// server/validation/skillValidation.js
const Joi = require('joi');

const skillSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  proficiency: Joi.string().required().valid('Beginner', 'Intermediate', 'Advanced', 'Expert')
});

module.exports = { skillSchema };
