import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  image: {
    type: String, // Store the path or URL of the uploaded image
  },
  profession: {
    type: String,
    required: true
  }
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
