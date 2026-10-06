const DietPlan = require('../models/DietPlan');
const memoryStore = require('../data/memoryStore');
const { getDbStatus } = require('../config/db');

// @desc    Get diet plans with filters
// @route   GET /api/diets
const getDietPlans = async (req, res) => {
  try {
    const { dietType, mealType, search } = req.query;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const filter = {};
      if (dietType && dietType !== 'All') {
        filter.dietType = dietType;
      }
      if (mealType && mealType !== 'All') {
        filter.mealType = mealType;
      }
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      const plans = await DietPlan.find(filter);
      return res.json(plans);
    } else {
      const plans = memoryStore.getDietPlans({ dietType, mealType, search });
      return res.json(plans);
    }
  } catch (error) {
    console.error('Error fetching diets:', error);
    res.status(500).json({ message: 'Error retrieving diet plans', error: error.message });
  }
};

// @desc    Get single meal plan by ID
// @route   GET /api/diets/:id
const getDietPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const plan = await DietPlan.findById(id);
      if (!plan) return res.status(404).json({ message: 'Diet plan not found' });
      return res.json(plan);
    } else {
      const plan = memoryStore.dietPlans.find(d => d._id === id);
      if (!plan) return res.status(404).json({ message: 'Diet plan not found' });
      return res.json(plan);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching diet plan', error: error.message });
  }
};

module.exports = {
  getDietPlans,
  getDietPlanById
};
