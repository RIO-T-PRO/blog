import { useEffect, useRef, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

import type { PostEditorForm } from "@/types/post";
import { createPost, updatePost } from "@/lib/api/posts";

type PostEditorProps = {
  initial?: Partial<PostEditorForm & { id?: string }>;
  onSave?: (data: PostEditorForm) => void | Promise<void>;
  onPublish?: (data: PostEditorForm) => void | Promise<void>;
};

const PostEditor = ({ initial, onSave, onPublish }: PostEditorProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [publishMsg, setPublishMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [publishSlugError, setPublishSlugError] = useState<string | null>(null);

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const clearTimeoutRef = useRef<number | null>(null);
  const syncingRef = useRef(false);

  const [form, setForm] = useState<PostEditorForm & { id?: string }>({
    id: initial?.id,
    title: initial?.title || "",
    slug: initial?.slug || "",
    excerpt: initial?.excerpt || "",
    content: initial?.content || "",
    cover_image: initial?.cover_image || "",
    published: initial?.published || false,
  });

  const isEditing = Boolean(form.id);

  const isFormValid =
    form.title.trim().length > 0 && form.content.trim().length > 0;

  const clearMessages = () => {
    if (clearTimeoutRef.current) {
      clearTimeout(clearTimeoutRef.current);
    }
    clearTimeoutRef.current = window.setTimeout(() => {
      setSaveMsg(null);
      setPublishMsg(null);
      setErrorMsg(null);
      setPublishSlugError(null);
    }, 3000);
  };

  const sync = () => {
    if (syncingRef.current) return;
    syncingRef.current = true;

    requestAnimationFrame(() => {
      const title = titleRef.current?.innerText ?? "";
      const content = contentRef.current?.innerHTML ?? "";

      setForm((prev) => {
        if (prev.title === title && prev.content === content) {
          syncingRef.current = false;
          return prev;
        }

        syncingRef.current = false;
        return {
          ...prev,
          title,
          content,
        };
      });
    });
  };

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  useEffect(() => {
    if (slugManuallyEdited) return;

    const slug = generateSlug(form.title);
    setForm((prev) => (prev.slug === slug ? prev : { ...prev, slug }));
  }, [form.title, slugManuallyEdited]);

  const save = async () => {
    if (saving) return;

    if (!isFormValid) {
      setErrorMsg("Please complete title and content before saving");
      return;
    }

    try {
      setSaving(true);
      setSaveMsg(null);
      setPublishMsg(null);
      setErrorMsg(null);
      setSlugError(null);
      setPublishSlugError(null);

      const latestTitle = titleRef.current?.innerText ?? form.title;
      const latestContent = contentRef.current?.innerHTML ?? form.content;

      const payload = {
        ...form,
        title: latestTitle,
        content: latestContent,
        published: false,
      };

      const res = form.id
        ? await updatePost(form.id, payload)
        : await createPost(payload);

      setForm((prev) => ({
        ...prev,
        id: res.data.post.id,
        title: res.data.post.title,
        slug: res.data.post.slug,
        content: res.data.post.content,
        excerpt: res.data.post.excerpt || prev.excerpt,
        cover_image: res.data.post.cover_image || prev.cover_image,
        published: false,
      }));

      setSaveMsg(
        form.id ? "Draft updated successfully." : "Draft saved successfully.",
      );

      clearMessages();

      await onSave?.({
        id: res.data.post.id,
        title: res.data.post.title,
        slug: res.data.post.slug,
        excerpt: res.data.post.excerpt || "",
        content: res.data.post.content,
        cover_image: res.data.post.cover_image || "",
        published: res.data.post.published,
      });
    } catch (err) {
      console.error(err);

      setErrorMsg(null);
      setSlugError(null);
      setPublishSlugError(null);

      const message = err instanceof Error ? err.message : "Error";

      if (message.toLowerCase().includes("slug")) {
        // Show same message as publish, directing user to Posts page
        setSlugError(
          "Slug already exists. Please go to the Posts page to manage your posts.",
        );
      } else {
        setErrorMsg(message);
      }
    } finally {
      setSaving(false);
    }
  };

  const publish = async () => {
    if (publishing || form.published) return;

    if (!isFormValid) {
      setErrorMsg("Please complete title and content before publishing");
      return;
    }

    try {
      setPublishing(true);
      setSaveMsg(null);
      setPublishMsg(null);
      setErrorMsg(null);
      setSlugError(null);
      setPublishSlugError(null);

      const latestTitle = titleRef.current?.innerText ?? form.title;
      const latestContent = contentRef.current?.innerHTML ?? form.content;

      const payload = {
        ...form,
        title: latestTitle,
        content: latestContent,
        published: true,
      };

      const res = form.id
        ? await updatePost(form.id, payload)
        : await createPost(payload);

      setForm((prev) => ({
        ...prev,
        id: res.data.post.id,
        title: res.data.post.title,
        slug: res.data.post.slug,
        content: res.data.post.content,
        excerpt: res.data.post.excerpt || prev.excerpt,
        cover_image: res.data.post.cover_image || prev.cover_image,
        published: true,
      }));

      setPublishMsg(
        form.id
          ? "Post updated and published successfully."
          : "Post published successfully.",
      );

      clearMessages();

      await onPublish?.({
        id: res.data.post.id,
        title: res.data.post.title,
        slug: res.data.post.slug,
        excerpt: res.data.post.excerpt || "",
        content: res.data.post.content,
        cover_image: res.data.post.cover_image || "",
        published: res.data.post.published,
      });
    } catch (err) {
      console.error(err);

      setErrorMsg(null);
      setSlugError(null);
      setPublishSlugError(null);

      const message = err instanceof Error ? err.message : "Error";

      if (message.toLowerCase().includes("slug")) {
        setPublishSlugError(
          "Slug already exists. Please go to the Posts page to manage your posts.",
        );
      } else {
        setErrorMsg(message);
      }
    } finally {
      setPublishing(false);
    }
  };

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.innerText = form.title;
    }

    if (contentRef.current) {
      contentRef.current.innerHTML = form.content;
    }
  }, []);

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-background text-on-surface">
      {/* MAIN */}
      <main className="flex-1 min-w-0 min-h-0 overflow-y-auto px-6 py-16 scrollbar-hidden">
        <div className="max-w-195 mx-auto">
          {form.cover_image && (
            <img
              src={form.cover_image}
              alt="Cover"
              className="mb-10 max-h-95 w-full rounded-2xl object-cover"
            />
          )}

          <h1
            ref={titleRef}
            contentEditable
            suppressContentEditableWarning
            onInput={sync}
            data-placeholder="Untitled story..."
            className="font-display-lg mb-6 text-[46px] leading-[1.05] tracking-[-0.02em] outline-none empty:before:content-[attr(data-placeholder)]"
          />

          <div className="mb-10 flex items-center gap-4 text-xs text-text-secondary">
            <span className="uppercase tracking-wide">
              {form.slug || "auto-slug"}
            </span>
            <span>•</span>
            <span>{form.published ? "Published" : "Draft mode"}</span>
          </div>

          {/* EXCERPT */}
          <div className="mb-14 max-w-170 space-y-2">
            <label className="text-xs uppercase tracking-wide text-on-surface-variant">
              Excerpt
            </label>

            <textarea
              value={form.excerpt}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              className="w-full min-h-28 resize-none rounded-xl border border-border-muted bg-surface px-4 py-3 text-[19px] leading-8 text-text-secondary outline-none scrollbar-hidden"
            />
          </div>

          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onInput={sync}
            data-placeholder="Start writing..."
            className="font-body-reading min-h-125 whitespace-pre-wrap text-[20px] leading-9 tracking-[0.01em] outline-none empty:before:content-[attr(data-placeholder)] wrap-break-word overflow-wrap-anywhere"
          />
        </div>
      </main>

      {/* SIDEBAR */}
      <aside className="w-80 shrink-0 border-l border-border-muted bg-surface-container/30 px-5 py-6 flex flex-col gap-6">
        <div className="space-y-1">
          <h2 className="text-xs uppercase tracking-widest text-on-surface-variant">
            Post Inspector
          </h2>
          <p className="text-xs text-text-secondary">Manage draft metadata</p>
        </div>

        {!isFormValid && (
          <div className="flex items-start gap-2 text-xs text-text-secondary">
            <FaExclamationTriangle className="mt-0.5" />
            <span>
              Title and content are required before saving or publishing.
            </span>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex flex-col gap-2">
          <button
            onClick={save}
            disabled={saving || !isFormValid}
            className={`w-full rounded-lg border border-border-muted py-2 text-sm transition ${
              saving || !isFormValid
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-surface"
            }`}
          >
            {saving ? "Saving..." : isEditing ? "Update Draft" : "Save Draft"}
          </button>

          <button
            onClick={publish}
            disabled={publishing || !isFormValid || form.published}
            className={`w-full rounded-lg py-2 text-sm text-white ${
              publishing || !isFormValid || form.published
                ? "cursor-not-allowed bg-primary/60"
                : "bg-primary"
            }`}
          >
            {form.published
              ? "Already Published"
              : publishing
                ? "Publishing..."
                : isEditing
                  ? "Update & Publish"
                  : "Publish"}
          </button>

          {saveMsg && (
            <div className="px-1 text-xs text-text-secondary">{saveMsg}</div>
          )}

          {publishMsg && (
            <div className="px-1 text-xs text-text-secondary">{publishMsg}</div>
          )}

          {errorMsg && (
            <div className="px-1 text-xs text-red-500">{errorMsg}</div>
          )}

          {/* Slug error for both draft and publish – shown in the same place */}
          {slugError && (
            <div className="px-1 text-xs text-red-500">
              {slugError}{" "}
              <a href="/posts" className="underline">
                Go to Posts
              </a>
            </div>
          )}

          {publishSlugError && (
            <div className="px-1 text-xs text-red-500">
              {publishSlugError}{" "}
              <a href="/posts" className="underline">
                Go to Posts
              </a>
            </div>
          )}
        </div>

        <div className="border-t border-border-muted" />

        {/* META */}
        <div className="space-y-2">
          <input
            value={form.slug}
            onChange={(e) => {
              setSlugManuallyEdited(true);
              setSlugError(null);
              setPublishSlugError(null);
              setForm((prev) => ({ ...prev, slug: e.target.value }));
            }}
            className="w-full rounded-lg border border-border-muted bg-surface p-2 text-sm outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wide text-on-surface-variant">
            Cover image
          </label>
          <input
            value={form.cover_image}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, cover_image: e.target.value }))
            }
            className="w-full rounded-lg border border-border-muted bg-surface p-2.5 text-sm outline-none"
          />
        </div>

        <div className="rounded-xl border border-border-muted bg-surface p-4">
          <div className="text-sm font-medium">
            {form.published ? "Published" : "Draft"}
          </div>
          <div className="mt-1 text-xs text-text-secondary">
            {form.published
              ? "This post is visible to everyone"
              : "This post is only visible to you"}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default PostEditor;
