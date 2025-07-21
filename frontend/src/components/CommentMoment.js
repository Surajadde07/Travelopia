import { useState } from 'react';
import axios from 'axios';

const CommentMoment = ({ match }) => {
    const [commentText, setCommentText] = useState('');
    const momentId = match.params.id;

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/moments/comment/${momentId}`, { text: commentText });
            setCommentText('');
            alert('Comment added successfully');
        } catch (err) {
            console.error('Error commenting on moment', err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-center">Add a Comment</h2>
            <form onSubmit={handleCommentSubmit} className="max-w-md mx-auto mt-4 p-6 bg-white rounded-lg shadow-lg">
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Write your comment..."
                />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 mt-4">
                    Submit Comment
                </button>
            </form>
        </div>
    );
};

export default CommentMoment;
