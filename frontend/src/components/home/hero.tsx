import { useEffect, useState } from "react";
import { FaArrowRight, FaClock, FaFeatherPointed } from "react-icons/fa6";

import Container from "../ui/container";

import type { Article, PublicPost } from "@/types/post";
import { getPublishedPosts } from "@/lib/api/landing-page";
import { postToArticle } from "@/lib/mappers/post-to-articles";

type PublishedPostsResponse = {
  data: {
    posts: PublicPost[];
  };
};

const HeroSection = () => {
  const [featuredStory, setFeaturedStory] = useState<Article | null>(null);

  useEffect(() => {
    const loadFeaturedPost = async () => {
      try {
        // ✅ properly typed response (fixes TS unknown error)
        const response = (await getPublishedPosts(
          1,
          1,
        )) as PublishedPostsResponse;

        const firstPost = response.data.posts?.[0];

        if (!firstPost) return;

        setFeaturedStory(postToArticle(firstPost));
      } catch (error) {
        console.error("Failed to load featured story:", error);
      }
    };

    loadFeaturedPost();
  }, []);

  if (!featuredStory) {
    return (
      <section className="relative overflow-hidden">
        <div className="h-[calc(100vh-80px)] min-h-160 animate-pulse bg-surface-container" />
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden">
      {/* 👇 EVERYTHING BELOW UNCHANGED */}
      <div className="relative h-[calc(100vh-80px)] min-h-160 overflow-hidden">
        <div className="absolute inset-0">
          <img
            alt={featuredStory.title}
            className="h-full w-full object-cover"
            src={featuredStory.image}
          />

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/10" />
          <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 flex h-full items-center">
          <Container className="w-full px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="flex h-full items-center">
              <div className="w-full max-w-5xl pt-10 md:pt-0">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                    <FaFeatherPointed className="text-xs text-accent-teal" />
                    <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
                      Featured Story
                    </span>
                  </span>

                  <span className="hidden rounded-full border border-white/10 bg-black/20 px-4 py-2 font-ui text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md sm:inline-flex">
                    Editorial Pick
                  </span>
                </div>

                <h1 className="max-w-4xl font-display text-4xl leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  {featuredStory.title}
                </h1>

                <p className="mt-6 max-w-2xl font-body text-base leading-8 text-white/75 sm:text-lg md:text-xl">
                  {featuredStory.excerpt}
                </p>

                <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-center">
                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <button
                      className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-white px-6 font-ui text-sm font-semibold uppercase tracking-wide text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-2xl"
                      type="button"
                    >
                      Read Essay
                      <FaArrowRight className="text-xs" />
                    </button>

                    <div className="inline-flex items-center gap-2 text-sm text-white/60">
                      <FaClock className="text-xs" />
                      <span>{featuredStory.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 lg:justify-center">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/15">
                      <img
                        alt={featuredStory.author}
                        className="h-full w-full object-cover"
                        src={featuredStory.authorImage}
                      />
                      <div className="absolute inset-0 rounded-full ring-1 ring-black/10" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-ui text-sm font-semibold tracking-wide text-white">
                        {featuredStory.author}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/60">
                        <span>{featuredStory.date}</span>
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        <span>{featuredStory.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block" />
                </div>
              </div>
            </div>
          </Container>
        </div>

        <div className="absolute right-8 top-8 hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl lg:block">
          <p className="font-ui text-[10px] uppercase tracking-[0.25em] text-white/50">
            Weekly Feature
          </p>

          <p className="mt-2 font-display text-3xl text-white">#014</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
