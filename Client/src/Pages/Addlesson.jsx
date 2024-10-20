import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from "react-hot-toast";
function AddLesson() {
  const { courseId } = useParams();
  const [user, setUser] = useState({
    lesson: '',
    description: '',
    videoUrl: '',
    materials: [],
  });

  const [lessons, setLessons] = useState([]);

  // Handle video file upload and preview
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file); // Create a local preview URL for the video
      setUser((prevState) => ({ ...prevState, videoUrl }));
    }
  };

  // Handle material upload (e.g., PDFs)
  const handleMaterialUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const materialUrl = URL.createObjectURL(file); // Create a local preview URL for the material
      setUser((prevState) => ({
        ...prevState,
        materials: [...prevState.materials, materialUrl],
      }));
    }
  };

  // Submit individual lesson
  const handleSubmitLesson = (e) => {
    e.preventDefault();
    console.log(user);
    if(!user.lesson || !user.description || (!user.videoUrl || !user.materials)){
      toast("title , video or material is required");
    }
    setLessons((prevLessons) => [...prevLessons, user]); // Add current lesson to lessons array
    setUser({
      lesson: '',
      description: '',
      videoUrl: '',
      materials: [],
    });
  };

  // Assuming you have already uploaded the video and material to Cloudinary or another file service
  const handleSubmitAllLessons = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/addLesson/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addLessons: lessons.map((lesson) => ({
            title: lesson.lesson,
            description: lesson.description,
            videoUrl: lesson.videoUrl, // URL of the uploaded video
            materialUrls: lesson.materials, // Array of URLs for uploaded materials
          })),
        }),
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Successfully added lessons");
      } else {
        toast.error("Failed to add lessons");
      }
    } catch (error) {
      console.error("Error adding lessons:", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="px-4 w-full mx-auto bg-white shadow-md rounded-lg">
      <div className="overflow-y-auto max-h-[83vh] p-4"> {/* Manage main container overflow */}
        <h1 className="font-semibold text-3xl mb-7 text-center text-gray-800">Update Your Course</h1>

        {/* Lesson Name Input */}
        <div className="flex flex-col mb-5">
          <label htmlFor="lessonName" className="text-lg font-medium mb-2">Lesson Name</label>
          <input
            type="text"
            value={user.lesson}
            placeholder="Enter lesson name"
            className="border-2 border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="lessonName"
            onChange={(e) => setUser({ ...user, lesson: e.target.value })}
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col mb-5">
          <label htmlFor="description" className="text-lg font-medium mb-2">Description</label>
          <textarea
            value={user.description}
            placeholder="Enter lesson description"
            className="border-2 border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="description"
            rows="4"
            onChange={(e) => setUser({ ...user, description: e.target.value })}
          />
        </div>

        {/* Video Upload Input */}
        <div className="flex flex-col mb-7">
          <label htmlFor="videoUrl" className="text-lg font-medium mb-2">Video Upload</label>
          <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg text-center">
            <input
              type="file"
              accept="video/*"
              className="hidden"
              id="videoUrl"
              onChange={handleVideoUpload}
            />
            Upload Video
          </label>
          {user.videoUrl && (
            <div className="mt-3">
              <p className="text-green-600 font-medium">Video uploaded successfully!</p>
              <video
                controls
                className="w-full h-64 mt-3 rounded-lg shadow-md"
                src={user.videoUrl}
                alt="Uploaded video preview"
              />
            </div>
          )}
        </div>

        {/* Material Upload Input */}
        <div className="flex flex-col mb-7">
          <label htmlFor="material" className="text-lg font-medium mb-2">Material Upload (PDF, Docs, etc.)</label>
          <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg text-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              id="material"
              onChange={handleMaterialUpload}
            />
            Upload Material
          </label>
          {user.materials.length > 0 && (
            <div className="mt-3">
              <p className="text-green-600 font-medium">Materials uploaded successfully!</p>
              <ul className="mt-2">
                {user.materials.map((material, index) => (
                  <li key={index} className="mb-2">
                    <a href={material} target="_blank" rel="noopener noreferrer">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                        View Material {index + 1}
                      </button>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Submit Button for Individual Lesson */}
        <button
          onClick={handleSubmitLesson}
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg text-lg hover:bg-green-600 transition duration-200"
        >
          Submit Lesson
        </button>
      </div>

      {/* Lessons Preview */}
      <div className="w-full overflow-y-auto max-h-[40vh] mt-5"> {/* Manage lessons preview overflow */}
        {lessons.length > 0 && (
          <ul className="text-center space-y-8">
            {lessons.map((lesson, index) => (
              <li key={index} className="mb-4 p-5 rounded-lg bg-slate-300">
                <h3 className="text-lg font-bold">{lesson.lesson}</h3>
                <p>{lesson.description}</p>
                {lesson.videoUrl && (
                  <video
                    controls
                    className="w-full h-48 mt-2 rounded-lg shadow-md"
                    src={lesson.videoUrl}
                    alt={`Lesson ${index + 1} video`}
                  />
                )}
                {lesson.materials.length > 0 && (
                  <ul className="mt-2">
                    {lesson.materials.map((material, matIndex) => (
                      <li key={matIndex}>
                        <a href={material} target="_blank" rel="noopener noreferrer">
                          <button className="px-4 py-2 bg-blue-500 mt-4 text-white rounded-lg">
                            View Material {matIndex + 1}
                          </button>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit All Lessons Button */}
      {lessons.length > 0 && (
        <button
          onClick={handleSubmitAllLessons}
          className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-green-600 mt-8"
        >
          Submit All Lessons
        </button>
      )}
    </div>
  );
}

export default AddLesson;
