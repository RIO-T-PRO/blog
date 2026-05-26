export interface Author {
  name: string;
  avatar: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: Author;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}
