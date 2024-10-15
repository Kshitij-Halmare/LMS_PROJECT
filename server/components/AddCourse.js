import Course from '../Model/CourseSchema.js';
import cloudinary from 'cloudinary';

const AddCourses = async (req, res) => {
  try {
    // Extract course details from request body
    const { title, description, category,price } = req.body;
    const parsedPrice = parseFloat(price); 
    // Check if required fields are present
    if (!title || !description || !category || isNaN(parsedPrice)) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    // Create a new course object
    const newCourse = new Course({
      title,
      description,
      category: category.split(','),  // Convert categories into an array
      image: result.secure_url, 
      price:parsedPrice,
      createdBy: req.user.id  // Use the user ID from the token (set by protect middleware)
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    // Return the success response
    res.status(201).json({
      message: 'Course added successfully',
      course: savedCourse,
      success:true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export default AddCourses;
