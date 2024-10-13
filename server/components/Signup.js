import bcrypt from "bcrypt";
import userModel from "../Model/UserModel.js";

export default async function Signup(req, res) {
  const { name, email, password, confirmpassword, profession } = req.body;

  // Log the input for debugging (remove in production)
  console.log("Request Body: ", { name, email, password, confirmpassword, profession });

  // Check if passwords match
  if (password !== confirmpassword) {
    return res.status(400).json({
      message: "Passwords do not match",
      success: false,
    });
  }

  // Simple password validation (example: minimum length of 8 characters)
  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long",
      success: false,
    });
  }
try{
  const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: `User with the role of ${profession} already exists with this email`,
        success: false,
      });
    }
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = {
      name,
      email,
      password: hashedPassword, // Save the hashed password
      profession, // Save the profession (either teacher or student)
      image: req.file ? req.file.path : "", // Save the image URL/path if uploaded
    };

    // Save the new user in the database
    const user = await userModel.create(newUser);

    // Log the user data for debugging (optional)
    console.log("User Created: ", user);

    // Return success response (without sending sensitive data)
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profession: user.profession, // Return profession
        image: user.image, // Image URL/path from Cloudinary or local storage
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message); // Log error for debugging
    return res.status(500).json({
      message: "An error occurred during signup",
      success: false,
      error: error.message, // Include the error message for debugging
    });
  }
}
