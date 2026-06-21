import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/signin";
import SignupPage from "@/pages/auth/signup";
import NotFoundPage from "@/pages/not-found";

import Footer from "@/components/footer";
import SearchModal from "@/components/home/search-modal";

import { NavBar } from "./components/home/nav-bar";

const App = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const routeFlags = useMemo(() => {
    const pathname = location.pathname;

    const isAuthPage = pathname === "/signin" || pathname === "/signup";
    // const isDashboard = pathname.startsWith("/dashboard");

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

    const isNotFoundPage = !knownRoutes.includes(pathname);

    const hideLayout = isAuthPage || isNotFoundPage;

    return { hideLayout };
  }, [location.pathname]);

  useEffect(() => {
    setSearchOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      {!routeFlags.hideLayout && (
        <NavBar onSearchOpen={() => setSearchOpen(true)} />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/essays" element={<div>Essays</div>} />
        <Route path="/culture" element={<div>Culture</div>} />
        <Route path="/science" element={<div>Science</div>} />
        <Route path="/archive" element={<div>Archive</div>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<LoginPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!routeFlags.hideLayout && <Footer />}

      {!routeFlags.hideLayout && (
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      )}
    </div>
  );
};

export default App;
