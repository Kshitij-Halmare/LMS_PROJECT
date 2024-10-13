import {v2 as cloudinary} from "cloudinary";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
cloudinary.config({
    cloud_name: "doczqznfj",
    api_key: "653986957328288",
    api_secret: "YAS8Mq-iEY_0OegAdfOWacCLn68"
  });
export default cloudinary