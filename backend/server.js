require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, getDbStatus } = require('./config/db');

// Route Handlers
const authRoutes = require('./routes/authRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const dietRoutes = require('./routes/dietRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const affiliateRoutes = require('./routes/affiliateRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/affiliate', affiliateRoutes);
app.use('/api/ai', aiRoutes);

// System Health & Diagnostics
app.get('/api/health', (req, res) => {
  const dbStatus = getDbStatus();
  res.json({
    status: 'online',
    appName: 'HealthPulse & Fit API',
    version: '1.0.0',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to HealthPulse & Fit API Server',
    docs: '/api/health',
    endpoints: [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/demo',
      '/api/exercises',
      '/api/diets',
      '/api/timetable',
      '/api/affiliate',
      '/api/ai/chat'
    ]
  });
});

// Start Server & Connect Database
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`  HealthPulse & Fit Server Active on port ${PORT}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`===============================================`);
  });
};

startServer();
