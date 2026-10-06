// Clean automated test script for backend API endpoints
require('dotenv').config();
const { connectDB } = require('./config/db');
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const dietRoutes = require('./routes/dietRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const affiliateRoutes = require('./routes/affiliateRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/affiliate', affiliateRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'online', appName: 'HealthPulse & Fit API' });
});

async function runTests() {
  await connectDB();
  const server = app.listen(5002, async () => {
    console.log('Testing server running on port 5002...');

    const tests = [
      { name: 'Health Check', url: 'http://localhost:5002/api/health', method: 'GET' },
      { name: 'Demo Login', url: 'http://localhost:5002/api/auth/demo', method: 'POST', body: {} },
      { name: 'Exercises (Gain)', url: 'http://localhost:5002/api/exercises?category=Weight%20Gain', method: 'GET' },
      { name: 'Exercises (Loss)', url: 'http://localhost:5002/api/exercises?category=Weight%20Loss', method: 'GET' },
      { name: 'Diets (Veg)', url: 'http://localhost:5002/api/diets?dietType=Vegetarian', method: 'GET' },
      { name: 'Diets (Non-Veg)', url: 'http://localhost:5002/api/diets?dietType=Non-Vegetarian', method: 'GET' },
      { name: 'Timetable', url: 'http://localhost:5002/api/timetable', method: 'GET' },
      { name: 'Affiliate Products', url: 'http://localhost:5002/api/affiliate', method: 'GET' },
      {
        name: 'AI Chatbot Advisor',
        url: 'http://localhost:5002/api/ai/chat',
        method: 'POST',
        body: { message: 'How much protein should I eat for muscle hypertrophy?' }
      }
    ];

    let passed = 0;
    for (const test of tests) {
      try {
        const opts = {
          method: test.method,
          headers: { 'Content-Type': 'application/json' }
        };
        if (test.body) opts.body = JSON.stringify(test.body);

        const res = await fetch(test.url, opts);
        if (res.ok) {
          console.log(`✅ [PASS] ${test.name}`);
          passed++;
        }
      } catch (err) {
        console.error(`❌ [ERROR] ${test.name}:`, err.message);
      }
    }

    console.log(`\nResults: ${passed}/${tests.length} tests passed successfully!`);
    server.close();
  });
}

runTests();
