import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  FaMagnifyingGlass,
  FaPenNib,
  FaBars,
  FaChevronDown,
  FaUser,
  FaPenToSquare,
} from "react-icons/fa6";

import { FaFeatherAlt } from "react-icons/fa";

import Container from "./ui/container";
import { Avatar } from "./avatar";

import { useAuth } from "@/lib/context/auth-context";

type NavbarProps = {
  onSearchOpen: () => void;
};

const navItems = [
  { label: "Essays", href: "/essays" },
  { label: "Culture", href: "/culture" },
  { label: "Science", href: "/science" },
  { label: "Archive", href: "/archive" },
] as const;

const Navbar = ({ onSearchOpen }: NavbarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border-muted/60 bg-surface/80 backdrop-blur-2xl">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          {/* LEFT */}
          <div className="flex min-w-0 items-center gap-4 lg:gap-10">
            {/* LOGO */}
            <Link className="group flex shrink-0 items-center gap-3" to="/">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white">
                <FaFeatherAlt className="text-base" />
              </div>

              <div className="flex flex-col">
                <span className="font-display text-2xl tracking-tight text-on-surface md:text-3xl">
                  Chronicle
                </span>

                <span className="hidden font-ui text-[10px] uppercase tracking-[0.25em] text-text-secondary sm:block">
                  Modern Editorial
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  className={({ isActive }) =>
                    [
                      "relative rounded-xl px-4 py-2.5",
                      "font-ui text-sm font-medium uppercase tracking-wide",
                      "transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20",
                      isActive
                        ? "bg-surface-container text-primary shadow-sm"
                        : "text-on-surface-variant hover:bg-surface-container/80 hover:text-on-surface",
                    ].join(" ")
                  }
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* SEARCH */}
            <button
              aria-label="Search"
              className="group flex h-11 items-center gap-3 rounded-full border border-border-muted bg-surface px-4 text-on-surface-variant transition-all duration-300 hover:border-primary/30 hover:bg-surface-container hover:text-on-surface hover:shadow-sm"
              onClick={onSearchOpen}
              type="button"
            >
              <FaMagnifyingGlass className="text-sm transition-transform duration-300 group-hover:scale-110" />

              <span className="hidden font-ui text-sm md:block">
                Search essays...
              </span>
            </button>

            {/* AUTH */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="group flex h-11 items-center gap-2 rounded-full border border-border-muted/70 bg-surface px-2.5 transition-all duration-300 hover:border-primary/20 hover:bg-surface-container/80 hover:shadow-sm"
                  type="button"
                >
                  <Avatar
                    id={user.user_id}
                    name={user.fullName}
                    email={user.email}
                    clickable
                    rounded="full"
                    size={9}
                  />

                  <div className="hidden text-left xl:block">
                    <p className="max-w-28 truncate font-ui text-sm font-medium text-on-surface">
                      {user.fullName}
                    </p>

                    <p className="text-[11px] text-text-secondary">
                      Reader Account
                    </p>
                  </div>

                  <FaChevronDown
                    className={`hidden text-[10px] text-text-secondary/70 transition-transform duration-300 sm:block ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* DROPDOWN */}
                <div
                  className={[
                    "absolute right-0 top-[calc(100%+12px)] w-72 overflow-hidden rounded-2xl border border-border-muted bg-surface shadow-2xl transition-all duration-300",
                    dropdownOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0",
                  ].join(" ")}
                >
                  {/* TOP */}
                  <div className="flex items-center gap-3 border-b border-border-muted/70 px-5 py-4">
                    <Avatar
                      id={user.user_id}
                      name={user.fullName}
                      email={user.email}
                      rounded="xl"
                      size={10}
                    />

                    <div className="min-w-0">
                      <p className="truncate font-ui text-sm font-semibold text-on-surface">
                        {user.fullName}
                      </p>

                      <p className="truncate text-xs text-text-secondary">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* LINKS */}
                  <div className="p-2">
                    <Link
                      className="flex items-center gap-3 rounded-xl px-4 py-3 font-ui text-sm text-on-surface-variant transition-all duration-200 hover:bg-surface-container hover:text-on-surface"
                      onClick={() => setDropdownOpen(false)}
                      to="/profile"
                    >
                      <FaUser className="text-sm" />
                      Profile
                    </Link>

                    <Link
                      className="flex items-center gap-3 rounded-xl px-4 py-3 font-ui text-sm text-on-surface-variant transition-all duration-200 hover:bg-surface-container hover:text-on-surface"
                      onClick={() => setDropdownOpen(false)}
                      to="/dashboard"
                    >
                      <FaPenToSquare className="text-sm" />
                      Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* SIGN UP */}
                <Link
                  className="hidden rounded-lg px-4 py-2 font-ui text-sm font-medium uppercase tracking-wide text-on-surface-variant transition-all duration-200 hover:bg-surface-container hover:text-primary md:block"
                  to="/signup"
                >
                  Sign Up
                </Link>

                {/* CTA */}
                <Link
                  className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-ui text-sm font-semibold text-on-primary shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-container hover:shadow-lg active:translate-y-0"
                  to="/write"
                >
                  <FaPenNib className="text-xs transition-transform duration-300 group-hover:rotate-[-8deg]" />

                  <span>Start Writing</span>
                </Link>
              </>
            )}

            {/* MOBILE MENU */}
            <button
              aria-label="Menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-muted text-on-surface-variant transition-all duration-200 hover:bg-surface-container hover:text-on-surface lg:hidden"
              type="button"
            >
              <FaBars className="text-sm" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
