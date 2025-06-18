import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/signup`, 
        { name, email, password }, 
        { headers: { "Content-Type": "application/json" } } // ✅ Add this
      );

      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      console.error("Signup error:", error.response?.data);
      set({ 
        error: error.response?.data?.message || "Signup failed", 
        isLoading: false 
      });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/login`, 
        { email, password }, 
        { headers: { "Content-Type": "application/json" } } // ✅ Add this
      );

      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      console.error("Login error:", error.response?.data);
      set({ 
        error: error.response?.data?.message || "Login failed", 
        isLoading: false 
      });
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: "Logout failed", isLoading: false });
    }
  },
}));
    