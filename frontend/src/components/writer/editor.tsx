import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

import type { PostEditorForm } from "@/types/post";
import { createPost, updatePost, getPost } from "@/lib/api/posts";

type PostEditorProps = {
  initial?: Partial<PostEditorForm>;
  onSave?: (data: PostEditorForm) => void | Promise<void>;
  onPublish?: (data: PostEditorForm) => void | Promise<void>;
};

const PostEditor = ({ initial, onSave, onPublish }: PostEditorProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const postIdFromUrl = searchParams.get("postId");

  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [loading, setLoading] = useState(!!postIdFromUrl && !initial?.post_id);

  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [publishMsg, setPublishMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [publishSlugError, setPublishSlugError] = useState<string | null>(null);

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const clearTimeoutRef = useRef<number | null>(null);
  const syncingRef = useRef(false);

  const [form, setForm] = useState<PostEditorForm>({
    post_id: initial?.post_id,
    title: initial?.title || "",
    slug: initial?.slug || "",
    excerpt: initial?.excerpt || "",
    content: initial?.content || "",
    cover_image: initial?.cover_image || "",
    published: initial?.published || false,
  });

  const isEditing = Boolean(form.post_id);
  const isFormValid =
    form.title.trim().length > 0 && form.content.trim().length > 0;

  // Fetch post if editing
  useEffect(() => {
    if (postIdFromUrl && !initial?.post_id) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const res = await getPost(postIdFromUrl);
          const post = res.data.post;
          setForm({
            post_id: post.post_id,
            title: post.title || "",
            slug: post.slug || "",
            excerpt: post.excerpt || "",
            content: post.content || "",
            cover_image: post.cover_image || "",
            published: post.published,
          });
          setSlugManuallyEdited(true); // preserve original slug
        } catch (err: any) {
          console.error(err);
          if (err.response?.status === 404) {
            setErrorMsg("Post not found. It may have been deleted.");
          } else if (err.response?.status === 403) {
            setErrorMsg("You don't have permission to edit this post.");
          } else {
            setErrorMsg("Failed to load post. Please try again.");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [postIdFromUrl, initial?.post_id]);

  const clearMessages = () => {
    if (clearTimeoutRef.current) clearTimeout(clearTimeoutRef.current);
    clearTimeoutRef.current = window.setTimeout(() => {
      setSaveMsg(null);
      setPublishMsg(null);
      setErrorMsg(null);
      setSlugError(null);
      setPublishSlugError(null);
    }, 5000);
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
        return { ...prev, title, content };
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

  useEffect(() => {
    if (titleRef.current && form.title !== titleRef.current.innerText) {
      titleRef.current.innerText = form.title;
    }
    if (contentRef.current && form.content !== contentRef.current.innerHTML) {
      contentRef.current.innerHTML = form.content;
    }
  }, [form.title, form.content]);

  const redirectToPosts = () => {
    navigate("/dashboard?tab=posts");
  };

  const handleSlugConflict = (isPublish: boolean = false) => {
    const errorMessage = isEditing
      ? "The slug you entered is already used by another post. Please choose a different slug, or revert to the original one."
      : "Slug already exists. Please edit the slug field to make it unique, then save again.";
    if (isPublish) {
      setPublishSlugError(errorMessage);
    } else {
      setSlugError(errorMessage);
    }
    const slugInput = document.querySelector(
      'input[placeholder*="slug"]',
    ) as HTMLInputElement;
    if (slugInput) slugInput.focus();
  };

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
      delete (payload as any).post_id; // remove post_id from payload

      const res = form.post_id
        ? await updatePost(form.post_id, payload)
        : await createPost(payload);

      setForm((prev) => ({
        ...prev,
        post_id: res.data.post.post_id,
        title: res.data.post.title,
        slug: res.data.post.slug,
        content: res.data.post.content,
        excerpt: res.data.post.excerpt || prev.excerpt,
        cover_image: res.data.post.cover_image || prev.cover_image,
        published: false,
      }));

      setSaveMsg(
        form.post_id
          ? "Draft updated successfully."
          : "Draft saved successfully.",
      );
      clearMessages();
      await onSave?.({
        post_id: res.data.post.post_id,
        title: res.data.post.title,
        slug: res.data.post.slug,
        excerpt: res.data.post.excerpt || "",
        content: res.data.post.content,
        cover_image: res.data.post.cover_image || "",
        published: res.data.post.published,
      });

      if (postIdFromUrl) redirectToPosts();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(null);
      setSlugError(null);
      setPublishSlugError(null);

      const status = err.response?.status;
      const message = err.response?.data?.message || err.message || "Error";

      if (status === 409 && message.toLowerCase().includes("slug")) {
        handleSlugConflict(false);
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
      delete (payload as any).post_id;

      const res = form.post_id
        ? await updatePost(form.post_id, payload)
        : await createPost(payload);

      setForm((prev) => ({
        ...prev,
        post_id: res.data.post.post_id,
        title: res.data.post.title,
        slug: res.data.post.slug,
        content: res.data.post.content,
        excerpt: res.data.post.excerpt || prev.excerpt,
        cover_image: res.data.post.cover_image || prev.cover_image,
        published: true,
      }));

      setPublishMsg(
        form.post_id
          ? "Post updated and published successfully."
          : "Post published successfully.",
      );
      clearMessages();
      await onPublish?.({
        post_id: res.data.post.post_id,
        title: res.data.post.title,
        slug: res.data.post.slug,
        excerpt: res.data.post.excerpt || "",
        content: res.data.post.content,
        cover_image: res.data.post.cover_image || "",
        published: res.data.post.published,
      });
      redirectToPosts();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(null);
      setSlugError(null);
      setPublishSlugError(null);

      const status = err.response?.status;
      const message = err.response?.data?.message || err.message || "Error";

      if (status === 409 && message.toLowerCase().includes("slug")) {
        handleSlugConflict(true);
      } else {
        setErrorMsg(message);
      }
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-text-secondary">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-background text-on-surface">
      {/* MAIN EDITOR – unchanged JSX, but note form.post_id is not displayed */}
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

      {/* SIDEBAR – unchanged except for slug input value */}
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

          {slugError && (
            <div className="px-1 text-xs text-red-500">
              {slugError}{" "}
              <button
                onClick={() => {
                  const input = document.querySelector(
                    'input[placeholder*="slug"]',
                  ) as HTMLInputElement;
                  if (input) input.focus();
                }}
                className="underline"
              >
                Edit slug
              </button>
            </div>
          )}

          {publishSlugError && (
            <div className="px-1 text-xs text-red-500">
              {publishSlugError}{" "}
              <button
                onClick={() => {
                  const input = document.querySelector(
                    'input[placeholder*="slug"]',
                  ) as HTMLInputElement;
                  if (input) input.focus();
                }}
                className="underline"
              >
                Edit slug
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-border-muted" />

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wide text-on-surface-variant">
            Slug
          </label>
          <input
            value={form.slug}
            onChange={(e) => {
              setSlugManuallyEdited(true);
              setSlugError(null);
              setPublishSlugError(null);
              setForm((prev) => ({ ...prev, slug: e.target.value }));
            }}
            className="w-full rounded-lg border border-border-muted bg-surface p-2 text-sm outline-none"
            placeholder="unique-url-slug"
          />
          <p className="text-xs text-text-secondary">
            The slug is the URL-friendly version of the title. Leave empty to
            auto-generate (for new posts only).
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wide text-on-surface-variant">
            Cover image URL
          </label>
          <input
            value={form.cover_image}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, cover_image: e.target.value }))
            }
            className="w-full rounded-lg border border-border-muted bg-surface p-2.5 text-sm outline-none"
            placeholder="https://example.com/image.jpg"
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
