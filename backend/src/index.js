// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './models/index.js';
import cookieParser from 'cookie-parser'
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL || 'https://your-domain.com'
    : 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Car Dealership API is running!',
    status: 'success',
    timestamp: new Date().toISOString(),
  });
});

// Health check route
app.get('/health', async (req, res) => {
  try {
    await testConnection();
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

import adminRouts from './routes/admin.auth.routes.js';
import authRoutes from './routes/user.auth.routes.js';
import adminOpRoutes from './routes/admin.operations.routes.js';
import carRoutes from './routes/car.routes.js';
import blogRoutes from './routes/blog.routes.js';
import interactRoutes from './routes/interactions.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import sellRoutes from './routes/sell.routes.js';
import sellSubmissionRoutes from './routes/sellSubmission.routes.js';
import adminStaffRoutes from './routes/adminStaff.routes.js';
import broadcastRoutes from './routes/broadcast.routes.js';
import { globalErrorHandler, notFound } from './middleware/error.middleware.js';

app.use('/api/admin/auth', adminRouts);
app.use('/api/user/auth', authRoutes);
app.use('/api/admin/ops', adminOpRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/interactions', interactRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/sell', sellRoutes);
app.use('/api/admin/dashboard/sell-submissions', sellSubmissionRoutes);
app.use('/api/admin/staff', adminStaffRoutes);
app.use('/api/admin/broadcast', broadcastRoutes);
app.use(notFound);
app.use(globalErrorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📱 Health check: http://localhost:${PORT}/health`);
      console.log(`🌐 API endpoint: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
