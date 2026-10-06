const Timetable = require('../models/Timetable');
const memoryStore = require('../data/memoryStore');
const { getDbStatus } = require('../config/db');

// @desc    Get weekly timetable schedule
// @route   GET /api/timetable
const getTimetable = async (req, res) => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      let schedule = await Timetable.find({}).sort({ _id: 1 });
      if (!schedule || schedule.length === 0) {
        // Seed initial timetable
        schedule = await Timetable.insertMany(memoryStore.timetable);
      }
      return res.json(schedule);
    } else {
      return res.json(memoryStore.getTimetable());
    }
  } catch (error) {
    console.error('Error fetching timetable:', error);
    res.status(500).json({ message: 'Error fetching timetable', error: error.message });
  }
};

// @desc    Toggle workout status for a day
// @route   PATCH /api/timetable/:day/toggle-workout
const toggleWorkout = async (req, res) => {
  try {
    const { day } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const item = await Timetable.findOne({ day: new RegExp(`^${day}$`, 'i') });
      if (!item) return res.status(404).json({ message: 'Day not found' });
      item.workout.completed = !item.workout.completed;
      await item.save();
      return res.json(item);
    } else {
      const updated = memoryStore.toggleTimetableWorkout(day);
      if (!updated) return res.status(404).json({ message: 'Day not found' });
      return res.json(updated);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error toggling workout', error: error.message });
  }
};

// @desc    Toggle nutrition status for a day
// @route   PATCH /api/timetable/:day/toggle-nutrition
const toggleNutrition = async (req, res) => {
  try {
    const { day } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const item = await Timetable.findOne({ day: new RegExp(`^${day}$`, 'i') });
      if (!item) return res.status(404).json({ message: 'Day not found' });
      item.nutrition.completed = !item.nutrition.completed;
      await item.save();
      return res.json(item);
    } else {
      const updated = memoryStore.toggleTimetableNutrition(day);
      if (!updated) return res.status(404).json({ message: 'Day not found' });
      return res.json(updated);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error toggling nutrition', error: error.message });
  }
};

// @desc    Add custom exercise or meal to a day
// @route   POST /api/timetable/:day/add
const addCustomScheduleItem = async (req, res) => {
  try {
    const { day } = req.params;
    const { type, text } = req.body; // type: 'exercise' or 'meal'
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const item = await Timetable.findOne({ day: new RegExp(`^${day}$`, 'i') });
      if (!item) return res.status(404).json({ message: 'Day not found' });

      if (type === 'exercise') {
        if (!item.workout.exercises.includes(text)) {
          item.workout.exercises.push(text);
        }
      } else if (type === 'meal') {
        item.nutrition.highlightMeal = text;
      }
      await item.save();
      return res.json(item);
    } else {
      let updated;
      if (type === 'exercise') {
        updated = memoryStore.addCustomWorkoutToDay(day, text);
      } else {
        updated = memoryStore.addCustomMealToDay(day, text);
      }
      return res.json(updated);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating schedule', error: error.message });
  }
};

module.exports = {
  getTimetable,
  toggleWorkout,
  toggleNutrition,
  addCustomScheduleItem
};
