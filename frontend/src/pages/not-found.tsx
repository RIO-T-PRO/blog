import { Link } from "react-router-dom";
import { FaArrowLeftLong, FaCompass } from "react-icons/fa6";

import Container from "@/components/ui/container";
import { FaFeatherAlt } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen overflow-hidden bg-background">
      <Container className="flex flex-1 items-center justify-center py-6">
        <div className="w-full max-w-3xl text-center">
          {/* BRAND */}
          <Link className="group mb-12 inline-flex items-center gap-3" to="/">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white">
              <FaFeatherAlt className="text-sm" />
            </div>

            <div className="flex flex-col text-left">
              <span className="font-display text-3xl tracking-tight text-on-surface">
                Chronicle
              </span>

              <span className="font-ui text-[10px] uppercase tracking-[0.25em] text-text-secondary">
                Modern Editorial
              </span>
            </div>
          </Link>

          {/* STATUS */}
          <div className="relative mx-auto mb-8 w-fit">
            <h1 className="font-display text-[92px] leading-none tracking-tight text-primary md:text-[140px]">
              404
            </h1>

            <div className="absolute -right-6 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-status-error/10 text-status-error md:h-14 md:w-14">
              <FaCompass className="text-lg md:text-xl" />
            </div>
          </div>

          {/* CONTENT */}
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl text-on-surface md:text-4xl">
              Page not found
            </h2>

            <p className="mt-4 font-body text-lg leading-relaxed text-text-secondary md:text-xl">
              The article or page you are looking for may have been moved,
              archived, or no longer exists in the Chronicle collection.
            </p>
          </div>

          {/* ACTIONS */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-primary px-6 font-ui text-sm font-semibold uppercase tracking-wide text-on-primary shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-container hover:shadow-lg active:translate-y-0"
              to="/"
            >
              <FaArrowLeftLong className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />

              <span>Return Home</span>
            </Link>

            <Link
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border-muted bg-surface px-6 font-ui text-sm font-medium text-on-surface transition-all duration-200 hover:bg-surface-container"
              to="/archive"
            >
              Browse Archive
            </Link>
          </div>

          {/* FOOTNOTE */}
          <p className="mt-12 font-ui text-xs uppercase tracking-[0.24em] text-text-secondary">
            Error · Page unavailable
          </p>
        </div>
      </Container>
    </main>
  );
};

export default NotFoundPage;
