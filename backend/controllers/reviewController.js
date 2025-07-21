const Review = require('../models/Review');
const Tour = require('../models/Tour');
const User = require('../models/User');
const mongoose = require('mongoose');

// @desc    Create a new review for a tour (User only)
// @route   POST /api/reviews
// @access  Private (User)
exports.createReview = async (req, res) => {
    const { tourId, rating, comment } = req.body;

    try {
        // Check if the tour exists
        const tour = await Tour.findById(tourId);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        // Check if the user has already reviewed this tour
        const existingReview = await Review.findOne({ tour: tourId, user: req.user._id });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this tour' });
        }

        // Create a new review
        const review = await Review.create({
            user: req.user._id, // User from the isAuthenticated middleware
            tour: tourId,
            rating: Number(rating),
            comment,
        });

        // Update the user's reviews array
        const user = await User.findById(req.user._id);
        user.reviews.push(review._id); // Push the new review to the user's reviews array
        await user.save(); // Save the updated user document

        // Update the tour's reviews array
        tour.reviews.push(review._id); // Push the new review to the tour's reviews array
        await tour.save(); // Save the updated tour document

        res.status(201).json({
            message: 'Review added successfully',
            review,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all reviews for a specific tour
// @route   GET /api/reviews/tour/:tourId
// @access  Public
exports.getTourReviews = async (req, res) => {
    try {
        // Fetch reviews for the specified tour
        const reviews = await Review.find({ tour: req.params.tourId }).populate('user', 'username');

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this tour' });
        }

        res.status(200).json({
            count: reviews.length,
            reviews,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a review (User only)
// @route   PUT /api/reviews/:id
// @access  Private (User)
exports.updateReview = async (req, res) => {
    const { rating, comment } = req.body;

    try {
        // Find the review by ID
        const review = await Review.findById(req.params.id);

        // Check if the review exists and belongs to the logged-in user
        if (!review || review.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Review not found or not authorized' });
        }

        // Update the review fields
        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        const updatedReview = await review.save();

        res.status(200).json({
            message: 'Review updated successfully',
            updatedReview,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a review (User only)
// @route   DELETE /api/reviews/:id
// @access  Private (User)
exports.deleteReview = async (req, res) => {
    try {
        // Find the review by ID
        // const review = await Review.findById(req.params.id);
        const review = await Review.findByIdAndDelete(req.params.id);

        // Check if the review exists and belongs to the logged-in user
        // if (!review || review.user.toString() !== req.user._id.toString()) {
        //     return res.status(404).json({ message: 'Review not found or not authorized' });
        // }
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Remove the review
        // await review.remove();

        res.status(200).json({
            message: 'Review deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchReviews = async (req, res) => {
    const { query } = req.query;

    try {
        const searchCriteria = {};

        // Check if query can be treated as an ObjectId
        if (mongoose.Types.ObjectId.isValid(query)) {
            // If query is a valid ObjectId, search by user or tour ObjectId
            searchCriteria.$or = [
                { user: query },  // Search by user ID
                { tour: query }   // Search by tour ID
            ];
        } else {
            return res.status(400).json({ message: 'Invalid ID format or unsupported search field' });
        }

        // Execute the search
        const reviews = await Review.find(searchCriteria);
        res.status(200).json(reviews);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getTourReviewsByTourId = async (req, res) => {
    const tourId = req.params.id; // Extract the tour ID from the route parameter

    try {
        // Fetch reviews for the specified tour ID
        const reviews = await Review.find({ tour: tourId })
            .populate('user', 'firstname lastname email') // Populate user details
            .select('rating comment createdAt'); // Select only necessary fields

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this tour.' });
        }

        res.status(200).json({
            tourId,
            count: reviews.length,
            reviews,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reviews.', error: error.message });
    }
};