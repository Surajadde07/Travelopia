import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Slidebar';
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const generateColorFromUsername = (username) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
};

function AllMoments() {
    const [moments, setMoments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState({});
    const [likedMoments, setLikedMoments] = useState({});
    const [expandedMoments, setExpandedMoments] = useState({});


    useEffect(() => {
        fetchMoments();
    }, []);

    const fetchMoments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/moments/all`);
            setMoments(response.data.moments || []);
        } catch (error) {
            console.error('Error fetching moments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (id) => {
        try {
            const liked = likedMoments[id];
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/moments/${liked ? 'unlike' : 'like'}/${id}`;
            await axios.put(url, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setLikedMoments((prev) => ({ ...prev, [id]: !liked }));
            fetchMoments();
        } catch (error) {
            console.error('Error liking moment:', error);
        }
    };

    const handleComment = async (id) => {
        if (!newComment[id]) return;
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/moments/comment/${id}`,
                { text: newComment[id] },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setNewComment((prev) => ({ ...prev, [id]: '' }));
            fetchMoments();
        } catch (error) {
            console.error('Error commenting:', error);
        }
    };

    const getAvatar = (username) => (username ? username[0].toUpperCase() : '');
    const getAvatarStyle = (username) => ({ backgroundColor: generateColorFromUsername(username) });

    if (loading) {
        return <div className="text-center text-2xl font-bold mt-20 animate-pulse">Loading moments...</div>;
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-pink-50 relative">
            <div className="fixed top-0 items-center flex left-0 h-screen w-64 z-10">
                <Sidebar />
            </div>

            <div className="flex flex-col items-center w-full px-4 py-10 space-y-10">
                {moments.map((moment) => (
                    <div
                        key={moment._id}
                        className="w-full max-w-2xl bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6 transition hover:scale-[1.02] hover:shadow-3xl"
                    >
                        {/* Top User Info */}
                        <div className="flex items-center mb-4">
                            {moment.user?.photo ? (
                                <img
                                    src={`${process.env.REACT_APP_BACKEND_URL}/${moment.user.photo}`}
                                    alt="User"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                                />
                            ) : (
                                <div
                                    className="w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg"
                                    style={getAvatarStyle(moment.user?.username)}
                                >
                                    {getAvatar(moment.user?.username)}
                                </div>
                            )}
                            <div className="ml-4">
                                <div className="font-bold text-gray-700 text-lg">{moment.user?.username || 'Anonymous'}</div>
                                <div className="text-gray-400 text-xs">Shared a moment</div>
                            </div>
                        </div>

                        {/* Description */}
                        <div
                            className={`text-gray-700 mb-4 text-base transition-all duration-300 ${expandedMoments[moment._id] ? 'max-h-full' : 'max-h-24 overflow-hidden'
                                }`}
                        >
                            <p
                                className={`transition-all duration-300 ${expandedMoments[moment._id] ? '' : 'line-clamp-3'
                                    }`}
                            >
                                {moment.description}
                            </p>
                            {moment.description.length > 100 && ( // Only show Read More if description is long
                                <button
                                    onClick={() =>
                                        setExpandedMoments((prev) => ({
                                            ...prev,
                                            [moment._id]: !prev[moment._id],
                                        }))
                                    }
                                    className="mt-2 text-sm text-blue-500 hover:underline block"
                                >
                                    {expandedMoments[moment._id] ? 'Show less' : 'Read more'}
                                </button>
                            )}
                        </div>



                        {/* Image */}
                        <div className="overflow-hidden rounded-2xl mb-4">
                            <img
                                src={`${process.env.REACT_APP_BACKEND_URL}/${moment.image}`}
                                alt="Moment"
                                className="w-full h-72 object-cover transition-transform hover:scale-105 duration-300"
                            />
                        </div>

                        {/* Like & Comment */}
                        <div className="flex justify-between text-gray-500 text-sm py-2">
                            <button
                                onClick={() => handleLike(moment._id)}
                                className={`flex items-center gap-2 hover:text-pink-500 transition ${likedMoments[moment._id] ? 'text-pink-500' : ''}`}
                            >
                                {likedMoments[moment._id] ? <FaHeart /> : <FaRegHeart />}
                                {moment.likes?.length || 0} Likes
                            </button>

                            <div className="flex items-center gap-2 hover:text-blue-400 transition">
                                <FaRegComment />
                                {moment.comments?.length || 0} Comments
                            </div>
                        </div>

                        {/* Comment Input */}
                        <div className="flex items-center mt-4">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={newComment[moment._id] || ''}
                                onChange={(e) => setNewComment((prev) => ({ ...prev, [moment._id]: e.target.value }))}
                                className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <button
                                onClick={() => handleComment(moment._id)}
                                className="ml-3 text-blue-500 hover:text-blue-600 transition text-xl"
                            >
                                ➤
                            </button>
                        </div>

                        {/* Comment List */}
                        <div className="mt-4 max-h-36 overflow-y-auto space-y-2 pr-2">
                            {moment.comments?.map((comment, idx) => (
                                <div key={idx} className="text-sm text-gray-700">
                                    <span className="font-semibold">{comment.user?.username || 'Anonymous'}:</span> {comment.text}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Floating Create Button */}
                <Link to="/create">
                    <button className="fixed bottom-8 right-8 bg-gradient-to-br from-pink-400 to-blue-400 text-white px-6 py-4 rounded-full shadow-xl hover:scale-110 transition-all duration-300">
                        Create ✨
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default AllMoments;
