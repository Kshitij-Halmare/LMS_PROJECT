import userModel from "../Model/UserModel.js";
import bcrypt from "bcryptjs";

export default async function login(req, res) {
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

    // If the login is successful, prepare the response
    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.proffession, // 'Student' or 'Teacher'
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
