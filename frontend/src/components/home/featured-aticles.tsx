import { useEffect } from "react";
import { useArticle } from "@/lib/context/article";
import { Container } from "../layout/container";
import SectionHeading from "../layout/section-heading";
import { FaChevronRight } from "react-icons/fa";
import ArticleCard from "../article/article-card";
import { mapArticleToCard } from "@/lib/mappers/article-card";

export const FeaturedArticlesSection = () => {
  const { articles, fetchArticles, loading } = useArticle();

  useEffect(() => {
    fetchArticles({ status: "PUBLISHED", take: 5 }); // fetch the latest 5
  }, [fetchArticles]);

  if (loading) return <p className="text-center py-10">Loading picks...</p>;

  if (articles.length === 0)
    return <p className="text-center py-10">No articles yet.</p>;

  const featured = mapArticleToCard(articles[0], "featured");
  const compact = articles
    .slice(1)
    .map((article) => mapArticleToCard(article, "compact"));

  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          title="Editor's Picks"
          action={
            <a
              href="/archive"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View all <FaChevronRight size={12} />
            </a>
          }
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <ArticleCard {...featured} />
          </div>
          {compact.map((cardProps, i) => (
            <ArticleCard key={articles[i + 1]?.id} {...cardProps} />
          ))}
        </div>
      </Container>
    </section>
  );
};
