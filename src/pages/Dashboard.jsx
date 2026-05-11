import React, { useEffect } from "react";
import useAuthStore from "../store/AuthStore";
import useDailyStore from "../store/dailyStore";
import { Flame, Target, TrendingUp, Beef, Wheat, Droplets } from "lucide-react";
import Water from "./Water";

const Dashboard = () => {
  const { user, token } = useAuthStore();

  const {
    dailyLog,
    getDailyLog,
    weeklyStats,
    getWeeklyStats,
    addMealToDay,
    recommendedMeals,
    getRecommendedMeals,
    getWater,
    getActivities, // 👈 ADD THIS
    totalBurned,
  } = useDailyStore();

  useEffect(() => {
    if (!token) return;

    getDailyLog();
    getWeeklyStats();
    getRecommendedMeals();
    getWater();
    getActivities(); // 👈 ADD THIS
  }, [token]);

  const meals = dailyLog?.meals || [];

  // Macros
  const totalProtein =
    meals.reduce(
      (acc, meal) => acc + (meal.mealId?.protein || 0) * meal.quantity,
      0,
    ) || 0;

  const totalCarbs =
    meals.reduce(
      (acc, meal) => acc + (meal.mealId?.carbs || 0) * meal.quantity,
      0,
    ) || 0;

  const totalFat =
    meals.reduce(
      (acc, meal) => acc + (meal.mealId?.fat || 0) * meal.quantity,
      0,
    ) || 0;
  const netCalories = (dailyLog?.totalCalories || 0) - (totalBurned || 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-10 w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          👋 Welcome back, {user?.name}
        </h1>

        <p className="text-gray-500 mt-1">
          Track your nutrition and stay healthy 💪
        </p>
      </div>

      {/* Calories Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10  dark:text-blue-500">
        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500">Calories</h3>
            <Flame className="text-orange-500" />
          </div>

          <p className="text-3xl font-bold mt-4">
            {dailyLog?.totalCalories || 0}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500">Goal</h3>
            <Target className="text-blue-500" />
          </div>

          <p className="text-3xl font-bold mt-4">{dailyLog?.goal || 0}</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500">Remaining</h3>
            <TrendingUp className="text-green-500" />
          </div>

          <p className="text-3xl font-bold mt-4">{dailyLog?.remaining || 0}</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500">Progress</h3>
            <Target className="text-pink-500" />
          </div>

          <p className="text-3xl font-bold mt-4">{dailyLog?.progress || 0}%</p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
            <div
              className="bg-pink-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${dailyLog?.progress || 0}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Macros */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Macronutrients
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 dark:text-blue-500">
          <div className="bg-white rounded-2xl shadow-md p-5 border">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500">Protein</h3>
              <Beef className="text-red-500" />
            </div>

            <p className="text-3xl font-bold mt-4">{totalProtein}g</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500">Carbs</h3>
              <Wheat className="text-yellow-500" />
            </div>

            <p className="text-3xl font-bold mt-4">{totalCarbs}g</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500">Fat</h3>
              <Droplets className="text-cyan-500" />
            </div>

            <p className="text-3xl font-bold mt-4">{totalFat}g</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-5 border mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500">Burned Calories</h3>
        </div>

        <p className="text-3xl font-bold text-red-500 mt-4">
          {totalBurned || 0}
        </p>
      </div>

      <Water />
      {/* Meals */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Today's Meals 🍽️</h2>

          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            {meals.length} Meals
          </span>
        </div>

        {meals.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center border">
            <h3 className="text-xl font-semibold text-gray-700">
              No meals added today 🍔
            </h3>

            <p className="text-gray-500 mt-2">
              Start adding your meals to track calories
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <div
                key={meal._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border"
              >
                <img
                  src={meal.mealId?.image}
                  alt={meal.mealId?.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800">
                    {meal.mealId?.name}
                  </h3>

                  <div className="mt-4 space-y-2 text-gray-600">
                    <p>
                      Quantity:
                      <span className="font-semibold ml-2">
                        {meal.quantity}
                      </span>
                    </p>

                    <p>
                      Calories:
                      <span className="font-semibold ml-2 text-orange-500">
                        {meal.calories}
                      </span>
                    </p>

                    <p>
                      Protein:
                      <span className="font-semibold ml-2 text-red-500">
                        {meal.mealId?.protein}g
                      </span>
                    </p>

                    <p>
                      Carbs:
                      <span className="font-semibold ml-2 text-yellow-500">
                        {meal.mealId?.carbs}g
                      </span>
                    </p>

                    <p>
                      Fat:
                      <span className="font-semibold ml-2 text-cyan-500">
                        {meal.mealId?.fat}g
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Meals */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Recommended For You ✨
          </h2>
        </div>

        {recommendedMeals.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-500">No recommendations available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedMeals.map((meal) => (
              <div
                key={meal._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border"
              >
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">
                      {meal.name}
                    </h3>

                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {meal.type}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-gray-600">
                    <p>
                      Calories:
                      <span className="font-semibold ml-2 text-orange-500">
                        {meal.calories}
                      </span>
                    </p>

                    <p>
                      Protein:
                      <span className="font-semibold ml-2 text-red-500">
                        {meal.protein}g
                      </span>
                    </p>

                    <p>
                      Carbs:
                      <span className="font-semibold ml-2 text-yellow-500">
                        {meal.carbs}g
                      </span>
                    </p>

                    <p>
                      Fat:
                      <span className="font-semibold ml-2 text-cyan-500">
                        {meal.fat}g
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => addMealToDay(meal._id, 1)}
                    className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition-all duration-300"
                  >
                    Add Meal
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
