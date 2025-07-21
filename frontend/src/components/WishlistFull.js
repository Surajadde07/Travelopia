import React, { useEffect, useState } from 'react';
import WishlistTour from './WishlistTours';
import axios from 'axios';
import Wishlist from './Wishlist';
import Slidebar from './Slidebar';

export const WishlistFull = () => {
    const [wishlist, setWishlist] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard/wishlist`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setWishlist(response.data.wishlist);
            } catch (error) {
                console.error("Error fetching wishlist:", error.message);
            }
        };

        fetchWishlist();
    }, [token]);

    const handleRemoveTour = async (tourId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard/wishlist/remove`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { tourId },
            });
            setWishlist((prevWishlist) => prevWishlist.filter((tour) => tour._id !== tourId));
        } catch (error) {
            console.error("Error removing tour from wishlist:", error.message);
        }
    };

    if (wishlist.length === 0) {
        return <Wishlist />;
    }

    return (
        <div className="flex min-h-screen bg-white relative">
            {/* Sidebar */}
            <div className="fixed top-1/2 left-0 transform -translate-y-1/2 hidden lg:block">
                <Slidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center ml-40 p-10">
                <h1 className="text-5xl font-light tracking-wide text-gray-900 mb-16">
                    Wishlist
                </h1>
                <div className="flex flex-col gap-10 w-full max-w-4xl">
                    {wishlist.map((tour) => (
                        <WishlistTour
                            key={tour._id}
                            title={tour.title}
                            price={`₹${tour.pricePerPerson}`}
                            image={tour.image}
                            tourId={tour._id}
                            onRemove={handleRemoveTour}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
