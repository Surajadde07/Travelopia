import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiUserCircle } from 'react-icons/hi';
import { IoMdSearch } from 'react-icons/io';
import AdminSidebar from './AdminSidebar';
import logo from '../assets/Logo.png';

const AdminBooking = () => {
    const [bookings, setBookings] = useState([]); // Initialize bookings as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchFilter, setSearchFilter] = useState("tourTitle"); // Default search by tour title
    const token = localStorage.getItem('token');
    const [dropdownOpen, setDropdownOpen] = React.useState(false);


    // Fetch all bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/bookings`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookings(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
                setError('Failed to load bookings. Please try again.');
                setLoading(false);
            }
        };

        fetchBookings();
    }, [token]);

    // Handle update booking status
    const handleUpdateStatus = async (bookingId, status) => {
        try {
            await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/api/admin/bookings/${bookingId}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update the booking status in the frontend
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === bookingId ? { ...booking, status } : booking
                )
            );
        } catch (error) {
            console.error(`Error updating booking status to ${status}:`, error.message);
            alert(error.response?.data?.message || `Failed to update booking status to ${status}.`);
        }
    };

    // Handle delete booking
    const handleDelete = async (bookingId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/admin/bookings/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Remove the booking from the frontend
            setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
        } catch (error) {
            console.error('Error deleting booking:', error.message);
            alert(error.response?.data?.message || 'Failed to delete booking.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Filter bookings based on search term
    const filteredBookings = bookings.filter((booking) => {
        const searchLower = searchTerm.toLowerCase();

        if (searchFilter === "tourTitle") {
            return booking.tour.title.toLowerCase().includes(searchLower); // Filter by tour title
        } else if (searchFilter === "fullName") {
            return booking.fullName.toLowerCase().includes(searchLower); // Filter by full name
        } else if (searchFilter === "location") {
            return booking.tour.location && booking.tour.location.toLowerCase().includes(searchLower); // Filter by location
        }

        return false; // Default case
    });



    return (
        <div className="w-screen bg-gray-100 overflow-x-hidden h-screen">
            <div className="flex w-full justify-between items-center py-5 px-[3rem]">
                <img src={logo} alt="Logo" className="h-[90px] w-auto" />
                {/* <div className="flex w-[40%] h-[3rem] px-2 bg-white py-1 justify-between items-center rounded-md border-2">
                    <IoMdSearch className="text-3xl text-gray-500 h-full" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-full outline-none flex px-3 text-lg"
                        placeholder={`Search by ${searchFilter}`}
                    />
                </div>
                <div className="ml-4">
                    <label>
                        <input
                            type="radio"
                            name="searchFilter"
                            value="tourTitle"
                            checked={searchFilter === "tourTitle"}
                            onChange={() => setSearchFilter("tourTitle")}
                            className="mr-2"
                        />
                        Tour Title
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="searchFilter"
                            value="fullName"
                            checked={searchFilter === "fullName"}
                            onChange={() => setSearchFilter("fullName")}
                            className="mr-2"
                        />
                        User's Full Name
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="searchFilter"
                            value="location"
                            checked={searchFilter === "location"}
                            onChange={() => setSearchFilter("location")}
                            className="mr-2"
                        />
                        Location
                    </label>
                </div> */}
                <div className="relative flex w-[40%] h-[3rem] px-2 bg-white py-1 justify-between items-center rounded-md border-2">
                    <IoMdSearch className="text-3xl text-gray-500 h-full" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-full outline-none flex px-3 text-lg"
                        placeholder={`Search by ${searchFilter}`}
                    />
                    <div className="relative">
                        {/* Dropdown toggle */}
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-1 text-gray-600 text-lg ml-2 focus:outline-none hover:text-black transition duration-300"
                        >
                            <span>Filter</span>
                            {/* Replace this with your desired professional icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        {dropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <ul className="divide-y divide-gray-100">
                                    <li
                                        className="hover:bg-gray-50 px-4 py-2 transition duration-200"
                                        onClick={() => {
                                            setSearchFilter("tourTitle");
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        Tour Title
                                    </li>
                                    <li
                                        className="hover:bg-gray-50 px-4 py-2 transition duration-200"
                                        onClick={() => {
                                            setSearchFilter("fullName");
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        User's Full Name
                                    </li>
                                    <li
                                        className="hover:bg-gray-50 px-4 py-2 transition duration-200"
                                        onClick={() => {
                                            setSearchFilter("location");
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        Location
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>



                <div className="flex items-center">
                    <HiUserCircle className="text-[#4083f3] text-4xl" />
                    <p className="text-md ml-2">Admin</p>
                </div>
            </div>

            <div className="flex justify-between items-start h-[85%]">
                <AdminSidebar />

                {/* //? booking details section */}
                <div className="p-6 w-[85vw] rounded-md">
                    <h1 className="text-2xl font-bold mb-4 heading">Bookings</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8 bg-gray-100">
                        {filteredBookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                            >
                                {/* Header Section */}
                                <div className="mb-4 border-b pb-4 flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                                        {booking.tour.title || "Untitled Tour"}
                                    </h3>
                                    <span
                                        className={`text-sm font-medium px-3 py-1 rounded ${booking.status === "pending"
                                            ? "bg-yellow-200 text-yellow-800"
                                            : booking.status === "canceled"
                                                ? "bg-red-200 text-red-800"
                                                : "bg-green-200 text-green-800"
                                            }`}
                                    >
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                </div>

                                {/* Booking Details */}
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>
                                        <span className="font-medium">Name:</span> {booking.fullName}
                                    </p>
                                    <p>
                                        <span className="font-medium">Phone:</span> {booking.phone}
                                    </p>
                                    <p>
                                        <span className="font-medium">Booking Date:</span>{" "}
                                        {new Date(booking.bookingDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <span className="font-medium">People:</span> {booking.numPeople}
                                    </p>
                                    <p>
                                        <span className="font-medium">Total Price:</span> ₹
                                        {booking.totalPrice.toLocaleString()}
                                    </p>
                                    <p>
                                        <span className="font-medium">Location:</span>{" "}
                                        {booking.tour.location || "Not specified"}
                                    </p>
                                </div>

                                {/* Actions Section */}
                                <div className="mt-6 flex items-center justify-between">
                                    {booking.status === "pending" && (
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => handleUpdateStatus(booking._id, "booked")}
                                                className="px-4 py-2 text-white bg-green-600 rounded-md text-sm font-medium hover:bg-green-700"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(booking._id, "canceled")}
                                                className="px-4 py-2 text-white bg-red-600 rounded-md text-sm font-medium hover:bg-red-700"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => handleDelete(booking._id)}
                                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md text-sm font-medium hover:bg-gray-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredBookings.length === 0 && (
                        <p className="text-center text-lg text-gray-500 mt-8">No bookings found!</p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminBooking;