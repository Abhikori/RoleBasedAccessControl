import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-[#2B3A33] p-3 rounded-full text-[#F7E200] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F7E200]"
      >
        {isSidebarOpen ? (
          <span className="text-xl">✖</span> // Close icon
        ) : (
          <span className="text-xl">☰</span> // Menu icon
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#2B3A33] shadow-lg flex flex-col transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:w-64 z-40`}
      >
        {/* Sidebar Header */}
        <div className="p-6 text-2xl font-extrabold text-[#F7E200] border-b border-gray-600">
          User Role
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-6">
            <li>
              <Link
                to="/user"
                className="block p-4 rounded-md text-lg font-medium text-white bg-transparent hover:bg-[#3C4C43] hover:text-[#F7E200] transition-transform transform hover:scale-105"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/user/following"
                className="block p-4 rounded-md text-lg font-medium text-white bg-transparent hover:bg-[#3C4C43] hover:text-[#F7E200] transition-transform transform hover:scale-105"
              >
                Creators Following
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-600">
          <button
            onClick={handleLogOut}
            className="w-full px-4 py-3 text-center text-lg font-semibold text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
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

export default Sidebar;
