import React from 'react';
import { Link } from 'react-router-dom';

function DestinationCard({ title, price, image, tourId, token, isLikedInitially, onWishlistChange }) {
  return (
    <div className="bg-white h-[7rem] rounded-lg shadow-md p-4 flex justify-center items-center gap-1 cursor-pointer">
      <div className="w-[27%] h-full">
        <img src={image ? `${process.env.REACT_APP_BACKEND_URL}/${image}` : 'https://via.placeholder.com/300' } alt={title} className="h-[100%] w-[100%] object-cover rounded-md" />
      </div>
      <div className="w-[54%] h-full p-1 overflow-hidden">
        <h3 className="text-lg font-semibold h-[40%] overflow-hidden w-full">{title}</h3>
        <p className="text-lg font-semibold h-[50%] text-purple-600">{price}</p>
      </div>
      <div className="flex flex-col w-[30%] h-full justify-center gap-5 p-1 items-end">
        <Link to={`/login`}>
          <button className='text-base px-2 text-center bg-[#00a7c7] rounded-sm w-[100%] text-white h-[1.8rem]'>
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DestinationCard;
