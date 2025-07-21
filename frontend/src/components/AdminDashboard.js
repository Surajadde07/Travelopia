import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/Logo.png';
import { HiUserCircle } from "react-icons/hi2";
import StatsCard from './StatsCard';
import TourCard from './TourCard';
import UserCard from './UserCard';
import { FaUsers, FaMapMarkedAlt, FaCalendarCheck } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import AdminSidebar from './AdminSidebar';
import { IoMdSend } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookCircleLine } from "react-icons/ri";
import { LuTwitter } from "react-icons/lu";

function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token'); // Assuming token is stored here

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDashboardData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching admin dashboard data:', err.message);
                setError('Failed to load dashboard data. Please try again later.');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [token]);

    const handleDeleteSuccess = (deletedId) => {
        setDashboardData((prevData) => ({
            ...prevData,
            recentTours: prevData.recentTours.filter((tour) => tour._id !== deletedId),
        }));
    };

    const handleStatusChange = (tourId, status) => {
        // Update the status of the tour in the state
        setDashboardData((prevData) => ({
            ...prevData,
            recentTours: prevData.recentTours.map((tour) =>
                tour._id === tourId ? { ...tour, status } : tour
            ),
        }));
    };


    if (loading) {
        return <div className="flex items-center text-2xl justify-center h-screen">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">No data available.</p>
            </div>
        );
    }

    const { totalUsers, totalTours, totalBookings, totalReviews, recentTours, recentUsers } = dashboardData;

    return (
        <div className='h-auto w-screen bg-gray-100 overflow-x-hidden'>
            {/* Header Section */}
            <div className='flex w-full justify-between items-center px-[3rem] py-5'>
                <img src={logo} alt="Logo" className='h-[90px]' />
                <div className='flex items-center'>
                    <HiUserCircle className='text-[#4083f3] text-4xl' />
                    <p className='text-md ml-2'>Admin</p>
                </div>
            </div>

            {/* Sidebar and Main Content */}
            <div className='flex'>
                {/* Sidebar */}
                <AdminSidebar />

                {/* Main Content */}
                <div className='w-[85%] h-full rounded-lg p-5'>
                    <h2 className='welcome text-4xl flex justify-start mb-8'>Welcome back, Admin</h2>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-4 gap-6 mb-10">
                        <StatsCard
                            title="Total Users"
                            number={totalUsers}
                            icon={<FaUsers className="text-white text-2xl" />}
                            iconBgColor="bg-purple-500"
                        />
                        <StatsCard
                            title="Total Tours"
                            number={totalTours}
                            icon={<FaMapMarkedAlt className="text-white text-2xl" />}
                            iconBgColor="bg-orange-500"
                        />
                        <StatsCard
                            title="Total Bookings"
                            number={totalBookings}
                            icon={<FaCalendarCheck className="text-white text-2xl" />}
                            iconBgColor="bg-teal-500"
                        />
                        <StatsCard
                            title="Total Reviews"
                            number={totalReviews}
                            icon={<MdRateReview className="text-white text-2xl" />}
                            iconBgColor="bg-red-500"
                        />
                    </div>

                    {/* Recently Added Section */}
                    <div className='grid grid-cols-2 gap-6'>
                        {/* Recently Added Tours */}
                        <div>
                            <h3 className='text-xl font-semibold mb-4'>Recently Added Tours</h3>
                            {recentTours.length > 0 ? (
                                recentTours.map((tour) => (
                                    <TourCard
                                        key={tour._id}
                                        id={tour._id}
                                        title={tour.title}
                                        description={tour.description}
                                        price={tour.pricePerPerson}
                                        status={tour.status}
                                        imageUrl={tour.image || 'https://via.placeholder.com/400'}
                                        onDeleteSuccess={handleDeleteSuccess} // Pass the handler
                                        onStatusChange={handleStatusChange}

                                    />
                                ))
                            ) : (
                                <p className='text-gray-500'>No tours available.</p>
                            )}
                        </div>

                        {/* Recently Added Users */}
                        <div>
                            <h3 className='text-xl font-semibold mb-4'>Recently Added Users</h3>
                            {recentUsers.length > 0 ? (
                                recentUsers.map((user) => (
                                    <UserCard
                                        key={user._id}
                                        name={user.username || 'N/A'}
                                        email={user.email}
                                        joinDate={new Date(user.createdAt).toLocaleDateString()}
                                    />
                                ))
                            ) : (
                                <p className='text-gray-500'>No users available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <footer id='contact' className="bg-gray-100 py-10">
                <div className="container mx-auto flex gap-8 px-10 md:px-0 justify-evenly">
                    {/* Logo and Social Media */}
                    <div className="col-span-2 w-[25%]">
                        <img src={logo} alt="" className='h-[70px]' />
                        <p className="text-gray-600 mb-6">
                            We always make our customer happy by providing as many choices as possible.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-blue-500 hover:text-blue-700 text-2xl">
                                <FaInstagram /> {/* Instagram Icon */}
                            </a>
                            <a href="#" className="text-blue-500 hover:text-blue-700 text-2xl">
                                <RiFacebookCircleLine /> {/* Facebook Icon */}
                            </a>
                            <a href="#" className="text-blue-500 hover:text-blue-700 text-2xl">
                                <LuTwitter /> {/* Twitter Icon */}
                            </a>
                        </div>
                    </div>

                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">News</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Menu</a></li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Partner with us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Account</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Support Center</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Feedback</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Accessibility</a></li>
                        </ul>
                    </div>

                    {/* Get in Touch Section */}
                    <div className='w-[25%]'>
                        <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                        <p className="text-gray-600 mb-4">Question or feedback? We'd love to hear from you</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none"
                            />
                            <button className="absolute right-2 top-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-xl">
                                <IoMdSend />
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default AdminDashboard;
