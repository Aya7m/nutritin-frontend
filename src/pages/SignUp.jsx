import React, { useState } from "react";
import RightSide from "../components/RightSide";

import { useNavigate } from "react-router-dom";
import useAuthSore from "../store/AuthStore";

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuthSore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    activityLevel: "",
    goal:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const data = {
      ...formData,
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
    };

    const success = await register(data);

    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-sky-50">
      {/* LEFT SIDE (FORM) */}
      <div className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-blue-400 p-8 rounded-2xl shadow-lg space-y-4"
        >
          {/* NAME + EMAIL */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-4 w-full md:w-1/2 rounded border border-blue-100 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Your Name"
            />

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="p-4 w-full md:w-1/2 rounded border border-blue-100 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Your Email"
            />
          </div>

          {/* PASSWORD + AGE */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="p-4 w-full md:w-1/2 rounded border border-blue-100 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Your Password"
            />

            <input
              type="number"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              className="p-4 w-full md:w-1/2 rounded border border-blue-100 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Your Age"
            />
          </div>

          {/* WEIGHT + HEIGHT */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="number"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
              className="p-4 w-full md:w-1/2 rounded border border-blue-100 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Your Weight"
            />

            <input
              type="number"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: e.target.value })
              }
              className="p-4 w-full md:w-1/2 rounded border border-blue-100 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Your Height"
            />
          </div>

          {/* SELECTS */}
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={formData.goal}
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
         className="p-4 w-full md:w-1/2 rounded border border-blue-100 bg-blue-400 text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">Goal</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Weight</option>
              <option value="maintain">Maintain Weight</option>
            </select>

            <select
              value={formData.activityLevel}
              onChange={(e) =>
                setFormData({ ...formData, activityLevel: e.target.value })
              }
              className="p-4 w-full md:w-1/2 rounded border border-blue-100 bg-blue-400 text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">Activity Level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-white text-blue-500 font-semibold py-3 rounded-lg hover:bg-blue-100 transition"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* RIGHT SIDE (IMAGE) */}
      <RightSide />
    </div>
  );
};

export default SignUp;
