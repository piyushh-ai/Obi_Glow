import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

/**
 * Generate JWT token for a user
 * @param {string} id - MongoDB user _id
 * @returns {string} JWT token (expires in 30 days)
 */
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: "30d",
  });
};

export default generateToken;
