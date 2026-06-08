import ArticlesGrid from "@/components/post/articles-grid";
import HeroSection from "@/components/home/hero";
import NewsletterSection from "@/components/home/news-letter";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface antialiased">
      <main className="pb-20">
        <HeroSection />
        <ArticlesGrid />
        <NewsletterSection />
      </main>
    </div>
  );
};

export default Home;
