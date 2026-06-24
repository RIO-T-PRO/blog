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

import DashboardHome from "@/components/dashboard";
import ProfileSettings from "@/components/settings/profile";
import SecuritySettings from "@/components/settings/security";
import NotificationSettings from "@/components/settings/notification";
import ApplyWriterForm from "@/components/user/apply-writer";

import WriterEditor from "@/components/article/writer-editor";
import DraftArticlesPage from "@/components/article/draf";
import ArchiveArticlesPage from "@/components/article/archive";
import PublishedArticlesPage from "@/components/article/published";
import DashboardArticleDetail from "./components/dashboard/article-details";

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
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/essays" element={<div>Essays</div>} />
        <Route path="/culture" element={<div>Culture</div>} />
        <Route path="/science" element={<div>Science</div>} />
        <Route path="/archive" element={<div>Archive</div>} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Protected dashboard */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "user", "writer"]} />
          }
        >
          <Route element={<DashboardLayout />}>
            {/* Dashboard home */}
            <Route path="/dashboard" element={<DashboardHome />} />

            {/* User settings */}
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

            {/* Writer/Admin article routes */}
            <Route
              element={<ProtectedRoute allowedRoles={["admin", "writer"]} />}
            >
              <Route
                path="/dashboard/articles"
                element={<Navigate to="draft" replace />}
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
                path="/dashboard/articles/published"
                element={<PublishedArticlesPage />}
              />
              {/* Create article */}
              <Route
                path="/dashboard/articles/new"
                element={<WriterEditor />}
              />
              {/* Edit article */}
              <Route
                path="/dashboard/articles/:articleId/edit"
                element={<WriterEditor />}
              />
              <Route
                path="/dashboard/articles/:articleId"
                element={<DashboardArticleDetail />}
              />{" "}
            </Route>
          </Route>
        </Route>

        {/* Admin only */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard/users" element={<div>Users</div>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!hideLayout && <Footer />}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default App;
