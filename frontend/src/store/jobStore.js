import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs';

// This will bringin token fron user in the local storage
const getToken = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).token : null;
};

// Axios config with token
const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const useJobStore = create((set) => ({
  jobs: [],
  loading: false,
  error: null,

  // Get all jobs
  getJobs: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(API_URL, config());
      set({ jobs: data, loading: false });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, loading: false });
    }
  },

  // Create job
  createJob: async (jobData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(API_URL, jobData, config());
      set((state) => ({
        jobs: [data, ...state.jobs],
        loading: false,
      }));
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, loading: false });
      throw error;
    }
  },

  // Update job
  updateJob: async (id, jobData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, jobData, config());
      set((state) => ({
        jobs: state.jobs.map((job) => (job._id === id ? data : job)),
        loading: false,
      }));
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, loading: false });
      throw error;
    }
  },

  // Delete job
  deleteJob: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`, config());
      set((state) => ({
        jobs: state.jobs.filter((job) => job._id !== id),
        loading: false,
      }));
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, loading: false });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));