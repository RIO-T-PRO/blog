import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/signin";
import SignupPage from "@/pages/auth/signup";
import NotFoundPage from "@/pages/not-found";

import Footer from "@/components/footer";
import SearchModal from "@/components/ui/search-modal";
import { NavBar } from "./components/nav-bar";

const App = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const pathname = location.pathname;

  // AUTH PAGES
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  // DASHBOARD PAGES
  const isDashboard = pathname.startsWith("/dashboard");

  // GLOBAL LAYOUT RULE
  const hideLayout = isAuthPage || isDashboard;

  // Close search on route change
  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* NAVBAR */}
      {!hideLayout && <NavBar onSearchOpen={() => setSearchOpen(true)} />}

      {/* ROUTES */}
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

      {/* FOOTER */}
      {!hideLayout && <Footer />}

      {/* SEARCH MODAL */}
      {!hideLayout && (
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      )}
    </div>
  );
};

export default App;
