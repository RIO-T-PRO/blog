import { prisma } from "@/database/db.js";
import { Post } from "@/generated/prisma/client.js";

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const getUniqueSlug = async (baseSlug: string): Promise<string> => {
  let uniqueSlug = baseSlug;
  let counter = 1;
  while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }
  return uniqueSlug;
};

export const findPostById = async (postId: string): Promise<Post | null> => {
  return prisma.post.findUnique({
    where: { post_id: postId },
  });
};

export const createPost = async (data: {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  published?: boolean;
  writer_id: string;
}): Promise<Post> => {
  const { title, slug, excerpt, content, cover_image, published, writer_id } =
    data;

  let baseSlug = slug;
  if (!baseSlug) {
    baseSlug = generateSlug(title);
  }
  const finalSlug = await getUniqueSlug(baseSlug);

  return prisma.post.create({
    data: {
      title,
      slug: finalSlug,
      excerpt,
      content,
      cover_image,
      published: published ?? false,
      publishedAt: published ? new Date() : undefined,
      writer_id,
    },
  });
};

export const updatePost = async (
  postId: string,
  data: {
    title?: string;
    slug?: string;
    excerpt?: string | null;
    content?: string;
    cover_image?: string | null;
    published?: boolean;
  },
): Promise<Post> => {
  const existingPost = await findPostById(postId);

  if (!existingPost) {
    throw new Error("Post not found");
  }

  let updatedSlug = data.slug;
  if (data.slug && data.slug !== existingPost.slug) {
    updatedSlug = await getUniqueSlug(data.slug);
  }

  return prisma.post.update({
    where: { post_id: postId },
    data: {
      title: data.title ?? existingPost.title,
      slug: updatedSlug ?? existingPost.slug,
      excerpt: data.excerpt !== undefined ? data.excerpt : existingPost.excerpt,
      content: data.content ?? existingPost.content,
      cover_image:
        data.cover_image !== undefined
          ? data.cover_image
          : existingPost.cover_image,
      published:
        data.published !== undefined ? data.published : existingPost.published,
      publishedAt:
        data.published === true && !existingPost.published
          ? new Date()
          : existingPost.publishedAt,
      updatedAt: new Date(),
    },
  });
};

export const deletePost = async (postId: string): Promise<void> => {
  const existingPost = await findPostById(postId);

  if (!existingPost) {
    throw new Error("Post not found");
  }
  await prisma.post.delete({
    where: { post_id: postId },
  });
};
