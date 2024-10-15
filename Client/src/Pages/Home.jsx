import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConsistencyCalendar from '../components/Calender';
import { toast } from 'react-hot-toast';  // Ensure toast is imported

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleAddNewCourse = () => {
    navigate('/add-course'); // Redirect to Add Course page
  };

  const handleExistingCourse = () => {
    navigate('/existing-courses'); // Redirect to Existing Courses page
  };

  console.log('Server Domain:', import.meta.env.VITE_SERVER_DOMAIN);

  useEffect(() => {
    console.log('useEffect triggered');
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/ans`, {
          method: "GET",
          credentials: 'include',
        });
        console.log("Response:", response);
        if (!response.ok) {
          toast('Please login');
          return;
        }
        const data = await response.json();
        console.log(data);
        if (data.success && data.user.profession === 'teacher') {
          setUser(data.user);
        } else {
          toast('You must be a teacher to access this');
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, []);  // Ensure this is running on component mount

  return (
    <>
      <div className='flex p-4'>
        <div className='flex-1 justify-end flex max-h-10 gap-4'>
          {/* Conditionally render the buttons based on the user state */}
          {user && user.profession === 'teacher' ? (
            <>
              <button
                className='p-2 bg-green-500 text-white shadow-md hover:bg-green-800'
                onClick={handleAddNewCourse}
              >
                Add New Course
              </button>
              <button
                className='p-2 bg-green-500 text-white mr-5 shadow-md hover:bg-green-800'
                onClick={handleExistingCourse}
              >
                Existing Course
              </button>
            </>
          ) : (
            <p>You must be logged in as a teacher to access this.</p>
          )}
        </div>
        <div className='w-1/4'>
          <ConsistencyCalendar />
        </div>
      </div>
    </>
  );
}

export default Home;
