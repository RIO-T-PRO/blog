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

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/writer", writerRoutes);
app.use("/user", userRoutes);
app.use("/profile", userProfileRoutes);
app.use("/posts", postRoutes);
app.use("/comment", commentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening to PORT: ${PORT}`);
});
