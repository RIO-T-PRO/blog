import { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaTimes,
  FaClock,
  FaCalendarAlt,
  FaFire,
  FaArrowRight,
} from "react-icons/fa";

export type Article = {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  authorImage: string;
};

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
  articles?: Article[];
};

const trendingTopics = ["React", "TypeScript", "Design Systems", "Frontend"];

const SearchModal = ({ open, onClose, articles = [] }: SearchModalProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const filteredArticles = useMemo(() => {
    if (!query.trim()) return [];

    const search = query.toLowerCase();

    return articles.filter((article) =>
      [article.title, article.category, article.author, article.excerpt]
        .join(" ")
        .toLowerCase()
        .includes(search),
    );
  }, [articles, query]);

  if (!open) return null;

  const displayArticles = query
    ? filteredArticles.slice(0, 2)
    : articles.slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-999 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="ambient-shadow relative w-full max-w-2xl rounded-3xl border border-outline-variant/60 bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* GRADIENT */}
        <div className="absolute inset-x-0 top-0 h-24 rounded-t-3xl bg-linear-to-b from-primary/6 to-transparent" />

        {/* HEADER */}
        <div className="relative border-b border-border-muted px-5 py-5 sm:px-6">
          {/* CLOSE */}
          <button
            aria-label="Close search"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-all duration-200 hover:bg-surface-container hover:text-on-surface"
            onClick={onClose}
            type="button"
          >
            <FaTimes size={15} />
          </button>

          {/* TITLE */}
          <div className="mb-4">
            <p className="font-ui text-[11px] font-medium uppercase tracking-[0.25em] text-primary">
              Discover
            </p>

            <h2 className="mt-2 font-display text-2xl text-on-surface">
              Search Articles
            </h2>

            <p className="mt-1 max-w-md font-body text-sm leading-6 text-text-secondary">
              Explore essays, stories, and ideas from writers.
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-3 rounded-xl border border-outline-variant bg-background px-4 py-3 transition-all duration-200 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10">
            <FaSearch className="shrink-0 text-text-secondary" size={14} />

            <input
              autoFocus
              className="w-full bg-transparent font-ui text-sm text-on-surface outline-none placeholder:text-text-secondary"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              type="text"
              value={query}
            />

            <kbd className="hidden rounded-md border border-outline-variant bg-surface px-2 py-1 font-ui text-[10px] text-text-secondary sm:block">
              ESC
            </kbd>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-5 py-5 sm:px-6">
          {!query ? (
            <div className="space-y-6">
              {/* TRENDING */}
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <FaFire className="text-primary" size={12} />

                  <h3 className="font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-text-secondary">
                    Trending Topics
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic) => (
                    <button
                      className="rounded-xl border border-outline-variant bg-surface-container px-3 py-1.5 font-ui text-xs text-on-surface transition-all duration-200 hover:border-primary/30 hover:bg-primary hover:text-on-primary"
                      key={topic}
                      onClick={() => setQuery(topic)}
                      type="button"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </section>

              {/* ARTICLES */}
              <section>
                <div className="mb-4">
                  <h3 className="font-display text-xl text-on-surface">
                    Featured
                  </h3>
                </div>

                <div className="grid gap-3">
                  {displayArticles.map((article) => (
                    <button
                      className="group flex overflow-hidden rounded-2xl border border-border-muted bg-surface text-left transition-all duration-300 hover:-translate-y-1"
                      key={article.title}
                      type="button"
                    >
                      {/* IMAGE */}
                      <div className="relative hidden w-40 shrink-0 overflow-hidden sm:block">
                        <img
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={article.image}
                        />

                        <div className="absolute left-3 top-3 rounded-lg bg-surface/90 px-2.5 py-1 font-ui text-[10px] font-medium text-primary backdrop-blur-sm">
                          {article.category}
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="font-display text-lg leading-tight text-on-surface transition-colors duration-200 group-hover:text-primary">
                          {article.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 font-body text-sm leading-6 text-text-secondary">
                          {article.excerpt}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-4">
                          {/* AUTHOR */}
                          <div className="flex items-center gap-3">
                            <img
                              alt={article.author}
                              className="h-9 w-9 rounded-full object-cover"
                              src={article.authorImage}
                            />

                            <div>
                              <p className="font-ui text-xs font-medium text-on-surface">
                                {article.author}
                              </p>

                              <div className="mt-1 flex items-center gap-2 font-ui text-[11px] text-text-secondary">
                                <div className="flex items-center gap-1">
                                  <FaCalendarAlt size={9} />
                                  {article.date}
                                </div>

                                <div className="flex items-center gap-1">
                                  <FaClock size={9} />
                                  {article.readTime}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="hidden items-center gap-2 font-ui text-xs font-medium text-primary sm:flex">
                            Read
                            <FaArrowRight
                              className="transition-transform duration-200 group-hover:translate-x-1"
                              size={10}
                            />
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <section>
              {/* RESULTS HEADER */}
              <div className="mb-4 flex items-center justify-between border-b border-border-muted pb-3">
                <div>
                  <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                    Results
                  </p>

                  <h3 className="mt-1 font-display text-2xl text-on-surface">
                    {filteredArticles.length}
                  </h3>
                </div>

                <button
                  className="font-ui text-xs text-text-secondary transition-colors hover:text-on-surface"
                  onClick={() => setQuery("")}
                  type="button"
                >
                  Clear
                </button>
              </div>

              {/* RESULTS */}
              {filteredArticles.length > 0 ? (
                <div className="grid gap-3">
                  {displayArticles.map((article) => (
                    <button
                      className="group flex overflow-hidden rounded-2xl border border-border-muted bg-surface text-left transition-all duration-300 hover:-translate-y-1"
                      key={article.title}
                      type="button"
                    >
                      {/* IMAGE */}
                      <div className="relative hidden w-40 shrink-0 overflow-hidden sm:block">
                        <img
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={article.image}
                        />

                        <div className="absolute left-3 top-3 rounded-lg bg-surface/90 px-2.5 py-1 font-ui text-[10px] font-medium text-primary backdrop-blur-sm">
                          {article.category}
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="font-display text-lg leading-tight text-on-surface transition-colors duration-200 group-hover:text-primary">
                          {article.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 font-body text-sm leading-6 text-text-secondary">
                          {article.excerpt}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img
                              alt={article.author}
                              className="h-9 w-9 rounded-full object-cover"
                              src={article.authorImage}
                            />

                            <div>
                              <p className="font-ui text-xs font-medium text-on-surface">
                                {article.author}
                              </p>

                              <div className="mt-1 flex items-center gap-2 font-ui text-[11px] text-text-secondary">
                                <div className="flex items-center gap-1">
                                  <FaCalendarAlt size={9} />
                                  {article.date}
                                </div>

                                <div className="flex items-center gap-1">
                                  <FaClock size={9} />
                                  {article.readTime}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="hidden items-center gap-2 font-ui text-xs font-medium text-primary sm:flex">
                            Read
                            <FaArrowRight
                              className="transition-transform duration-200 group-hover:translate-x-1"
                              size={10}
                            />
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-outline-variant bg-surface-container/40 px-6 py-12 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <FaSearch className="text-primary" size={20} />
                  </div>

                  <h3 className="font-display text-2xl text-on-surface">
                    Nothing Found
                  </h3>

                  <p className="mt-3 max-w-sm font-body text-sm leading-6 text-text-secondary">
                    No articles matching{" "}
                    <span className="font-semibold text-on-surface">
                      "{query}"
                    </span>
                    .
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
