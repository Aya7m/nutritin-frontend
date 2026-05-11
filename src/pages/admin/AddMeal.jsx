import React, { useState } from "react";

import toast from "react-hot-toast";
import axiosInstance from "../../services/axios";

const AdminMeals = () => {
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    type: "breakfast",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mealData = new FormData();

      mealData.append("name", formData.name);
      mealData.append("calories", formData.calories);
      mealData.append("protein", formData.protein);
      mealData.append("carbs", formData.carbs);
      mealData.append("fat", formData.fat);
      mealData.append("type", formData.type);
      mealData.append("image", image);

      const res = await axiosInstance.post(
        "/meal/create",
        mealData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);

      setFormData({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        type: "breakfast",
        image:""
      });

      setImage(null);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Add Meal
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Meal Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            name="calories"
            placeholder="Calories"
            value={formData.calories}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            name="protein"
            placeholder="Protein"
            value={formData.protein}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            name="carbs"
            placeholder="Carbs"
            value={formData.carbs}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            name="fat"
            placeholder="Fat"
            value={formData.fat}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          >
            <option value="breakfast">
              Breakfast
            </option>

            <option value="lunch">
              Lunch
            </option>

            <option value="dinner">
              Dinner
            </option>

            <option value="snack">
              Snack
            </option>
          </select>

          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="w-full"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
          >
            Add Meal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminMeals;