import { useEffect, useState, useCallback } from "react";
import type { Comment } from "@/types/comment";
import { useAuth } from "@/lib/context/auth-context";
import { formatRelativeTime } from "@/lib/utils";
import { useComments } from "@/lib/context/comment";

const CommentItem = ({
  comment,
  level = 0,
  onReply,
  onEdit,
  onDelete,
}: {
  comment: Comment;
  level?: number;
  onReply: (parentId: string, content: string) => Promise<void>;
  onEdit: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const isOwner = user?.id === comment.userId;
  const isAdmin = user?.roles?.includes("admin");

  const handleSaveEdit = async () => {
    if (editContent.trim() && editContent !== comment.content) {
      await onEdit(comment.id, editContent);
    }
    setIsEditing(false);
  };

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;
    await onReply(comment.id, replyContent);
    setReplyContent("");
    setReplyOpen(false);
  };

  return (
    <div
      className={`flex space-x-4 ${
        level > 0 ? "ml-14 border-l-2 border-surface-container pl-4" : ""
      }`}
    >
      {comment.user?.profile?.avatarUrl ? (
        <img
          src={comment.user.profile.avatarUrl}
          alt={comment.user.name}
          className="w-10 h-10 rounded-full object-cover border border-outline-variant shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center font-label-md text-on-secondary-container shrink-0 border border-outline-variant">
          {comment.user?.name?.charAt(0) ?? "?"}
        </div>
      )}

      <div className="grow">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-label-md text-label-md text-on-surface">
            {comment.user?.name}
          </span>
          <span className="text-on-surface-variant text-caption">•</span>
          <time className="font-caption text-caption text-on-surface-variant">
            {formatRelativeTime(comment.createdAt)}
          </time>
        </div>

        {isEditing ? (
          <div>
            <textarea
              className="w-full bg-surface border border-outline-variant rounded-lg p-2 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none resize-none"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="font-label-md text-label-md text-primary hover:text-on-primary-container"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="font-body-md text-body-md text-on-surface">
            {comment.content}
          </p>
        )}

        <div className="mt-3 flex items-center space-x-4">
          <button
            onClick={() => setReplyOpen(!replyOpen)}
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center space-x-1"
          >
            <span className="material-symbols-outlined text-[18px]">reply</span>
            <span>Reply</span>
          </button>
          {(isOwner || isAdmin) && (
            <>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditContent(comment.content);
                }}
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(comment.id)}
                className="font-label-md text-label-md text-on-surface-variant hover:text-error transition-colors"
              >
                Delete
              </button>
            </>
          )}
        </div>

        {replyOpen && (
          <div className="mt-4">
            <textarea
              className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none resize-none min-h-20"
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <div className="flex justify-end mt-2 space-x-2">
              <button
                onClick={() => setReplyOpen(false)}
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleReplySubmit}
                className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-surface-tint transition-colors"
              >
                Reply
              </button>
            </div>
          </div>
        )}

        {comment.replies?.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            level={level + 1}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// Main Comment Section
// ------------------------------------------------------------------
const CommentSection = () => {
  const {
    comments,
    loading,
    error,
    loadComments,
    addComment,
    editComment,
    removeComment,
  } = useComments();

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    await addComment(newComment);
    setNewComment("");
  };

  const handleReply = useCallback(
    async (parentId: string, content: string) => {
      await addComment(content, parentId);
    },
    [addComment],
  );

  if (loading)
    return <div className="py-8 text-center">Loading comments...</div>;
  if (error) return <div className="py-8 text-center text-error">{error}</div>;

  return (
    <section id="comments">
      <h3 className="font-headline-md text-headline-md text-on-surface mb-8">
        Discussion ({comments.length})
      </h3>

      <div className="mb-12 flex space-x-4">
        <div className="w-10 h-10 rounded-full bg-surface-container shrink-0 border border-outline-variant flex items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined">person</span>
        </div>
        <div className="grow">
          <textarea
            className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none resize-none min-h-25 transition-all"
            placeholder="Add to the discussion..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handlePostComment}
              className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-lg hover:bg-surface-tint transition-colors"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onEdit={async (id, content) => {
              await editComment(id, content);
            }}
            onDelete={async (id) => removeComment(id)}
          />
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
