// models/index.js
import sequelize from '../lib/db.js';

// Import all models
import User from './user.model.js';
import Admin from './admin.model.js';
import Car from './car.model.js';
import Blog from './blog.model.js';
import Comment from './comment.model.js';
import Like from './like.model.js';
import Newsletter from './news.model.js';

// Import associations
import { initializeAssociations, BlogCar } from './associations.js';

// Initialize associations
initializeAssociations();

// Models object for easy access
const models = {
  User,
  Admin,
  Car,
  Blog,
  Comment,
  Like,
  Newsletter,
  BlogCar,
  sequelize,
};

// Database synchronization function
export const syncDatabase = async (options = {}) => {
  try {
    const { force = false, alter = false } = options;

    if (force) {
      console.log('⚠️  WARNING: This will drop all existing tables!');
    }

    await sequelize.sync({ force, alter });

    if (force || alter) {
      console.log('✅ Database synchronized successfully');
    } else {
      console.log('✅ Database connection verified');
    }

    return true;
  } catch (error) {
    console.error('❌ Database synchronization failed:', error);
    throw error;
  }
};

// Database connection test
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

// Graceful shutdown
export const closeDatabase = async () => {
  try {
    await sequelize.close();
    console.log('✅ Database connection closed successfully');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    throw error;
  }
};

// Seed data functions
export const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create default admin if not exists
    const [admin, adminCreated] = await Admin.findOrCreate({
      where: { email: 'admin@carblog.com' },
      defaults: {
        username: 'admin',
        email: 'admin@carblog.com',
        passwordHash: '$2b$10$placeholder', // Replace with actual hashed password
        position: 'Site Administrator',
        role: 'super_admin',
        bio: 'Default administrator account for the car blog system.',
      },
    });

    if (adminCreated) {
      console.log('✅ Default admin created');
    }

    // Create sample car if not exists
    const [car, carCreated] = await Car.findOrCreate({
      where: { make: 'Toyota', model: 'Camry', year: 2024 },
      defaults: {
        make: 'Toyota',
        model: 'Camry',
        year: 2024,
        price: 25000.0,
        condition: 'new',
        bodyType: 'sedan',
        fuelType: 'gasoline',
        transmission: 'automatic',
        engineSize: 2.5,
        horsepower: 203,
        torque: 184,
        mileage: 15000,
        drivetrain: 'fwd',
        msrp: 25845.0,
        description:
          'The 2024 Toyota Camry offers a perfect blend of reliability, efficiency, and comfort.',
        imageUrls: [
          'https://example.com/camry-front.jpg',
          'https://example.com/camry-side.jpg',
        ],
        interior: [
          'Leather seats',
          'Dual-zone climate control',
          'Infotainment system',
        ],
        exterior: ['LED headlights', 'Alloy wheels', 'Sunroof'],
        comfort: ['Heated seats', 'Power-adjustable seats', 'Keyless entry'],
        safety: [
          'Toyota Safety Sense 2.0',
          'Blind spot monitoring',
          'Rear cross traffic alert',
        ],
        sold: false,
        // New fields added here
        door: 4,
        color: 'Midnight Black Metallic',
        cylinder: 4,
        length: 192.1, // in inches
        width: 72.4, // in inches
        trunkCapacity: 15.1, // in cubic feet
        tireSize: 'P215/60R16',
        zeroToHundred: 7.6, // in seconds
      },
    });

    if (carCreated) {
      console.log('✅ Sample car created');
    }

    // Create sample user if not exists
    const [user, userCreated] = await User.findOrCreate({
      where: { email: 'user@example.com' },
      defaults: {
        username: 'testuser',
        email: 'user@example.com',
        passwordHash: '$2b$10$placeholder', // Replace with actual hashed password
        phoneNumber: '+1234567890',
      },
    });

    if (userCreated) {
      console.log('✅ Sample user created');
    }

    console.log('🎉 Database seeding completed successfully');
    return true;
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
};

// Clean up function for development
export const resetDatabase = async () => {
  try {
    console.log('🧹 Resetting database...');
    await sequelize.drop();
    await syncDatabase({ force: true });
    await seedData();
    console.log('✅ Database reset completed');
  } catch (error) {
    console.error('❌ Database reset failed:', error);
    throw error;
  }
};

// Export models individually for convenience
export {
  User,
  Admin,
  Car,
  Blog,
  Comment,
  Like,
  Newsletter,
  BlogCar,
  sequelize,
};

// Default export with all models
export default models;
