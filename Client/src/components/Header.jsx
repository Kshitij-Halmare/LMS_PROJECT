import React from 'react'
import { FaSearch } from "react-icons/fa";
import logo from "../assets/image_processing20191110-30800-mr2oo2.gif"
import { IoNotificationsOutline } from "react-icons/io5";
function Header() {
  return (
    <div className="h-16 bg-slate-950 flex justify-between">
      <div className='text-white flex items-center ml-9 text-2xl font-serif '>
        HELLO  Dude!
      </div>
      <div className="flex items-center">
      <input type="text" placeholder='Search' className='px-7 p-2 rounded-l-2xl' />
      <button className='bg-blue-500 p-3 rounded-r-2xl'><FaSearch className='text-white'/></button>
      </div>
      <div className='flex text-white items-center pr-4 gap-4'>
        <button ><IoNotificationsOutline className='text-2xl font-extrabold'/></button>
        <img src={logo} className="rounded-full h-10 w-10"/>
      </div>
    </div>  
  )
}

export default Header
