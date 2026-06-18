import { Request, Response } from "express";
import {
  createWriter as createWriterService,
  updateWriter as updateWriterService,
  deleteWriter as deleteWriterService,
  getWriter as getWriterService,
  getWriterDashboard,
  promoteToWriter,
} from "@/database/services/writer.js";
import {
  WriterIdParam,
  type CreateWriterBody,
  type UpdateWriterBody,
  type WriterDashboardQuery,
} from "@/schemas/writer.js";
import { DashboardParams } from "@/schemas/user.schema.js";

const createWriter = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params as DashboardParams;
  try {
    const writer = await promoteToWriter(userId);
    return res.status(201).json({ status: "success", data: { writer } });
  } catch (error) {
    console.error("Promote writer error:", error);
    if (error instanceof Error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
};

const updateWriter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { writerId } = req.params as WriterIdParam;
    const { website } = req.body as UpdateWriterBody;

    const updated = await updateWriterService(writerId, { website });
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
    const { writerId } = req.params as WriterIdParam;

    await deleteWriterService(writerId);

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
    const { page, limit } = req.query as unknown as WriterDashboardQuery;

    const dashboardData = await getWriterDashboard({
      writer_id: writerId,
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
