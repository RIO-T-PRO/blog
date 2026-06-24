import { useArticle } from "@/lib/context/article";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const PublishedArticlesPage = () => {
  const { articles, loading, error, fetchArticles } = useArticle();

  useEffect(() => {
    fetchArticles({ status: "PUBLISHED" });
  }, [fetchArticles]);

  if (loading) return <p className="p-6">Loading published articles...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  const published = articles.filter((a) => a.status === "PUBLISHED");

  return (
    <div className="bg-surface p-6">
      <h2 className="text-xl font-semibold mb-4">Published Articles</h2>
      {published.length === 0 ? (
        <p>No published articles.</p>
      ) : (
        <ul className="space-y-3">
          {published.map((article) => (
            <li
              key={article.id}
              className="flex items-center justify-between gap-4 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant"
            >
              <div className="min-w-0 flex-1">
                <Link
                  to={`/dashboard/articles/${article.id}`}
                  className="font-medium hover:underline block truncate"
                >
                  {article.title}
                </Link>
                {article.excerpt && (
                  <p className="mt-1 text-sm text-on-surface-variant max-h-10 overflow-hidden">
                    {article.excerpt}
                  </p>
                )}
              </div>
              <Link
                to={`/dashboard/articles/${article.id}/edit`}
                className="shrink-0 px-3 py-2 rounded-lg bg-primary-container text-on-primary-container text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublishedArticlesPage;
