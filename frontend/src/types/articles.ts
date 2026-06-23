export type Article = {
  id: string;

  variant: "featured" | "compact";

  category: string;
  readTime?: string;

  title: string;
  excerpt: string;

  author: string;
  date?: string;

  image: string;
  avatar?: string;
};

export const articles: Article[] = [
  {
    id: "1",
    variant: "featured",
    category: "Architecture",
    readTime: "5 min read",
    title: "The Resurgence of Brutalism in Digital Interface Design",
    excerpt:
      "How the raw, unpolished aesthetic of mid-century concrete architecture is finding a new home in modern web applications.",
    author: "Elena Rostova",
    date: "Oct 12, 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFQRkmK-h6_KzJHuNNm6UFsvzkuH6FPgYvCIULWSbbRVRdnY7sVHgVnzu1DwUt45SXM2c_Wd84g9O342Ze5iWPTwHgkSZ23idQPyQEaDN_MArKAami2Jrspa9obEZ-OlGGUeJCNN0VFhbOkM0mdfUFSImYHACnFXj_XQS5D_T3suktw5Wvl9KfIgbxj-Tb2qjjBPwxKSO7fow-l8byzEk67e8SEGr9FakOtApmiLWtqkrhp5xcPX8PQmSZmcc-wWf14Z3jFQ442sQv",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJrM3Bi8X8siixNk5zjIcMbfyKMPBjdLcmZzGippkS-MXY63DSodtCtoxYHEBUoEWFPU-J52FO81dxpuOhHDOC3bQRUKhYUlF7M4d39-WcEA6s0e4zyALRH_74K7n4IWMtYQmAWctVQu9AvUa9jVSVshH6mn5a3hkzoIN8dDnKBTxUcHZeDKk6JdDNNaNVN2nB0u3-L7EyLWGZHHjAhV4VwwF8OxUxN4JgTDDqqIK1IxXyWZQ5I3JKHFhJEUWkhlAQKDmiUVmv0q5l",
  },

  {
    id: "2",
    variant: "compact",
    category: "Writing",
    readTime: "3 min read",
    title: "Why Constraints Fuel Better Storytelling",
    excerpt:
      "Embracing limitations can paradoxically unlock deeper creative avenues.",
    author: "Marcus Vance",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDG6WtWUAYma7SIOTCIfHMr0KKyZWjW3oIU30wnAQtSikCxE46Kmgo2n8a0r7_dRhwsKn90uMVd5KUGQJf0wCHKKunaUam41SxYsac2BMT2SrXnIXh5ycNpcfegzLRN68EtclqFpND-3Fq-gsCfDVF2p3TezSH9y0BF3km7qskCGQdhyABU6Eu5oqUIqk9iXb9s4Q5AK4_s3NTjgKGVfQYIjXfSzxRnCjqYZOUDQMAUJOCSgMfNlanA6Y9Xp966tXoKuSFQNttb8zAn",
  },

  {
    id: "3",
    variant: "compact",
    category: "Technology",
    readTime: "8 min read",
    title: "The Illusion of Infinite Scroll",
    excerpt: "Examining the psychological impact of bottomless content feeds.",
    author: "Sarah Lin",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJFMf1fTrMhpAHMeeYLf7IcvIatRxcoKFcQm59-BFlFL3oP_xeBMBQAJAHxXS8aeG6JxfklnPNWaHl6r2m7NFHMcYXFehNttdaFuJOnb5A5YHH3xJv61z6aXVPFrZhbA2w2hZ8xRuk-ds7FarFi4l0UF1bxicxtTmDOYbXWE8OTyE8RlTyHiEIJWfweR9CK0tdrSsTIcLSCT-vvVz7rtk2s3eenQizpCe6Fo2jBwo4KTIqyulgUelityX--LIe4nQlATukXInwbJL",
  },
];
