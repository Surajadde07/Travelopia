import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/Logo.png';
import { IoMdSearch } from 'react-icons/io';
import { HiUserCircle } from 'react-icons/hi2';
import AdminSidebar from './AdminSidebar';
import TourCard from './TourCard';
import { Link } from 'react-router-dom';
import Romantic from '../assets/romantic.png'
import religious from '../assets/Religious-place.jpg'
import adventure from '../assets/Adventure.jpg'
import historical from '../assets/historical.png'
import TourPlaceCard from './TourPlaceCard';

function Tour() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token'); // Retrieve token
    const [searchTerm, setSearchTerm] = useState('');

    const tourPlaces = [
        { image: Romantic, title: 'Romantic Tour', tours: 5 },
        { image: adventure, title: 'Adventure Tour', tours: 9 },
        { image: historical, title: 'Historical Tour', tours: 3 },
        { image: religious, title: 'Religious Tour', tours: 3 },
    ];

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/tours`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTours(response.data.tours);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching tours:', err.message);
                setError('Failed to load tours. Please try again later.');
                setLoading(false);
            }
        };

        fetchTours();
    }, [token]);

    const handleStatusChange = (tourId, status) => {
        setTours((prevTours) =>
            prevTours.map((tour) =>
                tour._id === tourId ? { ...tour, status } : tour
            )
        );
    };

    const handleDeleteSuccess = (deletedId) => {
        setTours((prevTours) => prevTours.filter((tour) => tour._id !== deletedId));
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    // Filter the tours based on search term (title or location)
    const filteredTours = tours.filter((tour) =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="flex w-full justify-between items-center px-[3rem] py-5">
                <img src={logo} alt="Logo" className="h-[90px]" />
                <div className="flex w-[50%] space-x-4">
                    {/* Single Search Bar */}
                    <div className="w-full h-[3rem] flex bg-white px-2 py-1 items-center rounded-md">
                        <IoMdSearch className="text-2xl text-gray-500" />
                        <input
                            type="text"
                            className="w-full h-full outline-none px-3 text-lg"
                            placeholder="Search by Title or Location"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <HiUserCircle className="text-[#4083f3] text-4xl" />
                    <p className="text-md ml-2">Admin</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex">
                {/* Sidebar */}
                <AdminSidebar />

                {/* Tour Section */}
                <div className="w-[85%] p-5">
                    {/* Create Tour Button */}
                    <div className="w-full flex justify-end mb-4">
                        <Link to="/admindashboard/tours/createtour">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md transition">
                                Create New Tour
                            </button>
                        </Link>
                    </div>

                    {/* Tour Categories */}
                    <div>
                        <h1 className="text-3xl font-bold mb-6">Tour Categories</h1>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {tourPlaces.map((place, index) => (
                                <TourPlaceCard
                                    key={index}
                                    image={place.image}
                                    title={place.title}
                                    tours={place.tours}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* All Tours */}
            <div className="mt-10 px-6">
                <h2 className="text-4xl text-center font-semibold mb-8">Available Tours</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTours.map((tour) => (
                        <TourCard
                            key={tour._id}
                            id={tour._id}
                            title={tour.title}
                            description={tour.description}
                            price={tour.pricePerPerson}
                            imageUrl={tour.image} // Ensure baseURL is used here
                            location={tour.location}
                            status={tour.status}
                            onDeleteSuccess={handleDeleteSuccess}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tour;
