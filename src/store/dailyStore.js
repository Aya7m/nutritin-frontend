import { create } from "zustand";
import axiosInstance from "../services/axios";
import toast from "react-hot-toast";

const useDailyStore = create((set) => ({
  meals: [],
  loading: false,
  dailyLog: null,
  weeklyStats: [],
  recommendedMeals: [],
  waterData: null,
  sentNotifications: [],
  activities: [],
  totalBurned: 0,
  totalMeals: 0,
  pages: 1,

  // 🔔 Schedule + Notifications
  mealSchedule: null,
  notifications: [],

  // ================= Notifications =================
  //  setNotifications: (notifications) =>
  //   set((state) => ({
  //     notifications:
  //       typeof notifications === "function"
  //         ? notifications(state.notifications)
  //         : notifications,
  //   })),
  setNotifications: (newNotif) =>
    set((state) => ({
      notifications: [...state.notifications, ...newNotif],

      sentNotifications: [...state.sentNotifications, ...newNotif],
    })),

  // ================= Get Meal Schedule =================
  getMealSchedule: async () => {
    try {
      const res = await axiosInstance.get("/schedule");

      set({
        mealSchedule: res.data.schedule,
      });
    } catch (error) {
      console.log(error);
    }
  },

  // ================= Set Meal Schedule =================
  setMealSchedule: async (data) => {
    try {
      const res = await axiosInstance.post("/schedule", data);

      set({
        mealSchedule: res.data.schedule,
      });

      toast.success("Schedule Saved");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },

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
  addMealToDay: async (mealId, quantity) => {
    try {
      const res = await axiosInstance.post("/dailyMeal/add", {
        mealId,
        quantity,
      });

      toast.success("Meal added successfully");

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  },

  // ================= Daily Log =================
  getDailyLog: async () => {
    try {
      set({ loading: true });

      const res = await axiosInstance.get("/dailyMeal/today");

      set({
        dailyLog: res.data,
        loading: false,
      });
    } catch (error) {
      console.log(error);

      set({ loading: false });
    }
  },

  // ================= Weekly Stats =================
  getWeeklyStats: async () => {
    try {
      const res = await axiosInstance.get("/dailyMeal/weekly");

      set({
        weeklyStats: res.data.data || [],
      });
    } catch (error) {
      console.log(error);
    }
  },

  // ================= Recommended Meals =================
  getRecommendedMeals: async () => {
    try {
      set({ loading: true });

      const res = await axiosInstance.get("/dailyMeal/recommend");

      console.log("RECOMMENDED:", res.data);

      set({
        recommendedMeals: res.data.recommendations || [],
        loading: false,
      });
    } catch (error) {
      console.log("RECOMMEND ERROR:", error.response?.data || error);

      set({ loading: false });
    }
  },

  // ================= Water =================
  addWater: async (amount = 250) => {
    try {
      const res = await axiosInstance.post("/water/add", {
        amount,
      });

      toast.success("Water added 💧");

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  },

  getWater: async () => {
    try {
      const res = await axiosInstance.get("/water/today");

      set({
        waterData: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  addActivity: async (data) => {
    try {
      const res = await axiosInstance.post("/activity", data);

      toast.success("Activity added 🔥");

      // refresh
      getActivities();

      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  },

  getActivities: async () => {
    try {
      set({ loading: true });

      const res = await axiosInstance.get("/activity/active-day");

      set({
        activities: res.data.activities,
        totalBurned: res.data.totalBurned,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
    }
  },
}));

export default useDailyStore;
