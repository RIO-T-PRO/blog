import type { Comment } from "@/types/comment";
import apiFetch from "./index";

export const getComments = async (articleId: string): Promise<Comment[]> => {
  const { data } = await apiFetch<{ data: { comments: Comment[] } }>(
    `/comments/${articleId}/`,
  );
  return data.comments;
};

export const createComment = async (
  articleId: string,
  payload: { content: string; parentId?: string | null },
): Promise<Comment> => {
  const { data } = await apiFetch<{ data: { comment: Comment } }>(
    `/comments/${articleId}/`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
  return data.comment;
};

export const updateComment = async (
  commentId: string,
  payload: { content: string },
): Promise<Comment> => {
  const { data } = await apiFetch<{ data: { updated: Comment } }>(
    `/comments/${commentId}`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
  return data.updated;
};

export const deleteComment = async (commentId: string): Promise<void> => {
  await apiFetch(`/comments/${commentId}`, {
    method: "DELETE",
  });
};
