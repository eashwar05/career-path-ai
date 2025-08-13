const express = require('express');
const router = express.Router();

const {
  getCareersByUser,
  addCareer,
  updateCareer,
  deleteCareer
} = require('../controllers/careerController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const careerSchema = require('../validation/careerValidation');

router.get('/', protect, getCareersByUser);
router.post('/', protect, validate(careerSchema), addCareer);
router.put('/:careerId', protect, validate(careerSchema), updateCareer);
router.delete('/:careerId', protect, authorizeRoles('admin'), deleteCareer);

module.exports = router;
