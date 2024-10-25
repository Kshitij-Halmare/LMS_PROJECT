import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CourseHome = () => {
  const { id } = useParams(); // Get course ID from URL
  const [lessons, setLessons] = useState([]); // Initialize lessons as an empty array
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [data, setData] = useState(null); // State variable for data
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.Cart.activeUserId);

  // Fetch course details including lessons when component mounts
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/CourseHome/${id}`, { // Fetch data using course ID
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch course data'); // Throw error for non-200 responses
        }
        const result = await response.json();
        if (result.success) {
          setData(result.data); // Set the data state
          setLessons(result.data.lessons || []); // Set lessons or default to an empty array
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
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-500">
        Error: {error}
      </div>
    );
  }

  const handleAddToCart = () => {
    if (activeUser) {
      dispatch(addCourseToCart({ userId: activeUser, courseId: id, title, price })); 
      console.log('Course added to cart:', id);
      toast.success("Course added successfully"); 
    } else {
      toast.error("Please login to add to cart"); 
    }
  };

  // Destructure data for easier access
  const { title, price, category, level, image } = data || {};

  return (
    <div className="bg-slate-200 py-4">
      <div className="flex flex-col h-full px-4">
        <h1 className="text-2xl font-bold py-4 mb-6">Course Home</h1>
        <div className="flex flex-grow gap-4"> {/* Use flex-grow to make this section fill the available space */}
          <div className="w-3/5 space-y-6 overflow-y-auto"> {/* Added overflow-y-auto for scrolling if necessary */}
            {lessons.length > 0 ? (
              lessons.map((lesson, index) => (
                <div key={index} className="lesson-item p-6 bg-white rounded-xl shadow-lg">
                  <h2 className="text-2xl font-semibold mb-2">Title: {lesson.title}</h2>
                  <p className="text-gray-700">Description: {lesson.description}</p>
                </div>
              ))
            ) : (
              <p className="text-xl text-gray-500 text-center">No lessons available</p>
            )}
          </div>
          <div className="rounded-xl shadow-xl bg-white h-[470px] w-2/5 p-4">
            {/* Display the course image and details if data exists */}
            {data && (
              <div>
                {image && <img src={image} alt="Course" className="h-48 w-full rounded-t-xl" />}
                <h1 className="text-2xl text-center font-semibold py-3">{title}</h1>
                <h1 className="text-xl font-semibold py-3">Price: ${price}</h1>
                <p className="text-slate-800">Category: {category}</p>
                <p className="text-slate-800">Level: {level}</p>
                <div className="text-center pt-6 m-3">
                  <button className="px-4 bg-blue-500 text-xl mr-5 rounded-lg hover:bg-blue-800 text-white py-2">Add to Cart</button>
                  <button className="px-4 bg-blue-500 text-xl hover:bg-blue-800 rounded-lg text-white py-2" onClick={handleAddToCart}>Buy Now</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;
