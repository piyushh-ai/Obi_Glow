import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("Please provide PORT");
}
if (!process.env.MONGO_URI) {
  throw new Error("Please provide MONGO_URI");
}
if (!process.env.JWT_SECRET) {
  throw new Error("Please provide JWT_SECRET");
}
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("Please provide GOOGLE_CLIENT_ID");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Please provide GOOGLE_CLIENT_SECRET");
}
if (!process.env.GOOGLE_CALLBACK_URL) {
  throw new Error("Please provide GOOGLE_CALLBACK_URL");
}
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("Please provide CLOUDINARY_CLOUD_NAME");
}
if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("Please provide CLOUDINARY_API_KEY");
}
if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Please provide CLOUDINARY_API_SECRET");
}

export const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};
