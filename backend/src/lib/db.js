// backend/src/db.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Load database config from environment variables
const DB_NAME = process.env.DB_NAME || 'car_dealership_db';
const DB_USER = process.env.DB_USER || 'caruser';
const DB_PASSWORD = process.env.DB_PASSWORD || 'carpassword';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_DIALECT = 'mysql';

// Create a Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false, // Set to true for SQL query debugging
  define: {
    timestamps: false, // Disable automatic createdAt/updatedAt columns
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
