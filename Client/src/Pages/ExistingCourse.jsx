import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function ExistingCourses() {
    const [courses, setCourses] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/getCourses`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();

                // Log the response to verify the data structure
                console.log('Courses Data:', data);

                if (!response.ok) {
                    setError(data.message || 'Unable to fetch courses');
                    toast.error(data.message || 'Unable to fetch courses');
                    return;
                }

                if (data.success) {
                    setCourses(data.courses);  // Set the courses if successful
                } else {
                    setError('No courses available.');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Error fetching courses');
                toast.error('Error fetching courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleEditCourse = (courseId) => {
        navigate(`/AddLessons/${courseId}`);
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/deleteCourse`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                body: JSON.stringify({ id: courseId }) // Send the course ID as a JSON object
            });
            const ans = await response.json(); // Get the response JSON

            if (ans.success) {
                toast.success("Course Deleted Successfully");
                // Optionally, refresh the courses after deletion
                setCourses(courses.filter(course => course._id !== courseId));
            } else {
                toast.error(ans.message);
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('Error deleting course');
        }
    };

    if (!courses || !Array.isArray(courses)) {
        return <div>No courses available</div>; // or return null if you prefer to show nothing
    }

    return (
        <div className="p-4 bg-blue-100">
            <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>

            {/* Conditional rendering for loading, error, and courses */}
            {loading ? (
                <p>Loading courses...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : courses.length === 0 ? (
                <p>No courses available. Please create a new course.</p>
            ) : (
                <div className="space-y-4 max-h-[75vh] overflow-y-auto">
                    {courses.map((course) => (
                        <div key={course._id} className="flex bg-slate-400 justify-between items-center p-4 border rounded-lg shadow-lg">
                            <div className="flex justify-center items-center gap-10">
                                <img src={course.image} alt={course.title} className="h-32 w-40 object-cover" />
                                <div>
                                    <h3 className="text-2xl font-semibold">{course.title}</h3>
                                    <p className="mt-2">{course.description}</p>
                                    <p>
                                        <span className="font-semibold">Category:</span> {course.category.join(', ')}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Price:</span> ${course.price}
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                                    onClick={() => handleEditCourse(course._id)}
                                >
                                    Edit / Add Material
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500"
                                    onClick={() => handleDeleteCourse(course._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExistingCourses;
