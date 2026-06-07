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

const App = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const authRoutes = ["/signin", "/signup"];

  const knownRoutes = [
    "/",
    "/essays",
    "/culture",
    "/science",
    "/archive",
    "/signup",
    "/signin",
    "/dashboard",
    "/dashboard/settings",
    "/dashboard/write",
    "/dashboard/writer/posts",
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

        <Route path="/dashboard" element={<DashboardLayout />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!hideLayout && <Footer />}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default App;
