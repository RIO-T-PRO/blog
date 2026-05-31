import { NavLink } from "react-router-dom";

import {
  FaChartPie,
  FaUsers,
  FaFileLines,
  FaComments,
  FaGear,
  FaPenNib,
} from "react-icons/fa6";

const links = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: FaChartPie,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: FaUsers,
  },
  {
    label: "Writers",
    path: "/admin/writers",
    icon: FaPenNib,
  },
  {
    label: "Posts",
    path: "/admin/posts",
    icon: FaFileLines,
  },
  {
    label: "Comments",
    path: "/admin/comments",
    icon: FaComments,
  },
  {
    label: "System",
    path: "/admin/system",
    icon: FaGear,
  },
];

const AdminSidebar = () => {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 z-50 h-screen w-64 flex-col border-r border-border-muted bg-surface-container p-4">
      <div className="mb-8">
        <h1 className="font-headline-md text-3xl text-primary">Chronicle</h1>

        <div className="mt-6 flex items-center gap-3 px-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-container text-on-primary-container font-semibold">
            CA
          </div>

          <div>
            <p className="font-semibold text-on-surface">Chronicle Admin</p>

            <p className="text-xs uppercase tracking-widest text-text-secondary">
              Editorial Admin
            </p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={label}
            to={path}
            end={path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-widest transition-all duration-200 ${
                isActive
                  ? "bg-primary-container text-on-primary-container"
                  : "text-on-surface-variant hover:bg-surface-variant"
              }`
            }
          >
            <Icon className="text-base" />
            {label}
          </NavLink>
        ))}
      </nav>

      <button className="mt-auto rounded-lg border border-border-muted px-4 py-3 text-sm font-semibold text-error transition-colors hover:bg-error/10">
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
