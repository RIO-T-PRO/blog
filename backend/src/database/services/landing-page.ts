import { prisma } from "../db.js";

const getPublishedPosts = async (page = 1, limit = 10) => {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.max(1, Number(limit) || 10);
  const skip = (safePage - 1) * safeLimit;

  const [total, posts] = await Promise.all([
    prisma.post.count({
      where: { published: true },
    }),
    prisma.post.findMany({
      where: { published: true },
      skip,
      take: safeLimit,
      orderBy: { publishedAt: "desc" },
      include: {
        writer: {
          include: {
            user: {
              include: {
                userProfile: true,
              },
            },
          },
        },
      },
    }),
  ]);

  return {
    posts,
    total,
    page: safePage,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit),
  };
};

const getPublishedPostBySlug = async (slug: string) => {
  return prisma.post.findFirst({
    where: {
      slug,
      published: true,
    },
    include: {
      writer: {
        include: {
          user: {
            include: {
              userProfile: true,
            },
          },
        },
      },
    },
  });
};

export { getPublishedPosts, getPublishedPostBySlug };
