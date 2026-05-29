import { Link, NavLink } from "react-router-dom";
import { FaMagnifyingGlass, FaPenNib, FaBars } from "react-icons/fa6";

import Container from "./ui/container";
import { FaFeatherAlt } from "react-icons/fa";

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
