import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from "../components/Header"
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-4">
        <Sidebar/>
      </div>


      <div className="flex flex-col flex-grow">
        {/* Header */}
        <div>
          {/* Header content */}
          <Header/>
        </div>

        {/* Content */}
        <div className="flex-grow">
          {/* Main content */}
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Layout
