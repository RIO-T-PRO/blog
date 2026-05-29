import ArticlesGrid from "@/components/home/articles-grid";
import CategoriesBar from "@/components/home/categories-bar";
import HeroSection from "@/components/home/hero";
import NewsletterSection from "@/components/home/news-letter";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface antialiased">
      <main className="pb-20">
        <HeroSection />
        <CategoriesBar />
        <ArticlesGrid />
        <NewsletterSection />
      </main>
    </div>
  );
};

export default Home;
