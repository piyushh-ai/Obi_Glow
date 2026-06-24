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

export const getAllServices = async (req, res) => {
  try {
    const services = await serviceModel.find();

    if (!services || services.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No services found" });
    }

    return res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      data: services,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPublicIdFromUrl = (url) => {
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    const pathAfterUpload = parts[1];
    const subParts = pathAfterUpload.split("/");
    let startIndex = 0;
    if (subParts[0].match(/^v\d+$/)) {
      startIndex = 1;
    }
    const publicIdWithExt = subParts.slice(startIndex).join("/");
    const lastDotIndex = publicIdWithExt.lastIndexOf(".");
    if (lastDotIndex === -1) return publicIdWithExt;
    return publicIdWithExt.substring(0, lastDotIndex);
  } catch (err) {
    console.error("Error parsing Cloudinary URL:", err);
    return null;
  }
};

export const editService = async (req, res) => {
  let newPublicIds = [];
  try {
    const { id } = req.params;
    const {
      name,
      price,
      description,
      category,
      subCategory,
      duration,
      discount,
      isAvailable,
      tags,
      remainingImages, // Array of image URLs to keep
    } = req.body;

    const newImages = req.files?.map((file) => file.path) || [];
    newPublicIds = req.files?.map((file) => file.filename) || [];

    const service = await serviceModel.findById(id);

    if (!service) {
      // Clean up newly uploaded files if service not found
      if (newPublicIds.length) {
        await Promise.all(
          newPublicIds.map((id) => cloudinary.uploader.destroy(id)),
        );
      }
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    // Parse remaining images to keep
    let remaining = [];
    if (remainingImages !== undefined) {
      try {
        remaining =
          typeof remainingImages === "string"
            ? JSON.parse(remainingImages)
            : remainingImages;
        if (!Array.isArray(remaining)) {
          remaining = remaining ? [remaining] : [];
        }
      } catch (err) {
        remaining = remainingImages ? [remainingImages] : [];
      }
    } else {
      remaining = service.image || [];
    }

    // Identify images that were removed
    const removedImages = (service.image || []).filter(
      (img) => !remaining.includes(img),
    );

    // Delete removed images from Cloudinary
    if (removedImages.length > 0) {
      const deletePromises = removedImages
        .map((imgUrl) => getPublicIdFromUrl(imgUrl))
        .filter((pubId) => pubId !== null)
        .map((pubId) => cloudinary.uploader.destroy(pubId));

      await Promise.all(deletePromises);
    }

    // Combine remaining existing images with new uploads
    const finalImages = [...remaining, ...newImages];

    const updateFields = {
      name,
      price,
      description,
      category,
      subCategory,
      duration,
      discount,
      tags,
      isAvailable:
        isAvailable !== undefined
          ? Boolean(JSON.parse(isAvailable))
          : service.isAvailable,
      image: finalImages,
    };

    const updatedService = await serviceModel.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    // Clean up newly uploaded files in case of error
    if (newPublicIds.length) {
      try {
        await Promise.all(
          newPublicIds.map((id) => cloudinary.uploader.destroy(id)),
        );
      } catch (cleanupErr) {
        console.error("Failed to clean up uploaded files:", cleanupErr);
      }
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceModel.findById(id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Service fetched successfully",
      service,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceModel.findById(id);

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    // Clean up images from Cloudinary
    if (service.image && service.image.length > 0) {
      const deletePromises = service.image
        .map((imgUrl) => getPublicIdFromUrl(imgUrl))
        .filter((pubId) => pubId !== null)
        .map((pubId) => cloudinary.uploader.destroy(pubId));
      
      await Promise.all(deletePromises);
    }

    await serviceModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceModel.findById(id);

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    service.isAvailable = !service.isAvailable;
    await service.save();

    return res.status(200).json({
      success: true,
      message: `Service marked as ${service.isAvailable ? 'available' : 'unavailable'}`,
      service,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
