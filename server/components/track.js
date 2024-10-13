import UserActivity from "../Model/ActivityUserModel.js";

export default async function track(req, res) {
  const { userId, lessonId } = req.body;
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  try {
    // Find the user's activity record
    let activity = await UserActivity.findOne({ userId });

    // If no activity exists for the user, create a new activity record
    if (!activity) {
      activity = new UserActivity({
        userId,
        watchedLessons: [{ lessonId, watchedDate: today }],
      });
    } else {
      // Check if the user has already watched this lesson today
      const lessonAlreadyWatched = activity.watchedLessons.some(
        (lesson) =>
          lesson.lessonId.toString() === lessonId.toString() &&
          lesson.watchedDate === today
      );

      // If the lesson was not watched today, add it
      if (!lessonAlreadyWatched) {
        activity.watchedLessons.push({ lessonId, watchedDate: today });
      } else {
        // Optionally, if you want to return an error if they try to watch the same lesson again today
        return res.status(400).json({
          message: "Lesson already watched today",
          success: false,
        });
      }
    }

    // Save the updated activity record
    await activity.save();

    // Send a success response
    res.status(200).json({
      message: "Activity tracked successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    // Send a failure response if there is an error
    res.status(500).json({
      message: "Error tracking activity",
      success: false,
      error: error.message, // You can also send the error message for debugging
    });
  }
}
