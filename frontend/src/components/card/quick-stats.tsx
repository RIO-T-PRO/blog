const QuickStats = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-border-muted bg-surface p-8 shadow-sm">
        <p className="text-sm uppercase tracking-widest text-text-secondary">
          Monthly Goal
        </p>

        <h3 className="mt-3 font-headline-md text-5xl">75%</h3>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-surface-container-high">
          <div className="h-full w-3/4 bg-primary" />
        </div>
      </div>

      <div className="rounded-2xl border border-border-muted bg-surface p-8 shadow-sm">
        <p className="text-sm uppercase tracking-widest text-text-secondary">
          Spam Blocked
        </p>

        <h3 className="mt-3 font-headline-md text-5xl">1,402</h3>
      </div>

      <div className="rounded-2xl border border-border-muted bg-surface p-8 shadow-sm">
        <p className="text-sm uppercase tracking-widest text-text-secondary">
          Active Moderators
        </p>

        <h3 className="mt-3 font-headline-md text-5xl">9</h3>
      </div>
    </div>
  );
};

export default QuickStats;
