const express = require('express');
const router = express.Router();
const {
  getTimetable,
  toggleWorkout,
  toggleNutrition,
  addCustomScheduleItem
} = require('../controllers/timetableController');

router.get('/', getTimetable);
router.patch('/:day/toggle-workout', toggleWorkout);
router.patch('/:day/toggle-nutrition', toggleNutrition);
router.post('/:day/add', addCustomScheduleItem);

module.exports = router;
