import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

import Container from "../ui/container";
import ArticleCard from "./article-card";

import type { Article, PublicPost } from "@/types/post";
import { getPublishedPosts } from "@/lib/api/landing-page";
import { postToArticle } from "@/lib/mappers/post-to-articles";
import type { ArticleFilter } from "../home/categories-bar";
import CategoriesBar from "../home/categories-bar";

const getArticleTime = (article: Article) => {
  const time = new Date(article.date).getTime();
  return Number.isNaN(time) ? 0 : time;
};

const ArticlesGrid = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<ArticleFilter>("All");

  useEffect(() => {
    let mounted = true;

    const loadPosts = async () => {
      try {
        const response = await getPublishedPosts(1, 6);

        const mappedArticles = (response.data.posts as PublicPost[]).map(
          postToArticle,
        );

        if (mounted) {
          setArticles(mappedArticles);
        }
      } catch (error) {
        console.error("Failed to load articles:", error);

        if (mounted) {
          setArticles([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      mounted = false;
    };
  }, []);

  const visibleArticles = useMemo(() => {
    const sorted = [...articles].sort((a, b) => {
      const diff = getArticleTime(b) - getArticleTime(a);
      return diff;
    });

    if (selectedFilter === "Latest") {
      return sorted;
    }

    if (selectedFilter === "Oldest") {
      return [...sorted].reverse();
    }

    return articles;
  }, [articles, selectedFilter]);

  return (
    <section className="relative pt-8 pb-12">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-surface-container/20 to-transparent" />

      <Container>
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
              Editorial Collection
            </span>

            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-on-surface md:text-5xl">
              Latest Writing
            </h2>

            <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
              Essays, reflections, and deeply researched stories crafted for
              curious minds exploring culture, science, creativity, and the
              future.
            </p>
          </div>

          <Link
            to="/articles"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border-muted bg-surface px-6 font-ui text-sm font-semibold uppercase tracking-wide text-on-surface transition-all duration-300 hover:border-primary/20 hover:bg-surface-container hover:text-primary hover:shadow-sm"
          >
            View Archive
          </Link>
        </div>

        <CategoriesBar
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <article
                  key={index}
                  className="h-130 animate-pulse rounded-3xl border border-border-muted/60 bg-surface/80"
                />
              ))
            : visibleArticles.map((article) => (
                <ArticleCard key={article.post_id} article={article} />
              ))}
        </div>

        {!loading && visibleArticles.length === 0 && (
          <div className="mt-12 rounded-2xl border border-border-muted bg-surface px-6 py-10 text-center text-text-secondary">
            No published articles found.
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <Link
            to="/articles"
            className="group inline-flex h-13 items-center justify-center gap-3 rounded-2xl bg-primary px-8 font-ui text-sm font-semibold uppercase tracking-[0.12em] text-on-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary-container hover:shadow-xl"
          >
            Explore All Articles
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ArticlesGrid;
