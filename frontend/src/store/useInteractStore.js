import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useInteractStore = create(() => ({
  viewBlog: async (id) => {
    try {
      await axiosInstance.put(`/interactions/viewBlog/${id}`);
    } catch (error) {
      console.error('Error viewing blog:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to view blog.';
      toast.error(errorMessage);
    }
  },

  commentBlog: async (id, content) => {
    try {
      const response = await axiosInstance.put(
        `/interactions/commentBlog/${id}`,
        { content }
      );
      if (response.data && response.data.message) {
        toast.success('Comment submitted for review');
      }
    } catch (error) {
      console.error('Error commenting on blog:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to comment on blog.';
      toast.error(errorMessage);
    }
  },

  updateComment: async (commentId, content) => {
    try {
      const res = await axiosInstance.put(
        `/interactions/updateComment/${commentId}`,
        { content }
      );
      if (res.data && res.data.message) {
        toast.success('Comment updated successfully');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to update comment.';
      toast.error(errorMessage);
    }
  },

  reviewCar: async (id, content) => {
    try {
      console.log('Reviewing car with ID:', id, 'and content:', content);
      const res = await axiosInstance.put(`/interactions/reviewCar/${id}`, { content });
      return res; // Return the response for further handling
    } catch (error) {
      console.error('Error reviewing car:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to review car.';
      toast.error(errorMessage);
    }
  },

  updateReview: async (reviewId, content) => {
    try {
      const res = await axiosInstance.put(
        `/interactions/updateReview/${reviewId}`,
        { content }
      );
      if (res.data && res.data.message) {
        toast.success('Review updated successfully');
      }
    } catch (error) {
      console.error('Error updating review:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to update review.';
      toast.error(errorMessage);
    }
  },
}));
