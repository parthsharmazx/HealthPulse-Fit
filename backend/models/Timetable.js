const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    day: {
      type: String,
      required: true
    },
    dayShort: {
      type: String,
      required: true
    },
    workout: {
      title: String,
      duration: String,
      exercises: [String],
      completed: {
        type: Boolean,
        default: false
      }
    },
    nutrition: {
      focus: String,
      caloriesTarget: Number,
      highlightMeal: String,
      completed: {
        type: Boolean,
        default: false
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Timetable', timetableSchema);
