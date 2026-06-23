import { useMemo, useState, useRef, useEffect } from "react";
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
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useAuth } from "@/lib/context/auth-context";
import { useRoleApplication } from "@/lib/context/role-application";
import SearchModal from "@/components/ui/search-modal";

type NavItem = {
  label: string;
  path: string;
  icon: React.ElementType;
  roles?: string[];
  show?: (userRoles: string[]) => boolean;
};

const navigation: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    label: "Apply for Writer",
    path: "/dashboard/user/apply/writer",
    icon: FaFeatherAlt,
    roles: ["user"],
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
  const { applications, fetchMyApplications } = useRoleApplication();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Fetch real applications when component mounts
  useEffect(() => {
    fetchMyApplications();
  }, []);

  // Build real notifications from the user’s applications
  const realNotifications = useMemo(() => {
    return applications.map((app) => {
      let icon, color, message;
      const roleName = app.role?.name ?? "Unknown role";
      switch (app.status) {
        case "PENDING":
          icon = FaClock;
          color = "bg-amber-100 text-amber-700";
          message = `Your ${roleName} application is pending review.`;
          break;
        case "APPROVED":
          icon = FaCheckCircle;
          color = "bg-green-100 text-green-700";
          message = `Your ${roleName} application has been approved!`;
          break;
        case "REJECTED":
          icon = FaTimesCircle;
          color = "bg-red-100 text-red-700";
          message = `Your ${roleName} application was rejected.`;
          break;
        default:
          icon = FaClock;
          color = "bg-surface-container-high text-on-surface-variant";
          message = `Your ${roleName} application status: ${app.status}.`;
      }
      return {
        id: app.id,
        icon,
        title: `${roleName} application`,
        description: message,
        time: new Date(app.updatedAt).toLocaleDateString(),
        color,
      };
    });
  }, [applications]);

  // Show red dot if there are any applications (unread – simplified)
  useEffect(() => {
    setHasNotifications(applications.length > 0);
  }, [applications]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBellClick = () => {
    setHasNotifications(false); // dismiss the dot
    setNotificationOpen((prev) => !prev);
  };

  const visibleNavigation = useMemo(
    () =>
      navigation.filter((item) => {
        if (item.show) return item.show(user?.roles ?? []);
        return hasAccess(user?.roles ?? [], item.roles);
      }),
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
          {/* Left side unchanged */}
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

          {/* Search bar unchanged */}
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
            {/* Notification bell with REAL notifications */}
            <div className="relative" ref={notificationRef}>
              <button onClick={handleBellClick} className="relative">
                <FaBell />
                {hasNotifications && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
                  </span>
                )}
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface border border-outline-variant rounded-xl shadow-lg z-50 overflow-hidden">
                  <div className="p-4 border-b border-outline-variant">
                    <h3 className="font-semibold text-on-surface">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {realNotifications.length === 0 ? (
                      <p className="p-4 text-sm text-on-surface-variant text-center">
                        No notifications yet.
                      </p>
                    ) : (
                      realNotifications.map((notif) => {
                        const Icon = notif.icon;
                        return (
                          <div
                            key={notif.id}
                            className="flex items-start gap-3 p-4 hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-none"
                          >
                            <div
                              className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${notif.color}`}
                            >
                              <Icon className="text-sm" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-on-surface truncate">
                                {notif.title}
                              </p>
                              <p className="text-xs text-on-surface-variant truncate">
                                {notif.description}
                              </p>
                              <span className="text-[10px] text-on-surface-variant mt-1 block">
                                {notif.time}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <a
                    href="/dashboard/notifications"
                    className="block text-center py-3 text-sm text-primary font-medium hover:bg-surface-container-low transition-colors border-t border-outline-variant"
                  >
                    View all notifications
                  </a>
                </div>
              )}
            </div>

            {/* Other buttons unchanged */}
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

        {/* SIDEBAR & CONTENT – unchanged from previous version */}
        <div className="flex pt-16">
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
                className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-error transition-colors"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          <main className="flex-1 md:ml-64">
            <div className="max-w-5xl mx-auto px-4 md:px-10 py-12">
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
