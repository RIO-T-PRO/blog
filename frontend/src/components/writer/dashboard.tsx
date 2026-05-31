import WriterSidebar from "@/components/writer/sidebar";
import WriterStats from "@/components/writer/stats";
import StoryCard from "@/components/writer/story-card";
import { stories } from "@/lib/data";

const WriterDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-400 gap-8 px-4 py-8 lg:px-8">
        <WriterSidebar />

        <main className="min-w-0 flex-1">
          {/* HERO */}
          <section className="overflow-hidden rounded-3xl border border-border-muted bg-linear-to-br from-surface via-surface to-surface-container p-8 shadow-sm">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Writer Studio
                </span>

                <h1 className="font-display text-5xl leading-tight tracking-tight text-on-surface">
                  Shape ideas into unforgettable stories.
                </h1>

                <p className="mt-4 max-w-xl text-base leading-8 text-text-secondary">
                  Manage drafts, publish essays, monitor engagement, and build
                  your editorial identity with a focused writing workspace.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="rounded-2xl bg-primary px-6 py-4 font-ui text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-container">
                    New Story
                  </button>

                  <button className="rounded-2xl border border-border-muted bg-surface px-6 py-4 font-ui text-sm font-medium text-on-surface transition-all hover:bg-surface-container">
                    Analytics
                  </button>
                </div>
              </div>

              <div className="grid w-full max-w-md grid-cols-2 gap-4">
                <WriterStats label="Published" value="48" />
                <WriterStats label="Drafts" value="12" />
                <WriterStats label="Readers" value="24.8k" />
                <WriterStats label="Engagement" value="87%" />
              </div>
            </div>
          </section>

          {/* STORIES */}
          <section className="mt-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-display text-3xl text-on-surface">
                  Recent Stories
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  Your latest writing and editorial activity.
                </p>
              </div>

              <button className="rounded-xl border border-border-muted bg-surface px-5 py-3 font-ui text-sm font-medium text-on-surface transition-all hover:bg-surface-container">
                View All
              </button>
            </div>

            <div className="space-y-5">
              {stories.map((story) => (
                <StoryCard key={story.id} {...story} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default WriterDashboard;
