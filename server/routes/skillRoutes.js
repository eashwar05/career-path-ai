const express = require('express');
const router = express.Router();
const { getSkillsByUser, addSkill } = require('../controllers/skillController');

router.get('/user/:userId', getSkillsByUser);
router.post('/add', addSkill);

module.exports = router;
