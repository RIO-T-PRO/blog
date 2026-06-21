import Footer from "@/components/footer";
import { FeaturedArticlesSection } from "@/components/home/featured-aticles";
import { HeroSection } from "@/components/home/hero";
import { NavBar } from "@/components/home/nav-bar";
import { NewsletterSection } from "@/components/home/news-letter";
import LatestReadingSection from "@/components/home/recent-articles";

import { useEffect, useState } from "react";

type HomeProps = {
  onSearchOpen?: () => void;
};

const Home = ({ onSearchOpen = () => {} }: HomeProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = (scrollTop / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Progress bar */}
      <div
        className="fixed left-0 top-0 z-50 h-0.5 bg-primary-container transition-all"
        style={{ width: `${progress}%` }}
      />

      {/* NavBar now matches App.tsx pattern */}
      <NavBar onSearchOpen={onSearchOpen} />

      <main className="space-y-20 pb-16">
        <HeroSection />
        <FeaturedArticlesSection />
        <LatestReadingSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
