import { Request, Response } from "express";
import {
  createPost as createPostService,
  updatePost as updatePostService,
  deletePost as deletePostService,
} from "@/database/services/post.js";
import { postBody, updatePostBody } from "@/schemas/post.js";

const createPost = async (req: Request, res: Response) => {
  const writer = req.writer;
  if (!writer) return res.status(403).json({ error: "Writer not found" });

  const postData = req.body as postBody;
  const newPost = await createPostService({
    title: postData.title,
    content: postData.content,
    slug: postData.slug,
    excerpt: postData.excerpt,
    cover_image: postData.cover_image,
    published: postData.published,
    writer_id: writer.writer_id,
  });

  return res.status(201).json({ status: "success", data: { post: newPost } });
};

const updatePost = async (req: Request, res: Response) => {
  const post = req.post;
  const updateData = req.body as updatePostBody;

  const updatedPost = await updatePostService(post.post_id, updateData);
  return res
    .status(200)
    .json({ status: "success", data: { post: updatedPost } });
};

const deletePost = async (req: Request, res: Response) => {
  const post = req.post;
  await deletePostService(post.post_id);
  return res
    .status(200)
    .json({ status: "success", message: "Post deleted successfully" });
};

const getPost = async (req: Request, res: Response) => {
  const { post, permissions } = req;
  const { isOwner, isAdmin } = permissions!;

  if (post.published) {
    return res.status(200).json({ status: "success", data: { post } });
  }

  if (isOwner || isAdmin) {
    return res.status(200).json({ status: "success", data: { post } });
  }

  return res
    .status(403)
    .json({ error: "You don't have permission to view this post" });
};

export { createPost, updatePost, deletePost, getPost };
