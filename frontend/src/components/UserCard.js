import React from 'react';
import { FaUser } from "react-icons/fa6";

const UserCard = ({ name, email, role, joinDate }) => {
  return (
    <div className="max-w-sm mb-3 w-[100%] lg:max-w-full lg:flex flex justify-center items-center h-[11rem]">
      <div className="border border-gray-300 bg-white rounded-lg shadow-md p-4 px-8 flex flex-row justify-between items-center leading-normal w-[100%] h-full">
        <div>
        <FaUser className='text-7xl text-[#4083f3] '/>
        </div>
        <div className='w-[80%]'>
        <div className="mb-3">
          <div className="text-gray-900 font-bold text-2xl">{name}</div>
          <p className="text-gray-700 text-md">Email: {email}</p>
        </div>
        <div className="flex justify-between items-center ">
          <p className="text-gray-600 text-md">Joined on: {joinDate}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
