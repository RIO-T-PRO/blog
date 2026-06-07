import apiFetch from "@/lib/api";
import type {
  CreatePostPayload,
  DeletePostResponse,
  PostResponse,
  UpdatePostPayload,
  PostsResponse,
} from "@/types/post";

// CREATE
export const createPost = (payload: CreatePostPayload) =>
  apiFetch<PostResponse>("/post", {
    method: "POST",
    body: JSON.stringify(payload),
  });

// UPDATE
export const updatePost = (postId: string, payload: UpdatePostPayload) =>
  apiFetch<PostResponse>(`/post/${postId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

// DELETE
export const deletePost = (postId: string) =>
  apiFetch<DeletePostResponse>(`/post/${postId}`, {
    method: "DELETE",
  });

// GET SINGLE
export const getPost = (postId: string) =>
  apiFetch<PostResponse>(`/post/${postId}`, { method: "GET" });

// GET ALL
export const getAllPosts = (page = 1, limit = 10) =>
  apiFetch<PostsResponse>(`/post?page=${page}&limit=${limit}`, {
    method: "GET",
  });
