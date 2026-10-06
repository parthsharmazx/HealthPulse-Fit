const jwt = require('jsonwebtoken');
const User = require('../models/User');
const memoryStore = require('../data/memoryStore');
const { getDbStatus } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'healthpulse_super_secret_jwt_key_2026';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      const dbStatus = getDbStatus();
      if (dbStatus.connected) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        req.user = memoryStore.findUserById(decoded.id);
      }

      if (!req.user) {
        return res.status(401).json({ message: 'User not found or token invalid' });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect, JWT_SECRET };
