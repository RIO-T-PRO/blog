import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

import { articles } from "@/lib/data";

import Container from "../ui/container";
import ArticleCard from "./article-card";

const ArticlesGrid = () => {
  return (
    <section className="relative pt-8 pb-12">
      {/* BACKGROUND ACCENT */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-surface-container/20 to-transparent" />

      <Container>
        {/* HEADER */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
              Editorial Collection
            </span>

            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-on-surface md:text-5xl">
              Latest Writing
            </h2>

            <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
              Essays, reflections, and deeply researched stories crafted for
              curious minds exploring culture, science, creativity, and the
              future.
            </p>
          </div>

          <Link
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border-muted bg-surface px-6 font-ui text-sm font-semibold uppercase tracking-wide text-on-surface transition-all duration-300 hover:border-primary/20 hover:bg-surface-container hover:text-primary hover:shadow-sm"
            to="/articles"
          >
            View Archive
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            className="group inline-flex h-13 items-center justify-center gap-3 rounded-2xl bg-primary px-8 font-ui text-sm font-semibold uppercase tracking-[0.12em] text-on-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary-container hover:shadow-xl"
            to="/articles"
          >
            Explore All Articles
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ArticlesGrid;
