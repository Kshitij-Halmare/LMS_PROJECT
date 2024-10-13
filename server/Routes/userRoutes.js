import express from 'express';
import Signup  from '../components/Signup.js'; // Make sure the casing is consistent
import upload from '../middleware/multer.js'; // Import the Multer upload middleware
import Login from '../components/Login.js';
import track from '../components/track.js';
import fetchingActivity from '../components/fetchActivity.js';

const router = express.Router();

// Route to handle signup with image upload
router.post('/Signup', upload.single('image'), Signup);
router.post("/Login",Login);
router.post("/track",track);
router.get("/:userId",fetchingActivity);

export default router;
