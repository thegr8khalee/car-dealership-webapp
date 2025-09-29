import express from 'express';
import {
  getDashboardStats,
  getCarStats,
  getBlogStats,
  getUserStats,
  getContentModerationStats,
  getRevenueStats,
  getRecentActivity,
  getTopPerformers,
  getListings,
} from '../controllers/dashboard.controller.js';
import { protectAdminRoute, requireRole } from '../middleware/protectAdminRoute.js'; 
import { getAllBlogs } from '../controllers/blog.controller.js';

const router = express.Router();

// Dashboard overview - all roles can access
router.get(
  '/stats',
  protectAdminRoute,
  requireRole(['super_admin', 'editor', 'moderator']),
  getDashboardStats
);

// Detailed stats endpoints - role-based access
router.get('/cars/stats', protectAdminRoute, requireRole(['super_admin', 'editor']), getCarStats);
router.get(
  '/blogs/stats',
  protectAdminRoute,
  requireRole(['super_admin', 'editor']),
  getBlogStats
);
router.get('/users/stats', protectAdminRoute, requireRole(['super_admin']), getUserStats);
router.get(
  '/moderation/stats',
  protectAdminRoute,
  requireRole(['super_admin', 'editor', 'moderator']),
  getContentModerationStats
);
router.get('/revenue/stats', protectAdminRoute, requireRole(['super_admin']), getRevenueStats);
router.get(
  '/activity/recent',
  protectAdminRoute,
  requireRole(['super_admin', 'editor', 'moderator']),
  getRecentActivity
);
router.get(
  '/performance/top',
  protectAdminRoute,
  requireRole(['super_admin', 'editor']),
  getTopPerformers
);
router.get(
  '/getListings',
  protectAdminRoute,
  requireRole(['super_admin', 'editor', 'moderator']),
  getListings
);
router.get('/getBlogs', protectAdminRoute, requireRole(['super_admin', 'editor']), getAllBlogs);
router.get(
  '/getListings',
  protectAdminRoute,
  requireRole(['super_admin', 'editor', 'moderator']),
  getListings
);

export default router;
