import React from 'react';

function ResortCard({ title, rating, image }) {
  return (
    <div className="bg-white transition-transform transform hover:scale-105 rounded-lg shadow-md overflow-hidden w-[270px] h-[270px] mb-3 mt-2 cursor-pointer">
      <img src={image} alt={title} className="w-full h-[70%] object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-yellow-500">{rating} ⭐</div>
      </div>
    </div>
  );
}

export default ResortCard;
