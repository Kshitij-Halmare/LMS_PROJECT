import React, { useState } from 'react';
import toast from "react-hot-toast";

function AddCourse() {
  const [user, setUser] = useState({
    title: '',
    description: '',
    category: [],
    image: null // Set initial image state to null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prevUser) => ({
        ...prevUser,
        image: file, // Store the actual file object
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value, // Dynamically update user state based on input name
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setUser((prevUser) => {
      const newCategories = checked
        ? [...prevUser.category, value]
        : prevUser.category.filter((category) => category !== value);
      return { ...prevUser, category: newCategories };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(); // Create FormData object
    formData.append('title', user.title);
    formData.append('description', user.description);
    formData.append('category', JSON.stringify(user.category)); // Send as JSON string if needed
    formData.append('image', user.image); // Append the actual file
  
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/add-course`, {
        method: 'POST',
        body: formData, 
        credentials:'include'
      });
  
      // Check if response is successful (status code 2xx)
      if (!response.ok) {
        const errorText = await response.text();
        toast(`Error: ${errorText || 'Something went wrong.'}`);
        console.error('Server Response Error:', errorText);
        return;
      }
  
      const result = await response.json(); // Assuming the response is JSON
  
      // Check if result is as expected
      if (!result || !result.success) {
        toast(`Error: ${result.message || 'Course creation failed.'}`);
        return;
      }
  
      console.log('Course created successfully:', result);
      toast('Course Created Successfully');
    } catch (error) {
      // Catch any unexpected errors (e.g., network issues)
      console.error('Error while adding course:', error);
      toast(`Error: ${error.message || 'An unknown error occurred.'}`);
    }
  };
  

  return (
    <div className="flex p-8 space-x-8 max-h-[calc(100vh-300px)]">
      {/* Left Side Form */}
      <div className="flex-1 space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Category - Checkboxes */}
          <div className="space-y-2">
            <label className="block font-medium">Select Categories</label>
            {['Programming', 'Business', 'Design', 'Health & Fitness'].map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  value={category}
                  checked={user.category.includes(category)}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                <span>{category}</span>
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
              <div className="mt-4">
                <h4 className="font-semibold">Image Preview:</h4>
                <img
                  src={URL.createObjectURL(user.image)} // Display image preview
                  alt="Image Preview"
                  className="w-32 ml-5 h-32 object-cover rounded-md"
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

      {/* Right Side - Display Added Course Details */}
      {user.title && (
        <div className="w-1/3 h-80 p-6 border-l flex flex-col items-center justify-center ml-8 bg-gray-200 rounded-md shadow-xl overflow-hidden">
          <img
            src={user.image ? URL.createObjectURL(user.image) : null} // Ensure image preview works only when image exists
            alt="Course"
            className="h-40 w-80 rounded-xl mb-4 mt-8 object-cover"
          />
          <h1 className="font-serif font-extrabold p-2 underline text-center">{user.title}</h1>
          <h3 className="mt-2">Category: {user.category.join(', ')}</h3>
          <p
            className="p-2 text-center overflow-hidden"
            style={{
              display: 'webkit-box',
              WebkitLineClamp: 3, // Limit to 3 lines
              WebkitBoxOrient: 'vertical',
              wordWrap: 'break-word', // Break long words
              padding: '0 1rem', // Add horizontal padding for the text
              height: '6rem', // Set a fixed height for 3 lines
              overflow: 'hidden', // Hide the overflow content
              textOverflow: 'ellipsis', // Add ellipsis if text overflows
            }}
          >
            {user.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default AddCourse;
