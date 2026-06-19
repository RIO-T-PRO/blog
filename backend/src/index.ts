import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "@/routes/auth.js";
import userRoutes from "@/routes/user.js";
import adminRoutes from "@/routes/admin.js";
import writerRoutes from "@/routes/writer.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

// auth
app.use("/api/auth", authRoutes);

// admin
app.use("/api/admin", adminRoutes);

//writer
app.use("/api/writer", writerRoutes);

// user
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
