import express from "express";
import { adminAuthMiddleware } from "../middlewares/auth.middleware.js";
import { createService } from "../controllers/service.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post(
  "/create",
  upload.array("images", 5),
  createService,
);

export default router;
