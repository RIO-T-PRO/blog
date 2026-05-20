import { Request, Response } from "express";
import {
  createWriter as createWriterService,
  updateWriter as updateWriterService,
  deleteWriter as deleteWriterService,
  findWriterByUserId,
  getWriter as getWriterService,
} from "@/database/services/writer.js";
import { errorResponse } from "@/utils/api-response.js";
import { findAdminById } from "@/database/services/admin.js";

const createWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const adminId = req.user?.user_id;
    if (!adminId) return errorResponse(res, 401, "Authentication required.");

    const isAdmin = await findAdminById(adminId);
    if (!isAdmin) {
      return errorResponse(
        res,
        403,
        "Access denied. Only administrators can appoint writers.",
      );
    }

    const { user_id, website } = req.body;

    if (!user_id) {
      return errorResponse(
        res,
        400,
        "The target user_id is required to create a writer profile.",
      );
    }

    if (!website) {
      return errorResponse(
        res,
        400,
        "At least one profile field (bio or website) must be provided.",
      );
    }

    const existing = await findWriterByUserId(user_id);
    if (existing) {
      return errorResponse(
        res,
        409,
        "This user already has an active writer profile.",
      );
    }

    const newWriter = await createWriterService({
      writer_id: crypto.randomUUID(),
      user_id: user_id,
      website: website || null,
    });

    return res.status(201).json({
      status: "success",
      message: "Writer profile created successfully by administrator.",
      data: { writer: newWriter },
    });
  } catch (error) {
    console.error("Create writer error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

const updateWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user_id = req.user.user_id;
    if (!user_id) return errorResponse(res, 401, "Authentication required.");

    const writer = await findWriterByUserId(user_id);
    if (!writer) return errorResponse(res, 404, "Writer profile not found.");

    const { website } = req.body;
    if (!website) {
      return errorResponse(res, 400, "At least one field must be provided.");
    }

    const updated = await updateWriterService(writer.writer_id, {
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

const deleteWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id;
    if (!userId) return errorResponse(res, 401, "Authentication required.");

    const { writerId } = req.params;
    if (!writerId || typeof writerId !== "string")
      return errorResponse(res, 400, "Writer ID is required.");

    const existing = await getWriterService(writerId);
    if (!existing) return errorResponse(res, 404, "Writer profile not found.");

    const isAdmin = await findAdminById(userId);
    const isOwner = existing.user_id === userId;

    if (!isOwner && !isAdmin) {
      return errorResponse(
        res,
        403,
        "You don't have permission to delete this writer profile.",
      );
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

const getWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id;

    if (!userId || typeof userId !== "string")
      return errorResponse(res, 401, "Authentication required.");

    const writer = await getWriterService(userId);

    if (!writer) return errorResponse(res, 404, "Writer not found.");

    const isAdmin = await findAdminById(userId);
    const isOwner = writer.user_id === userId;

    if (!isOwner && !isAdmin) {
      const { user_id, ...publicWriter } = writer;
      return res
        .status(200)
        .json({ status: "success", data: { writer: publicWriter } });
    }
    return res.status(200).json({ status: "success", data: { writer } });
  } catch (error) {
    console.error("Get writer error:", error);
    return errorResponse(res, 500, "Internal server error.");
  }
};

export { createWriter, getWriter, updateWriter, deleteWriter };
