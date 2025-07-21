import React from 'react';

function Card({ image, title, location, rating, reviews }) {
  return (
    <div className="rounded-lg p-4 w-[250px] bg-transparent">
      {/* Image Section */}
      <img 
        src={image} 
        alt={title} 
        className="w-full h-[200px] object-cover rounded-lg shadow-md"
      />
      
      {/* Text Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-white">{location}</p>

        {/* Rating and Review */}
        <div className="flex items-center mt-3">
          <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 shadow">
            <span className="text-yellow-400 text-xl">⭐</span>
            <span className="ml-1 text-gray-700 font-semibold">{rating}</span>
          </div>
          <p className="ml-2 text-white text-sm">{reviews} reviews</p>
        </div>
      </div>
    </div>
  );
}

export default Card;