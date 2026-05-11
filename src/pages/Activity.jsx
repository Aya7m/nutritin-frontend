import React, { useEffect, useState } from "react";
import useDailyStore from "../store/dailyStore";

const Activity = () => {
  const { addActivity, getActivities, activities, totalBurned } =
    useDailyStore();

  const [form, setForm] = useState({
    type: "running",
    duration: 30,
  });

  useEffect(() => {
    getActivities();
  }, []);

  const handleAdd = async () => {
    await addActivity(form);
  };

  return (
    <div className="p-6 mt-10">
      <h1 className="text-2xl font-bold mb-6">🏃 Activity Tracker</h1>

      {/* Add Activity Card */}
      <div className="bg-white text-blue-500 p-6 rounded-2xl shadow mb-6 w-full md:w-96">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Type */}
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="border p-3 rounded-xl"
          >
            <option value="running">Running</option>
            <option value="walking">Walking</option>
            <option value="swimming">Swimming</option>
          </select>

          {/* Duration */}
          <input
            type="number"
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: e.target.value })
            }
            className="border p-3 rounded-xl"
            placeholder="Duration (min)"
          />
        </div>

        <button
          onClick={handleAdd}
          className="w-full mt-4 bg-black text-white py-3 rounded-xl"
        >
          Add Activity
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">🔥 Calories Burned</h3>
          <p className="text-3xl font-bold text-red-500">
            {totalBurned || 0}
          </p>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {activities?.map((a, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow flex justify-between"
          >
            <div>
              <p className="font-bold capitalize">{a.type}</p>
              <p className="text-gray-500">
                {a.duration} min
              </p>
            </div>

            <p className="text-red-500 font-bold">
              -{a.caloriesBurned} kcal
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;