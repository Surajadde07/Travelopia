import React, { useEffect, useState } from 'react';
import bg from '../assets/EditPage.jpg';
import axios from 'axios';

function UserEdit() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        phone: ""
    });
    const [message, setMessage] = useState("");
    const token = localStorage.getItem('token');

    // Fetch user data to populate the form
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData({
                    firstname: response.data.firstname || "",
                    lastname: response.data.lastname || "",
                    username: response.data.username || "",
                    phone: response.data.phone || ""
                });
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        };
        fetchUserData();
    }, [token]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage("Profile updated successfully!");
        } catch (error) {
            setMessage("Error updating profile. Please try again.");
            console.error("Error updating profile:", error.message);
        }
    };

    return (
        <div>
            <div className="flex h-screen bg-gray-100 items-center flex-col justify-center">
                <div className='w-full px-7'>
                    <button onClick={() => window.history.back()} className="text-white hover:text-gray-50 text-lg font-semibold bg-gradient-to-r from-red-400 to-red-500 px-4 py-1 rounded-md">
                        Back
                    </button>
                </div>
                <div className="w-full h-[80%] max-w-4xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row">

                    {/* Left Section */}
                    <div className="w-[55%] p-8 px-[3rem] flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Edit Your Profile</h1>
                        <p className="text-gray-600 mb-6 text-wrap text-sm">
                            Keep your profile up-to-date to get the most personalized experience.
                        </p>

                        {/* Success/Error Message */}
                        {message && (
                            <p className={`mb-4 text-center ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                                {message}
                            </p>
                        )}

                        {/* Form */}
                        <form className="space-y-6 w-full max-w-sm" onSubmit={handleSubmit}>
                            {/* First Name and Last Name */}
                            <div className="flex justify-between items-center">
                                <div className="w-[48%]">
                                    <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                        placeholder="First Name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="w-[48%]">
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                        placeholder="Last Name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Username */}
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="Username"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Save Changes Button */}
                            <button
                                type="submit"
                                className="w-full py-2 bg-[#ff4f5a] text-white font-semibold rounded-md hover:bg-[#d23a44] transition-colors"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>

                    {/* Right Section */}
                    <div className="w-[75%] h-full p-4">
                        <img
                            src={bg}
                            alt="Edit Profile"
                            className="w-full h-full rounded-md object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserEdit;
