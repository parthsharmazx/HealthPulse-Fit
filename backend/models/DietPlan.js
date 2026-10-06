const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema(
  {
    dietType: {
      type: String,
      enum: ['Vegetarian', 'Non-Vegetarian'],
      required: true
    },
    mealType: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Snack', 'Dinner'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    calories: {
      type: Number,
      required: true
    },
    macros: {
      protein: { type: Number, required: true },
      carbs: { type: Number, required: true },
      fats: { type: Number, required: true }
    },
    prepTime: {
      type: String,
      default: '15 mins'
    },
    imageUrl: String,
    description: String,
    ingredients: [String],
    instructions: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('DietPlan', dietPlanSchema);
