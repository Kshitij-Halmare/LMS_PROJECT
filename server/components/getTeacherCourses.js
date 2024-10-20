import Course from "../Model/CourseSchema.js";

async function getTeacherCourses(req, res) {
    try {
        console.log(req.user+"yes");
        const courses = await Course.find({ createdBy: req.user.id })

        if (courses.length) {
            return res.status(200).json({
                message: "Courses retrieved successfully",
                courses,
                success: true,
            });
        }

        return res.status(404).json({
            message: "No courses found",
            success: false,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message || "An error occurred",
            success: false,
        });
    }
}


export default getTeacherCourses;
