import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaPaperPlane,
  FaBold,
  FaItalic,
  FaHeading,
  FaQuoteRight,
  FaLink,
  FaImage,
} from "react-icons/fa";
import { useArticle } from "@/lib/context/article";

type ArticleStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

const WriterEditor = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const {
    fetchArticle,
    currentArticle,
    currentArticleLoading,
    createArticle,
    updateArticle,
  } = useArticle();

  const isEditing = Boolean(articleId);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    status: "DRAFT" as ArticleStatus,
  });

  const contentEditableRef = useRef<HTMLDivElement>(null);

  // Load article if editing
  useEffect(() => {
    if (articleId) fetchArticle(articleId);
  }, [articleId, fetchArticle]);

  // Populate form when data arrives
  useEffect(() => {
    if (currentArticle && isEditing) {
      setForm({
        title: currentArticle.title,
        slug: currentArticle.slug,
        excerpt: currentArticle.excerpt ?? "",
        content: currentArticle.content,
        featuredImage: currentArticle.featuredImage ?? "",
        status: currentArticle.status,
      });
    }
  }, [currentArticle, isEditing]);

  // Content editable sync
  const handleContentChange = useCallback(() => {
    const html = contentEditableRef.current?.innerHTML ?? "";
    setForm((prev) => ({ ...prev, content: html }));
  }, []);

  useEffect(() => {
    if (contentEditableRef.current && form.content) {
      contentEditableRef.current.innerHTML = form.content;
    }
  }, [form.content]);

  const updateField = (
    field: keyof typeof form,
    value: string | ArticleStatus,
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    contentEditableRef.current?.focus();
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      if (isEditing) {
        await updateArticle(articleId!, { ...form, status: "DRAFT" });
      } else {
        const created = await createArticle({ ...form, status: "DRAFT" });
        navigate(`/dashboard/articles/${created.id}/edit`, { replace: true });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setSaving(true);
    try {
      if (isEditing) {
        await updateArticle(articleId!, { ...form, status: "PUBLISHED" });
      } else {
        const created = await createArticle({ ...form, status: "PUBLISHED" });
        navigate(`/dashboard/articles/${created.id}/edit`, { replace: true });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async () => {
    if (!articleId) return;
    setSaving(true);
    try {
      await updateArticle(articleId, { ...form, status: "ARCHIVED" });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (currentArticleLoading)
    return <div className="p-10">Loading article...</div>;

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-background">
      {/* Sticky Action Bar */}
      <div className="sticky top-16 md:top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-outline-variant px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-on-surface-variant hover:bg-surface-container p-2 rounded-full transition-colors"
          >
            <FaArrowLeft />
          </button>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
              {form.status === "DRAFT"
                ? "Draft"
                : form.status === "PUBLISHED"
                  ? "Published"
                  : "Archived"}
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
              Saved just now
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEditing && (
            <button
              onClick={handleArchive}
              disabled={saving}
              className="text-sm font-medium text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-lg border border-outline-variant transition-colors"
            >
              Archive
            </button>
          )}
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="text-sm font-medium text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-lg border border-outline-variant shadow-sm transition-colors"
          >
            <FaSave className="inline mr-1" />
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="text-sm font-medium bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary px-6 py-2 rounded-lg shadow-sm flex items-center gap-2 transition-colors"
          >
            <FaPaperPlane />
            Publish
          </button>
        </div>
      </div>

      {/* Editor Workspace */}
      <div className="flex-1 overflow-y-auto px-6 md:px-10 py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Title + Slug */}
          <div className="space-y-4 group">
            <input
              type="text"
              placeholder="Article Title"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full bg-transparent border-none p-0 text-5xl font-bold text-on-surface placeholder:text-outline-variant focus:outline-none resize-none"
            />
            <div className="flex items-center gap-2 text-sm text-on-surface-variant opacity-70 group-hover:opacity-100 transition-opacity">
              <FaLink className="text-base" />
              <span>editorial.workspace/p/</span>
              <input
                type="text"
                placeholder="slug"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className="bg-surface-container-lowest border border-transparent hover:border-outline-variant focus:border-primary-fixed focus:ring-2 focus:ring-primary-fixed px-2 py-0.5 rounded text-on-surface text-sm min-w-37.5 transition-all"
              />
            </div>
          </div>

          {/* Featured Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
              <FaImage className="text-base" />
              Featured Image URL
            </label>
            <div className="flex items-center gap-3">
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.featuredImage}
                onChange={(e) => updateField("featuredImage", e.target.value)}
                className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary-fixed focus:border-primary transition-all"
              />
              {form.featuredImage && (
                <button
                  type="button"
                  onClick={() => updateField("featuredImage", "")}
                  className="p-2 text-on-surface-variant hover:text-error transition-colors"
                  title="Remove image"
                >
                  ×
                </button>
              )}
            </div>
            {form.featuredImage && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-outline-variant mt-3">
                <img
                  src={form.featuredImage}
                  alt="Featured preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="relative">
            <textarea
              value={form.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-4 text-lg text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary-fixed focus:border-primary focus:outline-none resize-none transition-shadow shadow-sm min-h-24"
              placeholder="Write a brief excerpt... (This will appear in card previews)"
              maxLength={200}
            />
            <div className="absolute bottom-4 right-4 text-sm text-outline">
              {form.excerpt.length} / 200
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="border-t border-outline-variant pt-10">
            {/* Inline Toolbar */}
            <div className="sticky top-26 md:top-20 z-20 flex items-center gap-1 mb-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-1 shadow-sm w-fit mx-auto md:mx-0">
              <button
                type="button"
                onClick={() => execCommand("bold")}
                className="p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded transition-colors"
                title="Bold"
              >
                <FaBold className="text-lg" />
              </button>
              <button
                type="button"
                onClick={() => execCommand("italic")}
                className="p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded transition-colors"
                title="Italic"
              >
                <FaItalic className="text-lg" />
              </button>
              <div className="w-px h-5 bg-outline-variant mx-1" />
              <button
                type="button"
                onClick={() => execCommand("formatBlock", "H2")}
                className="p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded transition-colors"
                title="Heading 2"
              >
                <FaHeading className="text-lg" />
              </button>
              <button
                type="button"
                onClick={() => execCommand("formatBlock", "BLOCKQUOTE")}
                className="p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded transition-colors"
                title="Quote"
              >
                <FaQuoteRight className="text-lg" />
              </button>
              <div className="w-px h-5 bg-outline-variant mx-1" />
              <button
                type="button"
                onClick={() => {
                  const url = prompt("Enter link URL:");
                  if (url) execCommand("createLink", url);
                }}
                className="p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded transition-colors"
                title="Insert Link"
              >
                <FaLink className="text-lg" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = prompt("Enter image URL:");
                  if (url) execCommand("insertImage", url);
                }}
                className="p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded transition-colors"
                title="Insert Image"
              >
                <FaImage className="text-lg" />
              </button>
            </div>

            {/* Editable Content */}
            <div
              ref={contentEditableRef}
              className="editor-content outline-none text-lg text-on-surface leading-relaxed min-h-128"
              contentEditable
              suppressContentEditableWarning
              data-placeholder="Start writing..."
              onInput={handleContentChange}
              onBlur={handleContentChange}
              dangerouslySetInnerHTML={{ __html: form.content }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default WriterEditor;
