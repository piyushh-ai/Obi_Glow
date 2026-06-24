import express from "express";
import {
  adminAuthMiddleware,
  authMiddleware,
} from "../middlewares/auth.middleware.js";
import {
  createService,
  getAllServices,
  editService,
  getSingleService,
  deleteService,
  toggleService,
} from "../controllers/service.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

/**
 * POST - /api/services/create
 * Description: Create a new service
 * Access: Private (Admin only)
 */
router.post(
  "/create",
  adminAuthMiddleware,
  upload.array("images", 5),
  createService,
);

/**
 * GET - /api/services/
 * Description: Get all services
 * Access: Public
 */
router.get("/", authMiddleware, getAllServices);

/**
 * PUT - /api/services/edit/:id
 * Description: Edit a service
 * Access: Private (Admin only)
 */
router.put(
  "/edit/:id",
  adminAuthMiddleware,
  upload.array("images", 5),
  editService,
);

/**
 * GET - /api/services/:id
 * Description: Get a single service
 * Access: Public
 */
router.get("/:id", authMiddleware, getSingleService);

/**
 * DELETE - /api/services/:id
 * Description: Delete a service
 * Access: Private (Admin only)
 */
router.delete("/:id", adminAuthMiddleware, deleteService);

/**
 * PUT - /api/services/toggle/:id
 * Description: Toggle service availability
 * Access: Private (Admin only)
 */
router.put("/toggle/:id", adminAuthMiddleware, toggleService);

export default router;
