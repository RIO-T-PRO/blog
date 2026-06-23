import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/signin";
import SignupPage from "@/pages/auth/signup";
import NotFoundPage from "@/pages/not-found";

import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";
import SearchModal from "@/components/ui/search-modal";

import AuthLayout from "./components/layout/auth";
import ProtectedRoute from "./components/protected-routes";
import DashboardLayout from "./components/layout/dashboard";
import DashboardHome from "./components/dashboard";
import ProfileSettings from "./components/settings/profile";
import SecuritySettings from "./components/settings/security";
import NotificationSettings from "./components/settings/notification";
import ApplyWriterForm from "./components/user/apply-writer";
import WriterEditor from "./components/article/writer-editor";

const DraftArticlesPage = () => (
  <div className="rounded-xl border border-outline-variant bg-surface p-6">
    Draft articles
  </div>
);

const ArchiveArticlesPage = () => (
  <div className="rounded-xl border border-outline-variant bg-surface p-6">
    Archived articles
  </div>
);

const PublishArticlesPage = () => (
  <div className="rounded-xl border border-outline-variant bg-surface p-6">
    Archived articles
  </div>
);

const App = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const authPaths = ["/signin", "/signup"];
  const hideLayout =
    authPaths.includes(location.pathname) ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "*";

  return (
    <>
      {!hideLayout && <Navbar onSearchOpen={() => setSearchOpen(true)} />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/essays" element={<div>Essays</div>} />
        <Route path="/culture" element={<div>Culture</div>} />
        <Route path="/science" element={<div>Science</div>} />
        <Route path="/archive" element={<div>Archive</div>} />

        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "user", "writer"]} />
          }
        >
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route
              path="/dashboard/user/apply/writer"
              element={<ApplyWriterForm />}
            />
            <Route path="/dashboard/settings" element={<ProfileSettings />} />
            <Route path="/dashboard/security" element={<SecuritySettings />} />
            <Route
              path="/dashboard/notifications"
              element={<NotificationSettings />}
            />

            <Route
              element={<ProtectedRoute allowedRoles={["admin", "writer"]} />}
            >
              <Route
                path="/dashboard/articles"
                element={<Navigate to="/dashboard/articles/draft" replace />}
              />
              <Route
                path="/dashboard/articles/draft"
                element={<DraftArticlesPage />}
              />
              <Route
                path="/dashboard/articles/archive"
                element={<ArchiveArticlesPage />}
              />
              <Route
                path="/dashboard/articles/editor"
                element={<WriterEditor />}
              />
            </Route>
          </Route>

          <Route
            path="/dashboard/articles/publish"
            element={<PublishArticlesPage />}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard/users" element={<div>Users</div>} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!hideLayout && <Footer />}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default App;
