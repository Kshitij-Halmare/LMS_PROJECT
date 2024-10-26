import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from "../assets/image_processing20191110-30800-mr2oo2.gif";
import camera from "../assets/camera.jpg";
import toast from 'react-hot-toast';
import student from "../assets/cheerful-student-studying-with-laptop-university-table_1316704-59215.avif";

function StudentSignup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: null
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user, 
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser(prevState => ({
      ...prevState,
      image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.name === "" || user.email === "" || user.password === "" || user.confirmpassword === "") {
      toast.error("Please fill all the details");
      return;
    }

    if (user.password !== user.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("confirmpassword", user.confirmpassword);
      formData.append("profession", "student");
      // Append image file if it's available
      if (user.image) {
        formData.append("image", user.image);
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/Signup`, {
        method: "POST",
        body: formData, // Sending FormData to handle file upload
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        toast.success("User created successfully");
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "An error occurred");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="w-full p-5 h-full bg-slate-300 flex justify-center gap-9 items-center">
      <div className='w-1/2  p-2 h-full bg-white shadow-xl shadow-black rounded-lg flex items-center'>
        <img src={student} alt="Student" />
      </div>
      <div className="px-8 py-6 w-1/2  bg-white shadow-xl shadow-black rounded-lg max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="relative">
            <input 
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden" 
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <img
                src={user.image ? URL.createObjectURL(user.image) : camera} // Display selected image or camera placeholder
                alt="Uploaded"
                className="absolute h-8 w-8 rounded-full ml-44 mt-16 cursor-pointer bg-white hover:border hover:border-xl"
              />
            </label>
          </div>

          <img 
            src={user.image ? URL.createObjectURL(user.image) : logo} 
            className="h-24 w-24 rounded-full m-auto" 
            alt="logo" 
          />

          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
              className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
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

          <div className="relative">
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

          <div className="relative">
            <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmpassword"
              placeholder="Confirm Password"
              value={user.confirmpassword}
              onChange={handleChange}
              className="pl-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
            >
              {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4">
          Already Signed up?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default StudentSignup;
