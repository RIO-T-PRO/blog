import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  getArticles,
  getArticle,
  createArticle as apiCreateArticle,
  updateArticle as apiUpdateArticle,
  deleteArticle as apiDeleteArticle,
} from "@/lib/api/article";
import type {
  Article,
  ArticleQueryParams,
  CreateArticlePayload,
  UpdateArticlePayload,
} from "@/types/articles"; // ✅ correct import

type ArticleContextType = {
  articles: Article[];
  loading: boolean;
  error: string | null;
  currentArticle: Article | null;
  currentArticleLoading: boolean;
  currentArticleError: string | null;

  fetchArticles: (params?: ArticleQueryParams) => Promise<void>;
  fetchArticle: (id: string) => Promise<void>;
  createArticle: (payload: CreateArticlePayload) => Promise<Article>;
  updateArticle: (
    id: string,
    payload: UpdateArticlePayload,
  ) => Promise<Article>;
  deleteArticle: (id: string) => Promise<void>;
  clearCurrentArticle: () => void;
};

const ArticleContext = createContext<ArticleContextType | null>(null);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [currentArticleLoading, setCurrentArticleLoading] = useState(false);
  const [currentArticleError, setCurrentArticleError] = useState<string | null>(
    null,
  );

  const fetchArticles = useCallback(async (params?: ArticleQueryParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getArticles(params);
      setArticles(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch articles";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchArticle = useCallback(async (id: string) => {
    setCurrentArticleLoading(true);
    setCurrentArticleError(null);
    try {
      const article = await getArticle(id);
      setCurrentArticle(article);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch article";
      setCurrentArticleError(message);
    } finally {
      setCurrentArticleLoading(false);
    }
  }, []);

  const handleCreate = useCallback(async (payload: CreateArticlePayload) => {
    const article = await apiCreateArticle(payload);
    setArticles((prev) => [article, ...prev]);
    return article;
  }, []);

  const handleUpdate = useCallback(
    async (id: string, payload: UpdateArticlePayload) => {
      const updated = await apiUpdateArticle(id, payload);
      setArticles((prev) => prev.map((a) => (a.id === id ? updated : a)));
      if (currentArticle?.id === id) {
        setCurrentArticle(updated);
      }
      return updated;
    },
    [currentArticle?.id],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await apiDeleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
      if (currentArticle?.id === id) {
        setCurrentArticle(null);
      }
    },
    [currentArticle?.id],
  );

  const clearCurrentArticle = useCallback(() => {
    setCurrentArticle(null);
    setCurrentArticleError(null);
  }, []);

  return (
    <ArticleContext.Provider
      value={{
        articles,
        loading,
        error,
        currentArticle,
        currentArticleLoading,
        currentArticleError,
        fetchArticles,
        fetchArticle,
        createArticle: handleCreate,
        updateArticle: handleUpdate,
        deleteArticle: handleDelete,
        clearCurrentArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticle = () => {
  const ctx = useContext(ArticleContext);
  if (!ctx) {
    throw new Error("useArticle must be used within an ArticleProvider");
  }
  return ctx;
};
