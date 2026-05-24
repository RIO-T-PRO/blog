import express from "express";
import dotenv from "dotenv";

import authRoutes from "@/routes/auth.js";
import writerRoutes from "@/routes/writer.js";
import commentRoutes from "@/routes/comment.js";
import postRoutes from "@/routes/post.js";
import adminRoutes from "@/routes/admin.js";
import userProfileRoutes from "@/routes/profile.js";
import userRoutes from "@/routes/user.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/writer", writerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comment", commentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening to PORT: ${PORT}`);
});
