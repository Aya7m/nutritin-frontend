import { Loader } from "lucide-react";
import React from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const UserMealCard = ({
  meal,
  quantity,
  onQuantityChange,
  onAddMeal,
  addingMeal,
  toggleFavorite,
  isFavorite,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:shadow-xl transition-all duration-300 relative">
      
      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(meal._id)}
        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-all"
      >
        {isFavorite ? (
          <MdFavorite
            size={24}
            className="text-red-500"
          />
        ) : (
          <MdFavoriteBorder
            size={24}
            className="text-gray-500"
          />
        )}
      </button>

      <img
        src={meal.image}
        alt={meal.name}
        className="w-full h-48 object-cover rounded-xl"
      />

      <h2 className="text-xl font-semibold mt-4 text-blue-400">
        {meal.name}
      </h2>

      <div className="mt-3 space-y-1 text-gray-600">
        <p>🔥 {meal.calories} Calories</p>
        <p>💪 {meal.protein}g Protein</p>
        <p>🍞 {meal.carbs}g Carbs</p>
        <p>🥑 {meal.fat}g Fat</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="bg-gray-700 text-white px-3 py-1 rounded-full w-max mt-3 text-sm">
          {meal.type}
        </p>
      </div>

      <input
        type="number"
        min="1"
        value={quantity || 1}
        onChange={(e) =>
          onQuantityChange(meal._id, e.target.value)
        }
        className="w-full border p-2 rounded-lg mt-4 text-blue-500"
      />

      <button
        onClick={() => onAddMeal(meal._id)}
        disabled={addingMeal === meal._id}
        className="w-full bg-black text-white py-2 rounded-xl mt-4 hover:bg-gray-800 disabled:opacity-50"
      >
        {addingMeal === meal._id ? (
          <Loader className="animate-spin mx-auto" />
        ) : (
          "Add Meal"
        )}
      </button>
    </div>
  );
};

export default UserMealCard;