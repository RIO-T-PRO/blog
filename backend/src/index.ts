import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "@/routes/auth.js";
import writerRoutes from "@/routes/writer.js";
import commentRoutes from "@/routes/comment.js";
import postRoutes from "@/routes/post.js";
import adminRoutes from "@/routes/admin.js";
import userProfileRoutes from "@/routes/profile.js";
import applicationRoutes from "@/routes/writer-application.js";
import userRoutes from "@/routes/user.js";
import landingPageRoutes from "@/routes/landing-page.js";

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

app.use("/api/landing", landingPageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/writer", writerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
