import React, { useEffect, useState } from "react";
import useDailyStore from "../store/dailyStore";
import Loading from "../components/Loading";
import UserMealCard from "../components/UserMealCard";
import useFavoriteStore from "../store/mealStore";


const Meals = () => {
  const { meals, getMeals, addMealToDay, loading } =
    useDailyStore();

  const {
    getFavorites,
    toggleFavorite,
    isFavorite,
  } = useFavoriteStore();

  const [quantities, setQuantities] = useState({});
  const [addingMeal, setAddingMeal] = useState(null);

  useEffect(() => {
    getMeals();
    getFavorites();
  }, []);

  const handleQuantity = (mealId, value) => {
    setQuantities({
      ...quantities,
      [mealId]: value,
    });
  };

  const handleAddMeal = async (mealId) => {
    try {
      setAddingMeal(mealId);

      const quantity = quantities[mealId] || 1;

      await addMealToDay(mealId, quantity);
    } finally {
      setAddingMeal(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="mt-12 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {meals?.map((meal) => (
          <UserMealCard
            key={meal._id}
            meal={meal}
            quantity={quantities[meal._id]}
            onQuantityChange={handleQuantity}
            onAddMeal={handleAddMeal}
            addingMeal={addingMeal}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite(meal._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Meals;