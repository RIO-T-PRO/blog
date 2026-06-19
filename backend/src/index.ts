import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "@/routes/auth.js";
import profileRoutes from "@/routes/profile.js";
import roleRoutes from "@/routes/role.js";
import articleRoutes from "@/routes/article.js";
import commentRoutes from "@/routes/comment.js";

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

// role
app.use("/api/role", roleRoutes);

// user profile
app.use("/api/user", profileRoutes);

//article
app.use("/api/articles", articleRoutes);

// comment
app.use("api/comment", commentRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
