import React, { useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

function AddCourse() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    title: '',
    description: '',
    category: '',
    language: '',
    level: '',
    image: null, 
    price: 0,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prevUser) => ({
        ...prevUser,
        image: file,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      category: e.target.value,
    }));
  };

  const handleLanguageChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      language: e.target.value,
    }));
  };

  const handleLevelChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      level: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.price < 0) {
      toast.error("Price cannot be negative");
      return;
    }

    const formData = new FormData();
    formData.append('title', user.title);
    formData.append('description', user.description);
    formData.append('category', user.category);
    formData.append('image', user.image);
    formData.append('price', user.price);
    formData.append('language', user.language);
    formData.append('level', user.level);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/add-course`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      console.log(response);

      if (!response.ok) {
        const errorText = await response.text();
        toast(`Error: ${errorText || 'Something went wrong.'}`);
        console.error('Server Response Error:', errorText);
        return;
      }

      const result = await response.json();

      if (!result || !result.success) {
        toast(`Error: ${result.message || 'Course creation failed.'}`);
        return;
      }

      if (result.success) {
        const courseId = result.course._id;
        console.log('Course created successfully:', result);
        toast.success('Course Created Successfully');
        navigate(`/existing-courses`, { state: { courseId } });
      }

    } catch (error) {
      console.error('Error while adding course:', error);
      toast.error(`Error: ${error.message || 'An unknown error occurred.'}`);
    }
  };

  return (
    <div className="flex flex-col p-4 space-x-8" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Left Side Form */}
      <div className="flex-1 flex flex-col max-h-full">
        <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex-1 overflow-y-auto p-4 border rounded-lg"
        >
          {/* Course Title */}
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={user.title}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
            required
          />

          {/* Course Description */}
          <textarea
            name="description"
            placeholder="Course Description"
            value={user.description}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
            required
          />

          {/* Category - Radio Buttons */}
          <div className="space-y-2">
            <label className="block font-medium">Select Category</label>
            {['Programming', 'Business', 'Design', 'Health & Fitness'].map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={user.category === category}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                <span>{category}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="relative top-3">
            <label htmlFor="price" className="ml-3 block font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={user.price}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          {/* Language - Radio Buttons */}
          <div className="space-y-2">
            <label className="block font-medium">Select Language</label>
            {['English', 'French', 'German', 'Spanish'].map((language) => (
              <div key={language} className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value={language}
                  checked={user.language === language}
                  onChange={handleLanguageChange}
                  className="mr-2"
                />
                <span>{language}</span>
              </div>
            ))}
          </div>

          {/* Level - Radio Buttons */}
          <div className="space-y-2">
            <label className="block font-medium">Select Level</label>
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <div key={level} className="flex items-center">
                <input
                  type="radio"
                  name="level"
                  value={level}
                  checked={user.level === level}
                  onChange={handleLevelChange}
                  className="mr-2"
                />
                <span>{level}</span>
              </div>
            ))}
          </div>

          {/* Image Upload */}
          <div className="flex items-center pt-6">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <button
                type="button"
                onClick={() => document.getElementById('image-upload').click()}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Upload Preview Image
              </button>
            </div>
            {user.image && (
              <div className="mt-0 flex ml-20 gap-10">
                <h4 className="font-semibold">Image Preview:</h4>
                <img
                  src={URL.createObjectURL(user.image)}
                  alt="Image Preview"
                  className="w-20 h-20 -mt-4 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
