import { create } from "zustand";
import axiosInstance from "../services/axios";
import toast from "react-hot-toast";

const useFavoriteStore = create((set) => ({
  favorites: [],
  loading: false,

  // ================= Toggle Favorite =================
  toggleFavorite: async (mealId) => {
    try {
      const res = await axiosInstance.post("/favorite", {
        mealId,
      });

      toast.success(res.data.message);

      // بعد الإضافة أو الحذف هنعمل تحديث للفيفوريت
      useFavoriteStore.getState().getFavorites();

      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  },

  // ================= Get Favorites =================
  getFavorites: async () => {
    try {
      set({ loading: true });

      const res = await axiosInstance.get("/favorite");

      set({
        favorites: res.data.favorites || [],
        loading: false,
      });
    } catch (error) {
      set({ loading: false });

      toast.error(
        error.response?.data?.message || "Failed to get favorites"
      );
    }
  },

  // ================= Check Is Favorite =================
  isFavorite: (mealId) => {
    const favorites = useFavoriteStore.getState().favorites;

    return favorites.some(
      (fav) => fav.mealId?._id === mealId
    );
  },
}));

export default useFavoriteStore;