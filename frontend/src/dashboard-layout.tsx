import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPenNib,
  FaUsers,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "@/lib/context/auth-context";
import Avatar from "@/components/avatar";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.admin ? "admin" : user?.writer ? "writer" : "user";

  const navClass = ({ isActive }: { isActive: boolean }) =>
    [
      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
      isActive
        ? "bg-primary text-white"
        : "text-text-secondary hover:bg-surface hover:text-on-surface",
    ].join(" ");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      // still redirect just in case
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex h-screen bg-background text-on-surface">
      {/* SIDEBAR */}
      <aside className="flex w-72 flex-col border-r border-border-muted bg-surface-container/50">
        {/* BRAND */}
        <div className="border-b border-border-muted px-5 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-lg font-semibold text-primary"
          >
            <FaHome className="text-sm" />
            Chronicle
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavLink to="/dashboard" end className={navClass}>
            <FaPenNib className="text-sm" />
            Dashboard
          </NavLink>

          {(role === "writer" || role === "admin") && (
            <NavLink to="/dashboard/posts" className={navClass}>
              <FaPenNib className="text-sm" />
              Posts
            </NavLink>
          )}

          {role === "admin" && (
            <NavLink to="/dashboard/users" className={navClass}>
              <FaUsers className="text-sm" />
              Users
            </NavLink>
          )}

          <NavLink to="/dashboard/activity" className={navClass}>
            <FaChartLine className="text-sm" />
            Activity
          </NavLink>
        </nav>

        {/* FOOTER */}
        <div className="border-t border-border-muted p-3">
          <div className="space-y-1">
            <NavLink
              to="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary transition-all duration-200 hover:bg-surface hover:text-on-surface"
            >
              <FaCog className="text-sm" />
              Settings
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-danger transition-all duration-200 hover:bg-danger-container active:scale-[0.98]"
            >
              <FaSignOutAlt className="text-sm" />
              Logout
            </button>
          </div>

          <div className="my-3 border-t border-border-muted" />

          {/* USER */}
          <div className="flex items-center gap-3 px-2 py-1">
            <Avatar
              id={user?.user_id}
              name={user?.fullname}
              email={user?.email}
              rounded="xl"
              size={10}
            />

            <div className="min-w-0">
              <p className="truncate font-ui text-sm font-semibold text-on-surface">
                {user?.fullname}
              </p>

              <p className="truncate text-xs text-text-secondary">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
