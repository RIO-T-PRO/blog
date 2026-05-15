import { Request, Response } from "express";
import {
  createWriter as createWriterService,
  getAllWriters as getAllWritersService,
  deleteWriter as deleteWriterService,
  getWriter as getWriterService,
} from "@/database/services/writer.js";

import { findUserById } from "@/database/services/user.js";
import { findWriterByUserId } from "@/database/services/writer.js";

const createWriter = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required." });
    }

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

const getWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "User ID is required." });
    }

    const writer = await findWriterByUserId(userId);
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
): Promise<Response> => {
  try {
    const writers = await getAllWritersService();
    return res.status(200).json({ writers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const deleteWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id;
    const writerId = req.writer?.writer_id;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required." });
    }

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
        .json({ error: "Unauthorized to delete this profile." });
    }

    await deleteWriterService(writerId);
    return res
      .status(200)
      .json({ message: "Writer profile deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
