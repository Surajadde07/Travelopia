import React, { useState, useEffect } from 'react';
import axios from 'axios';
import religious from '../assets/religious.jpg';
import { Link } from 'react-router-dom';

const Religious = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");  // Assuming the user is logged in

    // Fetch the religious tours from the backend API
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard/tours/religious`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTours(response.data.data); // Assuming the data is returned with 'data' key
                setLoading(false);
            } catch (err) {
                console.error("Error fetching tours:", err.message);
                setError("Failed to load tours. Please try again.");
                setLoading(false);
            }
        };

        fetchTours();
    }, [token]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-lg">Loading your tours...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="w-screen h-screen">
            {/* Header Section */}
            <div className="w-full h-full relative flex flex-col justify-start items-end">
                <img src={religious} alt="Religious" className="h-full w-full absolute z-[-1]" />
                <nav className="h-[10%] w-full text-end flex justify-end text-xl items-center gap-10 pr-7">
                    <Link
                        to="/login/userdashboard"
                        className="text-[#611402] relative transition-all duration-300
        before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[1px] before:bg-[#611402] before:transition-all before:duration-300 hover:before:w-full
        after:absolute after:top-[-4px] after:right-0 after:w-0 after:h-[1px] after:bg-[#611402] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Home
                    </Link>
                    <Link
                        to="/login/userdashboard/wishlistfull"
                        className="text-[#611402] relative transition-all duration-300
        before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[1px] before:bg-[#611402] before:transition-all before:duration-300 hover:before:w-full
        after:absolute after:top-[-4px] after:right-0 after:w-0 after:h-[1px] after:bg-[#611402] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        My Wishlist
                    </Link>
                    <Link
                        to="/login/userdashboard/mybookings"
                        className="text-[#611402] relative transition-all duration-300
        before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[1px] before:bg-[#611402] before:transition-all before:duration-300 hover:before:w-full
        after:absolute after:top-[-4px] after:right-0 after:w-0 after:h-[1px] after:bg-[#611402] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        My Bookings
                    </Link>
                </nav>

                <div className="w-[50%] h-[90%] text-center pt-[8rem]">
                    <h1 className="popular text-5xl mb-5">Embark on a Spiritual Journey</h1>
                    <p className="popular text-2xl">Find peace and divine connection with our sacred travel experiences</p>
                </div>
            </div>

            {/* Tour Cards Section */}
            <div className="px-6 py-12">
                {/* Heading Section */}
                <h2 className="text-4xl font-extrabold text-center text-[#2C3E50] mb-12">
                    Sacred Journeys Await You
                </h2>

                {/* Tour Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {tours.map((tour, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 w-[340px] sm:w-[380px] lg:w-[480px] relative"
                        >
                            {/* Image Section */}
                            <div className="w-full h-[250px] overflow-hidden rounded-t-xl">
                                <img
                                    src={tour.image ? `${process.env.REACT_APP_BACKEND_URL}/${tour.image}` : 'https://via.placeholder.com/300'}
                                    alt={tour.title}
                                    className="w-full h-full object-cover transition-all duration-300 ease-in-out transform hover:scale-110"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="p-6 space-y-4">
                                {/* Title */}
                                <h3 className="text-xl font-bold text-[#34495E]">{tour.title}</h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm">{tour.description}</p>

                                {/* Price Section */}
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-semibold text-[#E67E22]">
                                        ₹{tour.pricePerPerson} <span className="text-sm text-gray-500">per person</span>
                                    </div>
                                    <Link to={`/dashboard/booknow/${tour._id}`}>
                                        <button className="bg-[#E67E22] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#D35400] transition-all duration-300">
                                            Book Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Religious;
