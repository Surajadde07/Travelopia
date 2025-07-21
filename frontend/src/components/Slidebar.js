import React from 'react';
import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem('token'); // Clear token from local storage
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="w-[10rem] bg-white h-[70vh] p-4 shadow-md flex flex-col justify-between rounded-lg">
      <div>
        <ul className="flex flex-col">
          <Link to="/login/userdashboard">
            <li className="py-2">
              <a href="#home" className="text-gray-600 hover:text-[#00a7c7]">Home</a>
            </li>
          </Link>
          <Link to="/moments">
            <li className="py-2">
              <a href="#schedule" className="text-gray-600 hover:text-[#00a7c7]">Moments</a>
            </li>
          </Link>
          <Link to="/login/userdashboard/mybookings">
            <li className="py-2">
              <a href="#schedule" className="text-gray-600 hover:text-[#00a7c7]">My Bookings</a>
            </li>
          </Link>
          <Link to="/login/userdashboard/wishlistfull">
            <li className="py-2">
              <a href="#tickets" className="text-gray-600 hover:text-[#00a7c7]">My Wishlist</a>
            </li>
          </Link>
          <Link to="/login/dashboard/myreviews">
            <li className="py-2">
              <a href="#statistics" className="text-gray-600 hover:text-[#00a7c7]">My Reviews</a>
            </li>
          </Link>
          <Link to="/login/userdashboard/userprofile">
            <li className="py-2">
              <a href="#customers" className="text-gray-600 hover:text-[#00a7c7]">Profile Settings</a>
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex justify-center items-center gap-2 cursor-pointer" onClick={handleLogout}>
        <MdOutlineLogout className="text-[#0044C7]" />
        <ul>
          <li className="py-2">
            <a href="#logout" className="text-[#0044C7] font-semibold">Log Out</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
