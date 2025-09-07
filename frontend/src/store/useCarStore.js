import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useCarStore = create((set) => ({
  // State
  cars: [],
  car: null,
  isLoading: false,
  error: null,
  searchResults: [],
  isSearching: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },

  // Actions
  /**
   * Fetches a paginated list of all cars with optional filters.
   * @param {Object} params - An object containing query parameters for filtering and pagination.
   * e.g., { page: 2, limit: 10, make: 'Toyota', year: 2023 }
   */
  getCars: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('cars/get-all', { params });

      // Update state with the cars and pagination data from the response
      set({
        cars: res.data.cars,
        pagination: {
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages,
          totalItems: res.data.totalItems,
        },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to retrieve cars.';
      toast.error(errorMessage);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Searches for cars based on a single query string.
   * @param {string} query - The search term.
   */
  search: async (query) => {
    set({ isSearching: true, error: null });
    try {
      const res = await axiosInstance.get('cars/search', {
        params: { carSearchQuery: query }, // Changed parameter name to 'carSearchQuery'
      });
      set({ searchResults: res.data.data });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'No cars found.';
      toast.error(errorMessage);
      set({ error: errorMessage, searchResults: [] });
    } finally {
      set({ isSearching: false });
    }
  },

  /**
   * Fetches a single car by its ID.
   * @param {string} id - The ID of the car to fetch.
   */
  getCarById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`cars/get/${id}`);
      set({ car: res.data }); // Updated to match API response format
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to retrieve car.';
      toast.error(errorMessage);
      set({ error: errorMessage });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));
