import userModel from '../Model/UserModel.js';

export default async function authenticateTeacher(req, res) {
  try {
    console.log('Request User:', req.user); // Debugging user info

    // Retrieve the user ID from the authenticated user token
    const userId = req.user.id; // Ensure that `req.user` is set by the `authenticateToken` middleware

    // Look for the user in the database
    const user = await userModel.findOne({ _id: userId });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    // Check if the user is a teacher
    if (user.profession !== 'teacher') {
      return res.status(403).json({
        message: 'User is not a teacher',
        success: false,
      });
    }

    // If user is a teacher, return the user data
    console.log('Authenticated User:', user); // Debugging user data
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
}
