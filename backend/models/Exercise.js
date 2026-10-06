const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['Weight Gain', 'Weight Loss'],
      required: true
    },
    targetMuscle: {
      type: String,
      required: true
    },
    secondaryMuscles: [String],
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate'
    },
    equipment: {
      type: String,
      default: 'Bodyweight'
    },
    sets: {
      type: String,
      default: '3-4 sets'
    },
    reps: {
      type: String,
      default: '8-12 reps'
    },
    restTime: {
      type: String,
      default: '60s'
    },
    caloriesBurned: {
      type: String,
      default: '100 kcal / 15 min'
    },
    demoVisual: {
      type: String,
      default: 'workout'
    },
    description: String,
    instructions: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exercise', exerciseSchema);
