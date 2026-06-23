import type { Article } from "@/types/articles";
import type { ArticleCardProps } from "@/components/article/article-card";

export const mapArticleToCard = (
  article: Article,
  variant: "featured" | "compact" = "compact",
): Omit<ArticleCardProps, "date"> & { date: string } => {
  const category =
    article.status === "PUBLISHED"
      ? "Published"
      : article.status === "DRAFT"
        ? "Draft"
        : "Archive";

  const rawDate = article.publishedAt ?? article.createdAt;
  const formattedDate = new Date(rawDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    variant,
    title: article.title,
    excerpt: article.excerpt ?? "",
    category,
    readTime: "5 min read",
    author: article.author?.name ?? "Unknown",
    date: formattedDate, // always a string
    image: article.featuredImage ?? "/placeholder.jpg",
    avatar: article.author?.profile?.avatarUrl ?? undefined,
  };
};
