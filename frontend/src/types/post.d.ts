// types/post.ts
export type Post = {
  post_id: string; // ✅ consistent with backend
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  cover_image?: string;
  published: boolean;
  writer_id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreatePostPayload = {
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  cover_image?: string;
  published?: boolean;
};

export type UpdatePostPayload = Partial<CreatePostPayload>;

export type PostResponse = {
  status: "success";
  data: {
    post: Post;
  };
};

export type PostEditorForm = {
  post_id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: boolean;
};

export type DeletePostResponse = {
  status: "success";
  message: string;
};

export type PostsResponse = {
  status: "success";
  data: {
    posts: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
