import React, { useState } from 'react';
import scifi_kid from '../assets/Scifi_kid.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
    // console.log('All env vars:', process.env);

    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, {
                email,
                password
            });

            // Save token to local storage
            localStorage.setItem('token', response.data.token);
            setError("");
            console.log("Login successful:", response.data);

            // Navigate to user dashboard after login
            navigate("/login/userdashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed.");
            console.error("Login error:", err);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 items-center justify-center">
            <div className="w-full h-[80%] max-w-4xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row">

                {/* Form Section */}
                <div className="w-[55%] p-8 px-[3rem] flex flex-col justify-center items-center">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">Welcome</h1>
                    <p className="text-gray-600 mb-6 text-center">We are glad to see you back with us</p>

                    {/* Login Form */}
                    <form className="space-y-4 w-full max-w-sm" onSubmit={handleLogin}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-[#2398aa] text-white font-semibold rounded-md hover:bg-[#216872] transition-colors"
                        >
                            Login
                        </button>

                        {/* Registration link */}
                        <p className="text-center mt-3">
                            Don't have an account?{" "}
                            <span 
                                className="text-[#2398aa] cursor-pointer hover:underline"
                                onClick={() => navigate("/signup")}
                            >
                                Register here
                            </span>
                        </p>

                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </form>
                </div>

                {/* Image Section */}
                <div className=" w-[75%] h-full p-4">
                    <img
                        src={scifi_kid}
                        alt="Sci-Fi Kid"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
