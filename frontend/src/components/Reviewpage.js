import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";
import AdminSidebar from "./AdminSidebar";
import logo from "../assets/Logo.png";

function ReviewsPage() {
    const [reviews, setReviews] = useState([]); // State for reviews
    const [filteredReviews, setFilteredReviews] = useState([]); // Filtered reviews based on search query
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(""); // Error state
    const [searchQuery, setSearchQuery] = useState(""); // Search query state

    // Fetch reviews from backend
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve token
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/reviews`, {
                    headers: { Authorization: `Bearer ${token}` }, // Include token in request headers
                });
                setReviews(response.data); // Update reviews state
                setFilteredReviews(response.data); // Set filtered reviews initially to all reviews
                setLoading(false); // Stop loading
            } catch (err) {
                console.log(err);
                setError("Failed to fetch reviews." + err);
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    // Handle Delete Review
    const handleDeleteReview = async (reviewId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/admin/reviews/${reviewId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
            setFilteredReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
            // alert("Review deleted successfully.");
        } catch (err) {
            alert("Failed to delete review.");
        }
    };

    // Search functionality
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value === "") {
            setFilteredReviews(reviews); // Reset to all reviews if search is cleared
        } else {
            setFilteredReviews(
                reviews.filter(
                    (review) =>
                        review.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        review.tourName.toLowerCase().includes(e.target.value.toLowerCase())
                )
            );
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading reviews...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>;
    }

    return (
        <div className="w-screen bg-gray-100 overflow-x-hidden h-screen">
            <div className="flex w-full justify-between items-center py-5 px-[3rem] ">
                <img src={logo} alt="Logo" className="h-[90px] w-auto" />
                <div className="flex w-[40%] h-[3rem] px-2 bg-white py-1 justify-center items-center rounded-md border-2">
                    <IoMdSearch className="text-3xl text-gray-500 h-full" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full h-full outline-none flex px-3 text-lg"
                        placeholder="Search by Username or Tour Name"
                    />
                </div>
                <div className="flex items-center">
                    <HiUserCircle className="text-[#4083f3] text-4xl" />
                    <p className="text-md">Admin</p>
                </div>
            </div>

            {/* Sidebar Placeholder */}
            <div className="flex justify-between items-start h-[85%]">
                <AdminSidebar />

                {/* Main Content */}
                <div className="p-8 w-[85vw] h-full">
                    <div className="space-y-6 flex flex-col py-2 overflow-y-scroll h-full">
                        {filteredReviews.length === 0 ? (
                            <p className="text-center text-gray-500">No reviews match your search.</p>
                        ) : (
                            filteredReviews.map((review) => (
                                <div
                                    key={review._id}
                                    className="border rounded-md p-4 bg-white shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="font-semibold text-xl text-gray-800">{review.username}</h2>
                                            <p className="text-sm text-gray-600">Tour: {review.tourName}</p>
                                            <p className="text-sm text-gray-500">Rating: {"★".repeat(review.rating)}</p>
                                            <p className="mt-3 text-gray-700">{review.comment}</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <button
                                                className="mt-4 px-4 py-2 bg-[#ff6347] text-white text-sm rounded-md hover:bg-[#ff4500] transition"
                                                onClick={() => handleDeleteReview(review._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewsPage;
