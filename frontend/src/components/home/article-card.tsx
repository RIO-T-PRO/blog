import { FaArrowRight } from "react-icons/fa6";

import type { Article } from "@/lib/data";

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border-muted/60 bg-surface/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
      {/* IMAGE */}
      <div className="relative aspect-video overflow-hidden">
        <img
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={article.image}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-transparent" />

        {/* CATEGORY */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1.5 font-ui text-[9px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {article.category}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex grow flex-col p-5">
        {/* TITLE */}
        <h3 className="line-clamp-2 font-display text-[1.45rem] leading-tight tracking-tight text-on-surface transition-colors duration-300 group-hover:text-primary">
          {article.title}
        </h3>

        {/* EXCERPT */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-text-secondary">
          {article.excerpt}
        </p>

        {/* FOOTER */}
        <div className="mt-5 flex items-center justify-between border-t border-border-muted/60 pt-4">
          {/* AUTHOR */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary/10">
              <img
                alt={article.author}
                className="h-full w-full object-cover"
                src={article.authorImage}
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-on-surface">
                {article.author}
              </p>

              <p className="mt-0.5 text-[11px] text-text-secondary">
                {article.date} · {article.readTime}
              </p>
            </div>
          </div>

          {/* READ MORE */}
          <button
            className="group/button inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-muted bg-surface-container text-on-surface transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            type="button"
          >
            <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover/button:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
