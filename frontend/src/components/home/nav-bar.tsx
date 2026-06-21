import { FaEdit, FaBars, FaSearch } from "react-icons/fa";
import { Container } from "../layout/container";
import { NavLink } from "react-router-dom";

type NavBarProps = {
  onSearchOpen?: () => void;
};

export const NavBar = ({ onSearchOpen }: NavBarProps) => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "border-b-2 border-primary pb-1 font-semibold text-primary"
      : "text-on-surface-variant transition-colors hover:text-primary";

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-outline-variant bg-surface/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        {/* LOGO */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-on-surface"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-highest text-primary transition-colors hover:bg-primary-container hover:text-on-primary-container">
            <FaEdit className="h-4 w-4" />
          </span>
          Editorial
        </NavLink>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/essays" className={linkClass}>
            Essays
          </NavLink>

          <NavLink to="/culture" className={linkClass}>
            Culture
          </NavLink>

          <NavLink to="/science" className={linkClass}>
            Science
          </NavLink>

          <NavLink to="/signin" className={linkClass}>
            Sign In
          </NavLink>

          {/* SEARCH BUTTON (controlled by App) */}
          <button
            onClick={onSearchOpen}
            className="flex items-center rounded-full border border-outline-variant bg-surface-lowest px-4 py-2 shadow-sm transition-colors hover:border-primary-container"
            type="button"
          >
            <FaSearch className="mr-2 h-4 w-4 text-on-surface-variant" />
            <span className="text-sm text-on-surface-variant">Search...</span>
          </button>

          {/* CTA */}
          <NavLink
            to="/dashboard/write"
            className="rounded-lg bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary"
          >
            Start Writing
          </NavLink>
        </div>

        {/* MOBILE */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={onSearchOpen}
            type="button"
            className="p-2 text-on-surface"
          >
            <FaSearch className="h-4 w-4" />
          </button>

          <button type="button" className="p-2 text-on-surface">
            <FaBars className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </nav>
  );
};
