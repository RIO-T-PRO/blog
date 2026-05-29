import { useState, type ChangeEvent } from "react";
import { FaArrowRight, FaEnvelopeOpenText } from "react-icons/fa6";

import Container from "../ui/container";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmail("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <section className="relative">
      {/* SOFT BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-surface-container/10 to-transparent" />

      <Container>
        <div className="relative overflow-hidden rounded-4xl border border-border-muted/50 bg-surface px-6 py-14 md:px-12 md:py-20">
          {/* SUBTLE GLOW */}
          <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />

          <div className="absolute -bottom-20 right-0 h-60 w-60 rounded-full bg-primary/3 blur-3xl" />

          {/* MINIMAL GRID */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(var(--color-primary) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* ICON */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border-muted bg-surface-container text-primary">
              <FaEnvelopeOpenText className="text-lg" />
            </div>

            {/* LABEL */}
            <span className="mt-6 inline-block font-ui text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              Weekly Newsletter
            </span>

            {/* TITLE */}
            <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight text-on-surface md:text-6xl">
              Reflections in your inbox
            </h2>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
              Join more than 50,000 readers receiving thoughtful essays,
              cultural commentary, and carefully curated stories every Sunday
              morning.
            </p>

            {/* FORM */}
            <form
              className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-border-muted bg-surface-container/30 p-2 sm:flex-row"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                className="h-10 grow rounded-xl bg-transparent px-5 font-body text-sm text-on-surface outline-none placeholder:text-text-secondary/60"
                placeholder="Enter your email address"
                required
                type="email"
                value={email}
                onChange={handleChange}
              />

              <button
                className="group inline-flex h-10 items-center justify-center gap-3 rounded-xl bg-primary px-7 font-ui text-sm font-semibold uppercase tracking-[0.12em] text-on-primary transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                type="submit"
              >
                Subscribe
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            {/* FOOTNOTE */}
            <p className="mt-5 text-xs tracking-wide text-text-secondary">
              No spam. Thoughtful writing only. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NewsletterSection;
