import React from 'react'
import empty_wishlist from '../assets/Empty_Wishlist.png'
import { Link } from 'react-router-dom'

function Wishlist() {
    return (
        <div className='flex justify-center items-center h-screen '>
            <div className=' h-[90vh] w-[40vw] flex flex-col bg-white rounded-lg shadow-2xl'>
                <img src={empty_wishlist} alt="" className=' h-[20rem] rounded-lg ' />
                <p className='text-center text-2xl font-bold heading p-2'>Your Wishlist is Waiting!</p>
                <p className='text-center text-lg welcome px-10'>Add your dream destinations and favorite packages here to keep them close. Start exploring and find the perfect adventures to fill your next trip. Your journey begins with a wish!</p>
                <div className='flex justify-center items-center p-5'>
                    <Link to="/login/userdashboard">
                        <button className='bg-[#fb8b86] hover:bg-red-500 h-[2.5rem] w-[12rem] rounded-md flex justify-center items-center text-white font-semibold welcome'>Explore Destination</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Wishlist