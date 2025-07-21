import React, { useState, useEffect } from 'react';
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { Link } from 'react-router-dom';
import axios from 'axios';

function PackageCard({ title, price, image, tourId, token, isLikedInitially, onWishlistChange }) {
  const [liked, setLiked] = useState(isLikedInitially);

  useEffect(() => {
    setLiked(isLikedInitially); // Sync state with initial prop
  }, [isLikedInitially]);

  const handleLikeClick = async () => {
    try {
      if (liked) {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard/wishlist/remove`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { tourId }, // Sending tourId as part of the DELETE request body
        });
        setLiked(false);
        onWishlistChange(tourId, false);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard/wishlist/add`, 
        { tourId }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLiked(true);
        onWishlistChange(tourId, true);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error.message);
    }
  };

  return (
    <div className="bg-white h-[7rem] rounded-lg shadow-md p-4 flex justify-center items-center gap-1 cursor-pointer">
      <div className="w-[27%] h-full">
        <img src={image ? `${process.env.REACT_APP_BACKEND_URL}/${image}` : 'https://via.placeholder.com/300'} alt={title} className="h-[100%] w-[100%] object-cover rounded-md" />
      </div>
      <div className="w-[54%] h-full p-1 overflow-hidden">
        <h3 className="text-lg font-semibold h-[40%] overflow-hidden w-full">{title}</h3>
        <p className="text-lg font-semibold h-[50%] text-purple-600">{price}</p>
      </div>
      <div className="flex flex-col w-[30%] h-full justify-center gap-5 p-1 items-end">
        {/* Like Icon */}
        <div onClick={handleLikeClick} className="h-[50%]">
          {liked ? <FcLike className="text-xl cursor-pointer" /> : <FcLikePlaceholder className="text-xl cursor-pointer" />}
        </div>
        {/* Book Now Button */}
        <Link to={`/dashboard/booknow/${tourId}`}>
          <button className='text-base px-2 text-center bg-gradient-to-r from-green-400 to-blue-500 rounded-md w-[100%] text-white h-[2rem] hover:shadow-lg'>
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PackageCard;
