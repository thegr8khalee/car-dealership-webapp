import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useDashboardStore = create((set, get) => ({
  // State
  dashboardStats: null,
  carStats: null,
  blogStats: null,
  userStats: null,
  moderationStats: null,
  revenueStats: null,
  recentActivity: null,
  topPerformers: null,
  isLoading: false,
  error: null,
  lastUpdated: null,

  // Actions

  /**
   * Get main dashboard overview stats
   */
  getDashboardStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('admin/dashboard/stats');
      
      if (res.data.success) {
        set({ 
          dashboardStats: res.data.data,
          lastUpdated: new Date().toISOString()
        });
        return res.data.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch dashboard stats';
      toast.error(errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Get detailed car statistics
   */
  getCarStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('admin/dashboard/cars/stats');
      
      if (res.data.success) {
        set({ carStats: res.data.data });
        return res.data.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch car statistics';
      toast.error(errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Get blog performance statistics
   */
  getBlogStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('admin/dashboard/blogs/stats');
      
      if (res.data.success) {
        set({ blogStats: res.data.data });
        return res.data.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch blog statistics';
      toast.error(errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Get user statistics (Super Admin only)
   */
  getUserStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('admin/dashboard/users/stats');
      
      if (res.data.success) {
        set({ userStats: res.data.data });
        return res.data.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch user statistics';
      toast.error(errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Get content moderation statistics
   */
  getModerationStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('admin/dashboard/moderation/stats');
      
      if (res.data.success) {
        set({ moderationStats: res.data.data });
        return res.data.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch moderation statistics';
      toast.error(errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Get revenue statistics (Super Admin only)
   */
  getRevenueStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('admin/dashboard/revenue/stats');
      
      if (res.data.success) {
        set({ revenueStats: res.data.data });
        return res.data.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch revenue statistics';
      toast.error(errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Get recent activity feed
   * @param {Object} params - Query parameters (limit, etc.)
   */
  getRecentActivity: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('admin/dashboard/activity/recent', { params });
      
      if (res.data.success) {
        set({ recentActivity: res.data.data });
        return res.data.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch recent activity';
      toast.error(errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Get top performers (cars, blogs, etc.)
   */
  getTopPerformers: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('admin/dashboard/performance/top');
      
      if (res.data.success) {
        set({ topPerformers: res.data.data });
        return res.data.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch top performers';
      toast.error(errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Refresh all dashboard data
   * @param {string} adminRole - Current admin role to determine which stats to fetch
   */
  refreshAllStats: async (adminRole = 'editor') => {
    set({ isLoading: true, error: null });
    
    try {
      // Always fetch basic stats
      const promises = [
        get().getDashboardStats(),
        get().getModerationStats(),
        get().getRecentActivity(),
      ];

      // Fetch role-specific stats
      if (adminRole === 'super_admin' || adminRole === 'editor') {
        promises.push(
          get().getCarStats(),
          get().getBlogStats(),
          get().getTopPerformers()
        );
      }

      // Super admin only stats
      if (adminRole === 'super_admin') {
        promises.push(
          get().getUserStats(),
          get().getRevenueStats()
        );
      }

      await Promise.allSettled(promises);
      
      set({ lastUpdated: new Date().toISOString() });
      toast.success('Dashboard data refreshed');
      
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      const errorMessage = 'Failed to refresh dashboard data';
      toast.error(errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Get stats summary for quick overview
   */
  getStatsSummary: () => {
    const { dashboardStats } = get();
    
    if (!dashboardStats) return null;

    return {
      totalCars: dashboardStats.cars?.total || 0,
      availableCars: dashboardStats.cars?.available || 0,
      soldCars: dashboardStats.cars?.sold || 0,
      totalBlogs: dashboardStats.blogs?.total || 0,
      publishedBlogs: dashboardStats.blogs?.published || 0,
      totalUsers: dashboardStats.users?.total || 0,
      pendingComments: dashboardStats.engagement?.pendingComments || 0,
      pendingReviews: dashboardStats.engagement?.pendingReviews || 0,
      newsletterSubscribers: dashboardStats.engagement?.newsletterSubscribers || 0,
      totalRevenue: dashboardStats.revenue?.totalRevenue || 'N/A',
      monthlyRevenue: dashboardStats.revenue?.monthlyRevenue || 'N/A',
    };
  },

  /**
   * Check if stats need refresh (older than 5 minutes)
   */
  needsRefresh: () => {
    const { lastUpdated } = get();
    if (!lastUpdated) return true;
    
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return new Date(lastUpdated) < fiveMinutesAgo;
  },

  /**
   * Clear all dashboard data
   */
  clearStats: () => {
    set({
      dashboardStats: null,
      carStats: null,
      blogStats: null,
      userStats: null,
      moderationStats: null,
      revenueStats: null,
      recentActivity: null,
      topPerformers: null,
      isLoading: false,
      error: null,
      lastUpdated: null,
    });
  },

  /**
   * Set loading state manually
   * @param {boolean} loading - Loading state
   */
  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  /**
   * Clear error state
   */
  clearError: () => {
    set({ error: null });
  },
}));