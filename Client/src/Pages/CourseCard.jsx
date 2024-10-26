import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseToCart } from '../redux/CartSlice';
import toast from 'react-hot-toast';

const CourseCard = ({ id, title, description, image, price, level, language, category }) => {
  console.log({ id, title, description, image, price, level, language, category });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.Cart.activeUser);

  const handleAddToCart = (e) => {
    e.stopPropagation();
  
    if (!activeUser) {
      toast.error("Please log in to add courses to the cart");
      return;
    }
  
    // Ensure all necessary fields, including courseId, are included
    dispatch(addCourseToCart({
      userId: activeUser,
      image,
      courseId: id, // Make sure this is set correctly
      title,
      price,
      level,
      category
    }));
    console.log('Course added to cart:', id);
    toast.success("Course added successfully");
  };
  

  const handleCourseClick = () => {
    navigate(`/CourseHome/${id}`);
  };

  return (
    <div 
      className="max-w-xs rounded-lg overflow-hidden border border-gray-200 shadow-lg shadow-black bg-white p-4 transition-transform transform hover:scale-105"
      onClick={handleCourseClick}
    >
      <img className="w-full h-32 object-cover rounded-lg" src={image} alt={title} />
      <div className="px-4 py-2">
        <h3 className="font-bold text-lg mb-1 text-center hover:underline">{title}</h3>
        <div className="mt-2 font-semibold text-lg">Price: ${price}</div>
        <p className="text-gray-700 text-base line-clamp-3">{description}</p>
        <div className="mt-2 text-sm text-gray-600">
          <p><strong>Level:</strong> {level}</p>
          <p><strong>Language:</strong> {language}</p>
          <p><strong>Category:</strong> {category}</p>
        </div>
      </div>
      <button
        className="w-full mt-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
        onClick={handleAddToCart}
        aria-label={`Add ${title} to cart`}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default CourseCard;
