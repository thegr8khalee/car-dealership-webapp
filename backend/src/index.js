// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './models/index.js';
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173', // The exact origin of your frontend
  credentials: true, // This allows cookies and auth headers
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
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

app.use('/api/admin/auth', adminRouts);
app.use('/api/user/auth', authRoutes);
app.use('/api/admin/ops', adminOpRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/interactions', interactRoutes);


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
