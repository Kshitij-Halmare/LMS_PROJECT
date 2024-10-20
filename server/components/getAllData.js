import Course from "../Model/CourseSchema.js";

export default async function getAllData(req, res) {
  console.log(req);
  try {
    const data = await Course.find();
    if (data && data.length > 0) {
      return res.status(200).json({
        success: true,
        data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No data found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving data",
      error: error.message,
    });
  }
}
