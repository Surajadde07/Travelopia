import React from 'react';

const AllTour = ({ title, description, price, discount, imageUrl, onUpdate, onDelete }) => {
  return (
    <div className="max-w-2xl w-full flex items-center border rounded-lg shadow-md p-4 bg-white mb-4">
      {/* Image Section */}
      <div className="w-1/3">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-lg object-cover h-full"
        />
      </div>

      {/* Info Section */}
      <div className="w-2/3 ml-4 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-xl text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-2">{description}</p>
          <div className="text-purple-600 text-2xl font-bold">${price}</div>
          <p className="text-gray-400 text-sm">{discount} Off</p>
        </div>

        {/* Update & Delete Buttons */}
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={onUpdate}
          >
            Update
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTour;
