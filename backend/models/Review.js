const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            
        },
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tour',
            
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
