import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateMoment = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/moments/create`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            console.log('Moment created successfully', response.data);
            navigate('/moments');
        } catch (err) {
            console.error('Error creating moment', err);
            setError('Oops! Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-blue-100">

                {/* Header */}
                <div className="flex items-center justify-between bg-gradient-to-br from-pink-400 to-blue-400 text-white px-6 py-4">
                    <h2 className="text-xl font-bold tracking-wide">Share a Moment</h2>
                    <button
                        onClick={() => navigate('/moments')}
                        className="text-sm bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-lg transition-all"
                    >
                        Back
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-8">

                    {/* Upload */}
                    <div className="flex flex-col items-center justify-center">
                        <label
                            htmlFor="image"
                            className="cursor-pointer flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-blue-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all overflow-hidden"
                        >
                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Uploaded"
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span className="text-xs text-blue-400 mt-2">Click to add image</span>
                                </>
                            )}
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-sm font-semibold text-gray-700">
                            Moment Caption
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your special moment..."
                            className="w-full bg-blue-50 border border-blue-200 rounded-xl p-4 text-gray-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                            rows="4"
                            required
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="text-red-500 text-center text-sm">{error}</div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-br from-pink-400 to-blue-400  text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                        Publish Moment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateMoment;
