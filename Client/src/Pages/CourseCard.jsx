// CourseCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
const CourseCard = ({id, title, description, image, price, category, level, language }) => {
  const navigate=useNavigate();
  console.log(id);
  return (
    <div className="max-w-xs  rounded-2xl overflow-hidden border border-5 shadow-xl bg-white p-4 hover:scale-105 " onClick={()=>navigate(`/CourseHome/${id}`)}>
      <img className="w-full h-24 rounded-2xl" src={image} alt={title} />
      <div className="px-6 py-2">
        <div className="font-bold text-xl mb-1 text-center hover:underline">{title}</div>
        <div className="mt-2 font-semibold text-lg">Price: ${price}</div>
        <p className="text-gray-700 text-base line-clamp-3">{description}</p>
        <button className="w-full mt-3 hover:bg-blue-700 p-2 bg-blue-400 text-white">Add To Cart</button>
      </div>
    </div>
  );
};

export default CourseCard;
