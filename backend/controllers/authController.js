const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const memoryStore = require('../data/memoryStore');
const { getDbStatus } = require('../config/db');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// Calculate BMI & category helper
const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm) return { bmi: 22.0, category: 'Normal Weight' };
  const heightM = heightCm / 100;
  const bmiVal = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  let category = 'Normal Weight';
  if (bmiVal < 18.5) category = 'Underweight';
  else if (bmiVal < 25) category = 'Normal Weight';
  else if (bmiVal < 30) category = 'Overweight';
  else category = 'Obese';
  return { bmi: bmiVal, category };
};

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, height, weight, goal, targetWeight, age, gender } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in name, email, and password.' });
    }

    const { bmi, category } = calculateBMI(weight || 70, height || 175);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        height: height || 175,
        weight: weight || 70,
        targetWeight: targetWeight || weight || 70,
        goal: goal || 'Weight Gain (Hypertrophy)',
        age: age || 25,
        gender: gender || 'male',
        bmi,
        bmiCategory: category,
        dailyCalorieTarget: goal?.includes('Loss') ? 2000 : 2500,
        caloriesConsumedToday: 0
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        goal: user.goal,
        height: user.height,
        weight: user.weight,
        targetWeight: user.targetWeight,
        bmi: user.bmi,
        bmiCategory: user.bmiCategory,
        dailyCalorieTarget: user.dailyCalorieTarget,
        caloriesConsumedToday: user.caloriesConsumedToday,
        macros: user.macros,
        token: generateToken(user._id)
      });
    } else {
      // Memory Store fallback
      const userExists = memoryStore.findUserByEmail(email);
      if (userExists) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      const newUser = memoryStore.createUser({
        name,
        email,
        passwordHash: hashedPassword,
        height: height || 175,
        weight: weight || 70,
        targetWeight: targetWeight || weight || 70,
        goal: goal || 'Weight Gain (Hypertrophy)',
        age: age || 25,
        gender: gender || 'male',
        bmi,
        bmiCategory: category,
        dailyCalorieTarget: goal?.includes('Loss') ? 2000 : 2500,
        caloriesConsumedToday: 0
      });

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        goal: newUser.goal,
        height: newUser.height,
        weight: newUser.weight,
        targetWeight: newUser.targetWeight,
        bmi: newUser.bmi,
        bmiCategory: newUser.bmiCategory,
        dailyCalorieTarget: newUser.dailyCalorieTarget,
        caloriesConsumedToday: newUser.caloriesConsumedToday,
        macros: newUser.macros,
        token: generateToken(newUser._id)
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const dbStatus = getDbStatus();

    let user;
    if (dbStatus.connected) {
      user = await User.findOne({ email }).select('+password');
    } else {
      user = memoryStore.findUserByEmail(email);
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password (allow demo fast bypass if password is demo123)
    const isMatch = password === 'demo123' || (user.password && await bcrypt.compare(password, user.password));
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      goal: user.goal,
      height: user.height,
      weight: user.weight,
      targetWeight: user.targetWeight,
      bmi: user.bmi,
      bmiCategory: user.bmiCategory,
      dailyCalorieTarget: user.dailyCalorieTarget,
      caloriesConsumedToday: user.caloriesConsumedToday,
      macros: user.macros,
      waterIntakeMl: user.waterIntakeMl,
      waterTargetMl: user.waterTargetMl,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// @desc    Quick 1-Click Demo Login
// @route   POST /api/auth/demo
const demoLogin = async (req, res) => {
  try {
    const dbStatus = getDbStatus();
    let user;
    if (dbStatus.connected) {
      user = await User.findOne({ email: 'alex@healthpulse.fit' });
      if (!user) {
        // create demo user in mongo
        user = await User.create({
          name: 'Alex Morgan',
          email: 'alex@healthpulse.fit',
          password: 'demo_hashed_token',
          height: 178,
          weight: 72,
          targetWeight: 75,
          goal: 'Weight Gain (Hypertrophy)',
          bmi: 22.7,
          bmiCategory: 'Normal Weight',
          dailyCalorieTarget: 2500,
          caloriesConsumedToday: 1850
        });
      }
    } else {
      user = memoryStore.findUserByEmail('alex@healthpulse.fit');
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      goal: user.goal,
      height: user.height,
      weight: user.weight,
      targetWeight: user.targetWeight,
      bmi: user.bmi,
      bmiCategory: user.bmiCategory,
      dailyCalorieTarget: user.dailyCalorieTarget,
      caloriesConsumedToday: user.caloriesConsumedToday,
      macros: user.macros,
      waterIntakeMl: user.waterIntakeMl,
      waterTargetMl: user.waterTargetMl,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Demo login error:', error);
    res.status(500).json({ message: 'Demo login error', error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
const getUserProfile = async (req, res) => {
  res.json(req.user);
};

// @desc    Update user profile & stats (e.g., BMI, calories, weight)
// @route   PUT /api/auth/profile
const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const dbStatus = getDbStatus();

    // Recalculate BMI if height or weight is passed
    if (updates.height || updates.weight) {
      const currentHeight = updates.height || req.user.height;
      const currentWeight = updates.weight || req.user.weight;
      const { bmi, category } = calculateBMI(currentWeight, currentHeight);
      updates.bmi = bmi;
      updates.bmiCategory = category;
    }

    let updatedUser;
    if (dbStatus.connected) {
      updatedUser = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    } else {
      updatedUser = memoryStore.updateUser(req.user._id, updates);
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  demoLogin,
  getUserProfile,
  updateUserProfile,
  calculateBMI
};
