import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useBlogStore = create((set) => ({
  // State
  blogs: [],
  relatedBlogs: [],
  currentBlog: null,
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
  },

  fetchBlogs: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/blogs/get-all`, { params });
      const { data, currentPage, totalPages, totalBlogs } = response.data;
      set({
        blogs: data,
        pagination: { currentPage, totalPages, totalBlogs },
      });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch blogs.';
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchBlogById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/blogs/get/${id}`);
      set({ currentBlog: response.data.data });
    } catch (error) {
      console.error('Error fetching blog:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch blog.';
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  searchBlogs: async (query) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/blogs/search?query=${query}`);
      set({ blogs: response.data.data });
    } catch (error) {
      console.error('Error searching blogs:', error);
      const errorMessage = error.response?.data?.message || 'No blogs found.';
      set({ blogs: [] }); // Clear blogs on no results
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  getRelatedBlogsById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/blogs/getRelated/${id}`);
      set({ relatedBlogs: response.data.data.relatedBlogs });
    } catch (error) {
      console.error('Error fetching related blogs:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch related blogs.';
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  clearCurrentBlog: () => {
    set({ currentBlog: null });
  },
}));
