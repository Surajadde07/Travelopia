import React, { useState } from 'react';
import AdminSignup from '../assets/AdminSignup.jpg'

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      // Add the form submission logic here
      console.log('Admin Registered:', formData);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center">
      <div className="w-[80vw] h-[80%] max-w-4xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row">
        {/* left Side: Image Section */}
        {/* Right Side: Form Section */}
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Admin Register</h2>
          <p className='text-lg text-gray-600 text-center'>Create an Admin Account to get started with managing the platform</p>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Confirm your password"
                required
              />
            </div>

          </form>
            <button
              type="submit"
              className="w-full bg-[#58c5f0] text-white py-2 rounded-lg font-semibold hover:bg-[#4bc3f3] focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-[7rem]"
            >
              Register
            </button>
        </div>
        <div className=" w-[70%] h-full">
          <img
            src={AdminSignup}
            alt="Signup"
            className="w-full h-full rounded-r-xl"
          />
        </div>
      </div>
    </div>

  );
};

export default AdminRegister;
