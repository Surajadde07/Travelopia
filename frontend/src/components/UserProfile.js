import React, { useEffect, useState } from 'react';
import { HiUserCircle } from "react-icons/hi2";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserProfileVideo from '../assets/UserProfile.mp4';

function UserProfile() {
    const [user, setUser] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [token]);

    return (
        <div className="bg-gray-100 h-screen flex flex-col items-center py-10">

            {/* Header Section */}
            <div className="w-full max-w-4xl flex items-center justify-between mb-4">
                <button onClick={() => window.history.back()} className="text-white hover:text-gray-50 text-lg font-semibold  bg-gradient-to-r from-green-400 to-blue-500 px-4 py-1 rounded-md">
                    Back
                </button>
                <h1 className="text-3xl font-bold text-gray-800">Profile Overview</h1>
                <Link to="/login/userdashboard/userprofile/useredit">
                    <button className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none">
                        <MdOutlineModeEditOutline className="text-lg" />
                        Edit Profile
                    </button>
                </Link>
            </div>

            <div className="w-full max-w-4xl grid lg:grid-cols-3 gap-8">
                {/* Left Section: Profile Video and Picture */}
                <div className="col-span-1 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                    <HiUserCircle className="text-[#4083f3] text-[8rem] mb-4" />
                    <p className="text-lg font-semibold text-gray-700">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <video className="w-full h-[15rem] rounded-md mb-4" loop autoPlay muted>
                        <source src={UserProfileVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Right Section: User Details */}
                <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-6">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                            <input
                                type="text"
                                value={user.firstname || ""}
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                            <input
                                type="text"
                                value={user.lastname || ""}
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Username</label>
                            <input
                                type="text"
                                value={user.username || ""}
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                            />
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Mobile Number</label>
                            <input
                                type="tel"
                                value={user.phone || ""}
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
                            <input
                                type="text"
                                value={user.gender || ""}
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                            <input
                                type="email"
                                value={user.email || ""}
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-500 mb-1">Password</label>
                            <input
                                type="password"
                                value="********"
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
