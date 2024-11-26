import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CSidebar = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      {/* Toggle Button for Mobile View */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-[#2B3A33] p-3 rounded-full text-[#F09120] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F09120]"
      >
        {isSidebarOpen ? (
          <span className="text-lg font-bold">✖</span> // Close Icon
        ) : (
          <span className="text-lg font-bold">☰</span> // Menu Icon
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#2B3A33] shadow-lg flex flex-col font-spaceGrotesk transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:w-64 z-40`}
      >
        {/* Sidebar Header */}
        <div className="p-6 text-2xl font-extrabold text-[#F09120] border-b border-gray-600 bg-[#27332E] shadow-md">
          Creator Role
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-6">
            <li>
              <Link
                to="/creator"
                className="block p-4 rounded-md text-lg font-medium text-white bg-transparent hover:bg-[#3C4C43] hover:text-[#F09120] transition-transform transform hover:scale-105 shadow-md"
              >
                Past Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/creator/write"
                className="block p-4 rounded-md text-lg font-medium text-white bg-transparent hover:bg-[#3C4C43] hover:text-[#F09120] transition-transform transform hover:scale-105 shadow-md"
              >
                Write a Blog
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-600">
          <button
            onClick={handleLogOut}
            className="w-full px-4 py-3 text-center text-lg font-semibold text-white bg-red-600 rounded-md shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile Menu */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
        ></div>
      )}
    </>
  );
};

export default CSidebar;
