import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let fileFormat = file.mimetype.split('/')[0];  
    
    return {
      folder: 'user_uploads', 
      allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'avi', 'mov', 'mkv', 'flv'],
      resource_type: fileFormat, 
    };
  }
});

const upload = multer({ storage });

export default upload;
