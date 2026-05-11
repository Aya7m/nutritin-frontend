import { create } from "zustand";
import axiosInstance from "../services/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  checkingAuth: true,

  // ================= INIT AUTH (HYDRATION) =================
  initAuth: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ user: null, token: null });
      return;
    }

    try {
      const res = await axiosInstance.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        user: res.data,
        token,
      });
    } catch (err) {
      localStorage.removeItem("token");

      set({
        user: null,
        token: null,
      });
    }
  },


  register: async (formData) => {
  try {
    set({ loading: true });

    const res = await axiosInstance.post(
      "/user/register",
      formData
    );

    toast.success(res.data.message || "Account created successfully");

    set({ loading: false });

    return true;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration failed"
    );

    set({ loading: false });

    return false;
  }
},
  // ================= LOGIN =================
  login: async (formData) => {
    try {
      set({ loading: true });

      const res = await axiosInstance.post("/user/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
      });

      toast.success(res.data.message);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");

      set({ loading: false });
      return false;
    }
  },

  // ================= LOGOUT =================
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
    });

    toast.success("Logged out");
  },
}));

export default useAuthStore;
