import Course from '../Model/CourseSchema.js';
async function getCourses() {
  console.log(yes);
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
}

export default getCourses