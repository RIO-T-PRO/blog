import { useEffect } from "react";
import { useArticle } from "@/lib/context/article";
import { formatDate } from "@/lib/utils";

const ArticleDetail = ({ articleId }: { articleId: string }) => {
  const {
    currentArticle,
    currentArticleLoading,
    currentArticleError,
    fetchArticle,
    clearCurrentArticle,
  } = useArticle();

  useEffect(() => {
    if (!articleId || articleId === "undefined") return;
    fetchArticle(articleId);
    return () => clearCurrentArticle();
  }, [articleId, fetchArticle, clearCurrentArticle]);

  if (currentArticleLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">
          progress_activity
        </span>
      </div>
    );
  }

  if (currentArticleError) {
    return (
      <div className="py-20 text-center text-error">
        <p className="text-lg">{currentArticleError}</p>
      </div>
    );
  }

  if (!currentArticle) return null;

  const article = currentArticle;
  const author = article.author;
  const displayDate = article.publishedAt ?? article.createdAt;

  return (
    <article>
      <header className="mb-10">
        <h1 className="font-display text-display text-on-surface mb-8">
          {article.title}
        </h1>
        <div className="flex items-center space-x-4 pb-8 border-b border-outline-variant">
          <img
            src={author?.profile?.avatarUrl ?? "/default-avatar.png"}
            alt={author?.name ?? "Author"}
            className="w-12 h-12 rounded-full object-cover border border-outline-variant"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-label-md text-label-md text-on-surface">
                {author?.name}
              </span>
              {author?.profile?.username && (
                <>
                  <span className="text-on-surface-variant text-caption">
                    •
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    @{author.profile.username}
                  </span>
                </>
              )}
            </div>
            <div className="mt-1">
              <time
                dateTime={displayDate}
                className="font-caption text-caption text-on-surface-variant"
              >
                {formatDate(displayDate)}
              </time>
            </div>
          </div>
        </div>
      </header>

      {article.featuredImage && (
        <figure className="mb-12 rounded-lg overflow-hidden border border-outline-variant">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-auto object-cover aspect-video"
          />
        </figure>
      )}

      <div
        className="font-body-lg text-body-lg text-on-surface space-y-8 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
};

export default ArticleDetail;
