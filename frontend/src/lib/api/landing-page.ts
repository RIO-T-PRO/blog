import apiFetch from "@/lib/api";
import type { PostResponse, PostsResponse } from "@/types/post";

export const getPublishedPosts = async (
  page: number,
  limit: number,
): Promise<PostsResponse> => {
  return apiFetch<PostsResponse>(`/landing/posts?page=${page}&limit=${limit}`);
};

export const getPublishedPost = async (slug: string): Promise<PostResponse> => {
  return apiFetch<PostResponse>(`/posts/${slug}`, {
    method: "GET",
  });
};
