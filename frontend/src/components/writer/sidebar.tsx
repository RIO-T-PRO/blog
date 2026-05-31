import { NavLink } from "react-router-dom";
import {
  FaChartLine,
  FaPenNib,
  FaRegNewspaper,
  FaRegBookmark,
  FaGear,
} from "react-icons/fa6";

const items = [
  {
    label: "Overview",
    icon: FaChartLine,
    href: "/dashboard",
  },
  {
    label: "Stories",
    icon: FaRegNewspaper,
    href: "/dashboard/stories",
  },
  {
    label: "Write",
    icon: FaPenNib,
    href: "/write",
  },
  {
    label: "Bookmarks",
    icon: FaRegBookmark,
    href: "/dashboard/bookmarks",
  },
  {
    label: "Settings",
    icon: FaGear,
    href: "/dashboard/settings",
  },
];

const WriterSidebar = () => {
  return (
    <aside className="sticky top-28 hidden h-fit w-72 shrink-0 rounded-3xl border border-border-muted bg-surface p-5 lg:block">
      <div className="mb-8">
        <h2 className="font-display text-2xl text-on-surface">Writer Space</h2>

        <p className="mt-2 text-sm leading-6 text-text-secondary">
          Your editorial command center.
        </p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                [
                  "flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-200",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
                ].join(" ")
              }
            >
              <Icon className="text-sm" />

              <span className="font-ui text-sm font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default WriterSidebar;
