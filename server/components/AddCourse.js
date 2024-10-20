import Course from '../Model/CourseSchema.js';
import cloudinary from 'cloudinary';

const AddCourses = async (req, res) => {
  try {
    console.log(req.body);

    // Extract course details from request body
    const { title, description, category, price, language, level } = req.body;

    // Parse the price to ensure it's a number
    const parsedPrice = parseFloat(price);

    // Check if all required fields are provided
    if (!title || !description || !category || isNaN(parsedPrice) || !level || !language) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if a course with the same title already exists
    const existingCourse = await Course.findOne({ title: title });
    if (existingCourse) {
      return res.status(400).json({
        message: "A course with the same title already exists",
        succes:false
      });
    }

    // Ensure the file was uploaded by multer and the path is available
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Course image is required' });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    // Create a new course object
    const newCourse = new Course({
      title,
      description,
      category: category.split(','),  // Convert categories into an array if multiple
      image: result.secure_url,       // Use Cloudinary uploaded image URL
      language,
      level,
      price: parsedPrice,
      createdBy: req.user.id  // Assuming the user's ID is available in req.user
    });

    // Save the new course to the database
    const savedCourse = await newCourse.save();
    console.log(savedCourse);

    // Return success response
    res.status(201).json({
      message: 'Course added successfully',
      course: savedCourse,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export default AddCourses;
