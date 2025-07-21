import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Slidebar';

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/reviews`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error.message);
            }
        };

        fetchReviews();
    }, [token]);

    if (reviews.length === 0) {
        return (
            <div className="flex items-center h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold text-gray-800">No Reviews Found</h1>
                    <p className="text-gray-500 mt-3">
                        You haven't left any reviews yet. Explore tours and share your experiences!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-screen justify-center  items-center bg-gradient-to-r from-gray-100 to-gray-50">
            {/* Sidebar */}
            <div className='w-[20%] h-full flex  items-center '>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex w-[85%] items-center  h-full flex-col p-8 ">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-center mb-8 pt-2 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        My Reviews
                    </h1>

                    <p className="text-gray-500 mt-2">Reflect on your experiences and revisit your feedback!</p>
                </div>

                {/* Reviews List */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            {/* Image Section */}
                            <div className="relative">
                                <img
                                    src={review.tour?.image ? `${process.env.REACT_APP_BACKEND_URL}/${review.tour.image}` : 'https://via.placeholder.com/300'}
                                    alt={review.tour?.title || 'Tour'}
                                    className="h-40 w-full object-cover"
                                />
                                <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-md">
                                    {review.tour?.location || 'Unknown Location'}
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="p-5">
                                {/* Tour Details */}
                                <h3 className="text-lg font-bold text-gray-800 truncate">
                                    {review.tour?.title || 'Untitled Tour'}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 truncate">
                                    {review.tour?.description || 'No description available.'}
                                </p>

                                {/* Review Details */}
                                <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                                    <p className="text-sm text-gray-800">
                                        <span className="font-semibold text-blue-600">Comment:</span>{' '}
                                        {review.comment || 'No comment provided.'}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-blue-600">Rating:</span>
                                        <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-bold rounded-md">
                                            {review.rating} / 5
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyReviews;
