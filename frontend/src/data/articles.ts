import type { Article } from "../types/index";

export const featuredArticle: Article = {
  id: "featured",
  title: "The Architecture of Silence: Finding Focus in a Noisy World",
  excerpt:
    "In an era of constant connectivity, the most profound thoughts often emerge in the spaces we intentionally leave empty. A reflection on mindful isolation.",
  category: "Featured Essay",
  author: { name: "Eleanor Vance", avatar: "/avatars/eleanor.jpg" },
  date: "Oct 12",
  readTime: "8 min read",
  image: "/images/featured.jpg",
  slug: "architecture-of-silence",
};

export const latestArticles: Article[] = [
  {
    id: "1",
    title: "The Digital Ghost in the Machine",
    excerpt:
      "As artificial intelligence becomes increasingly ubiquitous, we must question not just what it can do, but what it means for our understanding of consciousness.",
    category: "Technology",
    author: { name: "Marcus Reed", avatar: "/avatars/marcus.jpg" },
    date: "Oct 10",
    readTime: "5 min read",
    image: "/images/tech.jpg",
    slug: "digital-ghost",
  },
  {
    id: "2",
    title: "On the Necessity of Boredom",
    excerpt:
      "Why the moments between activities, the empty spaces we rush to fill, are actually the fertile ground where our most creative ideas take root.",
    category: "Philosophy",
    author: { name: "Sarah Jenkins", avatar: "/avatars/sarah.jpg" },
    date: "Oct 08",
    readTime: "12 min read",
    image: "/images/boredom.jpg",
    slug: "necessity-of-boredom",
  },
  {
    id: "3",
    title: "The Evolution of Modern Minimalism",
    excerpt:
      "Tracing the journey of minimalist design from a radical artistic movement to a pervasive lifestyle choice in the 21st century.",
    category: "Culture",
    author: { name: "David Chen", avatar: "/avatars/david.jpg" },
    date: "Oct 05",
    readTime: "6 min read",
    image: "/images/minimalism.jpg",
    slug: "evolution-minimalism",
  },
];
