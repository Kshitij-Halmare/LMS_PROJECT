import Course from '../Model/CourseSchema.js'; 

export default async function DeleteCourse(req, res) {
    const { id } = req.body;
    try {
        const ans = await Course.findByIdAndDelete(id); 
        if (ans) {
            return res.json({
                message: "Successfully deleted",
                success: true,
            });
        } else {
            return res.json({
                message: "Cannot be deleted",
                success: false,
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message || 'Internal server error',
            success: false,
        });
    }
}
