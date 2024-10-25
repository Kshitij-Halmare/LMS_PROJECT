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
    <div className="h-16 bg-slate-900 flex justify-between items-center px-6 shadow-xl">
      <div className='text-white text-xl font-serif'>
        Welcome to Coursio!
      </div>
      
      <div className="flex items-center">
        <input type="text" placeholder='Search' className='px-4 py-2 rounded-l-full bg-blue-100 text-black focus:outline-none' />
        <button className='bg-blue-800 py-3 px-4 rounded-r-full hover:bg-blue-950'>
          <FaSearch className='text-white' />
        </button>
      </div>
      
      <div>
        <button onClick={handleTeacherSignup} className='px-3 py-1.5 m-3 hover:underline bg-slate-600 text-white border border-white rounded-md'>
          Teach on Coursio
        </button>
        <button onClick={navigate("/cart")} className='px-3 py-1.5 m-3 hover:underline bg-slate-600 text-white border border-white rounded-md'>
          Cart
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
