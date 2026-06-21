import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaFeatherAlt,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { Container } from "./layout/container";
import { useAuth } from "@/lib/context/auth-context";
import Avatar from "./ui/avatar";

type NavBarProps = {
  onSearchOpen?: () => void;
};

export const NavBar = ({ onSearchOpen }: NavBarProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, loading, initialized } = useAuth();

  const handleSignOut = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

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
            <FaFeatherAlt className="h-4 w-4" />
          </span>
          Chronicle
        </NavLink>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-6 md:flex">
          {/* LINKS GROUP */}
          <div className="flex items-center gap-6">
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
          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={onSearchOpen}
            className="flex items-center rounded-full border border-outline-variant bg-surface-lowest px-4 py-2 shadow-sm transition-colors hover:border-primary-container"
            type="button"
          >
            <FaSearch className="mr-2 h-4 w-4 text-on-surface-variant" />
            <span className="text-sm text-on-surface-variant">Search...</span>
          </button>

          {/* AUTH + SIGN UP */}
          <div className="relative flex items-center gap-3">
            {!initialized ? null : user ? (
              <>
                <button
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full p-1 transition hover:bg-surface-container-low"
                >
                  <Avatar
                    email={user.email}
                    id={user.id}
                    size={9}
                    rounded="full"
                    clickable
                  />
                  <FaChevronDown
                    className={`hidden text-xs text-on-surface-variant transition-transform md:block ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <>
                    {/* Backdrop */}
                    <button
                      type="button"
                      aria-label="Close menu"
                      onClick={() => setOpen(false)}
                      className="fixed inset-0 z-40"
                    />
                    {/* Dropdown */}
                    <div className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-outline-variant bg-surface shadow-xl">
                      <div className="border-b border-outline-variant p-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            email={user.email}
                            id={user.id}
                            size={10}
                            rounded="full"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-on-surface">
                              User
                            </p>
                            <p className="truncate text-sm text-on-surface-variant">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low"
                        >
                          <FaUser className="text-on-surface-variant" />
                          Profile
                        </Link>
                        <button
                          type="button"
                          onClick={handleSignOut}
                          disabled={loading}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-error transition-colors hover:bg-surface-container-low disabled:opacity-60"
                        >
                          <FaSignOutAlt />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <NavLink to="/signin" className={linkClass}>
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="rounded-lg bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* MOBILE (unchanged) */}
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
