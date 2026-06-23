import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArchive, FaPaperPlane, FaSave, FaArrowLeft } from "react-icons/fa";

type ArticleStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  status: ArticleStatus;
};

const API_URL = import.meta.env.VITE_API_URL ?? "";

export default function WriterEditor() {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const isEditing = useMemo(() => Boolean(articleId), [articleId]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    status: "DRAFT" as ArticleStatus,
  });

  const updateField = (
    field: keyof typeof form,
    value: string | ArticleStatus,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (!articleId) return;

    const loadArticle = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/articles/${articleId}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to load article");
        }

        const article: Article = await response.json();

        setForm({
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt ?? "",
          content: article.content,
          featuredImage: article.featuredImage ?? "",
          status: article.status,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  const createArticle = async (status: ArticleStatus) => {
    const response = await fetch(`${API_URL}/articles`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        status,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create article");
    }

    return response.json();
  };

  const updateArticle = async (status?: ArticleStatus) => {
    const payload = {
      ...form,
      ...(status ? { status } : {}),
    };

    const response = await fetch(`${API_URL}/articles/${articleId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to update article");
    }

    return response.json();
  };

  const handleSaveDraft = async () => {
    try {
      setSaving(true);

      if (isEditing) {
        await updateArticle("DRAFT");
      } else {
        const article = await createArticle("DRAFT");

        navigate(`/dashboard/articles/${article.id}/edit`, {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setSaving(true);

      if (isEditing) {
        await updateArticle("PUBLISHED");
      } else {
        const article = await createArticle("PUBLISHED");

        navigate(`/dashboard/articles/${article.id}/edit`, {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async () => {
    if (!articleId) return;

    try {
      setSaving(true);

      await updateArticle("ARCHIVED");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10">Loading article...</div>;
  }

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-background">
      {/* Toolbar */}
      <div className="sticky top-0 z-30 bg-surface border-b border-outline-variant px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-surface-container"
          >
            <FaArrowLeft />
          </button>

          <div>
            <p className="text-sm text-on-surface-variant">
              {isEditing ? "Editing Article" : "New Article"}
            </p>

            <p className="text-xs text-on-surface-variant">
              Status: {form.status}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEditing && (
            <button
              onClick={handleArchive}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant"
            >
              <FaArchive />
              Archive
            </button>
          )}

          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant"
          >
            <FaSave />
            Save Draft
          </button>

          <button
            onClick={handlePublish}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-on-primary"
          >
            <FaPaperPlane />
            Publish
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto w-full px-6 py-10 space-y-8">
        <input
          type="text"
          placeholder="Article title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full bg-transparent text-5xl font-bold outline-none"
        />

        <div className="space-y-2">
          <label className="text-sm text-on-surface-variant">Slug</label>

          <input
            type="text"
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            className="w-full rounded-lg border border-outline-variant px-4 py-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-on-surface-variant">
            Featured Image URL
          </label>

          <input
            type="url"
            placeholder="https://..."
            value={form.featuredImage}
            onChange={(e) => updateField("featuredImage", e.target.value)}
            className="w-full rounded-lg border border-outline-variant px-4 py-3"
          />

          {form.featuredImage && (
            <img
              src={form.featuredImage}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl border border-outline-variant"
            />
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-on-surface-variant">Excerpt</label>

          <textarea
            value={form.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            className="w-full min-h-30 rounded-lg border border-outline-variant px-4 py-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-on-surface-variant">Content</label>

          <textarea
            value={form.content}
            onChange={(e) => updateField("content", e.target.value)}
            className="w-full min-h-150 rounded-lg border border-outline-variant px-4 py-4"
          />
        </div>
      </div>
    </main>
  );
}
