const express = require('express');
const router = express.Router();
const { getCareers, addCareer } = require('../controllers/careerController');

router.get('/', getCareers);
router.post('/', addCareer);

module.exports = router;
