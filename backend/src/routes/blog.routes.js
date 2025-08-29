import express from 'express';
import { getAllBlogs, getBlogById, searchBlogs } from '../controllers/blog.controller.js';

const router = express.Router();

router.get('/get-all', getAllBlogs);
router.get('/get/:id', getBlogById);
router.get('/search', searchBlogs);

export default router;
