import React, { useState } from 'react';
import axios from 'axios';
import createtour from '../assets/createtour.jpg';

const CreateTour = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'adventure',
        location: '',
        pricePerPerson: '',
        image: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData((prevState) => ({ ...formData, [name]: files[0] }));
        } else {
            setFormData((prevState) => ({ ...formData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback({ message: '', type: '' });

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            console.log('Submitting form data:', formData);
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/admin/tours`,
                formDataToSend,
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );
            console.log('Tour Created:', response.data);
            setFeedback({ message: 'Tour created successfully!', type: 'success' });
            setFormData({
                title: '',
                description: '',
                category: 'adventure',
                location: '',
                pricePerPerson: '',
                image: null,
            });
        } catch (err) {
            console.error('Error creating tour:', err.message);
            setFeedback({
                message: err.response?.data?.message || 'Failed to create tour.',
                type: 'error',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            {/* Back Button */}
            <button
                onClick={() => window.history.back()}
                className="text-white hover:text-gray-50 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-md absolute top-10 left-10"
            >
                Back
            </button>

            <div className="bg-white shadow-lg gap-4 rounded-lg flex w-[80%] p-8">
                {/* Left Image Section */}
                <div className="w-[50%]">
                    <img
                        src={createtour}
                        alt="Create Tour"
                        className=" h-[80%] object-cover"
                    />
                </div>

                {/* Right Content Section */}
                <div className="w-[50%]">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">Create a New Tour</h1>

                    {feedback.message && (
                        <div
                            className={`p-4 rounded-md ${feedback.type === 'success'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}
                        >
                            {feedback.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Tour Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Tour Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter tour title"
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter a brief description"
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                rows="4"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="adventure">Adventure</option>
                                <option value="religious">Religious</option>
                                <option value="historical & cultural">Historical and Cultural</option>
                                <option value="romantic">Romantic</option>
                            </select>
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter location"
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Price per Person */}
                        <div>
                            <label htmlFor="pricePerPerson" className="block text-sm font-medium text-gray-700">
                                Price per Person (₹)
                            </label>
                            <input
                                type="number"
                                name="pricePerPerson"
                                id="pricePerPerson"
                                value={formData.pricePerPerson}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {isSubmitting ? 'Creating...' : 'Create Tour'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTour;
