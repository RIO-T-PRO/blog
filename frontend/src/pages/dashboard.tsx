import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/context/auth-context";

const DashboardHome = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-text-secondary">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default DashboardHome;
