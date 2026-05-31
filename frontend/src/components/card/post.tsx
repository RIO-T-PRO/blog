import PostCard from "@/components/card/post-card";

const posts = [
  {
    id: 7291,
    title: "The Ethics of Algorithmic Curation in Modern Newsrooms",
    author: "Julian Vane",
    status: "Flagged",
    category: "Philosophy",
  },
  {
    id: 7285,
    title: "Collaborative Spaces: Why the Office Still Matters",
    author: "Elena Ruiz",
    status: "Published",
    category: "Architecture",
  },
  {
    id: 7284,
    title: "The Art of Slow Living in a Fast Digital World",
    author: "Sam Thorne",
    status: "Draft",
    category: "Lifestyle",
  },
];

const PostsPage = () => {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-headline-md text-4xl">Content Moderation</h2>

          <p className="mt-2 text-text-secondary">
            Manage editorial submissions and publishing.
          </p>
        </div>

        <button className="rounded-lg bg-primary px-5 py-3 font-semibold text-on-primary transition-opacity hover:opacity-90">
          Create Post
        </button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
