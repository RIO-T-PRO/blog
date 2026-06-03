import { applyToBecomeWriter } from "@/database/services/writer-application.js";
import { ApplyWriterBody } from "@/schemas/application.js";
import { Request, Response } from "express";

const applyWriter = async (req: Request, res: Response): Promise<Response> => {
  const { reason, website } = req.body as ApplyWriterBody;

  try {
    const application = await applyToBecomeWriter({
      userId: req.user.user_id,
      reason,
      website,
    });

    return res.status(201).json({
      status: "success",
      data: { application },
    });
  } catch (error) {
    console.error("Apply writer error:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

export { applyWriter };
