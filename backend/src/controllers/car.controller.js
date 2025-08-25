import Car from '../models/car.model.js';
import { Op } from 'sequelize';

export const addCar = async (req, res) => {
  try {
    // Extract car data from the request body
    const carData = req.body;

    // Basic validation for required fields
    if (
      !carData.modelText ||
      !carData.price ||
      !carData.mileage ||
      !carData.fuelType ||
      !carData.transmission ||
      !carData.year
    ) {
      return res
        .status(400)
        .json({ message: 'Missing required car information.' });
    }

    // Use Sequelize's create method to add a new car
    const newCar = await Car.create(carData);

    // Respond with the newly created car object
    res.status(201).json(newCar);
  } catch (error) {
    console.error('Error in addCar controller:', error);
    res
      .status(500)
      .json({ message: 'Internal Server Error while adding the car.' });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const carData = req.body;

    // Find the car by its primary key
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    }

    // Use Sequelize's update method on the instance to apply changes
    await car.update(carData);

    // Respond with the updated car object
    res.status(200).json(car);
  } catch (error) {
    console.error('Error in updateCar controller:', error);
    res
      .status(500)
      .json({ message: 'Internal Server Error while updating the car.' });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    // Use Sequelize's destroy method to delete the record.
    // It returns the number of destroyed rows.
    const deletedRowCount = await Car.destroy({
      where: { id },
    });

    if (deletedRowCount === 0) {
      // If 0 rows were deleted, the car was not found
      return res
        .status(404)
        .json({ message: 'Car not found or already deleted.' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'Car deleted successfully.' });
  } catch (error) {
    console.error('Error in deleteCar controller:', error);
    res
      .status(500)
      .json({ message: 'Internal Server Error while deleting the car.' });
  }
};
