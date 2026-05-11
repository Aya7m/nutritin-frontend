import React, { useEffect, useState } from "react";
import useDailyStore from "../store/dailyStore";
import { Clock3 } from "lucide-react";

const MealSettings = () => {
  const {
    mealSchedule,
    getMealSchedule,
    setMealSchedule,
  } = useDailyStore();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  // ================= Get Schedule =================
  useEffect(() => {
    getMealSchedule();
  }, []);

  // ================= Fill Form =================
  useEffect(() => {
    if (mealSchedule) {
      setFormData({
        breakfast: mealSchedule.breakfast || "",
        lunch: mealSchedule.lunch || "",
        dinner: mealSchedule.dinner || "",
      });
    }
  }, [mealSchedule]);

  // ================= Handle Change =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= Submit =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await setMealSchedule(formData);

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-slate-950">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border dark:border-slate-700">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-blue-100 dark:bg-slate-800">
            <Clock3 className="text-blue-500" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Meal Schedule
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Set meal reminder times
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Breakfast */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Breakfast Time 🍳
            </label>

            <input
              type="time"
              name="breakfast"
              value={formData.breakfast}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white p-3 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Lunch */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Lunch Time 🍔
            </label>

            <input
              type="time"
              name="lunch"
              value={formData.lunch}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white p-3 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Dinner */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Dinner Time 🍕
            </label>

            <input
              type="time"
              name="dinner"
              value={formData.dinner}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white p-3 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
          >
            {loading ? "Saving..." : "Save Schedule"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealSettings;