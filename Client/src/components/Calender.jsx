import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // Default CSS

const ConsistencyCalendar = ({ userId }) => {
  const [watchedDates, setWatchedDates] = useState([]);

  // Fetch watched dates from the API
  useEffect(() => {
    const fetchWatchedDates = async () => {
      const response = await fetch(`/api/activity/${userId}`);
      const data = await response.json();
      setWatchedDates(data.watchedDates.map(date => new Date(date))); // Convert strings to Date objects
    };

    fetchWatchedDates();
  }, [userId]);

  // Custom tile content to highlight watched dates
  const tileClassName = ({ date, view }) => {
    if (view === "month" && watchedDates.find(watchedDate => watchedDate.toDateString() === date.toDateString())) {
      return "bg-green-500 text-white rounded-full hover:scale-105 transition duration-300 ease-in-out"; // Highlight watched dates with green, rounded, and hover effect
    }
    return null;
  };

  return (
    <div className="max-w-xs mx-auto p-4 bg-white shadow-md shadow-black rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Lesson Consistency</h2>
      <Calendar 
        tileClassName={tileClassName} // Apply custom classes to tiles
        className="border-none text-xs" // Smaller text for a compact look
        next2Label={null} // Remove double arrows for navigation
        prev2Label={null} // Remove double arrows for navigation
        prevLabel={<span className="text-gray-600">←</span>} // Custom previous arrow
        nextLabel={<span className="text-gray-600">→</span>} // Custom next arrow
      />
    </div>
  );
};

export default ConsistencyCalendar;
