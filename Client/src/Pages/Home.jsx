import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConsistencyCalendar from '../components/Calender';
import { toast } from 'react-hot-toast'; // Ensure toast is imported
import CourseCard from './CourseCard';
import headImage from "../assets/istockphoto-1396113348-612x612.jpg";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Changed to `null` to represent initial state correctly
  const [allData, setAllData] = useState([]); // Initialize as empty array instead of null

  const handleAddNewCourse = () => {
    navigate('/add-course'); // Redirect to Add Course page
  };

  const handleExistingCourse = () => {
    navigate('/existing-courses'); // Redirect to Existing Courses page
  };

  console.log('Server Domain:', import.meta.env.VITE_SERVER_DOMAIN);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/ans`, {
          method: "GET",
          credentials: 'include',
        });
        console.log("Response:", response);

        const data = await response.json();
        console.log(data);

        if (data.success && data.user.profession === 'teacher') {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
        toast.error('Error fetching user data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/getAllData`, {
          method: 'GET',
          credentials: 'include', // Use 'include' for credentials
        });

        const data = await response.json();
        if (response.ok && data) {
          setAllData(data); // Set data as allData
          console.log(data);
        } else {
          toast.error("Failed in retrieving data", data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Error fetching all data');
      }
    }

    fetchAllData();
  }, []);

  return (
    <div className="p-6 bg-slate-100 pl-10 min-h-screen">
      {/* Conditionally render buttons and content based on the user state */}
      {user && user.profession === 'teacher' ? (
        <div className="overflow-y-auto">
          <div className="flex justify-end gap-4 mb-6">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-700 transition duration-200"
              onClick={handleAddNewCourse}
            >
              Add New Course
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-700 transition duration-200"
              onClick={handleExistingCourse}
            >
              Existing Courses
            </button>
          </div>

          <div className="mb-8">
            <img
              src={headImage}
              alt="Learning Management Systems"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-8">
            Our Courses
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allData?.data?.map((course) => (
              <CourseCard
                key={course._id}
                id={course._id}
                title={course.title}
                description={course.description}
                image={course.image}
                price={course.price}
                category={course.category}
                level={course.level}
                language={course.language}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className=" font-serif text-2xl  font-semibold   text-gray-800 mb-4">
              "Unlock Limitless Learning Opportunities"
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {allData?.data?.map((course) => (
              <CourseCard
                key={course._id}
                title={course.title}
                description={course.description}
                image={course.image}
                price={course.price}
                category={course.category}
                level={course.level}
                language={course.language}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
