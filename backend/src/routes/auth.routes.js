import express from "express";
import { googleLogin, getMe, logout } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/google", googleLogin )

router.get("/get-me", authMiddleware, getMe)

router.post("/logout", authMiddleware, logout)

export default router;
