import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  FaHome,
  FaPenNib,
  FaUsers,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import type { IconType } from "react-icons";

import { useAuth } from "@/lib/context/auth-context";
import Avatar from "@/components/avatar";
import WriterPosts from "./components/writer/writer-posts";
import UserDashboard from "./components/user/user";
import PostEditor from "./components/writer/editor";
import SettingsPage from "./pages/settings";

type Role = "admin" | "writer" | "user";

type DashboardTab =
  | "application"
  | "write"
  | "posts"
  | "users"
  | "activity"
  | "settings"
  | "admin-dashboard";

type NavItem = {
  tab: DashboardTab;
  icon: IconType;
  label: string;
};

const VIEW_LABELS: Record<DashboardTab, string> = {
  application: "Application",
  write: "Write",
  posts: "My Posts",
  users: "Users",
  activity: "Activity",
  settings: "Settings",
  "admin-dashboard": "Admin Dashboard",
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const role: Role = user?.admin ? "admin" : user?.writer ? "writer" : "user";

  const defaultTabByRole: Record<Role, DashboardTab> = {
    user: "application",
    writer: "write",
    admin: "admin-dashboard",
  };

  const navItems: Record<Role, NavItem[]> = {
    user: [
      { tab: "application", icon: FaPenNib, label: "Application" },
      { tab: "activity", icon: FaChartLine, label: "Activity" },
    ],
    writer: [
      { tab: "write", icon: FaPenNib, label: "Write" },
      { tab: "posts", icon: FaPenNib, label: "My Posts" },
      { tab: "activity", icon: FaChartLine, label: "Activity" },
    ],
    admin: [
      { tab: "admin-dashboard", icon: FaChartLine, label: "Admin Dashboard" },
      { tab: "posts", icon: FaPenNib, label: "Posts" },
      { tab: "users", icon: FaUsers, label: "Users" },
      { tab: "activity", icon: FaChartLine, label: "Activity" },
    ],
  };

  const allowedTabs = useMemo(
    () => [...navItems[role].map((item) => item.tab), "settings" as const],
    [role],
  );

  const currentTab =
    (searchParams.get("tab") as DashboardTab | null) ?? defaultTabByRole[role];

  useEffect(() => {
    const tab = searchParams.get("tab") as DashboardTab | null;

    if (!tab) {
      setSearchParams({ tab: defaultTabByRole[role] }, { replace: true });
      return;
    }

    if (!allowedTabs.includes(tab)) {
      setSearchParams({ tab: defaultTabByRole[role] }, { replace: true });
    }
  }, [allowedTabs, defaultTabByRole, role, searchParams, setSearchParams]);

  const navClass = (active: boolean) =>
    [
      "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
      active
        ? "bg-primary text-white"
        : "text-text-secondary hover:bg-surface hover:text-on-surface",
    ].join(" ");

  const navigateTo = (tab: DashboardTab) => {
    setSearchParams({ tab }, { replace: false });
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      navigate("/", { replace: true });
    }
  };

  const pageTitle = VIEW_LABELS[currentTab] ?? "Your Dashboard";

  const renderContent = () => {
    switch (currentTab) {
      case "application":
        return <UserDashboard />;

      case "write":
        return <PostEditor />;

      case "posts":
        return <WriterPosts />;

      case "users":
        return <div>Users</div>;

      case "activity":
        return <div>Activity</div>;

      case "settings":
        return <SettingsPage />;

      case "admin-dashboard":
        return <div>Admin Dashboard</div>;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen min-h-0 overflow-hidden bg-background text-on-surface">
      <aside className="flex w-72 shrink-0 flex-col border-r border-border-muted bg-surface-container/50">
        <div className="border-b border-border-muted px-5 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-lg font-semibold text-primary"
          >
            <FaHome className="text-sm" />
            Chronicle
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems[role].map(({ tab, icon: Icon, label }) => (
            <button
              key={tab}
              type="button"
              onClick={() => navigateTo(tab)}
              className={navClass(currentTab === tab)}
            >
              <Icon className="text-sm" />
              {label}
            </button>
          ))}
        </nav>

        <div className="border-t border-border-muted p-3">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => navigateTo("settings")}
              className={navClass(currentTab === "settings")}
            >
              <FaCog className="text-sm" />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-danger transition-all duration-200 hover:bg-danger-container active:scale-[0.98]"
              type="button"
            >
              <FaSignOutAlt className="text-sm" />
              Logout
            </button>
          </div>

          <div className="my-3 border-t border-border-muted" />

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

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-border-muted bg-surface-container/50 px-6 py-4">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold text-on-surface">
              {pageTitle}
            </h1>
          </div>
        </header>

        {currentTab === "write" ? (
          <main className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full min-h-0">{renderContent()}</div>
          </main>
        ) : (
          <main className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-hidden px-6 py-6">
              <div className="mx-auto max-w-6xl">{renderContent()}</div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
