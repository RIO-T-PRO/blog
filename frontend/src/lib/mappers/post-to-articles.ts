import type { Article, PublicPost } from "@/types/post";

const formatDate = (value?: string) => {
  if (!value) return "Recently";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const estimateReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 220));

  return `${minutes} min read`;
};

export const postToArticle = (post: PublicPost): Article => {
  const author = post.writer?.user?.fullname?.trim() || "Editorial Team";

  const authorImage =
    post.writer?.user?.userProfile?.avatar?.trim() || "/avatar-placeholder.png";

  const excerpt =
    post.excerpt?.trim() || `${post.content.slice(0, 140).trim()}...`;

  const image = post.cover_image?.trim() || "/article-placeholder.jpg";

  return {
    post_id: post.post_id,
    slug: post.slug,
    title: post.title,
    excerpt,
    image,
    author,
    authorImage,
    date: formatDate(post.createdAt),
    readTime: estimateReadTime(post.content),
  };
};
