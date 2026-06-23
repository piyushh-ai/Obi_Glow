import userModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, config.jwtSecret);
    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("auth error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, config.jwtSecret);
    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("auth error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
