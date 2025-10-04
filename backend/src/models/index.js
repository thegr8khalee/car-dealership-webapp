import sequelize from '../lib/db.js';
import User from './user.model.js';
import Admin from './admin.model.js';
import Car from './car.model.js';
import Blog from './blog.model.js';
import Comment from './comment.model.js';
import Newsletter from './news.model.js';
import { initializeAssociations, BlogCar } from './associations.js';
import Review from './review.model.js';
import NewsletterBroadcast from './broadcast.model.js';
import SellNow from './sell.model.js';

// Initialize associations
initializeAssociations();

// Models object for easy access
const models = {
  User,
  Admin,
  Car,
  Blog,
  Comment,
  Newsletter,
  BlogCar,
  NewsletterBroadcast,
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

    // Create a sample user
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

    // Create an array of sample cars to seed the database
    const carsToCreate = [
      {
        make: 'Toyota',
        model: 'Camry',
        year: 2024,
        price: 25000,
        condition: 'new',
        bodyType: 'sedan',
        fuelType: 'gasoline',
        transmission: 'automatic',
        engineSize: 2.5,
        horsepower: 203,
        torque: 184,
        mileage: 0,
        drivetrain: 'fwd',
        msrp: 25845,
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
        door: 4,
        color: 'Midnight Black Metallic',
        cylinder: 4,
        length: 192.1,
        width: 72.4,
        trunkCapacity: 15.1,
        tireSize: 'P215/60R16',
        zeroToHundred: 7.6,
      },
      {
        make: 'Honda',
        model: 'Civic',
        year: 2023,
        price: 28000,
        condition: 'new',
        bodyType: 'sedan',
        fuelType: 'gasoline',
        transmission: 'cvt',
        engineSize: 2.0,
        horsepower: 158,
        torque: 138,
        mileage: 0,
        drivetrain: 'fwd',
        msrp: 27500,
        description:
          'A stylish and reliable compact sedan with great fuel economy.',
        imageUrls: ['https://example.com/civic.jpg'],
        sold: false,
      },
      {
        make: 'Ford',
        model: 'F-150',
        year: 2022,
        price: 45000,
        condition: 'used',
        bodyType: 'truck',
        fuelType: 'gasoline',
        transmission: 'automatic',
        engineSize: 5.0,
        horsepower: 400,
        torque: 410,
        mileage: 15000,
        drivetrain: '4wd',
        msrp: 48000,
        description:
          'The best-selling truck in America, built to handle any job.',
        imageUrls: ['https://example.com/f150.jpg'],
        sold: false,
      },
      {
        make: 'Tesla',
        model: 'Model 3',
        year: 2024,
        price: 40000,
        condition: 'new',
        bodyType: 'sedan',
        fuelType: 'electric',
        transmission: 'automatic',
        engineSize: 0,
        horsepower: 283,
        torque: 310,
        mileage: 0,
        drivetrain: 'rwd',
        msrp: 41500,
        description:
          'An all-electric sedan with incredible performance and range.',
        imageUrls: ['https://example.com/model3.jpg'],
        sold: false,
      },
      {
        make: 'Jeep',
        model: 'Wrangler',
        year: 2023,
        price: 42000,
        condition: 'new',
        bodyType: 'suv',
        fuelType: 'gasoline',
        transmission: 'manual',
        engineSize: 3.6,
        horsepower: 285,
        torque: 260,
        mileage: 0,
        drivetrain: '4wd',
        msrp: 43500,
        description: 'An iconic off-road vehicle with legendary capability.',
        imageUrls: ['https://example.com/wrangler.jpg'],
        sold: false,
      },
    ];

    await Car.bulkCreate(carsToCreate, { ignoreDuplicates: true });
    const cars = await Car.findAll({
      attributes: ['id', 'make', 'model', 'year'],
    });

    console.log('✅ Sample cars created and retrieved.');

    // Create an array of sample blogs
    const blogsToCreate = [
      {
        title: 'Toyota Camry Review: A Reliable Choice',
        tagline: 'A comprehensive review of the 2024 Toyota Camry.',
        author: {
          id: user.id,
          name: user.username,
        },
        category: 'reviews',
        status: 'published',
        featuredImage: 'https://example.com/camry-blog.jpg',
        content:
          'The Toyota Camry continues to be a top contender in the mid-size sedan segment, offering a perfect balance of comfort, fuel efficiency, and a host of standard features. With its sleek design and advanced safety technology, it remains a smart choice for families and commuters alike.',
        carIds: [
          cars.find((c) => c.make === 'Toyota' && c.model === 'Camry')?.id,
        ],
        tags: ['review', 'sedan', 'Toyota'],
        viewCount: 150,
      },
      {
        title: 'Honda Civic vs. Toyota Camry: Which is Better?',
        tagline: 'A head-to-head comparison of two of the most popular sedans.',
        author: {
          id: user.id,
          name: user.username,
        },
        category: 'comparisons',
        status: 'published',
        featuredImage: 'https://example.com/civic-camry-comp.jpg',
        content:
          'When it comes to compact sedans, the Honda Civic and Toyota Camry are often at the top of the list. We break down the key differences in performance, interior comfort, and fuel efficiency to help you decide which one is right for you.',
        carIds: [
          cars.find((c) => c.make === 'Honda' && c.model === 'Civic')?.id,
          cars.find((c) => c.make === 'Toyota' && c.model === 'Camry')?.id,
        ],
        tags: ['comparison', 'sedan', 'Honda', 'Toyota'],
        viewCount: 200,
      },
      {
        title: 'The Future of Electric Vehicles',
        tagline: 'An in-depth look at the latest EV technology and trends.',
        author: {
          id: user.id,
          name: user.username,
        },
        category: 'technology',
        status: 'published',
        featuredImage: 'https://example.com/ev-future.jpg',
        content:
          'The electric vehicle market is evolving at a rapid pace, with new models and battery technologies emerging constantly. We explore the innovations that are shaping the future of mobility, from faster charging to longer-range batteries.',
        carIds: [
          cars.find((c) => c.make === 'Tesla' && c.model === 'Model 3')?.id,
        ],
        tags: ['EV', 'technology', 'electric'],
        viewCount: 300,
      },
      {
        title: 'New Jeep Wrangler: What to Expect',
        tagline: 'A preview of the latest features on the new Jeep Wrangler.',
        author: {
          id: user.id,
          name: user.username,
        },
        category: 'news',
        status: 'published',
        featuredImage: 'https://example.com/wrangler-news.jpg',
        content:
          'Jeep enthusiasts are always eager for the latest updates on the legendary Wrangler. We take a look at the upcoming changes to the iconic off-roader, including new powertrain options and advanced infotainment systems.',
        carIds: [
          cars.find((c) => c.make === 'Jeep' && c.model === 'Wrangler')?.id,
        ],
        tags: ['news', 'SUV', 'Jeep'],
        viewCount: 180,
      },
      {
        title: 'Essential Maintenance Tips for Your Truck',
        tagline: 'Keep your Ford F-150 running smoothly with these tips.',
        author: {
          id: user.id,
          name: user.username,
        },
        category: 'maintenance',
        status: 'published',
        featuredImage: 'https://example.com/f150-maint.jpg',
        content:
          'Regular maintenance is key to the longevity of your truck. This guide provides essential tips for keeping your Ford F-150 in top condition, from oil changes to tire rotations, to ensure it’s ready for any challenge.',
        carIds: [
          cars.find((c) => c.make === 'Ford' && c.model === 'F-150')?.id,
        ],
        tags: ['maintenance', 'truck', 'Ford'],
        viewCount: 120,
      },
    ];

    await Blog.bulkCreate(blogsToCreate, { ignoreDuplicates: true });
    const blogs = await Blog.findAll({ attributes: ['id', 'title'] });

    console.log('✅ Sample blogs created and retrieved.');

    // Create an array of sample comments
    const commentsToCreate = [
      {
        content: 'I love my Camry! Great review.',
        blogId: blogs.find((b) => b.title.includes('Camry Review'))?.id,
        userId: user.id,
        username: user.username,
        status: 'approved',
      },
      {
        content: 'Great comparison! It really helped me make a decision.',
        blogId: blogs.find((b) => b.title.includes('Civic vs. Toyota Camry'))
          ?.id,
        userId: user.id,
        username: user.username,
        status: 'approved',
      },
      {
        content: 'I wish there were more EV charging stations.',
        blogId: blogs.find((b) =>
          b.title.includes('The Future of Electric Vehicles')
        )?.id,
        userId: user.id,
        username: user.username,
        status: 'approved',
      },
      {
        content: 'This is a fantastic blog post. Very informative.',
        blogId: blogs.find((b) => b.title.includes('New Jeep Wrangler'))?.id,
        userId: user.id,
        username: user.username,
        status: 'approved',
      },
      {
        content: 'Thanks for the maintenance tips! I needed this.',
        blogId: blogs.find((b) =>
          b.title.includes('Essential Maintenance Tips')
        )?.id,
        userId: user.id,
        username: user.username,
        status: 'approved',
      },
    ];

    const reviewsToCreate = [
      {
        content:
          'The interior is incredibly comfortable and the performance is smooth. A great daily driver.',
        name: 'Jane Doe',
        interiorRating: 5,
        exteriorRating: 4,
        comfortRating: 5,
        performanceRating: 4,
        carId: cars[0].id, // Replace with a real car ID
        userId: user.id, // Replace with a real user ID
        status: 'approved',
      },
      {
        content:
          'Stunning exterior design, but the comfort is a bit lacking on long trips. Performance is solid.',
        name: 'John Smith',
        interiorRating: 3,
        exteriorRating: 5,
        comfortRating: 3,
        performanceRating: 5,
        carId: cars[1].id, // Replace with a real car ID
        userId: user.id,
        status: 'approved',
      },
      {
        content:
          'This car is a beast! Performance is unmatched. Simple interior, but it gets the job done.',
        name: 'Alice Johnson',
        interiorRating: 2,
        exteriorRating: 4,
        comfortRating: 3,
        performanceRating: 5,
        carId: cars[2].id, // Replace with a real car ID
        userId: user.id,
        status: 'approved',
      },
      {
        content:
          'The comfort and safety features are top-notch. It feels like driving a cloud. The performance is good for a family car.',
        name: 'Michael Brown',
        interiorRating: 5,
        exteriorRating: 4,
        comfortRating: 5,
        performanceRating: 3,
        carId: cars[3].id, // Replace with a real car ID
        userId: user.id,
        status: 'approved',
      },
    ];

    const sellNowEntry = {
      fullName: 'Robert Smith',
      phoneNumber: '5551234567',
      emailAddress: 'robert.smith@sellcar.com',
      carMake: 'Toyota',
      carModel: 'Camry',
      yearOfManufacture: 2020,
      mileageKm: 45000,
      condition: 'Good',
      additionalNotes: 'Minor scratch on the passenger side door.',
      offerStatus: 'Pending',
    };

    await SellNow.findOrCreate({
      where: { emailAddress: sellNowEntry.emailAddress },
      defaults: sellNowEntry,
    });
    console.log('✅ Sample SellNow entry created.');

    await Review.bulkCreate(reviewsToCreate, { ignoreDuplicates: true });
    console.log('✅ Sample reviews created.');



    await Comment.bulkCreate(commentsToCreate, { ignoreDuplicates: true });
    console.log('✅ Sample comments created.');

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
export { User, Admin, Car, Blog, Comment, Newsletter, BlogCar, sequelize };

// Default export with all models
export default models;
