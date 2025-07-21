const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        category: {
            type: String,
            enum: ['adventure', 'religious', 'historical & cultural', 'romantic'],
            required: true
        },
        location: { 
            type: String, 
            required: true 
        },
        pricePerPerson: { 
            type: Number, 
            // required: true 
        },
        image: { type: String, required: true  },
        status: {
            type: String,
            enum: ['active', 'banned'],
            default: 'active' // Default is 'active', tour is visible
        },

        bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
        reviews: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Review' 
        }],
    },
    {timestamps: true}
);

module.exports = mongoose.model('Tour', tourSchema);
