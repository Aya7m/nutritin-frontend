import React, { useEffect, useState } from "react";

import useDailyStore from "../store/dailyStore";
import Loading from "../components/Loading";
import UserMealCard from "../components/UserMealCard";
import useFavoriteStore from "../store/mealStore";

const Meals = () => {
  const { meals, getMeals, addMealToDay, loading, pages } = useDailyStore();

  const { getFavorites, toggleFavorite, isFavorite } = useFavoriteStore();

  const [quantities, setQuantities] = useState({});

  const [addingMeal, setAddingMeal] = useState(null);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      getMeals(page, 6, search);
    }, 500);

    return () => clearTimeout(delay);
  }, [page, search]);

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

  // if (loading) return <Loading />;

  return (
    <div className="mt-12 p-6">
      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // يرجع أول صفحة
        }}
        className="border p-2 rounded w-full mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <Loading className="mx-auto flex items-center justify-center" />
        ) : meals?.length > 0 ? (
          meals.map((meal) => (
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
          ))
        ) : (
          <p>No meals found</p>
        )}
      </div>

      {/* Pagination */}
{pages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-10">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
    >
      Prev
    </button>

    <span className="font-bold">Page {page}</span>

    <button
      disabled={page === pages}
      onClick={() => setPage(page + 1)}
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
    </div>
  );
};

export default Meals;
