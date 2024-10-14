import React from 'react';
import NavbarComponent from "../Courses_Compnents/navbar"; 
import FilterBox from '../Courses_Compnents/FilterBox';

function Courses() {
  return (
    <>
      <NavbarComponent /> 
      <div className="flex w-full p-2">
        {/* Main content on the left */}
        <div className='flex-1 p-6'>
          {/* Your main content goes here */}
          a
        </div>

        {/* FilterBox on the right */}
        <div className="w-1/4 relative p-2 "> 
          <FilterBox />
        </div>
      </div>
    </>
  );
}

export default Courses;
