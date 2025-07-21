import React from 'react';
import { Link } from 'react-router-dom';
import Sec2_bg from '../assets/Sec2_bg.png';
import Card from './Card';
import Romantic from '../assets/romantic.png';
import religious from '../assets/Religious-place.jpg';
import adventure from '../assets/Adventure.jpg';
import historical from '../assets/historical.png';

function Sec2() {
    // Data for the cards
    const cardData = [
        {
            image: adventure,
            title: 'Adventure Tours',
            rating: 4.2,
            reviews: '2.8k',
            route: '/destinations/adventure', // Route for Adventure Tours
        },
        {
            image: religious,
            title: 'Religious Tours',
            rating: 4.8,
            reviews: '5.6k',
            route: '/destinations/religious', // Route for Religious Tours
        },
        {
            image: Romantic,
            title: 'Romantic Tours',
            rating: 4.5,
            reviews: '4.3k',
            route: '/destinations/romantic', // Route for Romantic Tours
        },
        {
            image: historical,
            title: 'Historical Tours',
            rating: 4.9,
            reviews: '10.1k',
            route: '/destinations/historical', // Route for Historical Tours
        },
    ];

    return (
        <div id="destinations" className="relative h-[1060px] w-screen">
            {/* Background Image */}
            <img src={Sec2_bg} alt="Background" className="w-full h-full absolute z-[-1] object-cover" />

            {/* Content Section */}
            <div className="h-[40%] w-screen flex justify-evenly items-center px-10">
                <h1 className="text-[3rem] font-bold text-white w-[20%]">
                    Top Values for You
                </h1>

                {/* Highlights */}
                <div className="flex flex-col text-white text-center w-[20%]">
                    <h2 className="text-2xl font-semibold mb-2">Lots of Choices</h2>
                    <p>
                        Discover your dream destination from our selection of over 460 diverse locations worldwide.
                    </p>
                </div>
                <div className="flex flex-col text-white text-center w-[20%]">
                    <h2 className="text-2xl font-semibold mb-2">Best Your Guide</h2>
                    <p>
                        Experience your destination like a local with our expert tour guide, who has over 15 years of experience in delivering unforgettable travel experiences.
                    </p>
                </div>
                <div className="flex flex-col text-white text-center w-[20%]">
                    <h2 className="text-2xl font-semibold mb-2">Easy For Booking</h2>
                    <p>
                        Book your next adventure hassle-free with our easy and fast ticket purchase process. Start planning your journey today!
                    </p>
                </div>
            </div>

            {/* Cards Section */}
            <div className="h-[50%] flex flex-col gap-8">
                <h1 className="text-white text-[3rem] ml-11">Explore Top Destinations</h1>
                <div className="flex justify-center items-center gap-5 flex-wrap">
                    {cardData.map((card, index) => (
                        <Link to={card.route} key={index}>
                            <Card
                                image={card.image}
                                title={card.title}
                                location={card.location}
                                rating={card.rating}
                                reviews={card.reviews}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sec2;
