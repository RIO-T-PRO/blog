import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/signin";
import SignupPage from "@/pages/auth/signup";
import NotFoundPage from "@/pages/not-found";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SearchModal from "@/components/home/search-modal";

import DashboardLayout from "@/dashboard-layout";

import AdminDashboard from "@/components/admin/dashboard";
import WriterDashboard from "@/components/writer/dashboard";
import UserDashboard from "@/components/user/user";

import { useAuth } from "@/lib/context/auth-context";
import SettingsPage from "./pages/settings";

const App = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const authRoutes = ["/signin", "/signup"];

  const knownRoutes = [
    "/",
    "/essays",
    "/culture",
    "/science",
    "/archive",
    "/signup",
    "/signin",
    "/write",
    "/dashboard",
    "/dashboard/settings",
  ];

  const isAuthPage = authRoutes.includes(location.pathname);
  const isNotFoundPage = !knownRoutes.includes(location.pathname);

  const isDashboard = location.pathname.startsWith("/dashboard");
  const hideLayout = isAuthPage || isNotFoundPage || isDashboard;

  return (
    <div className="min-h-screen bg-background">
      {!hideLayout && <Navbar onSearchOpen={() => setSearchOpen(true)} />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route path="/essays" element={<div>Essays</div>} />
        <Route path="/culture" element={<div>Culture</div>} />
        <Route path="/science" element={<div>Science</div>} />
        <Route path="/archive" element={<div>Archive</div>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/write" element={<div>Write</div>} />

        {/* DASHBOARD WRAPPER */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* HOME */}
          <Route
            index
            element={
              user?.admin ? (
                <AdminDashboard />
              ) : user?.writer ? (
                <WriterDashboard />
              ) : (
                <UserDashboard />
              )
            }
          />

          {/* <Route path="posts" element={<PostsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="activity" element={<ActivityPage />} />
 */}
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!hideLayout && <Footer />}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default App;
