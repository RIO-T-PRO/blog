import {
  createWriter as createWriterService,
  getWriter as getWriterService,
  getAllWriters as getAllWritersService,
  updateWriter as updateWriterService,
  deleteWriter as deleteWriterService,
} from "@/database/services/writer.js";
import { Request, Response } from "express";

const createWriter = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const userId = req.user.user_id;
    const { bio, avatar, website } = req.body;

    if (!bio && !avatar && !website) {
      return res.status(400).json({
        error: "At least one field (bio, avatar, website) is required.",
      });
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
    return res.status(500).json({ error: "Internal server error." });
  }
};

const getWriter = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const writerId = req.writer.writer_id;

    if (!writerId) {
      return res.status(400).json({ error: "Writer ID is required." });
    }

    const writer = await getWriterService(writerId);
    if (!writer) {
      return res.status(404).json({ error: "Writer not found." });
    }

    return res.status(200).json({ writer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const getAllWriters = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const writers = await getAllWritersService();
    return res.status(200).json({ writers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const updateWriter = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const userId = req.user.user_id;
    const writerId = req.writer.writer_id;
    const { bio, avatar, website } = req.body;

    if (!writerId) {
      return res.status(400).json({ error: "Writer ID is required." });
    }

    if (!bio && !avatar && !website) {
      return res.status(400).json({
        error:
          "At least one field (bio, avatar, website) must be provided for update.",
      });
    }

    const existingWriter = await getWriterService(writerId);

    if (!existingWriter) {
      return res.status(404).json({ error: "Writer profile not found." });
    }
    if (existingWriter.user_id !== userId) {
      return res
        .status(403)
        .json({
          error: "You are not authorized to update this writer profile.",
        });
    }

    const updatedWriter = await updateWriterService(writerId, {
      bio,
      avatar,
      website,
    });

    return res.status(200).json({
      message: "Writer profile updated successfully.",
      updatedWriter,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const deleteWriter = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const userId = req.user.user_id;
    const writerId = req.writer.writer_id;

    if (!writerId) {
      return res.status(400).json({ error: "Writer ID is required." });
    }

    const existingWriter = await getWriterService(writerId);
    if (!existingWriter) {
      return res.status(404).json({ error: "Writer profile not found." });
    }
    if (existingWriter.user_id !== userId) {
      return res
        .status(403)
        .json({
          error: "You are not authorized to delete this writer profile.",
        });
    }

    await deleteWriterService(writerId);

    return res.status(200).json({
      message: "Writer profile deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export { createWriter, getWriter, getAllWriters, updateWriter, deleteWriter };
