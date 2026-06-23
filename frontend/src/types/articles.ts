export interface ArticleAuthor {
  id: string;
  name: string | null;
  profile: {
    username: string | null;
    avatarUrl: string | null;
  } | null;
}

export interface Article {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  // Included only when the backend returns it (listArticles, getBySlug)
  author?: ArticleAuthor;
}

export type CreateArticlePayload = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

export type UpdateArticlePayload = Partial<{
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}>;

export type ArticleQueryParams = {
  status?: string;
  search?: string;
  authorId?: string;
  skip?: number;
  take?: number;
};

export type ArticleCard = {
  id: string;

  variant: "featured" | "compact";

  category: string;
  readTime?: string;

  title: string;
  excerpt: string;

  author: string;
  date?: string;

  image: string;
  avatar?: string;
};
