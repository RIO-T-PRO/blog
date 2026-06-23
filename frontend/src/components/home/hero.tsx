import { FaArrowRight } from "react-icons/fa6";
import { Container } from "../layout/container";

export const HeroSection = () => {
  return (
    <section className="py-16 text-center sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl space-y-8">
          <h1 className="text-4xl font-bold leading-tight text-on-surface sm:text-5xl lg:text-6xl">
            Ideas that matter.
            <br />
            <span className="font-light italic text-primary">
              Stories that endure.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-on-surface-variant">
            Discover independent voices, expert perspectives, and deep dives
            into the topics shaping our world.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-8 py-4 font-semibold text-on-primary transition-all hover:bg-primary"
          >
            Join the Community
            <FaArrowRight size={14} />
          </a>

          <div className="mx-auto h-px w-full max-w-md bg-outline-variant" />
        </div>
      </Container>
    </section>
  );
};
