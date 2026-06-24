import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type ArticleListItemProps = {
  articleId: string; // required for linking
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  rightSlot?: ReactNode;
};

export const ArticleListItem = ({
  articleId,
  title,
  excerpt,
  category,
  date,
  author,
  image,
  rightSlot,
}: ArticleListItemProps) => {
  return (
    <Link to={`/dashboard/articles/${articleId}`} className="block group">
      <article className="flex flex-col gap-6 border-b border-outline-variant pb-6 last:border-0 sm:flex-row">
        <div className="overflow-hidden rounded-lg bg-surface-low sm:h-32 sm:w-1/3">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {category}
            </span>
            <span className="text-xs text-outline">•</span>
            <span className="text-xs text-outline">{date}</span>
          </div>

          <h3 className="text-lg font-bold text-on-surface transition-colors group-hover:text-primary">
            {title}
          </h3>

          <p className="mt-2 line-clamp-2 text-base text-on-surface-variant">
            {excerpt}
          </p>

          <p className="mt-2 text-xs text-on-surface-variant">
            By <span className="font-medium text-on-surface">{author}</span>
          </p>
        </div>

        {rightSlot}
      </article>
    </Link>
  );
};
