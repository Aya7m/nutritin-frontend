import { Activity, HomeIcon, Menu, SaladIcon, Settings, X } from "lucide-react";
import React, { useState } from "react";
import { IoFileTrayStackedOutline, IoWater } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Meals", path: "/meals", icon: <SaladIcon /> },
    { name: "Water", path: "/water", icon: <IoWater /> },
    { name: "Activity", path: "/activity", icon: <Activity /> },
    { name: "Setting", path: "/setting", icon: <Settings /> },
    { name: "Favorites", path: "/favorites", icon: <MdFavorite /> },
    { name: "Schedule", path: "/schedule", icon: <IoFileTrayStackedOutline /> },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-5 left-4 z-50 text-blue-500 dark:text-white"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 left-0 min-h-screen w-64
          bg-blue-500 dark:bg-slate-900
          text-white z-50
          p-5
          transform transition-transform duration-300
          md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close Button */}
        <div className="flex justify-end mb-5">
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-5">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between p-4 rounded-lg transition-all duration-300 gap-5
                ${
                  isActive
                    ? "bg-white text-blue-500 font-semibold shadow"
                    : "hover:bg-white/10"
                }`
              }
            >
              <p>{link.name}</p>
              <p>{link.icon}</p>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 min-h-screen border-r bg-blue-500/70 dark:bg-slate-900 shadow-blue-100 mt-16 text-white p-4">
        <div className="w-full p-5 lg:p-6 flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `flex items-center justify-between p-4 rounded-lg transition-all duration-300
                ${
                  isActive
                    ? "bg-white text-blue-500 font-semibold shadow"
                    : "hover:bg-white/10"
                }`
              }
            >
              <p>{link.name}</p>
              <p>{link.icon}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
