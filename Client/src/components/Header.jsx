import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import logo from "../assets/image_processing20191110-30800-mr2oo2.gif";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Header() {
  const [box, setBox] = useState(false);
  const navigate = useNavigate();

  const handleTeacherSignup = () => {
    navigate("/TeacherSignup");
  };

  const handleSignup = () => {
    navigate("/StudentsignUp");
  };

  const handleClick = () => {
    setBox((prev) => !prev);
  };

  return (
    <div className="h-16 bg-slate-950 flex justify-between items-center px-6">
      <div className='text-white text-2xl font-serif'>
        HELLO Dude!
      </div>
      
      <div className="flex items-center">
        <input type="text" placeholder='Search' className='px-4 py-2 rounded-l-full focus:outline-none' />
        <button className='bg-blue-500 py-3 px-4 rounded-r-full hover:bg-blue-600'>
          <FaSearch className='text-white' />
        </button>
      </div>
      
      <div>
        <button onClick={handleTeacherSignup} className='p-2 m-3 hover:underline bg-slate-600 text-white border border-white rounded-md'>
          Teach on Coursio
        </button>
      </div>

      <div className='flex text-white items-center gap-4'>
        <button>
          <IoNotificationsOutline className='text-2xl font-extrabold' />
        </button>
        
        <div className='relative'>
          <button onClick={handleClick}>
            <img src={logo} className="rounded-full h-10 w-10 cursor-pointer" alt="profile" />
          </button>
          
          {box && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-20">
              <p className='hover:bg-gray-100 px-4 py-2 cursor-pointer text-black' onClick={handleSignup}>Signup</p>
              <p className='hover:bg-gray-100 px-4 py-2 cursor-pointer text-black' onClick={() => navigate("/login")}>Login</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
