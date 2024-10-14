import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Password visibility toggle icons
import { useNavigate } from 'react-router-dom'; // useNavigate hook for navigation
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate(); // Corrected: useNavigate hook for navigation
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation for email and password
    if (user.email === "" || user.password === "") {
      toast.error("All fields are required");
      return;
    }

    // Simple email validation regex (for demo purposes)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const req = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include", // Ensure cookies are sent with the request
      });

      // Handle server response
      const data = await req.json();
      if (req.ok) {
        toast.success("User logged in successfully");
        navigate("/home");
      } else {
        toast.error(data.message || "Login failed, please try again");
      }
    } catch (error) {
      toast.error("An error occurred, please try again");
      console.error("Login error:", error); // Log the error for debugging
    }
  };

  return (
    <div className='w-full h-full bg-slate-300 px-96 py-32'>
      <div className='max-w-96 bg-white rounded-lg shadow-lg shadow-black p-7'>
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative mb-4">
            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-6">
            <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
            >
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        <p className='pt-4'>
          Not yet signed up?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate('/signup')} // Navigate to signup page
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
