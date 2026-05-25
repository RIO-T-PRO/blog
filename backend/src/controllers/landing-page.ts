import { Request, Response } from "express";
import { LandingService } from "@/database/services/landing-page.js";

const landingService = new LandingService();

export class LandingController {
  async getPosts(req: Request, res: Response) {
    try {
      const posts = await landingService.getPublishedPosts();
      res.status(200).json({
        success: true,
        data: posts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch posts for landing page",
      });
    }
  }

  async getPostBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const slugParam = Array.isArray(slug) ? slug[0] : slug;
      const post = await landingService.getPublishedPostBySlug(slugParam);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found or not published",
        });
      }

      res.status(200).json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch the post",
      });
    }
  }
}
