import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./pages/Dashboard";
import Meals from "./pages/Meals";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard ";
import AddMeal from "./pages/admin/AddMeal";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import Water from "./pages/Water";
import Activity from "./pages/Activity";
import useAuthStore from "./store/AuthStore";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import { useState } from "react";
import Favorites from "./pages/Favoriets";
import MealSettings from "./pages/MealSetting";
import Loading from "./components/Loading";

const App = () => {
 
   const { initAuth } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const boot = async () => {
      await initAuth(); // 👈 لازم تخلص الأول
      setReady(true);
    };

    boot();
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-900/20">
       <Loading/>
      </div>
    );
  }
   
  return (
    <>
      <div className="min-h-screen bg-sky-50 dark:bg-slate-950 text-black dark:text-white transition-colors duration-300">
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* user */}
          <Route
            path="/"
            element={
              <ProtectedRoute role="user">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="meals" element={<Meals />} />
            <Route path="water" element={<Water />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="activity" element={<Activity />} />
            <Route path="setting" element={<Profile />} />
            <Route path="schedule" element={<MealSettings />} />
          </Route>

          {/* admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="add-meals" element={<AddMeal />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
