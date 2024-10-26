import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCourseFromCart } from '../redux/CartSlice';
import { MdDelete } from "react-icons/md";
function CartCards({ image, title, price, courseId, level, language, category }) {
  const dispatch = useDispatch();
console.log({ image, title, price, courseId, level, language, category });
  const handleClick = (courseId) => {
    console.log(courseId);
    dispatch(deleteCourseFromCart({
      userId: localStorage.getItem("activeUserId"),
      courseId: courseId,
    }));
  };

  return (
    <div className='bg-white shadow-lg rounded-lg mb-3 mx-3 p-4 w-3/4 flex transition-transform transform hover:scale-105'>
      <img src={image} alt={title} className='w-48 h-36 object-cover rounded-md' />
      <div className='ml-4 flex-grow'>
        <h2 className='text-xl font-serif font-semibold'>{title}</h2>
        <h3 className='font-serif mt-2'>Price: ${price}</h3>
        <h4 className='font-serif'>Level: {level}</h4>
        <h4 className='font-serif'>Language: {language}</h4>
        <h4 className='font-serif'>Category: {category}</h4>
      </div>
      <MdDelete onClick={() => handleClick(courseId)} className='text-red-700 cursor-pointer text-xl'/>
    </div>
  );
}

export default CartCards;
