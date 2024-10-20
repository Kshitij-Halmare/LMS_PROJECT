import mongoose from "mongoose";

const lessonSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  materialUrl: {
    type: String
  }
});

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: [String], 
    required: true
  },
  level: {
    type: [String],
    required: true
  },
  image: {
    type: String, 
    required: true
  },
  price: {
    type: Number,  // Corrected price to be a number
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  lessons: {
    type: [lessonSchema],
    required: false,
    default: []
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
