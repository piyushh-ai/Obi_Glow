import cloudinary from "../config/cloudinary.js";
import serviceModel from "../models/service.model.js";

export const createService = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      duration,
      discount,
      tags,
    } = req.body;

    const images = req.files?.map((file) => file.path);
    const publicIds = req.files?.map((file) => file.filename); // Cloudinary public_id

    // Helper: cleanup already-uploaded images from Cloudinary
    const cleanupImages = async () => {
      if (publicIds?.length) {
        await Promise.all(
          publicIds.map((id) => cloudinary.uploader.destroy(id)),
        );
      }
    };

    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !images ||
      images.length === 0
    ) {
      await cleanupImages(); // delete uploaded images since validation failed
      return res.status(400).json({ message: "All fields are required" });
    }

    const service = await serviceModel.create({
      name,
      price,
      description,
      category,
      subCategory,
      duration,
      discount,
      tags,
      image: images,
    });

    return res
      .status(200)
      .json({ message: "Service created successfully", service });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
