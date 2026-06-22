import { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";

import {
  FaBars,
  FaBell,
  FaBookmark,
  FaChartBar,
  FaCommentDots,
  FaCog,
  FaFileAlt,
  FaHome,
  FaSearch,
  FaShieldAlt,
  FaSignOutAlt,
  FaTh,
  FaUser,
  FaUserShield,
  FaUsers,
  FaFeatherAlt,
} from "react-icons/fa";
import { useAuth } from "@/lib/context/auth-context";
import SearchModal from "@/components/ui/search-modal";

type NavItem = {
  label: string;
  path: string;
  icon: React.ElementType;
  roles?: string[];
};

const navigation: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    label: "Articles",
    path: "/dashboard/roleApplication",
    icon: FaFileAlt,
    roles: ["admin", "writer", "user"],
  },
  {
    label: "Articles",
    path: "/dashboard/articles",
    icon: FaFileAlt,
    roles: ["admin", "writer", "user"],
  },
  {
    label: "Comments",
    path: "/dashboard/comments",
    icon: FaCommentDots,
    roles: ["admin", "writer", "user"],
  },
  {
    label: "Role Applications",
    path: "/dashboard/role-applications",
    icon: FaUserShield,
    roles: ["admin", "writer"],
  },
  {
    label: "User Management",
    path: "/dashboard/users",
    icon: FaUsers,
    roles: ["admin"],
  },
  {
    label: "Analytics",
    path: "/dashboard/analytics",
    icon: FaChartBar,
    roles: ["admin", "editor"],
  },
  {
    label: "Saved",
    path: "/dashboard/saved",
    icon: FaBookmark,
    roles: ["user", "writer", "admin"],
  },
];

const hasAccess = (userRoles: string[], allowed?: string[]) => {
  if (!allowed) return true;
  return allowed.some((role) => userRoles.includes(role));
};

const DashboardShell = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const visibleNavigation = useMemo(
    () => navigation.filter((item) => hasAccess(user?.roles ?? [], item.roles)),
    [user],
  );

  const handleLogout = async () => {
    navigate("/", { replace: true });

    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  const settingsPaths = [
    "/dashboard/settings",
    "/dashboard/security",
    "/dashboard/notifications",
  ];
  const showSettingsTabs = settingsPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <>
      <div className="min-h-screen bg-background text-on-surface">
        {/* TOPBAR */}
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface border-b border-outline-variant flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              <FaBars />
            </button>
            <NavLink
              to="/"
              className="flex items-center gap-3 text-xl font-semibold text-on-surface justify-self-start"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-container text-on-primary">
                <FaFeatherAlt className="h-4 w-4" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-serif">Editorial</span>
                <span className="text-[10px] font-medium text-on-surface-variant">
                  Journal
                </span>
              </div>
            </NavLink>
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="relative flex w-72 items-center rounded-lg border border-outline-variant bg-surface-lowest py-2 pl-10 pr-4 text-sm text-on-surface-variant hover:border-primary-container transition-colors"
            >
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <span>Search...</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button>
              <FaBell />
            </button>
            <button>
              <FaTh />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="grid place-items-center h-full text-xs font-semibold">
                  {profile?.username?.charAt(0) ?? user?.email?.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex pt-16">
          {/* SIDEBAR */}
          <aside
            className={`
              fixed md:flex flex-col
              left-0 top-16 h-[calc(100vh-64px)]
              w-64 bg-surface-low border-r border-outline-variant z-40
              transition-transform
              ${
                mobileOpen
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              }
            `}
          >
            <div className="p-4">
              <h2 className="font-serif text-lg">Editorial</h2>
              {user?.roles.includes("admin") ||
                (user?.roles.includes("writer") && (
                  <p className="text-xs text-on-surface-variant">
                    Internal Workspace
                  </p>
                ))}
            </div>

            <nav className="flex-1 px-3">
              {visibleNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                        isActive
                          ? "bg-primary-container text-on-primary"
                          : "text-on-surface-variant hover:bg-surface-container"
                      }`
                    }
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="border-t border-outline-variant p-3">
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) => {
                  const isSettingsActive =
                    isActive ||
                    location.pathname.startsWith("/dashboard/security") ||
                    location.pathname.startsWith("/dashboard/notifications");

                  return `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1.5 ${
                    isSettingsActive
                      ? "bg-primary-container text-on-primary"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`;
                }}
              >
                <FaCog />
                Settings
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-error
    transition-colors"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 md:ml-64">
            <div className="max-w-5xl mx-auto px-4 md:px-10 py-12">
              {/* PROFILE HEADER */}
              <section className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border border-outline-variant">
                  {profile?.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="grid place-items-center h-full bg-surface-container">
                      <span className="text-2xl font-bold text-on-surface-variant">
                        {profile?.username?.charAt(0) ?? user?.email?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-4xl font-bold mb-3">
                    {profile?.username ?? user?.email.split("@")[0]}
                  </h1>
                  <p className="max-w-xl text-on-surface-variant">
                    {profile?.bio ?? "Welcome to your editorial workspace."}
                  </p>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {user?.roles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 rounded-full bg-primary-container text-on-primary text-xs"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* SETTINGS TABS – visible on all settings routes */}
              {showSettingsTabs && (
                <nav className="flex gap-8 border-b border-outline-variant mt-12">
                  <NavLink
                    to="/dashboard/settings"
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "pb-3 border-b-2 border-primary text-primary"
                        : "pb-3 text-on-surface-variant"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <FaUser />
                      Profile
                    </div>
                  </NavLink>
                  <NavLink
                    to="/dashboard/security"
                    className={({ isActive }) =>
                      isActive
                        ? "pb-3 border-b-2 border-primary text-primary"
                        : "pb-3 text-on-surface-variant"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <FaShieldAlt />
                      Security
                    </div>
                  </NavLink>
                  <NavLink
                    to="/dashboard/notifications"
                    className={({ isActive }) =>
                      isActive
                        ? "pb-3 border-b-2 border-primary text-primary"
                        : "pb-3 text-on-surface-variant"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <FaBell />
                      Notifications
                    </div>
                  </NavLink>
                </nav>
              )}

              {/* PAGE CONTENT */}
              <div className={showSettingsTabs ? "mt-10" : "mt-12"}>
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>

      <SearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default DashboardShell;
