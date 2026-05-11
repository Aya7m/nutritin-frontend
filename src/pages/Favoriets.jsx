// pages/Favorites.jsx

import React, { useEffect } from "react";

import Loading from "../components/Loading";
import { MdFavorite } from "react-icons/md";
import useFavoriteStore from "../store/mealStore";

const Favorites = () => {
  const {
    favorites,
    loading,
    getFavorites,
    toggleFavorite,
  } = useFavoriteStore();

  useEffect(() => {
    getFavorites();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen p-6 mt-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MdFavorite className="text-red-500 text-4xl" />

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Favorite Meals
          </h1>

          <p className="text-gray-500 mt-1">
            Your saved favorite meals ❤️
          </p>
        </div>
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No favorite meals yet 😢
          </h2>

          <p className="text-gray-500 mt-2">
            Start adding meals to favorites
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => {
            const meal = fav.mealId;

            return (
              <div
                key={fav._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border"
              >
                <div className="relative">
                  <img
                    src={meal?.image}
                    alt={meal?.name}
                    className="w-full h-52 object-cover"
                  />

                  {/* Remove Favorite */}
                  <button
                    onClick={() =>
                      toggleFavorite(meal?._id)
                    }
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-all"
                  >
                    <MdFavorite
                      size={24}
                      className="text-red-500"
                    />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {meal?.name}
                    </h2>

                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {meal?.type}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-gray-600">
                    <p>
                      🔥 Calories:
                      <span className="font-semibold ml-2 text-orange-500">
                        {meal?.calories}
                      </span>
                    </p>

                    <p>
                      💪 Protein:
                      <span className="font-semibold ml-2 text-red-500">
                        {meal?.protein}g
                      </span>
                    </p>

                    <p>
                      🍞 Carbs:
                      <span className="font-semibold ml-2 text-yellow-500">
                        {meal?.carbs}g
                      </span>
                    </p>

                    <p>
                      🥑 Fat:
                      <span className="font-semibold ml-2 text-cyan-500">
                        {meal?.fat}g
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;