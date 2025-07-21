import React from 'react';
import logo from '../assets/Logo.png'
import { IoMdSend } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookCircleLine } from "react-icons/ri";
import { LuTwitter } from "react-icons/lu";

const Footer = () => {
    return (
        <footer id='contact' className="bg-white py-10">
            <div className="container mx-auto flex gap-8 px-10 md:px-0 justify-evenly">
                {/* Logo and Social Media */}
                <div className="col-span-2 w-[25%]">
                    <img src={logo} alt="" className='h-[70px]' />
                    <p className="text-gray-600 mb-6">
                        We always make our customer happy by providing as many choices as possible.
                    </p>
                    <div className="flex space-x-4">
                        <a className="text-blue-500 hover:text-blue-700 text-2xl">
                            <FaInstagram /> {/* Instagram Icon */}
                        </a>
                        <a className="text-blue-500 hover:text-blue-700 text-2xl">
                            <RiFacebookCircleLine /> {/* Facebook Icon */}
                        </a>
                        <a className="text-blue-500 hover:text-blue-700 text-2xl">
                            <LuTwitter /> {/* Twitter Icon */}
                        </a>
                    </div>
                </div>

                {/* About Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">About</h3>
                    <ul className="space-y-2">
                        <li><a className="text-gray-600 hover:text-gray-900">About Us</a></li>
                        <li><a className="text-gray-600 hover:text-gray-900">Features</a></li>
                        <li><a className="text-gray-600 hover:text-gray-900">News</a></li>
                        <li><a className="text-gray-600 hover:text-gray-900">Menu</a></li>
                    </ul>
                </div>

                {/* Company Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li><a className="text-gray-600 hover:text-gray-900">About Us</a></li>
                        <li><a className="text-gray-600 hover:text-gray-900">Partner with us</a></li>
                        <li><a className="text-gray-600 hover:text-gray-900">FAQ</a></li>
                        <li><a className="text-gray-600 hover:text-gray-900">Blog</a></li>
                    </ul>
                </div>

                {/* Support Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><a className="text-gray-600 hover:text-gray-900">Account</a></li>
                        <li><a className="text-gray-600 hover:text-gray-900">Support Center</a></li>
                        <li><a className="text-gray-600 hover:text-gray-900">Feedback</a></li>
                        <li><a className="text-gray-600 hover:text-gray-900">Contact us</a></li>
                        <li><a className="text-gray-600 hover:text-gray-900">Accessibility</a></li>
                    </ul>
                </div>

                {/* Get in Touch Section */}
                <div className='w-[25%]'>
                    <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                    <p className="text-gray-600 mb-4">Question or feedback? We'd love to hear from you</p>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none"
                        />
                        <button className="absolute right-2 top-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-xl">
                            <IoMdSend />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
