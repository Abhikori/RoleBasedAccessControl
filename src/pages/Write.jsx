import React, { useState } from "react";
import { useBlogs } from "../context/BlogContext";
import CSidebar from "../components/CreatorNav";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const { addBlog } = useBlogs();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      addBlog({ title, content, date: new Date().toLocaleDateString() });
      setTitle(""); 
      setContent("");
      toast.success("Your blog post has been successfully published!");
    } else {
      toast.error("All fields are required. Please fill in the title and content.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Sidebar */}
      <CSidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64 sm:ml-64" : "ml-0 sm:ml-64"
        } p-8 font-spaceGrotesk`}
      >
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left mb-6">
            Write a New Blog Post
          </h1>

          {/* Blog Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Blog Title */}
            <div className="form-group">
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Blog Title:
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter an engaging title for your blog post"
                required
              />
            </div>

            {/* Blog Content */}
            <div className="form-group">
              <label
                htmlFor="content"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Blog Content:
              </label>
              <Editor
                apiKey="m079onxa3zfnox3p2tqybmwtggrl7jjxtxldb109n2btkudm" 
                value={content}
                onEditorChange={(newContent) => setContent(newContent)}
                init={{
                  height: 400,
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                  content_style:
                    "body { font-family:Arial,sans-serif; font-size:16px; color:#333 }",
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
            >
              Publish Your Blog
            </button>
          </form>
        </div>
      </main>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default WriteBlog;
