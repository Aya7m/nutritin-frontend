import React, { useState } from "react";
import useAuthStore from "../store/AuthStore";
import { LoaderIcon } from "react-hot-toast";

const Profile = () => {
  const { user, updateProfile, loading } = useAuthStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    height: user?.height || "",
    weight: user?.weight || "",
    age: user?.age || "",
    activityLevel: user?.activityLevel || "",
    goal: user?.goal || "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  return (
    <div className="min-h-screen flex justify-center px-4 py-10 mx-auto">
      <div className="w-full max-w-lg bg-white text-blue-500 rounded-2xl shadow-lg p-6">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <h2 className="mt-3 text-xl font-bold text-gray-800">
            {user?.name || "User Profile"}
          </h2>
          <p className="text-sm text-gray-500">Manage your personal info</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Height</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Weight</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="text-sm font-medium text-gray-600">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Activity */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Activity Level
            </label>
            <select
              value={formData.activityLevel}
              onChange={(e) =>
                setFormData({ ...formData, activityLevel: e.target.value })
              }
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="light">Light</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Goal */}
          <div>
            <label className="text-sm font-medium text-gray-600">Goal</label>
            <select
              value={formData.goal}
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center" disabled={loading}  
          >
            {loading ? <LoaderIcon  className="animate-spin flex items-center justify-center text-center"/> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;