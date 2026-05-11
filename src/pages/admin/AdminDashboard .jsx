import React, { useCallback } from "react";
import useAuthStore from "../../store/AuthStore";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { useEffect } from "react";
import { useState } from "react";
import MealCard from "../../components/MealCard";

const AdminDashboard = () => {
  const { user, logout } = useAuthStore();
  console.log(user);
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/meal");

      setMeals(res.data.meals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchMeals();
  }, []);

  console.log(meals);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-3 text-center text-2xl p-4 px-6">
        <p>👋 admin {user?.name}</p>
        <button
          className="px-4 py-1.5 border cursor-pointer rounded-l-md hover:scale-105 transition-all duration-300"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <Link
        to={"/admin/add-meals"}
        className="border border-blue-500 px-3 py-1.5 rounded-xl w-30 mx-auto hover:scale-105 transition-all duration-300 cursor-pointer"
      >
        Add Meals
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : meals.length > 0 ? (
          meals.map((meal) => <MealCard key={meal._id} meal={meal} />)
        ) : (
          <p className="text-center">No meals found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
