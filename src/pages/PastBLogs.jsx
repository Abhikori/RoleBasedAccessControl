import React, { useState, useEffect } from "react";
import { useBlogs } from "../context/BlogContext";
import CSidebar from "../components/CreatorNav";

const PastBlogs = () => {
  const { blogs } = useBlogs();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 font-spaceGrotesk">
      {/* Sidebar */}
      <CSidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64 sm:ml-64" : "ml-0 sm:ml-64"
        } p-8`}
      >
        <header className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left">
            Your Published Blogs
          </h1>
          <input
            type="text"
            placeholder="Search your blogs..."
            value={search}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/3"
          />
        </header>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold text-gray-800 truncate">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="mt-4 text-gray-700 font-light line-clamp-3">
                  {blog.content}
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  Read More
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 font-light">
              You haven't written any blogs yet. Start sharing your thoughts!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastBlogs;
