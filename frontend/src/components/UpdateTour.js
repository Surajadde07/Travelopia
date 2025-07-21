import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import update from '../assets/Update.jpg';

const UpdateTour = () => {
    const { id } = useParams(); // Get tour ID from URL params

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        pricePerPerson: '',
        image: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Fetch tour details when the page loads
    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/tours/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const { title, description, category, pricePerPerson, image } = response.data.tour;

                setFormData({ title, description, category, pricePerPerson, image });
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError('Failed to fetch tour details.');
                setLoading(false);
            }
        };

        fetchTourDetails();
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files.length > 0) {
            setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/api/admin/tours/${id}`,
                formDataToSend,
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            setSuccessMessage('Tour updated successfully.');
            setTimeout(() => setSuccessMessage(null), 3000); // Clear the message after 3 seconds
        } catch (err) {
            setError('Failed to update tour.');
            console.error(err);
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading tour details...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>;
    }

    return (
        <div className="flex h-screen gap-3 bg-gray-100 items-center justify-center">
            {/* Back Button */}
            <div className='h-full mt-[4.1rem]'>
                <button
                    onClick={() => window.history.back()}
                    className="text-white hover:text-gray-50 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 rounded-md mb-4"
                >
                    Back
                </button>
            </div>

            <div className="flex items-center justify-around">
                <div className="bg-[#ffffff] p-8 rounded-l-md shadow-lg w-[40vw] h-[90vh] flex flex-col justify-between">


                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 heading">
                        Update a Tour
                    </h2>

                    {/* Success Message */}
                    {successMessage && (
                        <p className="text-green-500 text-center mb-4">{successMessage}</p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter tour title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#5d67fc] focus:border-[#5d67fc]"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#5d67fc] focus:border-[#5d67fc]"
                                rows="3"  // Reduced rows for better layout
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
                                value={formData.category || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#5d67fc] focus:border-[#5d67fc]"
                            >
                                <option value="adventure">Adventure</option>
                                <option value="religious">Religious</option>
                                <option value="historical & cultural">Historical and Cultural</option>
                                <option value="romantic">Romantic</option>
                            </select>
                        </div>

                        {/* Price */}
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#5d67fc] focus:border-[#5d67fc]"
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#5d67fc] focus:border-[#5d67fc]"
                            />
                        </div>

                        {/* Submit */}
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-[#5d67fc] hover:bg-[#4f52ff] rounded-md shadow focus:outline-none focus:ring-2 focus:ring-[#5d67fc] focus:ring-offset-2"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                {/* Image Section */}
                <div>
                    <img
                        src={update}
                        alt="Update Tour"
                        className="w-[40vw] h-[90vh] rounded-r-md shadow-br-lg"
                    />
                </div>
            </div>
        </div>

    );
};

export default UpdateTour;
