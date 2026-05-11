import { create } from "zustand";
import axiosInstance from "../services/axios";
import toast from "react-hot-toast";

const useDailyStore = create((set) => ({
  meals: [],
  loading: false,

  totalMeals: 0,
  pages: 1,

  dailyLog: null,
  weeklyStats: [],
  recommendedMeals: [],
  waterData: null,
  sentNotifications: [],
  activities: [],
  totalBurned: 0,

  mealSchedule: null,
  notifications: [],

  // ================= Notifications =================
  setNotifications: (newNotif) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        ...newNotif,
      ],

      sentNotifications: [
        ...state.sentNotifications,
        ...newNotif,
      ],
    })),

  // ================= Meals =================
  getMeals: async (
    page = 1,
    limit = 6
  ) => {
    try {
      set({ loading: true });

      const res = await axiosInstance.get(
        `/meal?page=${page}&limit=${limit}`
      );

      set({
        meals: res.data.meals,
        totalMeals: res.data.total,
        pages: res.data.pages,
        loading: false,
      });

      return res.data;
    } catch (error) {
      set({ loading: false });

      toast.error(
        error.response?.data?.message ||
          "Failed"
      );
    }
  },

  // ================= Add Meal =================
  addMealToDay: async (
    mealId,
    quantity
  ) => {
    try {
      const res = await axiosInstance.post(
        "/dailyMeal/add",
        {
          mealId,
          quantity,
        }
      );

      toast.success(
        "Meal added successfully"
      );

      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error"
      );
    }
  },
}));

export default useDailyStore;