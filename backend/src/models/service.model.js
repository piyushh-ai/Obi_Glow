import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
      enum: ["Hair", "Skin", "Nails", "Makeup", "Spa", "Other"],
    },
    subCategory: {
      type: String,
    },
    duration: {
      type: Number, // in minutes
      required: true,
      default: 30,
    },
    discount: {
      type: Number, // percentage (0-100)
      default: 0,
      min: 0,
      max: 100,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    tags: [{ type: String }], // e.g. ["bridal", "organic", "trending"]
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const serviceModel = mongoose.model("Service", serviceSchema);
export default serviceModel;

