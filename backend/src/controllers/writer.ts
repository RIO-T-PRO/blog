import {
  createWriter as createWriterService,
  getAllWriters as getAllWritersService,
  deleteWriter as deleteWriterService,
  getWriter as getWriterService,
  updateWriter as updateWriterService,
} from "@/database/services/writer.js";
import { Request, Response } from "express";

const updateWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.user_id;
    const writerId = req.writer?.writer_id;

    if (!userId) {
      return res.status(401).json({ error: "Authentication required." });
    }

    if (!writerId) {
      return res
        .status(400)
        .json({ error: "Writer profile not found in request context." });
    }

    const { bio, avatar, website } = req.body;
    if (!bio && !avatar && !website) {
      return res.status(400).json({
        error: "At least one field (bio, avatar, website) must be provided.",
      });
    }

    const existingWriter = await getWriterService(writerId);

    if (!existingWriter) {
      return res.status(404).json({ error: "Writer profile not found." });
    }

    if (existingWriter.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this profile." });
    }

    const updatedWriter = await updateWriterService(writerId, {
      bio,
      avatar,
      website,
    });
    return res
      .status(200)
      .json({ message: "Updated successfully.", updatedWriter });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export { updateWriter };
