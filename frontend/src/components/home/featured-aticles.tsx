import { articles } from "@/types/articles";
import { Container } from "../layout/container";
import SectionHeading from "../layout/section-heading";
import { FaChevronRight } from "react-icons/fa";
import ArticleCard from "../article/article-card";

export const FeaturedArticlesSection = () => {
  const featured = articles.find((a) => a.variant === "featured");

  const compact = articles.filter((a) => a.variant === "compact");

  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          title="Editor's Picks"
          action={
            <a
              href="#"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View all <FaChevronRight size={12} />
            </a>
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Featured (safe render) */}
          {featured && (
            <div className="md:col-span-2">
              <ArticleCard
                variant="featured"
                title={featured.title}
                excerpt={featured.excerpt}
                category={featured.category}
                readTime={featured.readTime}
                author={featured.author}
                date={featured.date}
                image={featured.image}
                avatar={featured.avatar}
              />
            </div>
          )}

          {/* Compact cards */}
          {compact.map((article) => (
            <ArticleCard
              key={article.id}
              variant="compact"
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              readTime={article.readTime}
              author={article.author}
              date={article.date}
              image={article.image}
              avatar={article.avatar}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
