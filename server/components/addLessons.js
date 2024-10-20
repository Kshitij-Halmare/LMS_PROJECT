import Course from "../Model/CourseSchema.js";

export default async function addLessons(req, res) {
  console.log("Received request to add lessons");

  try {
    // Extract courseId from req.params
    const { courseId } = req.params;

    // Extract addLessons from req.body
    const { addLessons } = req.body;

    // Log for debugging
    console.log("CourseId:", courseId);
    console.log("Lessons to add:", addLessons);

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Validate if addLessons is an array and contains at least one lesson
    if (!Array.isArray(addLessons) || addLessons.length === 0) {
      return res.status(400).json({ message: "No lessons provided" });
    }

    // Validate each lesson for required fields
    const invalidLessons = addLessons.some((lesson) => {
      return (
        !lesson.title ||
        !lesson.description ||
        (!lesson.videoUrl && !lesson.materialUrls.length)
      );
    });

    if (invalidLessons) {
      return res.status(400).json({
        message: "Each lesson must have a title, description, video URL or material URL",
      });
    }

    // Append new lessons to the course
    course.lessons.push(...addLessons);

    // Save the updated course to the database
    await course.save();

    // Return success response
    return res.status(200).json({ message: "Lessons added successfully", course });
  } catch (error) {
    console.error("Error adding lessons:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
