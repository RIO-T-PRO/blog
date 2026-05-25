import { prisma } from "@/database/db.js";

export class LandingService {
  async getPublishedPosts() {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        post_id: true,
        title: true,
        slug: true,
        excerpt: true,
        cover_image: true,
        publishedAt: true,
        createdAt: true,
        writer: {
          select: {
            user: {
              select: {
                fullname: true,
                userProfile: {
                  select: { avatar: true },
                },
              },
            },
          },
        },
      },
    });

    // Format writer name and avatar for easier frontend consumption
    return posts.map((post) => ({
      id: post.post_id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      coverImage: post.cover_image,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      writer: {
        name: post.writer.user.fullname,
        avatar: post.writer.user.userProfile?.avatar ?? null,
      },
    }));
  }

  async getPublishedPostBySlug(slug: string) {
    const post = await prisma.post.findFirst({
      where: {
        slug: slug,
        published: true,
      },
      select: {
        post_id: true,
        title: true,
        slug: true,
        content: true,
        excerpt: true,
        cover_image: true,
        publishedAt: true,
        createdAt: true,
        writer: {
          select: {
            user: {
              select: {
                fullname: true,
                userProfile: {
                  select: { avatar: true, bio: true },
                },
              },
            },
          },
        },
      },
    });

    if (!post) return null;

    return {
      id: post.post_id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      coverImage: post.cover_image,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      writer: {
        name: post.writer.user.fullname,
        avatar: post.writer.user.userProfile?.avatar ?? null,
        bio: post.writer.user.userProfile?.bio ?? null,
      },
    };
  }
}
