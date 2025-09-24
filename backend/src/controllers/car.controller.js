import Car from '../models/car.model.js';
import { Op } from 'sequelize';
import Review from '../models/review.model.js';

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

    // Find the primary car by ID
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Find up to 4 related cars that share similar attributes.
    // The query uses Op.or to find matches on any of the criteria.
    const relatedCars = await Car.findAll({
      where: {
        id: { [Op.ne]: car.id }, // Exclude the current car
        [Op.or]: [
          { make: car.make },
          { bodyType: car.bodyType },
          { year: car.year },
          { fuelType: car.fuelType },
        ],
      },
      limit: 4, // Limit the number of related cars
    });

    // Find all approved reviews for the primary car
    const reviews = await Review.findAll({
      where: {
        carId: id,
        status: 'approved', // Only show approved reviews
      },
    });

    // Initialize average ratings
    let averageRatings = {
      interior: 0,
      exterior: 0,
      comfort: 0,
      performance: 0,
      overall: 0,
    };

    // Calculate average ratings if reviews exist
    if (reviews.length > 0) {
      const totalRatings = reviews.reduce(
        (acc, review) => {
          acc.interior += review.interiorRating;
          acc.exterior += review.exteriorRating;
          acc.comfort += review.comfortRating;
          acc.performance += review.performanceRating;
          return acc;
        },
        { interior: 0, exterior: 0, comfort: 0, performance: 0 }
      );

      const count = reviews.length;
      const avgInterior = totalRatings.interior / count;
      const avgExterior = totalRatings.exterior / count;
      const avgComfort = totalRatings.comfort / count;
      const avgPerformance = totalRatings.performance / count;
      const avgOverall =
        (avgInterior + avgExterior + avgComfort + avgPerformance) / 4;

      averageRatings = {
        interior: parseFloat(avgInterior.toFixed(2)),
        exterior: parseFloat(avgExterior.toFixed(2)),
        comfort: parseFloat(avgComfort.toFixed(2)),
        performance: parseFloat(avgPerformance.toFixed(2)),
        overall: parseFloat(avgOverall.toFixed(2)),
      };
    }

    res.status(200).json({
      car,
      relatedCars,
      reviews,
      averageRatings,
    });
  } catch (error) {
    console.error('Error in getCarDetail controller:', error);
    res
      .status(500)
      .json({ message: 'Internal Server Error while retrieving car details.' });
  }
};

export const Search = async (req, res) => {
  try {
    // Get search query from multiple sources
    const query =
      req.query.carSearchQuery || req.body.carSearchQuery || req.query.query;

    // Get filter parameters
    const {
      minPrice,
      maxPrice,
      condition,
      bodyType,
      fuelType,
      make,
      year,
      transmission,
      drivetrain,
      page = 1,
      limit = 50,
    } = req.query;

    // Build the where clause
    const whereClause = {};
    const orConditions = [];

    // Text search logic (if query exists)
    if (query && query.trim() !== '') {
      const searchQuery = query.trim().toLowerCase();
      const isYear = !isNaN(parseInt(searchQuery, 10));
      const yearQuery = isYear ? parseInt(searchQuery, 10) : null;

      orConditions.push(
        { make: { [Op.iLike]: `%${searchQuery}%` } },
        { model: { [Op.iLike]: `%${searchQuery}%` } },
        { description: { [Op.iLike]: `%${searchQuery}%` } },
        { color: { [Op.iLike]: `%${searchQuery}%` } }
      );

      if (isYear) {
        orConditions.push({ year: yearQuery });
      }
    }

    // Price filters
    if (minPrice) {
      whereClause.price = {
        ...whereClause.price,
        [Op.gte]: parseInt(minPrice),
      };
    }
    if (maxPrice) {
      whereClause.price = {
        ...whereClause.price,
        [Op.lte]: parseInt(maxPrice),
      };
    }

    // Condition filter (can be comma-separated)
    if (condition) {
      const conditions = condition.split(',').map((c) => c.trim());
      whereClause.condition = {
        [Op.in]: conditions,
      };
    }

    // Body type filter (can be comma-separated)
    if (bodyType) {
      const bodyTypes = bodyType.split(',').map((bt) => bt.trim());
      whereClause.bodyType = {
        [Op.in]: bodyTypes,
      };
    }

    // Fuel type filter (can be comma-separated)
    if (fuelType) {
      const fuelTypes = fuelType.split(',').map((ft) => ft.trim());
      whereClause.fuelType = {
        [Op.in]: fuelTypes,
      };
    }

    // Make filter (can be comma-separated)
    if (make) {
      const makes = make.split(',').map((m) => m.trim().toLowerCase());
      whereClause.make = {
        [Op.in]: makes,
      };
    }

    // Year filter (can be comma-separated)
    if (year) {
      const years = year.split(',').map((y) => parseInt(y.trim()));
      whereClause.year = {
        [Op.in]: years,
      };
    }

    // Transmission filter
    if (transmission) {
      const transmissions = transmission.split(',').map((t) => t.trim());
      whereClause.transmission = {
        [Op.in]: transmissions,
      };
    }

    // Drivetrain filter
    if (drivetrain) {
      const drivetrains = drivetrain.split(',').map((d) => d.trim());
      whereClause.drivetrain = {
        [Op.in]: drivetrains,
      };
    }

    // Always exclude sold cars
    whereClause.sold = false;

    // Combine OR conditions with AND conditions
    if (orConditions.length > 0) {
      whereClause[Op.and] = [
        { [Op.or]: orConditions },
        // All other filters are already in whereClause
      ];
    }

    // Calculate pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Execute the search
    const { count, rows: cars } = await Car.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: offset,
      order: [['createdAt', 'DESC']], // Most recent first
      // You can add more sophisticated ordering here
    });

    // Prepare response
    const totalPages = Math.ceil(count / parseInt(limit));
    const hasMore = parseInt(page) < totalPages;

    const response = {
      message: count > 0 ? 'Cars found successfully' : 'No cars found',
      data: cars,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount: count,
        hasMore,
        limit: parseInt(limit),
      },
    };

    // Add search context to response
    if (query && query.trim() !== '') {
      response.searchQuery = query.trim();
    }

    // Add active filters to response
    const activeFilters = {};
    if (minPrice) activeFilters.minPrice = parseInt(minPrice);
    if (maxPrice) activeFilters.maxPrice = parseInt(maxPrice);
    if (condition) activeFilters.condition = condition.split(',');
    if (bodyType) activeFilters.bodyType = bodyType.split(',');
    if (fuelType) activeFilters.fuelType = fuelType.split(',');
    if (make) activeFilters.make = make.split(',');
    if (year) activeFilters.year = year.split(',').map((y) => parseInt(y));
    if (transmission) activeFilters.transmission = transmission.split(',');
    if (drivetrain) activeFilters.drivetrain = drivetrain.split(',');

    if (Object.keys(activeFilters).length > 0) {
      response.activeFilters = activeFilters;
    }
    
    console.log('Search response:', response);

    // Return appropriate status code
    if (count > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json(response);
    }
  } catch (error) {
    console.error('Error during car search:', error);
    res.status(500).json({
      message: 'An error occurred while searching for cars',
      error: error.message,
    });
  }
};

// Optional: Add a separate endpoint for getting filter options
export const getFilterOptions = async (req, res) => {
  try {
    const [makes, bodyTypes, fuelTypes, transmissions, drivetrains, years] =
      await Promise.all([
        Car.findAll({
          attributes: ['make'],
          group: ['make'],
          raw: true,
        }),
        Car.findAll({
          attributes: ['bodyType'],
          group: ['bodyType'],
          where: { bodyType: { [Op.not]: null } },
          raw: true,
        }),
        Car.findAll({
          attributes: ['fuelType'],
          group: ['fuelType'],
          where: { fuelType: { [Op.not]: null } },
          raw: true,
        }),
        Car.findAll({
          attributes: ['transmission'],
          group: ['transmission'],
          where: { transmission: { [Op.not]: null } },
          raw: true,
        }),
        Car.findAll({
          attributes: ['drivetrain'],
          group: ['drivetrain'],
          where: { drivetrain: { [Op.not]: null } },
          raw: true,
        }),
        Car.findAll({
          attributes: ['year'],
          group: ['year'],
          order: [['year', 'DESC']],
          raw: true,
        }),
      ]);

    // Get price range
    const priceRange = await Car.findAll({
      attributes: [
        [Car.sequelize.fn('MIN', Car.sequelize.col('price')), 'minPrice'],
        [Car.sequelize.fn('MAX', Car.sequelize.col('price')), 'maxPrice'],
      ],
      where: {
        price: { [Op.not]: null },
        sold: false,
      },
      raw: true,
    });

    res.status(200).json({
      message: 'Filter options retrieved successfully',
      data: {
        makes: makes.map((m) => m.make).sort(),
        bodyTypes: bodyTypes.map((bt) => bt.bodyType).sort(),
        fuelTypes: fuelTypes.map((ft) => ft.fuelType).sort(),
        transmissions: transmissions.map((t) => t.transmission).sort(),
        drivetrains: drivetrains.map((d) => d.drivetrain).sort(),
        years: years.map((y) => y.year),
        priceRange: priceRange[0] || { minPrice: 0, maxPrice: 0 },
      },
    });
  } catch (error) {
    console.error('Error getting filter options:', error);
    res.status(500).json({
      message: 'An error occurred while getting filter options',
      error: error.message,
    });
  }
};
