import { useNavigate } from "react-router-dom";
import type { Post } from "@/types/post";
import {
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useState } from "react";

type Props = {
  post: Post | null;
  onClose: () => void;
  onPublish: (id: string) => void;
  onDelete: (id: string) => void;
};

const PostModal = ({ post, onClose, onPublish, onDelete }: Props) => {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!post) return null;

  const hasTitle = Boolean(post.title?.trim());
  const hasSlug = Boolean(post.slug?.trim());
  const hasContent = Boolean(post.content?.trim());

  const isReadyToPublish = hasTitle && hasSlug && hasContent;
  const isPublished = Boolean(post.published);

  const checklist = [
    { label: "Title added", ok: hasTitle },
    { label: "Slug ready", ok: hasSlug },
    { label: "Content written", ok: hasContent },
  ];

  const handleEdit = () => {
    onClose();
    navigate(`/dashboard?tab=write&postId=${post.post_id}`);
  };

  const handleDeleteConfirm = () => {
    onDelete(post.post_id);
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
        onClick={onClose}
      >
        <div
          className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border-muted bg-surface shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border-muted px-5 py-4">
            <div className="flex items-center gap-2">
              {isPublished ? (
                <FaCheckCircle className="text-green-600" />
              ) : isReadyToPublish ? (
                <FaCheckCircle className="text-green-600" />
              ) : (
                <FaExclamationTriangle className="text-yellow-500" />
              )}

              <div>
                <h2 className="text-sm font-medium">
                  {isPublished ? "Published Post" : "Pre-Publish Review"}
                </h2>
                <p className="text-xs text-text-secondary">
                  {isPublished
                    ? "This post is already live."
                    : "Review the details before publishing."}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-surface-container"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-6 scrollbar-hidden">
            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full max-h-96 rounded-xl object-cover"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold">
                {post.title || "Untitled post"}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                <span className="uppercase tracking-wide">
                  /{post.slug || "missing-slug"}
                </span>

                <span>•</span>

                <span
                  className={`rounded-full px-2 py-0.5 ${
                    isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {isPublished ? "Published" : "Draft"}
                </span>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs uppercase text-text-secondary">
                Excerpt
              </h3>
              <p className="text-sm leading-6 text-text-secondary">
                {post.excerpt || "No excerpt provided"}
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xs uppercase text-text-secondary">
                Content Preview
              </h3>

              <div
                className="prose max-w-none text-sm leading-7 text-text-primary"
                dangerouslySetInnerHTML={{
                  __html:
                    post.content?.slice(0, 2000) || "<p>No content yet</p>",
                }}
              />
            </div>
            <div className="rounded-xl border border-border-muted p-4">
              <div className="mb-3 flex items-center gap-2">
                <FaInfoCircle className="text-text-secondary" />
                <h3 className="text-xs uppercase tracking-wide text-text-secondary">
                  Publish Checklist
                </h3>
              </div>

              <div className="space-y-1 text-sm">
                {checklist.map((item) => (
                  <p
                    key={item.label}
                    className={item.ok ? "text-green-600" : "text-red-500"}
                  >
                    {item.ok ? "✓" : "✗"} {item.label}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border-muted bg-surface px-4 py-4">
            <p className="text-xs text-text-secondary">
              {isPublished
                ? "No publishing action is needed."
                : "Review everything before publishing."}
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-border-muted px-4 py-2 text-sm"
              >
                Close
              </button>

              <button
                onClick={handleEdit}
                className="rounded-lg border border-border-muted bg-surface px-4 py-2 text-sm hover:bg-surface-container"
              >
                <FaEdit className="inline mr-1" /> Edit
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-600 hover:bg-red-100"
              >
                <FaTrash className="inline mr-1" /> Delete
              </button>

              {!isPublished && (
                <button
                  disabled={!isReadyToPublish}
                  onClick={() => onPublish(post.post_id)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium ${
                    isReadyToPublish
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "cursor-not-allowed bg-gray-300 text-gray-600"
                  }`}
                >
                  Publish now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom delete confirmation inside modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
          <div className="bg-surface rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Delete post?</h3>
            <p className="text-text-secondary mb-6">
              This action cannot be undone. The post will be permanently
              deleted.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg border border-border-muted hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostModal;
