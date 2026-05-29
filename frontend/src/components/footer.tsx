import { Link, NavLink } from "react-router-dom";
import { FaFeatherAlt } from "react-icons/fa";

import Container from "./ui/container";

type Link = {
  label: string;
  href: string;
};

const footerLinks: Link[] = [
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border-muted/60 bg-surface/80 backdrop-blur-2xl">
      <Container>
        <div className="flex flex-col gap-10 py-10 md:flex-row md:items-center md:justify-between">
          {/* LEFT */}
          <div className="flex flex-col gap-4">
            {/* LOGO */}
            <Link className="group flex items-center gap-3" to="/">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                <FaFeatherAlt className="text-base" />
              </div>

              <div className="flex flex-col">
                <span className="font-display text-2xl tracking-tight text-on-surface">
                  Chronicle
                </span>

                <span className="font-ui text-[10px] uppercase tracking-[0.25em] text-text-secondary">
                  Modern Editorial
                </span>
              </div>
            </Link>

            {/* COPYRIGHT */}
            <p className="max-w-md text-sm leading-7 text-text-secondary">
              Thoughtful essays and timeless stories exploring culture,
              creativity, philosophy, and the modern world.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start gap-6 md:items-end">
            {/* NAV */}
            <nav className="flex flex-wrap items-center gap-2">
              {footerLinks.map((item) => (
                <NavLink
                  key={item.href}
                  className={({ isActive }) =>
                    [
                      "rounded-xl px-4 py-2",
                      "font-ui text-sm font-medium uppercase tracking-wide",
                      "transition-all duration-200",
                      isActive
                        ? "bg-surface-container text-primary"
                        : "text-on-surface-variant hover:bg-surface-container/80 hover:text-on-surface",
                    ].join(" ")
                  }
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* BOTTOM TEXT */}
            <p className="font-ui text-[11px] uppercase tracking-[0.2em] text-text-secondary">
              © 2026 Chronicle Editorial
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
