import { Request, Response } from "express";
import {
  createWriter as createWriterService,
  getWriterWithPost as getWriterWithPostService,
  updateWriter as updateWriterService,
  deleteWriter as deleteWriterService,
  findWriterByUserId,
  getWriter as getWriterService,
} from "@/database/services/writer.js";
import { createPost as createPostService } from "@/database/services/post.js";
import { errorResponse } from "@/utils/api-response.js";

const createWriter = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const userId = req.user?.user_id;

    if (!userId) return errorResponse(res, 401, "Authentication required.");

    const { bio, avatar, website } = req.body;

    if (!bio && !avatar && !website) {
      return errorResponse(
        res,
        400,
        "At least one field (bio, avatar, website) is required.",
      );
    }

    const newWriter = await createWriterService({
      userId,
      avatar,
      bio,
      website,
    });
    return res.status(201).json({
      message: "Writer profile created successfully.",
      newWriter,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const getWriterWithPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { writerId } = req.params;

    if (!writerId || typeof writerId !== "string")
      return errorResponse(res, 400, "Writer ID is required.");

    const existingWriter = await findWriterByUserId(writerId);

    if (!existingWriter) return errorResponse(res, 400, "Writer not found");

    const writer = await getWriterWithPostService(existingWriter?.writer_id);

    return res.status(200).json({ data: writer });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const deleteWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id;
    if (!userId) return errorResponse(res, 401, "Authentication required.");

    const { writerId } = req.params;
    if (!writerId || typeof writerId !== "string")
      return errorResponse(res, 400, "Writer ID is required.");

    const existing = await getWriterService(writerId);
    if (!existing) return errorResponse(res, 404, "Writer profile not found.");

    await deleteWriterService(writerId);
    return res
      .status(200)
      .json({ message: "Writer profile deleted successfully." });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const updateWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id;
    if (!userId) return errorResponse(res, 401, "Authentication required.");

    const writer = await findWriterByUserId(userId);

    if (!writer) return errorResponse(res, 404, "Writer profile not found.");

    const { bio, avatar, website } = req.body;
    if (!bio && !avatar && !website) {
      return errorResponse(res, 400, "At least one field must be provided.");
    }

    const updated = await updateWriterService(writer.writer_id, {
      bio,
      avatar,
      website,
    });
    return res.status(200).json({
      status: "success",
      message: "Updated successfully.",
      data: { writer: updated },
    });
  } catch (error) {
    console.error("Update writer error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

// --- Post-related functions kept exactly as you wrote them ---
const createPost = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user?.user_id;
  if (!userId) return errorResponse(res, 401, "Authentication required.");

  const writer = await findWriterByUserId(userId);
  if (!writer)
    return errorResponse(res, 403, "You are not registered as a writer.");

  const { title, slug, excerpt, content, cover_image, published } = req.body;
  if (!title || !content)
    return errorResponse(res, 400, "Title and content are required.");

  try {
    const newPost = await createPostService({
      title,
      slug,
      excerpt,
      content,
      cover_image,
      published,
      writer_id: writer.writer_id,
    });
    return res.status(201).json({ status: "success", data: { post: newPost } });
  } catch (error) {
    console.error("Create post error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

export {
  createWriter,
  getWriterWithPost,
  deleteWriter,
  updateWriter,
  createPost,
};
