
import React from 'react';
import Sec3_bg from '../assets/Sec3_bg.png';
import Car from '../assets/Car.png';
import Deer from '../assets/DeerSec3.png';
import bg2 from '../assets/Sec3_bg2.png';
import Card from './Card';
import rafting from '../assets/rafting.jpg'
import skydiving from '../assets/skydiving.jpg'
import safari from '../assets/safari.jpg'
import trekking from '../assets/trekking.jpg'
import seadiving from '../assets/seadiving.webp'
import { Link } from 'react-router-dom';

const Sec3 = () => {
    // Array of card data
    const cardData = [
        {
            image: rafting,
            title: 'River Rafting',
            location: 'Arunachal Pradesh',
            rating: 4.7,
            reviews: '3.5k',
        },
        {
            image: skydiving,
            title: 'Sky diving',
            location: 'Mysore',
            rating: 4.9,
            reviews: '4.8k',
        },
        {
            image: safari, // Replace with actual image path
            title: 'Jungle Safari',
            location: ' Jim Corbett National Park',
            rating: 4.6,
            reviews: '2.9k',
        },
        {
            image: trekking, // Replace with actual image path
            title: 'Trekking',
            location: 'Kasauli',
            rating: 4.8,
            reviews: '5.1k',
        },
        {
            image: seadiving, // Replace with actual image path
            title: 'Deep Sea Diving',
            location: 'Goa',
            rating: 4.9,
            reviews: '6.2k',
        },
    ];

    return (
        <div id='explore' className="relative h-[1250px] z-[20]">
            {/* Background Image */}
            <img src={Sec3_bg} alt="" className="w-full h-full absolute top-[-8rem] z-[-1] object-fill" />

            <div className="absolute top-[-150px] left-0 w-[40%] z-30">
                <img src={Car} alt="Car" className="w-full" />
            </div>

            {/* Text Content on Right */}
            <div className="absolute top-[-5rem] right-0 w-[45%] flex items-center h-[250px]">
                <div className="p-5 rounded-lg">
                    <h2 className="text-[3rem] font-bold mb-4 text-white">Embark on Your Next Adventure!</h2>
                    <p className="text-lg text-white">
                        Ready to fuel your wanderlust? Our adventure tours are designed for thrill-seekers and nature lovers alike! From breathtaking treks to exhilarating water sports, each experience is crafted to bring you closer to the beauty and excitement of the great outdoors. Join us to explore uncharted paths, conquer new challenges, and create stories worth sharing. Your next big adventure awaits—let's make it unforgettable!
                    </p>
                </div>
            </div>

            {/* Cards Section */}
            <div className="h-[50%] flex flex-col gap-8 absolute top-[17rem] left-[2rem]">
                <div className="flex flex-col justify-center items-center gap-16">
                <Link to="/destinations"><div className="flex justify-center items-center gap-5">
                        {cardData.map((card, index) => (
                            <Card
                                key={index}
                                image={card.image}
                                title={card.title}
                                location={card.location}
                                rating={card.rating}
                                reviews={card.reviews}
                            />
                        ))}
                    </div>
                    </Link>
                    <Link to="/login">
                        <button className="bg-white h-[3rem] w-[10rem] rounded-lg text-md">View More</button>
                    </Link>
                </div>
            </div>

            <p className="text-white font-bold absolute bottom-[17rem] left-[10rem] w-[40%]">
                Our safari tours are led by knowledgeable and passionate rangers who prioritize your safety and enhance your wildlife viewing experience with interesting insights into the local flora and fauna. Trust us to provide you with the best possible safari experience with our team of skilled forest rangers.
            </p>
            <div className="absolute bottom-0 z-[-1]">
                <img src={bg2} alt="" className="w-screen" />
            </div>
            <div className="absolute bottom-[-10rem] right-20 z-0">
                <img src={Deer} alt="" />
            </div>
        </div>
    );
};

export default Sec3;