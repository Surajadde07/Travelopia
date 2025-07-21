const User = require('../models/User');
const Tour = require('../models/Tour');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

// Profile Management

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        const passwordLength = (await User.findById(req.user._id)).password.length;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select('-password');
        res.status(200).json({
            message: 'User updated successfully', updatedUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tour Browsing

// Get All Tours (with optional filters)
exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find({ status: { $ne: 'banned' } });
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Tour By ID
exports.getTourById = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.status(200).json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Booking Management

// Create a New Booking
// exports.createBooking = async (req, res) => {
//     try {
//         const booking = await Booking.create({
//             user: req.user._id,
//             tour: req.body.tour,
//             dateBooked: Date.now(),
//             status: 'booked'
//         });

//         await Tour.findByIdAndUpdate(
//             req.body.tour,
//             { $push: { bookings: booking._id } }, // Push the booking ID into the bookings array
//             { new: true }
//         );

//         res.status(201).json({
//             message: 'Booking created Successfully',
//             booking
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Get User Bookings
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('tour');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel a Booking
// exports.cancelBooking = async (req, res) => {
//     try {
//         const booking = await Booking.findOneAndUpdate(
//             { _id: req.params.id, user: req.user._id },
//             { status: 'canceled' },
//             { new: true }
//         );
//         if (!booking) {
//             return res.status(404).json({ message: 'Booking not found or already canceled' });
//         }
//         res.status(200).json({ message: 'Booking canceled', booking });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Review Management

// Create a Review for a Tour
// exports.createReview = async (req, res) => {
//     try {
//         const review = await Review.create({
//             user: req.user._id,
//             tour: req.body.tour,
//             rating: req.body.rating,
//             comment: req.body.comment,
//             createdAt: Date.now()
//         });
//         res.status(201).json({
//             message: 'Review Created Successfully',
//             review
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Get User Reviews
// exports.getUserReviews = async (req, res) => {
//     try {
//         const reviews = await Review.find({ user: req.user._id }).populate('tour');
//         res.status(200).json(reviews);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.getUserReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user._id })
            .populate('tour', 'title description image location') // Ensure necessary fields are populated
            .select('comment rating tour'); // Explicitly select the comment and rating fields
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//! WISHLIST FUNCTIONS HERE

//? Add tour to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { tourId } = req.body;

        // Check if tour exists
        const tour = await Tour.findById(tourId);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        // Add tour to wishlist if not already added
        const user = await User.findById(userId);
        if (!user.wishlist.includes(tourId)) {
            user.wishlist.push(tourId);
            await user.save();
            return res.status(200).json({ message: 'Tour added to wishlist', wishlist: user.wishlist });
        } else {
            return res.status(400).json({ message: 'Tour is already in the wishlist' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//? Remove tour from wishlist
exports.removeFromWishlist = async (req, res) => {
    // try {
    //     const userId = req.user._id;
    //     const { tourId } = req.body;

    //     const user = await User.findById(userId);
    //     user.wishlist = user.wishlist.filter(id => id.toString() !== tourId);
    //     await user.save();

    //     res.status(200).json({ message: 'Tour removed from wishlist', wishlist: user.wishlist });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }


    //? new
    try {
        const userId = req.user._id;
        const { tourId } = req.body; // Ensure tourId is sent in the body

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove the tour from the wishlist
        const index = user.wishlist.indexOf(tourId);
        if (index !== -1) {
            user.wishlist.splice(index, 1); // Remove tour from wishlist
            await user.save();
            return res.status(200).json({ message: 'Tour removed from wishlist', wishlist: user.wishlist });
        } else {
            return res.status(400).json({ message: 'Tour is not in the wishlist' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//? Get all wishlist tours
exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('wishlist'); // Populate to get tour details

        const wishlistWithFullImageUrl = user.wishlist.map(tour => ({
            ...tour._doc,
            image: tour.image ? `http://localhost:4000/${tour.image}` : null
        }));

        res.status(200).json({ wishlist: wishlistWithFullImageUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

