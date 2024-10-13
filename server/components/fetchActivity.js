import UserActivity from "../Model/ActivityUserModel.js";

export default async function fetchingActivity(req, res) {
  try {
    // Fetch the user activity based on the userId in the request parameters
    const activity = await UserActivity.findOne({ userId: req.params.userId });

    if (!activity) {
      // If no activity exists for the user, return an empty watchedDates array
      return res.status(200).json({ watchedDates: [] });
    }

    // Extract watched dates from the user's activity data
    const watchedDates = activity.watchedLessons.map((lesson) => lesson.watchedDate);

    // Return the watched dates
    res.status(200).json({ watchedDates });
  } catch (error) {
    console.error(error);

    // Handle the error and return a JSON response with an error message
    res.status(500).json({ message: "Error fetching activity", success: false, error: error.message });
  }
};