import Car from '../models/car.model.js';
import { Op } from 'sequelize';

export const getAllCars = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = (page - 1) * limit;

    // Dynamically build the where clause based on query parameters
    const where = {};
    if (req.query.make) where.make = req.query.make;
    if (req.query.year) where.year = parseInt(req.query.year, 10);
    if (req.query.bodyType) where.bodyType = req.query.bodyType;
    if (req.query.fuelType) where.fuelType = req.query.fuelType;
    if (req.query.transmission) where.transmission = req.query.transmission;
    if (req.query.engineSize)
      where.engineSize = parseFloat(req.query.engineSize);
    if (req.query.drivetrain) where.drivetrain = req.query.drivetrain;

    // Now filter directly on the `condition` field
    if (req.query.condition) where.condition = req.query.condition;

    // Handle price range filter, now targeting the `price` field
    if (req.query.minPrice || req.query.maxPrice) {
      where.price = {};
      if (req.query.minPrice) {
        where.price[Op.gte] = parseFloat(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        where.price[Op.lte] = parseFloat(req.query.maxPrice);
      }
    }

    // Use findAndCountAll to get both the data and the total count for pagination
    const { count, rows: cars } = await Car.findAndCountAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [['make', 'ASC']], // Default ordering
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      cars: cars,
    });
  } catch (error) {
    console.error('Error in getAllCars controller:', error);
    res
      .status(500)
      .json({ message: 'Internal Server Error while retrieving cars.' });
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    // Use findByPk (find by primary key) for an efficient lookup
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }

    res.status(200).json(car);
  } catch (error) {
    console.error('Error in getCarById controller:', error);
    res
      .status(500)
      .json({ message: 'Internal Server Error while retrieving the car.' });
  }
};

export const Search = async (req, res) => {
  try {
    const query = req.query.carSearchQuery || req.body.carSearchQuery;

    // console.log('Search query received:', query);
    if (!query || query.trim() === '') {
      return res.status(400).json({
        message: 'Search query cannot be empty.',
      });
    }

    const searchQuery = query.trim().toLowerCase();
    const isYear = !isNaN(parseInt(searchQuery, 10));
    const yearQuery = isYear ? parseInt(searchQuery, 10) : null;

    const cars = await Car.findAll({
      where: {
        [Op.or]: [
          { make: { [Op.like]: `%${searchQuery}%` } },
          { model: { [Op.like]: `%${searchQuery}%` } },
          ...(isYear ? [{ year: yearQuery }] : []),
        ],
      },
    });

    if (cars.length > 0) {
      res.status(200).json({ message: 'Cars found successfully', data: cars });
    } else {
      res.status(404).json({
        message: `No cars found matching the query: "${query}"`,
      });
    }
  } catch (error) {
    console.error('Error during car search:', error);
    res.status(500).json({
      message: 'An error occurred while searching for cars',
      error: error.message,
    });
  }
};
