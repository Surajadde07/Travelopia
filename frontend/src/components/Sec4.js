import React from 'react'
import kid from '../assets/kid.png'
import { Link } from 'react-router-dom';

function Sec4() {
    return (
        <div className=" w-screen h-[700px] ">

            {/* Section 2: Feedback with Character Image and Experience */}
            <section className="flex flex-col  justify-center items-start py-0 px-10 gap-12 w-full  h-full">
                {/* Left: Character Image and Feedback */}
                <div className="bg-pink-100 p-10 rounded-xl text-center w-3/4 md:w-1/2">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">
                        Prepare Yourself & Let's Explore The Beauty Of The World
                    </h1>
                    <p className="mb-6 text-gray-600">We have many special offers especially for you.</p>
                    <Link to='/login'>
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600">
                            Get Started
                        </button>
                    </Link>
                </div>

                <div className='flex w-full justify-around'>
                    <div className="relative ">
                        <img src={kid} alt="Traveler" className=" mb-4 h-[350px]   " />
                        <div className="absolute top-[10%]  flex-col right-[-35%] bg-white p-4 shadow-lg rounded-full flex items-center">
                            <span className="mr-4 text-lg font-bold">How Your Experience?</span>
                            <div className="flex space-x-4 text-2xl">
                                <span>😊</span>
                                <span>😐</span>
                                <span>😞</span>
                                <span>😡</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Experience Section */}
                    <div className="text-center md:text-left max-w-md">
                        <h2 className="text-xl text-blue-600 font-semibold mb-2">Our Experience</h2>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            With Our Experience We Will Serve You
                        </h1>
                        <p className="text-gray-600 mb-6">
                            From the day of our inception, we have placed great emphasis on ensuring that
                            our users enjoy maximum convenience when using our services. We achieve this
                            by offering affordable prices and a hassle-free experience.
                        </p>

                        {/* Stats */}
                        <div className="flex justify-center md:justify-start space-x-8">
                            <div>
                                <h3 className="text-3xl font-bold text-blue-600">10</h3>
                                <p className="text-gray-600">Years Experience</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-blue-600">300</h3>
                                <p className="text-gray-600">Destination Collaboration</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-blue-600">40k+</h3>
                                <p className="text-gray-600">Happy customers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Sec4