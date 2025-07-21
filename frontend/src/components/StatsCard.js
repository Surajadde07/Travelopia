import React from 'react';

const StatsCard = ({ title, number, icon, percentage, additionalText, iconBgColor }) => {
  return (
    <div className="flex flex-col p-4  rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 text-sm">{title}</h2>
        <div className={`p-2 rounded-full ${iconBgColor}`}>
          {icon}
        </div>
      </div>
      <h1 className="text-4xl font-semibold text-gray-800">{number}</h1>
      <div className="flex items-center text-green-500 text-sm">
        <span className="ml-2 text-gray-500">{additionalText}</span>
      </div>
    </div>
  );
};

export default StatsCard;
