import { useEffect } from "react";
import { useArticle } from "@/lib/context/article";
import { Container } from "../layout/container";
import SectionHeading from "../layout/section-heading";
import { ArticleListItem } from "../article/article-items";
import { mapArticleToCard } from "@/lib/mappers/article-card";

const LatestReadingSection = () => {
  const { articles, fetchArticles, loading } = useArticle();

  useEffect(() => {
    fetchArticles({ status: "PUBLISHED", take: 6 });
  }, [fetchArticles]);

  if (loading) return <p className="text-center py-10">Loading latest...</p>;
  if (articles.length === 0)
    return <p className="text-center py-10">No published articles yet.</p>;

  return (
    <section className="py-10">
      <Container>
        <SectionHeading title="Latest Reading" />
        <div className="mt-8 flex flex-col space-y-6">
          {articles.map((article) => {
            const cardProps = mapArticleToCard(article, "compact");
            return <ArticleListItem key={article.id} {...cardProps} />;
          })}
        </div>
      </Container>
    </section>
  );
};

export default LatestReadingSection;
