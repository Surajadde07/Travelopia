const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true 
        },
        password: {
            type: String,
            required: true 
        },
        phone: { type: String, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
        bookings: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }],
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }],
        wishlist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tour'  // Reference to the Tour model
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
