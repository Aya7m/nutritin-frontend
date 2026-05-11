import React from "react";


const MealCard = ({ meal }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      
      <img
        src={meal.image}
        alt={meal.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">
            {meal.name}
            
          </h3>

          <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
            {meal.type}
            
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <p>🔥 {meal.calories} cal</p>
          <p>💪 {meal.protein}g protein</p>
          <p>🍞 {meal.carbs}g carbs</p>
          <p>🥑 {meal.fat}g fat</p>
        </div>
      </div>
    </div>
  );
};

export default MealCard;