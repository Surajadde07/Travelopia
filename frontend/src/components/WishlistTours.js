import React from 'react';
import { FcLike } from "react-icons/fc";
import { Link } from 'react-router-dom';
import nature from '../assets/nature.jpg';

function WishlistTours({ title, price, image, tourId, onRemove }) {
    return (
        <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition group shadow-sm hover:shadow-md">
            
            {/* Image */}
            <div className="flex-shrink-0 w-40 h-40 overflow-hidden rounded-xl">
                <img 
                    src={image || nature} 
                    alt={title} 
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            {/* Tour Details */}
            <div className="flex flex-col justify-between flex-1 text-gray-800">
                <div>
                    <h2 className="text-2xl font-light mb-1">{title}</h2>
                    <p className="text-lg text-gray-500">{price}</p>
                </div>

                {/* Book Now Button hidden until hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-6">
                    <Link to={`/dashboard/booknow/${tourId}`}>
                        <button className="px-6 py-2 rounded-full bg-black text-white text-xs tracking-wider hover:bg-gray-900 transition">
                            BOOK NOW
                        </button>
                    </Link>
                </div>
            </div>

            {/* Heart Icon */}
            <div 
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => onRemove(tourId)}
            >
                <FcLike className="text-xl" />
            </div>

        </div>
    );
}

export default WishlistTours;
