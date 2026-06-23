import { useArticle } from "@/lib/context/article";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const DraftArticlesPage = () => {
  const { articles, loading, error, fetchArticles } = useArticle();

  useEffect(() => {
    fetchArticles({ status: "DRAFT" });
  }, [fetchArticles]);

  if (loading) return <p className="p-6">Loading drafts...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  const drafts = articles.filter((a) => a.status === "DRAFT");

  return (
    <div className="rounded-xl border border-outline-variant bg-surface p-6">
      <h2 className="text-xl font-semibold mb-4">Draft Articles</h2>
      {drafts.length === 0 ? (
        <p>No drafts yet.</p>
      ) : (
        <ul className="space-y-3">
          {drafts.map((article) => (
            <li
              key={article.id}
              className="p-3 bg-surface-container-lowest rounded-lg"
            >
              <Link
                to={`/dashboard/articles/${article.id}/edit`}
                className="font-medium hover:underline"
              >
                {article.title}
              </Link>
              <p className="text-sm text-on-surface-variant">
                {article.excerpt}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DraftArticlesPage;
