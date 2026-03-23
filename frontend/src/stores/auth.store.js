import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  loading: false,
  authUser: null,
  loader: true,

  Login: async (formData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Successfully Login");
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error logging in");
      console.log("error in login", error.message);
    }
  },



  signup: async (formData) => {
    set({ loading: true });
    try {
      // Map 'name' from the frontend to 'username' expected by the backend
      const { name, email, password } = formData;
      const res = await axiosInstance.post("/auth/signup", { username: name, email, password });
      set({ authUser: res.data.user });
      toast.success("Successfully Signed up");
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error signing up");
      console.log("error in signup", error.message);
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null, loader: false });
      // Silently fail — no toast for unauthenticated visitors
      console.log("Not authenticated");
    } finally {
      set({ loader: false });
    }
  },




  LogOut: () => {
    axiosInstance.post("/auth/logout");
    set({ authUser: null });
    toast.success("Successfully Logged out!");
  },
}));
