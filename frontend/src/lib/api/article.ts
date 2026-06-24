import type {
  Article,
  CreateArticlePayload,
  UpdateArticlePayload,
  ArticleQueryParams,
} from "@/types/articles";
import apiFetch from "./index";

export const createArticle = async (
  payload: CreateArticlePayload,
): Promise<Article> => {
  const response = await apiFetch<{
    success: true;
    message: string;
    data: { data: Article };
  }>("/articles", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return response.data.data;
};

export const getArticles = async (
  params?: ArticleQueryParams,
): Promise<Article[]> => {
  const query = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  const response = await apiFetch<{
    success: true;
    message: string;
    data: { data: Article[] };
  }>(`/articles${query}`);
  return response.data.data;
};

export const getArticle = async (articleId: string): Promise<Article> => {
  const response = await apiFetch<{
    success: true;
    message: string;
    data: { article: Article };
  }>(`/articles/${articleId}`);

  return response.data.article;
};

export const updateArticle = async (
  articleId: string,
  payload: UpdateArticlePayload,
): Promise<Article> => {
  // Remove undefined values to avoid overwriting optional fields with undefined
  const body = Object.fromEntries(
    Object.entries(payload).filter(([_, v]) => v !== undefined),
  );

  const response = await apiFetch<{
    success: true;
    message: string;
    updated: Article;
  }>(`/articles/${articleId}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return response.updated;
};

export const deleteArticle = async (articleId: string): Promise<void> => {
  await apiFetch(`/articles/${articleId}`, { method: "DELETE" });
};
