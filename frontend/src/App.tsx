import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/signin";
import SignupPage from "@/pages/auth/signup";
import NotFoundPage from "@/pages/not-found";
import PublicLayout from "./components/layout/public";
import AuthLayout from "./components/layout/auth";
import ProtectedRoute from "./components/protected-routes";
import DashboardLayout from "./components/layout/dashboard";
import DashboardHome from "./components/dashboard";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/essays" element={<div>Essays</div>} />
        <Route path="/culture" element={<div>Culture</div>} />
        <Route path="/science" element={<div>Science</div>} />
        <Route path="/archive" element={<div>Archive</div>} />
      </Route>

      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* DASHBOARD */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />

          <Route
            path="/dashboard/settings"
            // element={<SettingsPage />}
          />

          <Route
            path="/dashboard/security"
            // element={<SecurityPage />}
          />

          <Route
            path="/dashboard/notifications"
            // element={<NotificationsPage />}
          />
        </Route>
      </Route>

      {/* ADMIN ONLY */}
      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route
          path="/dashboard/users"
          // element={<UserManagementPage />}
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
