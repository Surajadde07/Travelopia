import React, { useState, useEffect } from 'react';
import axios from 'axios';
import adventure from '../assets/Adventure1.jpg';
import { Link } from 'react-router-dom';

const Adventure = () => {
    const [tours, setTours] = useState([]); // State for tours
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const token = localStorage.getItem('token'); // Assuming token is stored here

    useEffect(() => {
        const fetchAdventureTours = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard/tours/adventure`, {
                    headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
                });
                setTours(response.data.data); // Update tours state
                setLoading(false); // Stop loading
            } catch (err) {
                console.error("Error fetching adventure tours:", err.message);
                setError("Failed to load adventure tours. Please try again later.");
                setLoading(false);
            }
        };

        fetchAdventureTours();
    }, [token]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-lg">Loading adventure tours...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className='w-screen h-screen'>
            {/* Header Section */}
            <div className='w-full h-full relative flex flex-col justify-start items-end'>
                <img src={adventure} alt="" className='h-full w-full absolute z-[-1] ' />
                <nav className="h-[10%] w-full text-end flex justify-end text-xl items-center gap-10 pr-7">
                    <Link
                        to="/login/userdashboard"
                        className="text-[#7f352a] text-xl hover:text-black relative transition-all duration-300
        before:absolute before:bottom-[-3px] before:left-0 before:w-0 before:h-[1px] before:bg-black before:transition-all before:duration-300 hover:before:w-full
        after:absolute after:top-[-3px] after:right-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Home
                    </Link>
                    <Link
                        to="/login/userdashboard/wishlistfull"
                        className="text-[#7f352a] text-xl hover:text-black relative transition-all duration-300
        before:absolute before:bottom-[-3px] before:left-0 before:w-0 before:h-[1px] before:bg-black before:transition-all before:duration-300 hover:before:w-full
        after:absolute after:top-[-3px] after:right-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    >
                        My Wishlist
                    </Link>
                    <Link
                        to="/login/userdashboard/mybookings"
                        className="text-[#7f352a] text-xl hover:text-black relative transition-all duration-300
        before:absolute before:bottom-[-3px] before:left-0 before:w-0 before:h-[1px] before:bg-black before:transition-all before:duration-300 hover:before:w-full
        after:absolute after:top-[-3px] after:right-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    >
                        My Bookings
                    </Link>
                </nav>



                <div className='w-[60%] h-[90%] text-center pt-[8rem]'>
                    <h1 className='popular text-7xl mb-5'>Explore the Thrill of Adventure</h1>
                    <p className='popular text-2xl'>Unleash the explorer in you with unforgettable adventure tours</p>
                </div>
            </div>

            {/* Tour Cards Section */}

            <div className="px-10 py-16 bg-gray-100">
                {/* Section Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#fa8b31]">Discover Your Next Adventure</h2>
                    <p className="text-gray-600 text-lg mt-2">
                        Handpicked tours for thrill-seekers and explorers alike
                    </p>
                </div>

                {/* Tour Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {tours.map((tour, index) => (
                        <div
                            key={index}
                            className="relative bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300"
                        >
                            {/* Image Section */}
                            <div className="relative h-[250px]">
                                <img
                                    src={tour.image ? `${process.env.REACT_APP_BACKEND_URL}/${tour.image}` : 'https://via.placeholder.com/400'}
                                    alt={tour.title || "Tour"}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <p className="absolute bottom-3 left-3 text-white text-sm bg-black/70 px-3 py-1 rounded-md shadow-lg">
                                    {tour.location || "Unknown Location"}
                                </p>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 truncate">
                                    {tour.title || "Tour Title"}
                                </h3>
                                <p className="text-gray-600 mt-3 mb-6 line-clamp-3">
                                    {tour.description ||
                                        "No description available for this tour. Embark on an unforgettable journey!"}
                                </p>

                                {/* Footer Section */}
                                <div className="flex justify-between items-center">
                                    {/* Price */}
                                    <div className="text-xl font-bold text-[#fa8b31]">
                                        ₹{tour.pricePerPerson || "N/A"}
                                        <span className="text-sm text-gray-500 font-normal"> / person</span>
                                    </div>
                                    {/* Book Now Button */}
                                    <Link to={`/dashboard/booknow/${tour._id}`}>
                                        <button className="bg-[#fa8b31] text-white font-semibold px-5 py-2 rounded-md shadow-md hover:bg-[#e27a29] transition">
                                            Book Now →
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

export default Adventure;
