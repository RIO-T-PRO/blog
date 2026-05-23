import { Request, Response } from "express";
import {
  createWriter as createWriterService,
  updateWriter as updateWriterService,
  deleteWriter as deleteWriterService,
  getWriter as getWriterService,
  getWriterDashboard,
} from "@/database/services/writer.js";
import {
  WriterIdParam,
  type CreateWriterBody,
  type UpdateWriterBody,
  type WriterDashboardQuery,
} from "@/schemas/writer.js";

const createWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user_id, website } = req.body as CreateWriterBody;

    const newWriter = await createWriterService({
      writer_id: crypto.randomUUID(),
      user_id,
      website,
    });

    return res.status(201).json({
      status: "success",
      message: "Writer profile created successfully by administrator.",
      data: { writer: newWriter },
    });
  } catch (error) {
    console.error("Create writer error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const updateWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const writer = req.writer;
    const { website } = req.body as UpdateWriterBody;

    const updated = await updateWriterService(writer.writer_id, { website });
    return res.status(200).json({
      status: "success",
      message: "Updated successfully.",
      data: { writer: updated },
    });
  } catch (error) {
    console.error("Update writer error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// Admin or Writer
const deleteWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const writer = req.writer;

    await deleteWriterService(writer.writer_id);

    return res.status(200).json({
      status: "success",
      message: "Writer profile deleted successfully.",
    });
  } catch (error) {
    console.error("Delete writer error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const getWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { writerId } = req.params as WriterIdParam;

    const writer = await getWriterService(writerId);

    return res.status(200).json({
      status: "success",
      data: { writer },
    });
  } catch (error) {
    console.error("Get writer error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const writerDashboard = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { writerId } = req.params as WriterIdParam;
    const writer_id = writerId;

    const { page, limit } = req.query as unknown as WriterDashboardQuery;

    const dashboardData = await getWriterDashboard({
      writer_id: writer_id,
      page,
      limit,
    });

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Writer Dashboard Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { createWriter, updateWriter, getWriter, deleteWriter, writerDashboard };
