import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/signin";
import SignupPage from "@/pages/auth/signup";
import NotFoundPage from "@/pages/not-found";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SearchModal from "@/components/home/search-modal";

const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="font-display text-4xl text-on-surface">{title}</h1>
    </div>
  );
};

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
    "/write",
  ];

  const isAuthPage = authRoutes.includes(location.pathname);

  const isNotFoundPage = !knownRoutes.includes(location.pathname);

  const hideLayout = isAuthPage || isNotFoundPage;

  return (
    <div className="min-h-screen bg-background">
      {/* NAVBAR */}
      {!hideLayout && <Navbar onSearchOpen={() => setSearchOpen(true)} />}

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/essays" element={<PlaceholderPage title="Essays" />} />

        <Route path="/culture" element={<PlaceholderPage title="Culture" />} />

        <Route path="/science" element={<PlaceholderPage title="Science" />} />

        <Route path="/archive" element={<PlaceholderPage title="Archive" />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/signin" element={<LoginPage />} />

        <Route path="/write" element={<PlaceholderPage title="Write" />} />

        {/* INVALID ROUTES */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* FOOTER */}
      {!hideLayout && <Footer />}

      {/* SEARCH MODAL */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default App;
