import React, { useState } from "react";
import RightSide from "../components/RightSide";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuthStore from "../store/AuthStore";
const SignIn = () => {
  const navigate = useNavigate();
  const { login, user ,loading} = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const loggedUser = await login(formData);

    if (loggedUser) {
      if (loggedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-sky-50">
      {/* LEFT SIDE */}
      <div className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-blue-400 p-8 rounded-2xl shadow-lg space-y-5"
        >
          {/* TITLE */}
          <h2 className="text-2xl font-bold text-white text-center">
            Welcome Back 👋
          </h2>

          {/* EMAIL */}
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Your Email"
            className="p-4 w-full rounded border border-blue-100 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Your Password"
              className="p-4 w-full rounded border border-blue-100 bg-transparent text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right text-sm text-white/80 hover:text-white cursor-pointer">
            Forgot Password?
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-white text-blue-500 font-semibold py-3 rounded-lg hover:bg-blue-100 transition"
          >
           {loading ? "Logging in..." : "Log In"}
          </button>

          {/* REGISTER LINK */}
          <p className="text-center text-white/80 text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <RightSide />
    </div>
  );
};

export default SignIn;
