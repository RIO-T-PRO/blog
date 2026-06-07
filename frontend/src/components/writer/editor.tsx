import { useEffect, useRef, useState } from "react";

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

  const [form, setForm] = useState<PostEditorForm & { id?: string }>({
    id: (initial as any)?.id,
    title: initial?.title || "",
    slug: initial?.slug || "",
    excerpt: initial?.excerpt || "",
    content: initial?.content || "",
    cover_image: initial?.cover_image || "",
    published: initial?.published || false,
  });

  const sync = () => {
    const title = titleRef.current?.innerText || "";
    const content = contentRef.current?.innerHTML || "";

    setForm((prev) => ({
      ...prev,
      title,
      content,
    }));
  };

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  useEffect(() => {
    if (!form.slug && form.title) {
      setForm((prev) => ({
        ...prev,
        slug: generateSlug(form.title),
      }));
    }
  }, [form.title]);

  const save = async () => {
    const payload = { ...form, published: false };

    const res = form.id
      ? await updatePost(form.id, payload)
      : await createPost(payload);

    if (!res) return;

    await onSave?.({
      id: res.data.post.id,
      title: res.data.post.title,
      slug: res.data.post.slug,
      excerpt: res.data.post.excerpt || "",
      content: res.data.post.content,
      cover_image: res.data.post.cover_image || "",
      published: res.data.post.published,
    });
  };

  const publish = async () => {
    const payload = { ...form, published: true };

    const res = form.id
      ? await updatePost(form.id, payload)
      : await createPost(payload);

    if (!res) return;

    await onPublish?.({
      id: res.data.post.id,
      title: res.data.post.title,
      slug: res.data.post.slug,
      excerpt: res.data.post.excerpt || "",
      content: res.data.post.content,
      cover_image: res.data.post.cover_image || "",
      published: res.data.post.published,
    });
  };

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-background text-on-surface">
      <main className="flex-1 min-w-0 min-h-0 overflow-y-auto scrollbar-hidden px-6 py-16">
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
              className="w-full min-h-28 resize-none rounded-xl border border-border-muted bg-surface px-4 py-3 text-[19px] leading-8 text-text-secondary outline-none"
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

      <aside className="w-80 shrink-0 overflow-hidden border-l border-border-muted bg-surface-container/30 px-5 py-6 flex flex-col gap-6">
        <div className="space-y-1">
          <h2 className="text-xs uppercase tracking-widest text-on-surface-variant">
            Post Inspector
          </h2>
          <p className="text-xs text-text-secondary">Manage draft metadata</p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={save}
            className="w-full rounded-lg border border-border-muted py-2.5 text-sm transition hover:bg-surface"
          >
            Save Draft
          </button>

          <button
            onClick={publish}
            className="w-full rounded-lg bg-primary py-2.5 text-sm text-white"
          >
            Publish
          </button>
        </div>

        <div className="border-t border-border-muted" />

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wide text-on-surface-variant">
            Slug
          </label>
          <input
            value={form.slug}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, slug: e.target.value }))
            }
            className="w-full rounded-lg border border-border-muted bg-surface p-2.5 text-sm outline-none"
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
          <div className="mt-1 text-xs leading-5 text-text-secondary">
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
