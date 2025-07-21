import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiUnlock } from 'react-icons/fi';

const TourCard = ({ id, title, description, price, imageUrl, location, status, onDeleteSuccess, onStatusChange }) => {
  const navigate = useNavigate();
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}/`;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/admin/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDeleteSuccess(id);
    } catch (error) {
      console.error('Error deleting tour:', error.message);
      alert('Failed to delete the tour. Please try again.');
    }
  };

  const handleUpdate = () => {
    navigate(`/admin/tours/update/${id}`);
  };

  // Handle Ban Tour
  const handleBan = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/admin/tour/${id}/ban`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onStatusChange(id, 'banned'); // Update status in parent component
    } catch (error) {
      console.error('Error banning tour:', error.message);
      alert('Failed to ban the tour. Please try again.');
    }
  };

  // Handle Unban Tour
  const handleUnban = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/admin/tour/${id}/unban`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onStatusChange(id, 'active'); // Update status in parent component
    } catch (error) {
      console.error('Error unbanning tour:', error.message);
      alert('Failed to unban the tour. Please try again.');
    }
  };

  return (
    <div className="mb-3 w-full flex border border-gray-300 bg-white rounded-lg shadow-lg overflow-hidden h-[11rem] transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="w-1/3 h-full">
        <img
          className="object-cover h-full w-full rounded-l-lg"
          src={imageUrl ? `${baseURL}${imageUrl}` : 'https://via.placeholder.com/300'}
          alt={title}
        />
      </div>
      <div className="w-2/3 p-4 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-gray-900 font-semibold text-lg truncate">{title}</h2>
          <p className="text-gray-500 italic text-sm mt-1">{location}</p>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{description}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-purple-600 font-bold text-lg">₹{price}</div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition"
            >
              Update
            </button>
            {/* Ban/Unban Button */}
            {status === 'active' ? (
              <button
                onClick={handleBan}
                className="text-sm bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-md shadow-md hover:from-yellow-600 hover:to-yellow-700 transition"
              >
                <FiLock className="text-white" />
              </button>
            ) : (
              <button
                onClick={handleUnban}
                className="text-sm bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-md shadow-md hover:from-green-600 hover:to-green-700 transition"
              >
                <FiUnlock className="text-white" />
              </button>
            )}
            <button
              onClick={handleDelete}
              className="text-sm bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-md shadow-md hover:from-red-600 hover:to-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
