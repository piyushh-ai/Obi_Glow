import mongoose from "mongoose";

/**
 * BlacklistedToken
 * ─────────────────────────────────────────────────────────────────────────────
 * Stores invalidated JWT tokens until they naturally expire.
 * TTL index auto-deletes documents after `expiresAt` — MongoDB handles cleanup.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  // TTL index — MongoDB automatically removes document when this time passes
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // 0 = delete exactly at expiresAt
  },
});

const BlacklistedToken = mongoose.model("BlacklistedToken", blacklistedTokenSchema);

export default BlacklistedToken;
