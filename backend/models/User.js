const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    age: {
      type: Number,
      default: 25
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: 'male'
    },
    height: {
      type: Number, // in cm
      default: 175
    },
    weight: {
      type: Number, // in kg
      default: 70
    },
    targetWeight: {
      type: Number,
      default: 72
    },
    goal: {
      type: String,
      enum: [
        'Weight Loss (Fat Burn)',
        'Weight Gain (Hypertrophy)',
        'Maintenance & Endurance',
        'Strength & Conditioning'
      ],
      default: 'Weight Gain (Hypertrophy)'
    },
    bmi: {
      type: Number,
      default: 22.8
    },
    bmiCategory: {
      type: String,
      default: 'Normal Weight'
    },
    dailyCalorieTarget: {
      type: Number,
      default: 2400
    },
    caloriesConsumedToday: {
      type: Number,
      default: 1850
    },
    macros: {
      protein: { type: Number, default: 140 },
      targetProtein: { type: Number, default: 160 },
      carbs: { type: Number, default: 220 },
      targetCarbs: { type: Number, default: 280 },
      fats: { type: Number, default: 55 },
      targetFats: { type: Number, default: 70 }
    },
    waterIntakeMl: {
      type: Number,
      default: 2000
    },
    waterTargetMl: {
      type: Number,
      default: 3000
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
