import { useState } from "react";

const UserDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 z-50 flex w-full items-center justify-between bg-background/80 px-6 py-4 shadow-sm backdrop-blur-md shadow-black/5">
        <div className="font-display text-2xl font-semibold text-primary">
          Chronicle
        </div>

        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined cursor-pointer text-primary active:scale-95 transition-transform">
            notifications
          </span>
          <span className="material-symbols-outlined cursor-pointer text-primary active:scale-95 transition-transform">
            account_circle
          </span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="cursor-pointer text-primary active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background pt-20 px-6 flex-col gap-6 ${
          mobileMenuOpen ? "flex" : "hidden"
        }`}
      >
        <nav className="flex flex-col gap-4 font-ui text-sm">
          <a
            className="flex items-center gap-3 border-b-2 border-primary py-2 font-bold text-primary"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </a>
          <a
            className="flex items-center gap-3 py-2 text-on-surface-variant transition-colors hover:text-primary"
            href="#"
          >
            <span className="material-symbols-outlined">pending_actions</span>
            Application Status
          </a>
          <a
            className="flex items-center gap-3 py-2 text-on-surface-variant transition-colors hover:text-primary"
            href="#"
          >
            <span className="material-symbols-outlined">article</span>
            Writing Samples
          </a>
          <a
            className="flex items-center gap-3 py-2 text-on-surface-variant transition-colors hover:text-primary"
            href="#"
          >
            <span className="material-symbols-outlined">gavel</span>
            Guidelines
          </a>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 z-30 h-screen w-72 flex-col border-r border-border-muted bg-surface-container py-8 px-6">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-semibold text-primary">
            Chronicle
          </h1>
          <p className="mt-1 font-ui text-sm tracking-wider uppercase text-text-secondary">
            Premium Editorial
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          <a
            className="group flex cursor-pointer items-center gap-4 rounded-lg border-r-2 border-primary bg-surface-container-high px-4 py-3 font-bold text-primary transition-colors duration-200 active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-ui text-sm uppercase tracking-wider">
              Dashboard
            </span>
          </a>

          <a
            className="group flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-high hover:text-primary active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">menu_book</span>
            <span className="font-ui text-sm uppercase tracking-wider">
              Stories
            </span>
          </a>

          <a
            className="group flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-high hover:text-primary active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="font-ui text-sm uppercase tracking-wider">
              Analytics
            </span>
          </a>

          <a
            className="group flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-high hover:text-primary active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">
              collections_bookmark
            </span>
            <span className="font-ui text-sm uppercase tracking-wider">
              Library
            </span>
          </a>

          <a
            className="group flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-high hover:text-primary active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">groups</span>
            <span className="font-ui text-sm uppercase tracking-wider">
              Community
            </span>
          </a>
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-border-muted pt-6">
          <button
            type="button"
            className="mb-6 w-full cursor-pointer rounded-lg bg-primary px-4 py-3 font-ui text-sm text-on-primary shadow-sm transition-colors duration-200 hover:bg-primary-container active:scale-95"
          >
            Become a Writer
          </button>

          <a
            className="group flex cursor-pointer items-center gap-4 rounded-lg px-4 py-2 text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-high hover:text-primary active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">settings</span>
            <span className="font-ui text-sm">Settings</span>
          </a>

          <a
            className="group flex cursor-pointer items-center gap-4 rounded-lg px-4 py-2 text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-high hover:text-primary active:scale-95"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">
              help_outline
            </span>
            <span className="font-ui text-sm">Support</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full flex-1 px-6 pb-24 pt-24 md:ml-72 md:px-12 md:pt-12">
        <div className="mx-auto max-w-200">
          {/* Header */}
          <header className="mb-12">
            <h2 className="mb-4 font-display text-4xl font-bold text-primary md:text-5xl">
              Ready to share your voice?
            </h2>
            <p className="text-lg leading-8 text-text-secondary md:text-xl">
              Join Chronicle&apos;s curated network of thought leaders and
              storytellers. We are looking for distinct perspectives grounded in
              deep expertise.
            </p>
          </header>

          {/* Progress Card */}
          <div className="ambient-shadow relative mb-10 overflow-hidden rounded-xl border border-border-muted bg-surface p-6">
            <div className="absolute left-0 top-0 h-1 w-full bg-surface-container">
              <div className="h-full w-1/4 bg-accent-teal transition-all duration-500" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="mb-1 block font-ui text-xs font-semibold uppercase tracking-wider text-accent-teal">
                  Application Progress
                </span>
                <h3 className="text-xl font-semibold text-on-surface">
                  Step 1 of 4: Personal Bio
                </h3>
              </div>

              <span className="material-symbols-outlined text-4xl text-surface-dim">
                edit_document
              </span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-20">
            <section className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block font-ui text-sm font-medium text-on-surface"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Jane"
                    className="w-full rounded-lg border border-border-muted bg-surface-bright px-4 py-3 font-body text-lg text-on-surface transition-colors placeholder:text-surface-dim focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block font-ui text-sm font-medium text-on-surface"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-lg border border-border-muted bg-surface-bright px-4 py-3 font-body text-lg text-on-surface transition-colors placeholder:text-surface-dim focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-ui text-sm font-medium text-on-surface">
                  Primary Area of Expertise
                </label>

                <div className="flex flex-wrap gap-3">
                  {[
                    "Philosophy",
                    "Culture & Arts",
                    "Science & Tech",
                    "Economics",
                  ].map((item) => (
                    <label key={item} className="cursor-pointer">
                      <input
                        className="peer sr-only"
                        name="expertise"
                        type="radio"
                        value={item}
                      />
                      <div className="rounded-full border border-border-muted px-4 py-2 font-ui text-sm text-text-secondary transition-all hover:bg-surface-container peer-checked:border-secondary-container peer-checked:bg-secondary-container peer-checked:text-on-secondary-container">
                        {item}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block font-ui text-sm font-medium text-on-surface"
                  htmlFor="bio"
                >
                  Professional Biography
                </label>
                <textarea
                  id="bio"
                  rows={5}
                  placeholder="Share your background, credentials, and what drives your intellectual curiosity..."
                  className="w-full resize-y rounded-lg border border-border-muted bg-surface-bright px-4 py-3 font-body text-lg text-on-surface transition-colors placeholder:text-surface-dim focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="mt-2 text-right font-ui text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  0 / 500 words
                </p>
              </div>
            </section>

            <section className="space-y-6 border-t border-border-muted pt-10">
              <h3 className="font-display text-3xl font-semibold text-primary">
                Your Vision
              </h3>

              <div>
                <label
                  className="mb-2 block font-ui text-sm font-medium text-on-surface"
                  htmlFor="whyChronicle"
                >
                  Why Chronicle?
                </label>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                  Describe the unique perspective you intend to bring to our
                  readership. What themes or untold stories do you plan to
                  explore?
                </p>
                <textarea
                  id="whyChronicle"
                  rows={6}
                  placeholder="I aim to explore the intersection of..."
                  className="w-full resize-y rounded-lg border border-border-muted bg-surface-bright px-4 py-3 font-body text-lg text-on-surface transition-colors placeholder:text-surface-dim focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </section>

            <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-ui text-sm text-on-primary shadow-sm transition-colors duration-200 hover:bg-primary-container active:scale-95 sm:w-auto"
              >
                Save and Continue
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                className="w-full rounded-lg border border-border-muted bg-transparent px-8 py-3 font-ui text-sm text-text-secondary transition-colors duration-200 hover:bg-surface-container hover:text-on-surface active:scale-95 sm:w-auto"
              >
                Back to Dashboard
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
