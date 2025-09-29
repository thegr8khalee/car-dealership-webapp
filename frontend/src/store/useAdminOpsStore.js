import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAdminOpsStore = create((set) => ({
  isLoading: false,
  error: null,

  addCar: async (data) => {
    console.log('Adding car with data:', data); // Debug log
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/admin/ops/add-car', data);
      toast.success('Car added successfully');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      set({ error: error.response?.data?.message || error.message });
      throw error; // Re-throw the error to handle it in the component if needed
    } finally {
      set({ isLoading: false });
    }
  },

  updateCar: async (id, data) => {
    console.log('Updating car with ID:', id, 'and data:', data); // Debug log
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/admin/ops/update-car/${id}`, data);
      toast.success('Car updated successfully');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      set({ error: error.response?.data?.message || error.message });
      throw error; // Re-throw the error to handle it in the component if needed
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCar: async (id) => {
    console.log('Deleting car with ID:', id); // Debug log
    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(`/admin/ops/delete-car/${id}`);
      toast.success('Car deleted successfully');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      set({ error: error.response?.data?.message || error.message });
      throw error; // Re-throw the error to handle it in the component if needed
    } finally {
      set({ isLoading: false });
    }
  },

  addBlog: async (data) => {
    console.log('Adding blog with data:', data); // Debug log
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/admin/ops/add-blog', data);
      toast.success('Blog added successfully');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      set({ error: error.response?.data?.message || error.message });
      throw error; // Re-throw the error to handle it in the component if needed
    } finally {
      set({ isLoading: false });
    }
  },

  updateBlog: async (id, data) => {
    console.log('Updating blog with ID:', id, 'and data:', data); // Debug log
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/admin/ops/update-blog/${id}`, data);
      toast.success('Blog updated successfully');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      set({ error: error.response?.data?.message || error.message });
      throw error; // Re-throw the error to handle it in the component if needed
    } finally {
      set({ isLoading: false });
    }
  },

  deleteBlog: async (id) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.delete(`admin/ops/delete-blog/${id}`);

      if (res.data.success) {
        toast.success('Blog deleted successfully');
        return res.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete blog';
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
