import type { Comment } from "@/types/comment";
import apiFetch from "./index";

export async function getComments(articleId: string): Promise<Comment[]> {
  const { data } = await apiFetch<{ data: { comments: Comment[] } }>(
    `/articles/${articleId}/comments`,
  );
  return data.comments;
}

export async function createComment(
  articleId: string,
  payload: { content: string; parentId?: string | null },
): Promise<Comment> {
  const { data } = await apiFetch<{ data: { comment: Comment } }>(
    `/articles/${articleId}/comments`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
  return data.comment;
}

export async function updateComment(
  commentId: string,
  payload: { content: string },
): Promise<Comment> {
  const { data } = await apiFetch<{ data: { updated: Comment } }>(
    `/comments/${commentId}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
  return data.updated;
}

export async function deleteComment(commentId: string): Promise<void> {
  await apiFetch(`/comments/${commentId}`, {
    method: "DELETE",
  });
}
