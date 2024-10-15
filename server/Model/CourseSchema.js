import mongoose from "mongoose"
const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String], // Array of categories (e.g., checkboxes)
    required: true,
  },
  image: {
    type: String, // URL or path to the course image
    required: true,
  },
  price: {
    type: Number, // Change to Number instead of String
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (teacher)
    required: true,
  },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
