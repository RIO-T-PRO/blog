import { FaPenNib, FaGlobe, FaPaperPlane, FaInfoCircle } from "react-icons/fa";

const UserDashboard = () => {
  return (
    <div className="h-full flex flex-col px-6 md:px-10 py-6 overflow-hidden max-w-3xl mx-auto">
      {/* HEADER (fixed height section) */}
      <div className="shrink-0 mb-6">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary flex items-center gap-3">
          <FaPenNib />
          Writer Application
        </h1>

        <p className="text-text-secondary mt-2 leading-relaxed">
          Apply to become a Chronicle writer. Share your ideas, perspective, and
          what you want to contribute to the platform.
        </p>
      </div>

      {/* FORM CONTAINER (takes remaining space, no page scroll) */}
      <div className="flex-1 min-h-0">
        <form className="h-full flex flex-col bg-surface border border-border-muted rounded-2xl p-6 md:p-8 ambient-shadow">
          {/* SCROLL ONLY INSIDE FORM IF NEEDED */}
          <div className="flex-1 min-h-0 space-y-6 overflow-hidden">
            {/* WEBSITE */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <FaGlobe className="text-text-secondary" />
                Website (optional)
              </label>

              <input
                type="url"
                placeholder="https://yourportfolio.com"
                className="w-full rounded-xl border border-border-muted bg-surface px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />

              <p className="text-xs text-text-secondary flex items-center gap-2">
                <FaInfoCircle />
                Portfolio, blog, or previous writing samples
              </p>
            </div>

            {/* MOTIVATION */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <FaPenNib className="text-text-secondary" />
                Why do you want to write for Chronicle?
              </label>

              <textarea
                rows={5}
                placeholder="Explain your motivation, topics you want to write about..."
                className="w-full rounded-xl border border-border-muted bg-surface px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
              />

              <p className="text-xs text-text-secondary">
                Be specific and original.
              </p>
            </div>
          </div>

          {/* ACTIONS (always visible, never pushed off screen) */}
          <div className="shrink-0 pt-6 flex flex-col sm:flex-row gap-3 border-t border-border-muted">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition shadow-sm"
            >
              <FaPaperPlane />
              Submit Application
            </button>

            <button
              type="button"
              className="px-6 py-3 rounded-xl border border-border-muted text-text-secondary hover:bg-surface-container transition"
            >
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
