import { Container } from "./layout/container";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-outline-variant mt-auto">
      <Container className="py-12 flex flex-col md:flex-row justify-between gap-12">
        {/* LEFT */}
        <div className="flex flex-col gap-4 md:w-1/3">
          <div className="flex items-center gap-2 text-xl font-bold text-on-surface">
            <span className="text-primary">✦</span>
            Chronicle
          </div>

          <p className="text-on-surface-variant">
            Thoughtful writing and meaningful discussion.
          </p>

          <p className="text-xs text-outline mt-4">
            © 2024 Editorial. All rights reserved.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap gap-12 md:gap-16">
          <div className="flex flex-col gap-3">
            <h4 className="uppercase text-sm font-bold">Explore</h4>
            <a className="text-on-surface-variant hover:text-primary" href="#">
              Latest Articles
            </a>
            <a className="text-on-surface-variant hover:text-primary" href="#">
              Categories
            </a>
            <a className="text-on-surface-variant hover:text-primary" href="#">
              Authors
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="uppercase text-sm font-bold">Account</h4>
            <a
              className="text-on-surface-variant hover:text-primary"
              href="/signin"
            >
              Sign In
            </a>
            <a
              className="text-on-surface-variant hover:text-primary"
              href="/signup"
            >
              Create Account
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="uppercase text-sm font-bold">Legal</h4>
            <a className="text-on-surface-variant hover:text-primary" href="#">
              Terms
            </a>
            <a className="text-on-surface-variant hover:text-primary" href="#">
              Privacy
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
