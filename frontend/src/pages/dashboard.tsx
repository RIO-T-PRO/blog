import { Navigate } from "react-router-dom";

import AdminDashboard from "@/components/admin/index";
import UserDashboard from "@/components/user";
import WriterDashboard from "@/components/writer/dashboard";

import { useAuth } from "@/lib/context/auth-context";

const DashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-text-secondary">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate replace to="/" />;
  }

  const isAdmin = !!user.admin;
  const isWriter = !!user.writer;

  return (
    <>
      {isAdmin && <AdminDashboard />}

      {!isAdmin && isWriter && <WriterDashboard />}

      {!isAdmin && !isWriter && <UserDashboard />}
    </>
  );
};

export default DashboardPage;
