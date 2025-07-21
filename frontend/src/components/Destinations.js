import React, { useEffect, useState } from 'react';
import ResortCard from './ResortCard';
import myVideo from '../assets/Userdashvideo.mp4';
import globevideo from '../assets/Globe.mp4';
import ManyAeroplane from '../assets/Plane.png';
import adventure from '../assets/Adventure.jpg';
import religious from '../assets/Religious-place.jpg';
import historical from '../assets/historical.png';
import romantic from '../assets/romantic.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DestinationCard from './DestinationCard'

function Destinations() {
    const [tours, setTours] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const token = localStorage.getItem('token');

    // Fetch all tours, wishlist, and user details
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch tours
                const toursResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/routes/destinations`
                );
                setTours(toursResponse.data);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    
    return (
        <div className='flex-col bg-sky-50 items-center justify-center w-screen h-screen relative overflow-x-hidden'>
            {/* Header */}
            <div className='bg-[#00a7c7] h-[18%] w-full flex items-center justify-between px-5 relative'>
                <div className="bg-repeat w-full h-full absolute flex justify-start left-[17.3rem] top-[-4.4rem]">
                    <img src={ManyAeroplane} alt="" className='tanisha h-[15rem] w-[30rem]' />
                </div>

                <h1 className='logo text-[4.5rem] font-extrabold text-white w-[20%]'>Travelopia</h1>
                <div className=' text-white text-2xl mr-10'>
                   <Link to="/" >Home</Link> 
                </div>
            </div>

            {/* Main Content */}
            <div className='w-full min-h-screen relative justify-center flex'>
                <div className='absolute w-full h-[80%] top-[2rem] flex justify-center items-start gap-[2rem]'>
                    <div className="flex h-full scroll-smooth overflow-y-visible ">
                        <div className="flex-1">
                            <h2 className="text-6xl flex justify-center text-[#00a7c7] items-center popular pb-5">Popular Destinations</h2>
                            <section className="mb-5 flex justify-center items-center gap-10">
                                <div className="flex gap-20 mt-2 overflow-x-auto px-4 ">
                                    <Link to="/destinations/adventure"><ResortCard title="Adventure Tours" rating="4.8" image={adventure} /></Link>
                                    <Link to="/destinations/religious"><ResortCard title="Religious Tours" rating="4.8" image={religious} /></Link>
                                    <Link to="/destinations/historical"><ResortCard title="Historical and Cultural Tours" rating="4.7" image={historical} /></Link>
                                    <Link to="/destinations/romantic"><ResortCard title="Romantic Tours" rating="4.4" image={romantic} /></Link>
                                </div>
                            </section>

                            {/* Packages Section */}
                            <div className='flex justify-between items-start'>
                                <section className="w-[70%]">
                                    <h2 className="text-3xl font-bold heading flex justify-center items-center popular text-[#00a7c7]">Best Packages</h2>
                                    <div className="grid grid-cols-2 gap-4 mt-5">
                                        {tours.map((tour, index) => (
                                            <DestinationCard
                                                key={index}
                                                title={tour.title}
                                                price={`₹${tour.pricePerPerson}`}
                                                image={tour.image}
                                                tourId={tour._id}
                                                token={token}
                                                isLikedInitially={wishlist.includes(tour._id)}
                                                onWishlistChange={(id, isAdding) => {
                                                    setWishlist((prev) =>
                                                        isAdding ? [...prev, id] : prev.filter((tourId) => tourId !== id)
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                </section>

                                {/* Sidebar Videos */}
                                <div className='w-[25%] flex flex-col gap-5'>
                                    <video className="w-full h-full object-cover rounded-md" loop autoPlay muted>
                                        <source src={myVideo} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <video className="w-full h-full object-cover rounded-md" loop autoPlay muted>
                                        <source src={globevideo} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Destinations;
