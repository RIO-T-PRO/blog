type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-start justify-center bg-inverse-surface/55 px-4 pt-20 backdrop-blur-sm sm:px-6 sm:pt-28"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-surface p-5 shadow-2xl ring-1 ring-black/5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close search"
          className="absolute right-4 top-4 rounded-full p-2 text-text-secondary transition-colors hover:bg-surface-container hover:text-primary"
          onClick={onClose}
          type="button"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center gap-3 border-b border-border-muted pb-4 pr-10">
          <span className="material-symbols-outlined text-text-secondary">
            search
          </span>
          <input
            className="w-full border-none bg-transparent text-base text-on-surface placeholder:text-text-secondary focus:ring-0"
            placeholder="Search essays, writers, topics..."
            type="text"
          />
        </div>

        <div className="hidden animate-pulse flex-col gap-4 py-5">
          <div className="h-20 rounded bg-surface-variant" />
          <div className="h-20 rounded bg-surface-variant" />
          <div className="h-20 rounded bg-surface-variant" />
        </div>

        <div className="hidden flex-col items-center justify-center py-12 text-center">
          <span
            className="material-symbols-outlined mb-4 text-6xl text-surface-variant"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            article
          </span>
          <h3 className="mb-2 font-display text-3xl font-semibold leading-tight text-on-surface">
            No results found
          </h3>
          <p className="mb-6 max-w-md font-body text-lg leading-7 text-text-secondary">
            We couldn't find anything matching your search. Try adjusting your
            keywords.
          </p>
          <button
            className="rounded-lg border border-border-muted px-4 py-2 font-ui text-sm font-medium tracking-wide text-on-surface transition-colors hover:bg-surface-container"
            onClick={onClose}
            type="button"
          >
            Clear Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
