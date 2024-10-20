import Course from "../Model/CourseSchema.js"; // Ensure you have the correct import for your Course model

export default async function CourseHome(req, res) {
    try {
        const { id } = req.params; // Correctly destructure the id from req.params

        // Fetch the course data from the database using the id
        const data = await Course.findById(id);
        console.log(data);
        if (data) {
            return res.status(200).json({
                success: true,
                data
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}
