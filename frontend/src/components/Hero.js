import React from 'react';
import family from '../assets/family_image.png';
import world from '../assets/World.png';
import aeroplane from '../assets/Aeroplane.png';
import India from '../assets/India.mp4';


function Hero() {
    return (
        <div className='flex h-[600px] w-screen'>
            {/* Left Content Area */}
            <div className='w-[50%] flex flex-col justify-center px-5'>
                <h1 className='text-[3rem] font-bold mb-4 flex items-center justify-between '>
                    <span>Travel with purpose, Make a difference in the world</span>
                    <img src={aeroplane} alt="Aeroplane" className='h-[2rem] w-[2rem]' />
                </h1>

                <p className='text-lg mb-36'>
                    Explore the world with your loved ones. Discover new places, create lasting memories, and enjoy every moment of your journey.
                </p>
                <div className='h-[40vh]  absolute bottom-[-15%] left-12 w-[30vw] flex justify-center items-center rounded-md bg-gray-100 '>
                    <video className="w-[95%] h-[95%] object-cover rounded-md " loop autoPlay muted>
                        <source src={India} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>


            </div>

            {/* Right Image Area */}
            <div className='relative w-[50%] flex justify-center items-center'>
                <img src={family} alt="Family" className='z-10' />
                <img
                    src={world}
                    alt="World"
                    className='absolute top-14 left-1/2 transform -translate-x-1/2 z-0' // Adjust positioning as needed
                />
            </div>

        </div>
    );
}

export default Hero;
