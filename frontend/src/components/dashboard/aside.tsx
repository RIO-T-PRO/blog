import { NavLink } from "react-router-dom";
import {
  FaChevronDown,
  FaCog,
  FaCommentDots,
  FaFileAlt,
  FaHome,
  FaSignOutAlt,
  FaUserShield,
  FaUsers,
  FaChartBar,
  FaBookmark,
} from "react-icons/fa";

type Props = {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  locationPath: string;
  user: any;
  handleLogout: () => void;
  articlesOpen: boolean;
  setArticlesOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const navigation = [
  { label: "Dashboard", path: "/dashboard", icon: FaHome },
  {
    label: "Articles",
    icon: FaFileAlt,
    roles: ["admin", "writer"],
    children: [
      { label: "Create Article", path: "/dashboard/articles/new" },
      { label: "Drafts", path: "/dashboard/articles/draft" },
      { label: "Published", path: "/dashboard/articles/published" },
      { label: "Archive", path: "/dashboard/articles/archive" },
    ],
  },
  {
    label: "Articles",
    icon: FaFileAlt,
    roles: ["user"],
    path: "/dashboard/articles/published",
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

const DashboardAside = ({
  mobileOpen,
  setMobileOpen,
  locationPath,
  user,
  handleLogout,
  articlesOpen,
  setArticlesOpen,
}: Props) => {
  const visibleNavigation = navigation.filter((item) =>
    item.roles ? hasAccess(user?.roles ?? [], item.roles) : true,
  );

  return (
    <aside
      className={`
        fixed md:flex flex-col
        left-0 top-16 h-[calc(100vh-64px)]
        w-64 bg-surface-low border-r border-outline-variant z-40
        transition-transform
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      <div className="p-4">
        <h2 className="font-serif text-lg">Editorial</h2>
        {(user?.roles.includes("admin") || user?.roles.includes("writer")) && (
          <p className="text-xs text-on-surface-variant">Internal Workspace</p>
        )}
      </div>

      <nav className="flex-1 px-3">
        {visibleNavigation.map((item) => {
          const Icon = item.icon;

          if (item.children?.length) {
            const isActiveGroup = item.children.some((child) =>
              locationPath.startsWith(child.path),
            );

            return (
              <div key={item.label} className="mb-1">
                <button
                  type="button"
                  onClick={() => setArticlesOpen((v: boolean) => !v)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActiveGroup
                      ? "bg-primary-container text-on-primary"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon />
                    <span>{item.label}</span>
                  </span>
                  <FaChevronDown
                    className={`transition-transform ${articlesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {articlesOpen && (
                  <div className="ml-4 mt-2 pl-3 border-l border-outline-variant space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-primary text-on-primary"
                              : "text-on-surface-variant hover:bg-surface-container"
                          }`
                        }
                      >
                        <span>{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path!}
              end={item.path === "/dashboard"}
              onClick={() => setMobileOpen(false)}
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
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1.5 ${
              isActive
                ? "bg-primary-container text-on-primary"
                : "text-on-surface-variant hover:bg-surface-container"
            }`
          }
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
  );
};

export default DashboardAside;
