import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Cloudinary storage — images directly Cloudinary pe jayenge
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "obi-glow/services", // Cloudinary mein folder
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }], // auto resize
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB per image
});

export default upload;
