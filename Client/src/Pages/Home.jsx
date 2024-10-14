import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConsistencyCalendar from '../components/Calender';

function Home() {
  const navigate = useNavigate();

  const handleAddNewCourse = () => {
    navigate('/add-course'); // Redirect to Add Course page
  };

  const handleExistingCourse = () => {
    navigate('/existing-courses'); // Redirect to Existing Courses page
  };

  return (
    <>
      <div className='flex p-4'>
        <div className='flex-1 justify-end flex max-h-10 gap-4'>
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
        </div>
        <div className='w-1/4'>
          <ConsistencyCalendar />
        </div>
      </div>
    </>
  );
}

export default Home;
