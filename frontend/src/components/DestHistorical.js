import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import historical from '../assets/historical.jpg';

const Historical = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/routes/historical`,
                );
                setTours(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching historical tours:", err.message);
                setError("Failed to load tours. Please try again.");
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-lg">Loading historical tours...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="w-screen h-screen">
            {/* Header Section - sec1 (Unchanged) */}
            <div className="w-full h-full relative flex flex-col justify-start items-start mb-12">
                <img src={historical} alt="Historical Background" className="h-full w-full absolute z-[-1]" />
                <nav onClick={() => window.history.back()} className=" cursor-pointer h-[10%] w-full text-end flex justify-end text-xl items-center gap-10 pr-7">
                    Home
                </nav>
                <div className="w-[50%] h-[90%] text-start pt-[8rem] pl-10">
                    <h1 className="popular text-6xl mb-5 text-center leading-tight">Journey Through Time and Traditions</h1>
                    <p className="popular text-2xl">Discover the rich heritage and vibrant cultures of the world</p>
                </div>
            </div>

            {/* Tour Cards Section with Heading */}
            <div className="px-6 py-8">
                <h2 className="text-4xl font-semibold text-center mb-12 text-[#2F4F4F]">Explore Our Historical & Cultural Tours</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {tours.map((tour, index) => (
                        <div key={index} className="max-w-[380px] bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            {/* Image Section */}
                            <div className="w-full h-[280px] overflow-hidden rounded-t-lg">
                                <img
                                    src={tour.image ? `${process.env.REACT_APP_BACKEND_URL}/${tour.image}` : 'https://via.placeholder.com/300'}
                                    alt={tour.title}
                                    className="w-full h-full object-cover transition-all duration-300 ease-in-out hover:scale-110"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="p-6 space-y-4">
                                {/* Title */}
                                <h3 className="text-2xl font-bold text-[#8B4513]">{tour.title}</h3>
                                {/* Description */}
                                <p className="text-sm text-[#696969]">{tour.description}</p>

                                {/* Price and Button */}
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-semibold text-[#8B4513]">
                                        ₹{tour.pricePerPerson} <span className="text-sm text-[#696969]">per person</span>
                                    </div>
                                    <Link to={`/login`} className="bg-[#A0522D] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#8B4513] transition-all duration-300">
                                        Book Now →
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

export default Historical;
