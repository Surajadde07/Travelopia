import React from 'react';
import { AiOutlineStar } from 'react-icons/ai'; // For the star icon
import { MdDelete, MdEdit } from 'react-icons/md'; // For delete and update icons

const CategoryTour = ({ name, image, rating }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm w-[25%] mb-4 ">
      <img src={image} alt={name} className="rounded-lg w-full h-48 object-cover" />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-lg font-bold">{rating}</span>
          <AiOutlineStar className="text-yellow-500 text-lg ml-1" />
        </div>
      </div>
    </div>
  );
};

export default CategoryTour;
