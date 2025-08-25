import express from 'express';
import { protectAdminRoute } from '../middleware/protectAdminRoute.js';
import { addCar, deleteCar, updateCar } from '../controllers/car.controller.js';

const router = express.Router();

router.post('/add-car', protectAdminRoute, addCar);
router.put('/update-car/:id', protectAdminRoute, updateCar);
router.delete('/delete-car/:id', protectAdminRoute, deleteCar);

export default router;
