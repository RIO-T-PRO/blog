import { useEffect, useMemo, useState } from "react";
import { getAllPosts, updatePost } from "@/lib/api/posts";
import type { Post } from "@/types/post";
import { FaPaperPlane, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PostModal from "../post/post-modal";

type Tab = "all" | "published" | "draft";

const WriterPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [tab, setTab] = useState<Tab>("all");
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getAllPosts(1, 20);
      const normalized = (res?.data?.posts ?? []).map((p: any) => ({
        ...p,
        // no renaming – keep post_id as is
      }));
      setPosts(normalized);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPost(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const filtered = useMemo(() => {
    const list = posts ?? [];
    if (tab === "published") return list.filter((p) => p.published);
    if (tab === "draft") return list.filter((p) => !p.published);
    return list;
  }, [tab, posts]);

  const handlePublish = async (post_id: string) => {
    try {
      setLoadingId(post_id);
      const res = await updatePost(post_id, { published: true });
      if (res?.data?.post) {
        setPosts((prev) =>
          prev.map((p) =>
            p.post_id === post_id ? { ...p, published: true } : p,
          ),
        );
        setSelectedPost((prev) =>
          prev?.post_id === post_id ? { ...prev, published: true } : prev,
        );
      }
    } catch (err) {
      console.error("Publish failed:", err);
    } finally {
      setLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-sm text-text-secondary">Loading posts...</div>
    );
  }

  return (
    <>
      <div className="bg-surface rounded-2xl border border-border-muted overflow-hidden">
        <div className="flex border-b border-border-muted">
          {(["all", "published", "draft"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-sm font-medium transition ${
                tab === t
                  ? "text-primary border-b-2 border-primary"
                  : "text-text-secondary hover:text-primary"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="divide-y divide-border-muted">
          {filtered.map((post) => (
            <article
              key={post.post_id}
              onClick={() => setSelectedPost(post)}
              className="relative p-4 md:p-6 flex items-center gap-6 hover:bg-surface-container/40 transition cursor-pointer"
            >
              <div className="w-28 h-18 rounded-lg overflow-hidden bg-surface-container shrink-0">
                {post.cover_image && (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className={`w-full h-full object-cover ${
                      !post.published ? "grayscale opacity-70" : ""
                    }`}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    post.published
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>

                <h3 className="mt-1 text-lg font-semibold truncate">
                  {post.title}
                </h3>

                <p className="text-xs text-text-secondary truncate">
                  /{post.slug}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {!post.published && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePublish(post.post_id);
                    }}
                    className="p-2 rounded-lg hover:bg-green-100"
                  >
                    <FaPaperPlane />
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard?tab=write&postId=${post.post_id}`);
                  }}
                  className="p-2 rounded-lg hover:bg-surface-container"
                >
                  <FaEdit />
                </button>
              </div>

              {loadingId === post.post_id && (
                <div className="absolute inset-0 bg-white/40 flex items-center justify-center text-xs text-text-secondary">
                  Processing...
                </div>
              )}
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="p-10 text-center text-text-secondary text-sm">
            No posts found
          </div>
        )}
      </div>

      <PostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onPublish={handlePublish}
      />
    </>
  );
};

export default WriterPosts;
