import express from 'express';
import { protectAdminRoute } from '../middleware/protectAdminRoute.js';
import { addBlog, addCar, deleteCar, updateBlog, updateCar } from '../controllers/admin.operations.controller.js';

const router = express.Router();

router.post('/add-car', protectAdminRoute, addCar);
router.put('/update-car/:id', protectAdminRoute, updateCar);
router.delete('/delete-car/:id', protectAdminRoute, deleteCar);

router.post('/add-blog', protectAdminRoute, addBlog);
router.put('/update-blog/:id', protectAdminRoute, updateBlog);

export default router;
