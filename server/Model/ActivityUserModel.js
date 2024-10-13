import mongoose from "mongoose";

// Define the schema for user activity
const userActivitySchema = new mongoose.Schema({
  // 'userId' stores the ID of the user who watched lessons
  userId: { 
    type: mongoose.Schema.Types.ObjectId, // Type for ObjectId (MongoDB identifier)
    ref: 'User', // Reference to the 'User' model (this connects the user to this activity)
    required: true // This field is required when creating a new record
  },
  
  watchedLessons: [
    {
      lessonId: { 
        type: mongoose.Schema.Types.ObjectId, // Type for ObjectId (MongoDB identifier)
        ref: 'Lesson', // Reference to the 'Lesson' model (this connects the lesson to this activity)
        required: true // Ensure lessonId is always provided
      },
      watchedDate: { 
        type: Date, // Type for Date
        required: true // This field is required when creating a new record
      }
    }
  ]
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields

// Create and export the model
const UserActivity = mongoose.model("Activity", userActivitySchema);
export default UserActivity;
