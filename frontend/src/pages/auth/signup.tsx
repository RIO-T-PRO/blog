import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFeatherAlt } from "react-icons/fa";
import { FaArrowLeftLong, FaEye, FaEyeSlash } from "react-icons/fa6";

import Container from "@/components/ui/container";
import PasswordStrength from "@/lib/password-strength";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      name,
      email,
      password,
    });
  };

  return (
    <main className="h-screen overflow-hidden bg-background">
      <Container className="h-full py-4">
        <div className="grid h-full grid-cols-1 overflow-hidden rounded-3xl border border-border-muted/70 bg-surface lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-primary px-10 py-8 text-white lg:flex">
            {/* TOP */}
            <div className="flex items-center justify-between">
              {/* LOGO */}
              <Link className="group inline-flex items-center gap-3" to="/">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-primary">
                  <FaFeatherAlt className="text-sm" />
                </div>

                <div className="flex flex-col">
                  <span className="font-display text-2xl tracking-tight">
                    Chronicle
                  </span>

                  <span className="font-ui text-[10px] uppercase tracking-[0.25em] text-white/60">
                    Modern Editorial
                  </span>
                </div>
              </Link>

              {/* BACK */}
              <Link
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-ui text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white hover:text-primary"
                to="/"
              >
                <FaArrowLeftLong className="text-xs" />
                Home
              </Link>
            </div>

            {/* CENTER CONTENT */}
            <div className="max-w-md">
              <p className="mb-4 font-ui text-sm uppercase tracking-[0.3em] text-white/60">
                Welcome to Chronicle
              </p>

              <h1 className="font-display text-6xl leading-none tracking-tight">
                Discover stories that matter.
              </h1>

              <p className="mt-6 font-body text-lg leading-relaxed text-white/70">
                Join a modern editorial platform built for readers, writers, and
                thinkers who appreciate timeless ideas and meaningful
                conversations.
              </p>
            </div>

            {/* BOTTOM */}
            <div className="flex items-center gap-6 border-t border-white/10 pt-6">
              <div>
                <p className="font-display text-3xl">10K+</p>
                <p className="text-sm text-white/60">Active Readers</p>
              </div>

              <div>
                <p className="font-display text-3xl">2K+</p>
                <p className="text-sm text-white/60">Weekly Essays</p>
              </div>

              <div>
                <p className="font-display text-3xl">98%</p>
                <p className="text-sm text-white/60">Positive Feedback</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex h-full items-center justify-center px-6 py-8 sm:px-10">
            <div className="w-full max-w-md">
              {/* MOBILE TOP BAR */}
              <div className="mb-6 flex items-center justify-between lg:hidden">
                <Link className="group inline-flex items-center gap-3" to="/">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white">
                    <FaFeatherAlt className="text-sm" />
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

                <Link
                  className="inline-flex items-center gap-2 rounded-xl border border-border-muted bg-surface px-4 py-2.5 font-ui text-sm font-medium text-on-surface-variant transition-all duration-200 hover:bg-surface-container hover:text-on-surface"
                  to="/"
                >
                  <FaArrowLeftLong className="text-xs" />
                  Home
                </Link>
              </div>

              {/* HEADER */}
              <div className="mb-6">
                <h2 className="font-display text-4xl tracking-tight text-on-surface">
                  Create account
                </h2>

                <p className="mt-2 font-body text-base leading-relaxed text-text-secondary">
                  Start exploring thoughtful essays, stories, and curated
                  archives.
                </p>
              </div>

              {/* FORM */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* NAME */}
                <div>
                  <label
                    className="mb-2 block font-ui text-sm font-medium text-on-surface"
                    htmlFor="name"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-border-muted bg-surface px-4 py-3 text-on-surface placeholder:text-text-secondary outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    className="mb-2 block font-ui text-sm font-medium text-on-surface"
                    htmlFor="email"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-border-muted bg-surface px-4 py-3 text-on-surface placeholder:text-text-secondary outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    className="mb-2 block font-ui text-sm font-medium text-on-surface"
                    htmlFor="password"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full rounded-xl border border-border-muted bg-surface px-4 py-3 pr-14 text-on-surface placeholder:text-text-secondary outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary transition-colors hover:text-on-surface"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-[18px]" />
                      ) : (
                        <FaEye className="text-[18px]" />
                      )}
                    </button>
                  </div>

                  <PasswordStrength password={password} />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="group inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-5 font-ui text-sm font-semibold uppercase tracking-wide text-on-primary shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-container hover:shadow-lg active:translate-y-0"
                >
                  Create Account
                </button>
              </form>

              {/* FOOTER */}
              <div className="mt-6 border-t border-border-muted/70 pt-5">
                <p className="text-center font-body text-sm text-text-secondary">
                  Already have an account?{" "}
                  <Link
                    className="font-medium text-primary transition-colors hover:text-primary-container"
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default SignupPage;
