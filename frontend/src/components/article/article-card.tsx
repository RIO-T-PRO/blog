export type ArticleCardVariant = "featured" | "compact";

export type ArticleCardProps = {
  variant?: ArticleCardVariant;

  title: string;
  excerpt: string;
  category: string;
  readTime?: string;

  author: string;
  date?: string;

  image: string;
  avatar?: string;
};

const ArticleCard = ({
  variant = "compact",
  title,
  excerpt,
  category,
  readTime,
  author,
  date,
  image,
  avatar,
}: ArticleCardProps) => {
  const isFeatured = variant === "featured";

  return (
    <article
      className={[
        "group overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm transition hover:border-outline",
        isFeatured ? "md:flex" : "flex flex-col",
      ].join(" ")}
    >
      <div
        className={isFeatured ? "overflow-hidden md:w-1/2" : "overflow-hidden"}
      >
        <img
          src={image}
          alt={title}
          className={[
            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
            isFeatured ? "aspect-auto" : "aspect-video",
          ].join(" ")}
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded bg-surface-container px-2 py-1 text-xs uppercase tracking-wider text-on-surface-variant">
            {category}
          </span>

          {readTime && <span className="text-xs text-outline">{readTime}</span>}
        </div>

        <h3 className="text-xl font-semibold text-on-surface group-hover:text-primary">
          {title}
        </h3>

        <p className="mt-3 text-on-surface-variant">{excerpt}</p>

        <div className="mt-auto flex items-center gap-3 pt-6">
          {avatar && (
            <img
              src={avatar}
              className="h-10 w-10 rounded-full border border-outline-variant object-cover"
              alt={author}
            />
          )}

          <div>
            <p className="text-sm font-semibold">{author}</p>
            {date && <p className="text-xs text-on-surface-variant">{date}</p>}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
