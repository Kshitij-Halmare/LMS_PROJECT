import React from 'react';
import logo from "../assets/assets-logo.png";
import { RiHome3Line } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineSchedule } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineAssignment } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom'; // Remove Navigate import

function Sidebar() {
  const navigate = useNavigate(); // Renamed the variable to avoid conflict
  
  return (
    <div className='flex flex-col justify-between h-full overflow-y-hidden '>
      <div>
        <div className='flex items-center p-2 '>
          <img src={logo} alt="" className='h-11 w-12' />
          <h1 className="text-white text-3xl font-bold font-serif">Coursio</h1>
        </div>
        <div className='p-2 flex flex-col items-start justify-center pt-6 cursor-pointer'>
          <p className='flex w-full items-center gap-2 pl-2 rounded-xl font-sans text-slate-300 pt-4 pb-4 hover:bg-slate-600 hover:text-white hover:w-full' 
             onClick={() => navigate('/home')}>
            <RiHome3Line className='text-xl' /> Home
          </p>
          <p className='flex w-full items-center gap-2 pl-2 rounded-xl font-sans cursor-pointer text-slate-300 pt-4 pb-4 hover:bg-slate-600 hover:text-white hover:w-full' 
             onClick={() => navigate('/schedule')}>
            <MdOutlineSchedule className='text-xl' /> Schedule
          </p>
          <p className='flex w-full items-center gap-2 pl-2 rounded-xl font-sans text-slate-300 cursor-pointer pt-4 pb-4 hover:bg-slate-600 hover:text-white hover:w-full' 
             onClick={() => navigate('/courses')}>
            <IoBookOutline className='text-xl' /> Courses
          </p>
          <p className='flex w-full items-center gap-2 pl-2 rounded-xl font-sans text-slate-300 pt-4 pb-4 cursor-pointer hover:bg-slate-600 hover:text-white hover:w-full' 
             onClick={() => navigate('/analytics')}>
            <MdAnalytics className='text-xl' /> Analytics
          </p>
          <p className='flex w-full items-center gap-2 pl-2 rounded-xl font-sans text-slate-300 pt-4 pb-4 cursor-pointer hover:bg-slate-600 hover:text-white hover:w-full' 
             onClick={() => navigate('/assignment')}>
            <MdOutlineAssignment className='text-xl' /> Assignment
          </p>
          <p className='flex w-full items-center gap-2 pl-2 rounded-xl font-sans text-slate-300 pt-4 pb-4 hover:bg-slate-600 hover:text-white hover:w-full' 
             onClick={() => navigate('/messages')}>
            <MdOutlineMessage className='text-xl' /> Message
          </p>
          <p className='flex w-full items-center gap-2 pl-2 rounded-xl font-sans text-slate-300 pt-4 pb-4 cursor-pointer hover:bg-slate-600 hover:text-white hover:w-full' 
             onClick={() => navigate('/help')}>
            <IoIosHelpCircleOutline className='text-xl' /> Help
          </p>
        </div>
      </div>
      <div>
        <p className="text-white text-center pb-5">Footer or additional content here</p>
      </div>
    </div>
  );
}

export default Sidebar;
