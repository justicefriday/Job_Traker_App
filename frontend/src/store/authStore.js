import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://job-traker-app.onrender.com/api/jobs';

// Get user from localStorage if it exists
const getUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const useAuthStore = create((set) => ({
  user: getUserFromStorage(),
  loading: false,
  error: null,

  // Register user
  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(data));
      set({ user: data, loading: false });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, loading: false });
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(data));
      set({ user: data, loading: false });
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, loading: false });
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, error: null });
  },

  // Clear error
  clearError: () => set({ error: null }),
}));