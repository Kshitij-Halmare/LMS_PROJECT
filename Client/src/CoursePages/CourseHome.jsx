import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseHome = () => {
  const { id } = useParams(); // Get course ID from URL
  const [lessons, setLessons] = useState([]); // Ensure lessons is initialized as an empty array
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  // Fetch course details including lessons when component mounts
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/CourseHome/${id}`, { // Fetch data using course ID
          method: 'GET',
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch course data'); // Throw error for non-200 responses
        }
        const result = await response.json();
        if (result.success) {
          console.log(result);
          setLessons(result.data.lessons || []); // Ensure that lessons are set or default to an empty array
        } else {
          setError('No lessons found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Always set loading to false after request
      }
    };

    fetchCourseData();
  }, [id]);

  // Handle loading state
  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-500">Error: {error}</div>;
  }

  // Render lessons or a message if no lessons are available
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Course Home</h1>
      {/* Render the lessons */}
      <div className="space-y-6">
        {lessons.length > 0 ? (
          lessons.map((lesson, index) => (
            <div key={index} className="lesson-item p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">Title: {lesson.title}</h2> {/* Display lesson title */}
              <p className="text-gray-700">Description: {lesson.description}</p> {/* Display lesson description */}
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-500 text-center">No lessons available</p> // Show a message when no lessons are available
        )}
      </div>
    </div>
  );
};

export default CourseHome;
