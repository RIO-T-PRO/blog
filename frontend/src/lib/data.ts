export const categories: string[] = [
  "For You",
  "Philosophy",
  "Technology",
  "Culture",
  "Science",
  "Design",
];

export type Article = {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  authorImage: string;
};

export const featuredStory = {
  label: "Featured Essay",
  title: "The Architecture of Silence: Finding Focus in a Noisy World",
  excerpt:
    "In an era of constant connectivity, the most profound thoughts often emerge in the spaces we intentionally leave empty. A reflection on mindful isolation, creative solitude, and the forgotten beauty of uninterrupted thinking.",
  author: "Eleanor Vance",
  date: "Oct 12",
  readTime: "8 min read",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAq4GGSkcktB9MpTTH91a1wE7bJsGDhW5q_LNGgOv9faa2HovzDzRwWQZDMTO0ikIdgkDPiMUUyI2EeYdaH9VdhDR504cTijelDvxmq9C8BYtq9eyXXs6wEPzJXsjShUdKxe36QEwyh36xgIqZvPbko2y0RKW7O3hboFOPORo8oXPk9wJ8louDHIR-GQSWLbE9uye2hSIp0NAW7NhZI4EZcGvdNwHOrvFSaN6EL4lEQ6NS2nSBZ0fIE4AD6-doCFmbysia93Wffx5Y",
  authorImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC5ogq6HsxwTnMig8qdYPsyCpSSASf9WwH0uwzwEZgf8hGwydUUK2NoACPjJrgJ9-UUflZaZ2GuJpQn43QOKkGlE_UVsd_KNs5M-bEfbRB30ZreNju3j5N9HGfGWxlYgGFhvehxlGzIms4lTYzgj-socu6irBFZ2i4vpDKvtzUwwZkTGcNQarsCAevINGhlBDE-P3ohBU2E94oFwvgC1GXWCZzQjE0W5V4kp0IHrk6CV6jyqIFyCZuili5m_tNYp4VwgYiWMdtGJdc",
};

export const articles: Article[] = [
  {
    category: "Technology",
    title: "The Digital Ghost in the Machine",
    excerpt:
      "As artificial intelligence becomes increasingly woven into our daily lives, we begin to question whether technology reflects humanity or slowly reshapes it into something entirely unfamiliar.",
    author: "Marcus Reed",
    date: "Oct 10",
    readTime: "5 min read",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKz0bUk2OK2CC-R94izBlw9y0q0fzogmAA8s7g9sXoGrZV3bf3lkHfiVu0gv-N9wl2UHub92qjpsCBAO_I2YKGz5jFQyWkSo9OglMx3RWlY2W6M8HRBKGOZ6KmfuIy5XpIXzW3bBb-ZuAglduYDrtvF0Z4VkY68iyz0FMHS5vvXTUpzR_YkBNDMACRhUkpglaVlMZuexNLHCBmC780iezONJNiD2Pze_nzHHN3fkGi0W9aHilEzticzq6neO2wqF0K6CeE_HiKKxM",
    authorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBctDpuf4pRPzHVNF5Wd343reeRipX5ygKIdSu320Xo6Id_JLcAkF8P1FOXgCgFCSRXoPEHDaTECituh73x67VxF-St_5_cGmoC1gmnDLDeFu6-qLoFk77o8nV1cGDbUBZz7MF7zyeY4Mehkud5Ns91LrPauMcbYaI6mOIhb9SQSs7qO35hTu2GeDHX-AJ11WEM_2vZgoMfh5HDo5xfZ0625ivOmctWFuvw9dxyDmud5XKmEwKJfEbMxISXSYXBRbEEhYSHXRYbxRw",
  },
  {
    category: "Culture",
    title: "What We Keep, What We Lose",
    excerpt:
      "A meditation on memory, inheritance, and the invisible emotional threads connecting generations through stories, rituals, photographs, and the objects we refuse to throw away.",
    author: "Amina Okello",
    date: "Oct 8",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
  {
    category: "Science",
    title: "The Quiet Mathematics of Nature",
    excerpt:
      "Patterns hidden within forests, oceans, and galaxies reveal that nature speaks through rhythm, symmetry, and repetition long before humans ever invented language.",
    author: "Dr. Lena Hart",
    date: "Oct 5",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    authorImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
  },
  {
    category: "Philosophy",
    title: "The Weight of Infinite Choice",
    excerpt:
      "Modern life promises endless freedom, yet too many choices can quietly erode clarity, confidence, and our ability to commit to meaningful paths.",
    author: "Jonah Vale",
    date: "Oct 3",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
    authorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    category: "Design",
    title: "Minimalism Beyond Aesthetic",
    excerpt:
      "Minimalism is no longer just a visual language. It has evolved into a philosophy of intentional living, purposeful work, and emotional clarity.",
    author: "Clara Bennett",
    date: "Sep 29",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    authorImage:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop",
  },
  {
    category: "Culture",
    title: "Cities After Midnight",
    excerpt:
      "After dark, cities transform into emotional landscapes where silence, neon reflections, and empty streets reveal a completely different rhythm of life.",
    author: "Noah Laurent",
    date: "Sep 24",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop",
    authorImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  },
];
