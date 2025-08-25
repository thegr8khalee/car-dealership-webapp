import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import sequelize from './lib/db.js';

const app = express();
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

const startServer = async () => {
  try {
    sequelize
      .authenticate()
      .then(() => console.log('✅ Database connected...'))
      .catch((err) => console.error('❌ Error: ' + err));

    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synchronized!');

    app.listen(PORT, () => {
      console.log('Server running on port: ', PORT);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
