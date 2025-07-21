import React, { useState } from 'react';
import signup from '../assets/Signup_bg.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
    // State for form input values
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/register`, formData);
            
            // Save token to local storage
            localStorage.setItem('token', response.data.token);
            setError('');
            
            // Redirect to a different page on successful registration
            navigate("/login/userdashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed.");
            console.error("Signup error:", err);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 items-center justify-center">
            <div className="w-[90vw] h-[90%] max-w-4xl rounded-xl shadow-lg flex flex-col md:flex-row">
                {/* Left Side: Image Section */}
                <div className="w-[50%] h-full">
                    <img
                        src={signup}
                        alt="Signup"
                        className="w-full h-full"
                    />
                </div>
                {/* Right Side: Form Section */}
                <div className="w-[50%] p-8 px-[3rem] flex flex-col justify-center items-center bg-white">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">Welcome</h1>
                    <p className="text-gray-600 mb-6 text-center">Join us to explore exciting travel opportunities!</p>

                    {/* Signup Form */}
                    <form className="space-y-4 w-full max-w-sm" onSubmit={handleSignup}>
                        <div className='flex gap-5'>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        </div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Next
                        </button>

                        {/* Login link */}
                        <p className="text-center mt-3">
                            Already have an account?{" "}
                            <span 
                                className="text-blue-500 cursor-pointer hover:underline"
                                onClick={() => navigate("/login")}
                            >
                                Login here
                            </span>
                        </p>

                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;