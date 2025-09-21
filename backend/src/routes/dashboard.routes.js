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
} from '../controllers/dashboard.controller.js';
import { protectAdminRoute, requireRole } from '../middleware/protectAdminRoute.js'; 

const router = express.Router();

// Dashboard overview - all roles can access
router.get(
  '/stats',
  protectAdminRoute,
  requireRole(['super_admin', 'editor', 'moderator']),
  getDashboardStats
);

// Detailed stats endpoints - role-based access
router.get('/cars/stats', requireRole(['super_admin', 'editor']), getCarStats);
router.get(
  '/blogs/stats',
  requireRole(['super_admin', 'editor']),
  getBlogStats
);
router.get('/users/stats', requireRole(['super_admin']), getUserStats);
router.get(
  '/moderation/stats',
  requireRole(['super_admin', 'editor', 'moderator']),
  getContentModerationStats
);
router.get('/revenue/stats', requireRole(['super_admin']), getRevenueStats);
router.get(
  '/activity/recent',
  requireRole(['super_admin', 'editor', 'moderator']),
  getRecentActivity
);
router.get(
  '/performance/top',
  requireRole(['super_admin', 'editor']),
  getTopPerformers
);

export default router;
