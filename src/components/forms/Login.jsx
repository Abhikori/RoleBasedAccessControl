import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { role } = JSON.parse(storedAuth);
      if (role === "admin") {
        navigate("/dashboard", { replace: true });
      } else if (role === "user") {
        navigate("/user", { replace: true });
      } else if (role === "vendor") {
        navigate("/creator", { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const mockUsers = [
      { email: "admin@gmail.com", password: "admin1234", role: "admin" },
      { email: "user@gmail.com", password: "user1234", role: "user" },
      { email: "creator@gmail.com", password: "creator1234", role: "creator" },
    ];

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const userAuthData = { email: user.email, role: user.role };
      localStorage.setItem("auth", JSON.stringify(userAuthData));
      setAuth(userAuthData);

      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "user") {
        navigate("/user");
      } else if (user.role === "creator") {
        navigate("/creator");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
          Welcome Back
        </h1>
        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded-md text-center mb-4 animate-pulse">
            {error}
          </p>
        )}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold rounded-full shadow-md hover:shadow-xl hover:from-blue-600 hover:to-purple-500 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
