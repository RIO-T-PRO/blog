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
    <div className="rounded-xl border border-outline-variant bg-surface p-6">
      <h2 className="text-xl font-semibold mb-4">Published Articles</h2>
      {published.length === 0 ? (
        <p>No published articles.</p>
      ) : (
        <ul className="space-y-3">
          {published.map((article) => (
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

export default PublishedArticlesPage;
