const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/healthpulse';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500, // Quick fallback if local mongod is not running
    });
    isConnected = true;
    console.log(`[HealthPulse] MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[HealthPulse] MongoDB not detected (${error.message}).`);
    console.log(`[HealthPulse] Running in high-performance MemoryStore mode with persistent seed data.`);
    return false;
  }
};

const getDbStatus = () => ({
  connected: isConnected,
  provider: isConnected ? 'MongoDB' : 'MemoryStore Engine'
});

module.exports = { connectDB, getDbStatus };
