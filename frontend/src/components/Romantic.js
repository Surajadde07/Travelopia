import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import romantic from '../assets/romantic.jpg';
import axios from 'axios';

const Romantic = () => {
    const [tours, setTours] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard/tours/romantic`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTours(response.data.data);
            } catch (error) {
                console.error('Error fetching romantic tours:', error.message);
            }
        };

        fetchTours();
    }, [token]);

    return (
        <div className="w-screen h-screen">
            {/* Header Section */}
            <div className="w-full h-full relative flex flex-col justify-start items-end">
                <img src={romantic} alt="" className="h-full w-full absolute z-[-1]" />
                <nav className="h-[10%] w-full text-end flex justify-end text-xl items-center gap-10 pr-7">
                    <Link
                        to="/login/userdashboard"
                        className="text-[#701119] relative transition-all duration-300
        before:absolute before:bottom-[-3px] before:left-0 before:w-0 before:h-[1px] before:bg-[#701119] before:transition-all before:duration-300 hover:before:w-full
        after:absolute after:top-[-3px] after:right-0 after:w-0 after:h-[1px] after:bg-[#701119] after:transition-all after:duration-300 hover:after:w-full  hover:text-black"
                    >
                        Home
                    </Link>
                    <Link
                        to="/login/userdashboard/wishlistfull"
                        className="text-[#701119] relative transition-all duration-300
        before:absolute before:bottom-[-3px] before:left-0 before:w-0 before:h-[1px] before:bg-[#701119] before:transition-all before:duration-300 hover:before:w-full
        after:absolute after:top-[-3px] after:right-0 after:w-0 after:h-[1px] after:bg-[#701119] after:transition-all after:duration-300 hover:after:w-full  hover:text-black"
                    >
                        My Wishlist
                    </Link>
                    <Link
                        to="/login/userdashboard/mybookings"
                        className="text-[#701119] relative transition-all duration-300
        before:absolute before:bottom-[-3px] before:left-0 before:w-0 before:h-[1px] before:bg-[#701119] before:transition-all before:duration-300 hover:before:w-full
        after:absolute after:top-[-3px] after:right-0 after:w-0 after:h-[1px] after:bg-[#701119] after:transition-all after:duration-300 hover:after:w-full hover:text-black"
                    >
                        My Bookings
                    </Link>
                </nav>

                <div className="w-[60%] h-[90%] text-center pt-[16%] pl-3">
                    <h1 className="popular text-7xl mb-10">Where Love Meets Travel</h1>
                    <p className="popular text-2xl">Celebrate your love with unforgettable romantic getaways</p>
                </div>
            </div>

            {/* Tour Cards Section */}
            <div className="px-6 py-10">
                <h2 className="text-4xl font-bold text-center text-[#2C3E50] mb-10 ">Romantic Gateways Just for You</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map((tour, index) => (
                        <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">

                            {/* Image Section */}
                            <div className="w-full h-[280px] relative">
                                <img
                                    src={tour.image ? `${process.env.REACT_APP_BACKEND_URL}/${tour.image}` : 'https://via.placeholder.com/300'}
                                    alt={tour.title}
                                    className="w-full h-full object-cover rounded-t-3xl"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="p-6 space-y-4">
                                <h3 className="text-xl font-bold text-[#d32f2f]">{tour.title}</h3>
                                <p className="text-sm text-[#616161]">{tour.description}</p>

                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-[#d32f2f]">₹{tour.pricePerPerson}</span>
                                    <Link
                                        to={`/dashboard/booknow/${tour._id}`}
                                        className="bg-[#d32f2f] text-white text-sm font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-[#b71c1c]"
                                    >
                                        Book Now
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

export default Romantic;
