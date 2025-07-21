import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLoginImage from '../assets/AdminLogin.jpg';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/login`, {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            setError("");
            console.log("Login successful:", response.data);

            navigate("/login/admindashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed.");
            console.error("Login error:", err);
        }
    };


    return (
        <div className="flex h-screen bg-gray-100 items-center justify-center">
            <div className="w-full h-[80%] max-w-4xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row">
                {}
                <div className="w-[70%] h-full">
                    <img
                        src={AdminLoginImage}
                        alt="Login"
                        className="w-full h-full rounded-l-xl"
                    />
                </div>
                {}
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6 py-16">
                    <h2 className="text-4xl font-bold text-gray-800 text-center heading">Admin Login</h2>
                    <p className='text-lg text-gray-500 text-center'>Welcome back! Please log in to access the admin dashboard</p>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-[2rem]"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
