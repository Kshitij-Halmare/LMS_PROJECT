import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons for password visibility toggle
import { useNavigate } from 'react-router-dom'; // Use the hook to navigate
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate(); // Corrected: useNavigate hook for navigation
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false); // To toggle password visibility

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      toast.error("All fields are required"); // Improved: error message format
      return;
    }
    const req = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/Login`, {
      method: 'POST', // Corrected: 'POST' should be a string
      headers: {
        "Content-Type": "application/json", // Fixed typo in Content-Type
      },
      body: JSON.stringify(user),
    });

    if (req.ok) {
      toast.success("User logged in successfully");
      navigate("/home");
    } else {
      toast.error("Login failed, please try again"); // Added error toast for failed login
    }
    console.log(user);
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
          Not yet Signed up?{" "}
          <span
            className="text-blue-500 hover:underline  cursor-pointer"
            onClick={() => navigate('/Signup')} // Fixed: navigate to signup
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
