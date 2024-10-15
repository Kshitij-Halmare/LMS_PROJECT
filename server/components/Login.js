import userModel from "../Model/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handlelogin(req, res) {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide both email and password",
        success: false,
      });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist, please sign up",
        success: false,
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        profession: user.profession, // 'Student' or 'Teacher'
      },
      process.env.JWT_SECRET, // Your JWT secret from .env
      { expiresIn: "24h" } // Token expiry set to 24 hours
    );

    // Set the token in a secure cookie
    res.cookie('token', token, {
      httpOnly: true,    // Cookie can't be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Ensure the cookie is sent only over HTTPS in production
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    // Return success response (without sending sensitive data)
    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profession: user.profession, // 'Student' or 'Teacher'
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message, // Pass along the error message for easier debugging
    });
  }
}
