import React from 'react';
import logo from "../assets/assets-logo.png";
import { RiHome3Line } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineSchedule, MdAnalytics, MdOutlineMessage, MdOutlineAssignment } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-between h-full w-full shadow-xl p-4'>
      <div>
        <div className='flex items-center py-2'>
          <img src={logo} alt="logo" className='h-11 w-12' />
          <h1 className="text-blue-900 text-3xl font-serif font-bold ml-1">Coursio</h1>
        </div>
        <div className='flex flex-col items-start justify-center gap-3 ml-2 pt-6'>
          <p className='flex items-center gap-3 w-full py-3 rounded-md cursor-pointer
                        hover:bg-blue-500 hover:text-white transition-colors duration-300'
             onClick={() => navigate('/home')}>
            <RiHome3Line className='text-xl' /> Home
          </p>
          <p className='flex items-center gap-3 w-full py-3 rounded-md cursor-pointer
                        hover:bg-blue-500 hover:text-white transition-colors duration-300'
             onClick={() => navigate('/schedule')}>
            <MdOutlineSchedule className='text-xl' /> Schedule
          </p>
          <p className='flex items-center gap-3 w-full py-3 rounded-md cursor-pointer
                        hover:bg-blue-500 hover:text-white transition-colors duration-300'
             onClick={() => navigate('/courses')}>
            <IoBookOutline className='text-xl' /> Courses
          </p>
          <p className='flex items-center gap-3 w-full py-3 rounded-md cursor-pointer
                        hover:bg-blue-500 hover:text-white transition-colors duration-300'
             onClick={() => navigate('/analytics')}>
            <MdAnalytics className='text-xl' /> Analytics
          </p>
          <p className='flex items-center gap-3 w-full py-3 rounded-md cursor-pointer
                        hover:bg-blue-500 hover:text-white transition-colors duration-300'
             onClick={() => navigate('/assignment')}>
            <MdOutlineAssignment className='text-xl' /> Assignment
          </p>
          <p className='flex items-center gap-3 w-full py-3 rounded-md cursor-pointer
                        hover:bg-blue-500 hover:text-white transition-colors duration-300'
             onClick={() => navigate('/messages')}>
            <MdOutlineMessage className='text-xl' /> Message
          </p>
          <p className='flex items-center gap-3 w-full py-3 rounded-md cursor-pointer
                        hover:bg-blue-500 hover:text-white transition-colors duration-300'
             onClick={() => navigate('/help')}>
            <IoIosHelpCircleOutline className='text-xl' /> Help
          </p>
        </div>
      </div>
      <div className="pb-5 text-center text-white">
        Footer or additional content here
      </div>
    </div>
  );
}

export default Sidebar;
