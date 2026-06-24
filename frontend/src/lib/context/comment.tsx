import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  getComments,
  createComment as apiCreateComment,
  updateComment as apiUpdateComment,
  deleteComment as apiDeleteComment,
} from "@/lib/api/comment";
import type { Comment } from "@/types/comment";

type CommentContextType = {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  loadComments: () => Promise<void>;
  addComment: (content: string, parentId?: string) => Promise<Comment>;
  editComment: (id: string, content: string) => Promise<Comment>;
  removeComment: (id: string) => Promise<void>;
};

const CommentContext = createContext<CommentContextType | null>(null);

export const CommentProvider = ({
  articleId,
  children,
}: {
  articleId: string;
  children: ReactNode;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadComments = useCallback(async () => {
    if (!articleId || articleId === "undefined") return;
    setLoading(true);
    setError(null);
    try {
      const data = await getComments(articleId);
      setComments(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load comments";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  const addComment = useCallback(
    async (content: string, parentId?: string) => {
      const comment = await apiCreateComment(articleId, { content, parentId });
      if (!parentId) {
        setComments((prev) => [...prev, comment]);
      } else {
        setComments((prev) =>
          prev.map((c) =>
            c.id === parentId
              ? { ...c, replies: [...(c.replies || []), comment] }
              : c,
          ),
        );
      }
      return comment;
    },
    [articleId],
  );

  const editComment = useCallback(async (id: string, content: string) => {
    // apiUpdateComment returns Comment directly
    const updated = await apiUpdateComment(id, { content });
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? updated
          : {
              ...c,
              replies: c.replies?.map((r) => (r.id === id ? updated : r)),
            },
      ),
    );
    return updated;
  }, []);

  const removeComment = useCallback(async (id: string) => {
    await apiDeleteComment(id);
    setComments((prev) =>
      prev
        .filter((c) => c.id !== id)
        .map((c) => ({
          ...c,
          replies: c.replies?.filter((r) => r.id !== id),
        })),
    );
  }, []);

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        error,
        loadComments,
        addComment,
        editComment,
        removeComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  const ctx = useContext(CommentContext);
  if (!ctx) {
    throw new Error("useComments must be used within a CommentProvider");
  }
  return ctx;
};
