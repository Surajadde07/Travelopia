const User = require('../models/User');
const Tour = require('../models/Tour')
const Booking = require('../models/Booking')
const Review = require('../models/Review')

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field

        res.status(200).json({
            count: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.getAllBookings = async (req, res) => {
//     try {
//         const bookings = await Booking.find();
//         res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.getAllBookings = async (req, res) => {
    try {

        const bookings = await Booking.find()
            .populate('user', 'firstname lastname email') // Populate user fields
            .populate('tour', 'location title image'); // Populate tour fields
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.getAllReviews = async (req, res) => {
//     try {
//         const reviews = await Review.find();
//         res.status(200).json(reviews);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("user", "username").populate("tour", "title");
        console.log(reviews);
        const formattedReviews = reviews.map((review) => ({
            _id: review._id,
            username: review.user.username,
            tourName: review.tour?.title || "unknown tour",
            rating: review.rating,
            comment: review.comment,
        }));

        res.status(200).json(formattedReviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Delete a user by ID (Admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res) => {
    try {
        // Find the user by ID
        // const user = await User.findById(req.params.id);
        const user = await User.findByIdAndDelete(req.params.id);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        // await user.remove();

        res.status(200).json({
            message: 'User deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a user by ID (Admin only)
// @route   GET /api/admin/users/:id
// @access  Private (Admin)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchUsers = async (req, res) => {
    const { query } = req.query;
    try {
        const users = await User.find({
            $or: [
                { username: new RegExp(query, 'i') },
                { email: new RegExp(query, 'i') }
            ]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Update a user (Admin only)
// @route   PUT /api/admin/users/:id
// @access  Private (Admin)
// exports.updateUser = async (req, res) => {
//     const { username, email, role } = req.body;

//     try {
//         // Find the user by ID
//         const user = await User.findById(req.params.id);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Update the user fields
//         user.username = username || user.username;
//         user.email = email || user.email;
//         user.role = role || user.role; // Admin can change user role

//         const updatedUser = await user.save();

//         res.status(200).json({
//             message: 'User updated successfully',
//             updatedUser,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.getAdminDashboard = async (req, res) => {
    try {
        // Fetch total counts
        const totalUsers = await User.countDocuments();
        const totalTours = await Tour.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const totalReviews = await Review.countDocuments();

        // Fetch recently added tours and users (e.g., last 5 entries)
        const recentTours = await Tour.find().sort({ createdAt: -1 }).limit(5);
        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

        // Send the response with all data
        res.status(200).json({
            totalUsers,
            totalTours,
            totalBookings,
            totalReviews,
            recentTours,
            recentUsers
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
