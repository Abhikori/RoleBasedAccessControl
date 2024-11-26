import React, { useEffect, useState } from "react";
import Sidebar from "../components/UserNav";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch posts from the DummyJSON API
  useEffect(() => {
    const fetchPosts = async () => {
      const url = "https://dummyjson.com/posts";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.posts); // Set posts data from the API response
      } catch (error) {
        setError("Failed to load posts");
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div className="text-center text-red-600 text-lg font-semibold">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-spaceGrotesk">
      <Sidebar />

      <main className="ml-0 sm:ml-64 flex-1 p-8 bg-gray-50 transition-all duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Trending Posts
        </h1>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {post.body.slice(0, 100)}...
                </p>

                <div className="mb-4 text-xs text-gray-500 flex flex-wrap gap-2">
                  {post.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full shadow-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>👍 {post.reactions?.likes || 0}</span>
                  <span>👎 {post.reactions?.dislikes || 0}</span>
                  <span>👁️ {post.views || 0} Views</span>
                </div>

                <Link
                  to="#"
                  className="block mt-6 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <Shimmer />
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
