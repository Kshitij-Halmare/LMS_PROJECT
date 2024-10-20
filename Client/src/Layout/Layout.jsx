import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from "../components/Header";
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white text-slate-900 fixed top-0 left-0 h-full ">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col w-full ml-64">
        {/* Header */}
        <div className="fixed top-0 left-64 right-0 z-10 bg-white">
          <Header />
        </div>

        {/* Outlet for rendering child routes */}
        <div className="flex-grow pt-16 p- overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
