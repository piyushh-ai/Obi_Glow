import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { config } from "../config/config.js";
import userModel from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";
import BlacklistedToken from "../models/BlacklistedToken.model.js";


const client = new OAuth2Client(config.googleClientId);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google token is required",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleClientId,
    });
    const payload = ticket.getPayload();

    const { sub, email, name, picture, email_verified } = payload;

    if (!email_verified) {
      return res.status(400).json({
        success: false,
        message: "Email not verified by Google",
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name,
        email,
        profilePicture: picture,
        googleId: sub,
      });
    }

    // Existing user → sirf token generate karo, dobara save nahi
    const jwtToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;

    

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("getMe error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const logout = async (req, res) => {
  try {
    // Authorization header se raw token nikalo
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      // JWT decode karo (verify nahi — sirf exp claim chahiye)
      const decoded = jwt.decode(token);
      const expiresAt = decoded?.exp
        ? new Date(decoded.exp * 1000)   // Unix timestamp → Date
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // fallback: 30d

      // Blacklist mein save karo — MongoDB TTL auto-delete karega
      await BlacklistedToken.create({ token, expiresAt });
    }

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log("logout error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// {
//   iss: 'https://accounts.google.com',
//   azp: '519945484368-gm2gmt9nhduof6r9sh1bbcfd4lii653o.apps.googleusercontent.com',
//   aud: '519945484368-p1tm0da9ea78h8g7i6ih6bfer1j0mrpn.apps.googleusercontent.com',
//   sub: '114539429541925024401',
//   email: 'thepiyushsirolia@gmail.com',
//   email_verified: true,
//   name: 'Piyush Sirolia',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocI3c4hQWk-TT1dNntGq9NC_FBQNbRJpEA0_MTkcxXMK9XTKBw=s96-c',
//   given_name: 'Piyush',
//   family_name: 'Sirolia',
//   iat: 1782046843,
//   exp: 1782050443
// }
