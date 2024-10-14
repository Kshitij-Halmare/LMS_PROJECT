import express from 'express';
import Signup from '../components/Signup.js'; // Ensure casing consistency
import upload from '../middleware/multer.js'; // Multer upload middleware
import handlelogin from '../components/Login.js';
import track from '../components/track.js';
import fetchingActivity from '../components/fetchActivity.js';
import AddCourses from '../components/AddCourse.js';
import getCourses from '../components/getCourses.js';
import authenticateToken from '../authenticate/authenticateUser.js';

const router = express.Router();

router.post('/signup', upload.single('image'), Signup);
router.post('/login', handlelogin);
router.post('/track', track);
router.get('/:userId', fetchingActivity);
router.post('/add-course',authenticateToken, upload.single('image'), AddCourses); 
router.get('/course', getCourses);

export default router;
