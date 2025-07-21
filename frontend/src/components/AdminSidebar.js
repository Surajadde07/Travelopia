import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';

function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.log("Error during logout", error);
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-[12%] h-[80vh] p-4 shadow-md flex flex-col justify-between rounded-lg bg-white">
            <div>
                <ul className="flex flex-col">
                    <li className="py-2">
                        <Link to="/admindashboard" className={`text-gray-600 relative group ${isActive('/admindashboard') ? 'text-blue-500 font-bold' : ''}`}>
                            Dashboard
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0  transition-opacity duration-300 ease-in-out rounded-md"></span>
                        </Link>
                    </li>
                    <li className="py-2">
                        <Link to="/admindashboard/tours" className={`text-gray-600 relative group ${isActive('/admindashboard/tours') ? 'text-blue-500 font-bold' : ''}`}>
                            Tours
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0  transition-opacity duration-300 ease-in-out rounded-md"></span>
                        </Link>
                    </li>
                    <li className="py-2">
                        <Link to="/admindashboard/bookings" className={`text-gray-600 relative group ${isActive('/admindashboard/bookings') ? 'text-blue-500 font-bold' : ''}`}>
                            Bookings
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 ease-in-out rounded-md"></span>
                        </Link>
                    </li>
                    <li className="py-2">
                        <Link to="/admindashboard/users" className={`text-gray-600 relative group ${isActive('/admindashboard/users') ? 'text-blue-500 font-bold' : ''}`}>
                            Users
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 ease-in-out rounded-md"></span>
                        </Link>
                    </li>
                    <li className="py-2">
                        <Link to="/admindashboard/reviews" className={`text-gray-600 relative group ${isActive('/admindashboard/reviews') ? 'text-blue-500 font-bold' : ''}`}>
                            Reviews
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 ease-in-out rounded-md"></span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='flex justify-center items-center gap-2' onClick={handleLogout}>
                <MdLogout className="text-gray-600" />
                <ul>
                    <li className="py-2">
                        <a href="" className="text-gray-600 relative group">
                            Log Out
                            <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 transition-opacity duration-300 ease-in-out rounded-md"></span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminSidebar;