import React from 'react';
import logo from '../assets/Logo.png'; 
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from "react-scroll";

function Navbar() {
    return (
        <nav className="flex justify-between items-center p-2 px-10 ">
            {/* Logo */}
            <div className="flex items-center">
                <img src={logo} alt="Travial Logo" className="h-[120px] w-auto" /> {/* Adjust height as needed */}
                {/* <span className="text-xl font-bold ml-2">Travial</span> Optional branding text */}
            </div>
            
            
            {/* Navigation Links */}
            <ul className="flex space-x-6 list-none gap-[5rem] text-[1.3rem]">
                <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
                <li><Link to="/destinations" className="hover:text-blue-500 cursor-pointer">Destinations</Link></li>
                <li><ScrollLink to="explore" className="hover:text-blue-500 cursor-pointer">Explore</ScrollLink></li>
                <li><ScrollLink to="contact" className="hover:text-blue-500 cursor-pointer">Contact</ScrollLink></li>
            </ul>

            {/* Login/Signup Buttons */}
            <div className="flex justify-center items-center space-x-4">    
                <button className=" text-black px-4 py-2 rounded "><Link to="/login">Login</Link></button>
                <Link to="/signup"><button className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 w-[6rem]">Signup</button></Link>
                {/* <Link to="/login/admin"><RiAdminFill className='text-2xl text-[#0044C7]' /></Link> */}

            </div>
        </nav>
    );
}

export default Navbar;
