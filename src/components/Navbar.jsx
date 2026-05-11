import React, { useEffect, useState, useRef } from "react";
import useAuthStore from "../store/AuthStore";
import { IoMdNotifications } from "react-icons/io";
import { IoFitnessOutline } from "react-icons/io5";
import { Moon, Sun } from "lucide-react";

import toast from "react-hot-toast";
import useDailyStore from "../store/dailyStore";

const Navbar = () => {
  const { logout } = useAuthStore();

  const [darkMode, setDarkMode] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  const {
    mealSchedule,
    notifications,
    setNotifications,
    getMealSchedule,
    sentNotifications,
    setSentNotifications,
  } = useDailyStore();

  const intervalRef = useRef(null);

  // ================= Get Schedule =================
  useEffect(() => {
    getMealSchedule();
  }, []);

  // ================= Normalize Time =================
  const normalizeTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    return h.padStart(2, "0") + ":" + m.padStart(2, "0");
  };

  // ================= Notification Logic =================
  useEffect(() => {
    if (!mealSchedule) return;

    const checkNotifications = () => {
      const now = new Date();

      const currentTime =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");

      const breakfast = normalizeTime(mealSchedule.breakfast);
      const lunch = normalizeTime(mealSchedule.lunch);
      const dinner = normalizeTime(mealSchedule.dinner);

      let newNotifications = [];

      const alreadySent = (msg) => sentNotifications?.includes(msg);

      if (currentTime === breakfast && !alreadySent("🍳 Time for Breakfast")) {
        newNotifications.push("🍳 Time for Breakfast");
      }

      if (currentTime === lunch && !alreadySent("🍔 Time for Lunch")) {
        newNotifications.push("🍔 Time for Lunch");
      }

      if (currentTime === dinner && !alreadySent("🍕 Time for Dinner")) {
        newNotifications.push("🍕 Time for Dinner");
      }

      if (newNotifications.length > 0) {
        setNotifications([...notifications, ...newNotifications]);

        setSentNotifications([
          ...(sentNotifications || []),
          ...newNotifications,
        ]);

        newNotifications.forEach((msg) => {
          toast.success(msg);
        });
      }
    };

    checkNotifications();

    intervalRef.current = setInterval(checkNotifications, 60000); // كل دقيقة

    return () => clearInterval(intervalRef.current);
  }, [mealSchedule, notifications, sentNotifications]);

  // ================= Theme =================
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-slate-200 dark:bg-slate-900 border-b px-6 lg:px-10 flex items-center justify-between z-50">
      {/* Logo */}
      <h2 className="text-2xl font-bold text-blue-500 flex items-center gap-3 px-4">
        Fitness <IoFitnessOutline />
      </h2>

      <div className="flex items-center gap-3">
        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border text-slate-700 dark:text-white"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setOpenNotifications(!openNotifications)}
            className="p-2 rounded-full border relative"
          >
            <IoMdNotifications size={20} />

            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {openNotifications && (
            <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border">
              <div className="p-4 font-bold border-b">Notifications</div>

              {notifications.length === 0 ? (
                <div className="p-4 text-sm text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((n, i) => (
                  <div key={i} className="p-4 border-b text-sm">
                    {n}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="px-4 py-1 border text-blue-500 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
