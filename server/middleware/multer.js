import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import cloudinary from "../config/cloudinary.js";
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'user_images', // Folder name in Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'], 
    },
  });
  
  const upload = multer({ storage });
  
  export default upload;