const Exercise = require('../models/Exercise');
const memoryStore = require('../data/memoryStore');
const { getDbStatus } = require('../config/db');

// @desc    Get exercises with filters
// @route   GET /api/exercises
const getExercises = async (req, res) => {
  try {
    const { category, muscle, search } = req.query;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const filter = {};
      if (category && category !== 'All') {
        filter.category = category;
      }
      if (muscle && muscle !== 'All') {
        filter.$or = [
          { targetMuscle: { $regex: muscle, $options: 'i' } },
          { secondaryMuscles: { $regex: muscle, $options: 'i' } }
        ];
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { targetMuscle: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      const exercises = await Exercise.find(filter);
      return res.json(exercises);
    } else {
      const exercises = memoryStore.getExercises({ category, muscle, search });
      return res.json(exercises);
    }
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ message: 'Error retrieving exercises', error: error.message });
  }
};

// @desc    Get single exercise by ID
// @route   GET /api/exercises/:id
const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const exercise = await Exercise.findById(id);
      if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
      return res.json(exercise);
    } else {
      const exercise = memoryStore.exercises.find(e => e._id === id);
      if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
      return res.json(exercise);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exercise', error: error.message });
  }
};

module.exports = {
  getExercises,
  getExerciseById
};
