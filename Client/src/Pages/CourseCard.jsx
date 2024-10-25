import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseToCart } from '../redux/CartSlice';
import toast from 'react-hot-toast';

const CourseCard = ({ id, title, description, image, price }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.Cart.activeUserId);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents the click from bubbling up to the card
    if (activeUser) {
      dispatch(addCourseToCart({ userId: activeUser, courseId: id, title, price }));
      console.log('Course added to cart:', id);
      toast.success("Course added successfully");
    } else {
      toast.error("Please login to add to cart");
    }
  };

  const handleCourseClick = () => {
    navigate(`/CourseHome/${id}`);
  };

  return (
    <div className="max-w-xs rounded-2xl overflow-hidden border shadow-xl shadow-black bg-white p-4 hover:scale-105">
      <div onClick={handleCourseClick} className="cursor-pointer">
        <img className="w-full h-24 rounded-2xl" src={image} alt={title} />
        <div className="px-6 py-2">
          <div className="font-bold text-xl mb-1 text-center hover:underline">{title}</div>
          <div className="mt-2 font-semibold text-lg">Price: ${price}</div>
          <p className="text-gray-700 text-base line-clamp-3">{description}</p>
        </div>
      </div>
      <button
        className="w-full mt-3 hover:bg-blue-700 p-2 bg-blue-400 text-white"
        onClick={handleAddToCart}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default CourseCard;
