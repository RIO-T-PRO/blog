import { FaEnvelope } from "react-icons/fa6";
import { Container } from "../layout/container";

export const NewsletterSection = () => {
  return (
    <section className="py-8">
      <Container>
        <div className="rounded-2xl border border-outline-variant bg-surface-low p-8 text-center sm:p-12">
          <div className="mx-auto max-w-md space-y-6">
            <FaEnvelope size={36} className="mx-auto text-primary" />

            <h2 className="text-2xl font-semibold text-on-surface">
              The Weekly Edit
            </h2>

            <p className="text-base leading-7 text-on-surface-variant">
              Get a curated selection of our finest essays and stories delivered
              to your inbox every Sunday.
            </p>

            <form className="flex flex-col gap-3 pt-4 sm:flex-row">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="grow rounded-lg border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary-container"
              />

              <button
                type="submit"
                className="rounded-lg bg-on-surface px-6 py-3 font-semibold text-surface transition-colors hover:bg-primary-container hover:text-on-primary-container"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-outline">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
