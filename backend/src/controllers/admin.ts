import { Request, Response } from "express";
import {
  createWriter as createWriterService,
  getAllWriters as getAllWritersService,
  deleteWriter as deleteWriterService,
  getWriter as getWriterService,
} from "@/database/services/writer.js";
import { findWriterByUserId } from "@/database/services/writer.js";
import { errorResponse } from "@/utils/api-response.js";

const createWriter = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      return errorResponse(res, 401, "Authentication required.");
    }

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

const getWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return errorResponse(res, 400, "User ID is required.");
    }

    const writer = await findWriterByUserId(userId);

    if (!writer) {
      return errorResponse(res, 404, "Writer not found.");
    }

    return res.status(200).json({ writer });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const getAllWriters = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const writers = await getAllWritersService();
    return res.status(200).json({ writers });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const deleteWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id;
    const { writerId } = req.params;

    if (!userId) {
      return errorResponse(res, 401, "Authentication required.");
    }

    if (!writerId || typeof writerId !== "string") {
      return errorResponse(res, 400, "Writer ID is required.");
    }

    const existingWriter = await getWriterService(writerId);
    if (!existingWriter) {
      return errorResponse(res, 404, "Writer profile not found.");
    }

    await deleteWriterService(writerId);
    return res
      .status(200)
      .json({ message: "Writer profile deleted successfully." });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

export { createWriter, getWriter, getAllWriters, deleteWriter };
