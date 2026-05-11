import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const UserLayout = () => {
  return (
    <div className="min-h-screen">
      {/* navbar */}
      <Navbar />
      {/* content */}
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
