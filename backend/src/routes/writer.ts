import {
  createWriter,
  updateWriter,
  deleteWriter,
} from "@/controllers/writer.js";
import express from "express";

const router = express.Router();

router.post("/writer", createWriter);
router.put("/writer/:writerId", updateWriter);
router.delete("/writer/:writerId", deleteWriter);
