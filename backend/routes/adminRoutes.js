const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    getUserById,
    getAllUsers,
    deleteUser,
    searchUsers,
    getAdminDashboard,
    getAllBookings,
    getAllReviews
} = require('../controllers/adminController');
const { createTour, updateTour, deleteTour, searchTours, getAllTours } = require('../controllers/tourController');
const { deleteBooking, searchBookings, updateBookingStatus } = require('../controllers/bookingController');
const { deleteReview, searchReviews } = require('../controllers/reviewController');
const { registerAdmin, loginAdmin, logout } = require('../controllers/authController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { getAdventureTours,
    getReligiousTours,
    getHistoricalTours,
    getRomanticTours,
    getTourById,
    banTour,
    unbanTour
    } = require('../controllers/tourController');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

//! Register a new admin
router.post('/register', registerAdmin); //*

//! Login admin
router.post('/login', loginAdmin); //*

//! User routes
router.get('/users', isAuthenticated, isAdmin, getAllUsers); //*
router.delete('/users/:id', isAuthenticated, isAdmin, deleteUser); //*
router.get('/users/search', isAuthenticated, isAdmin, searchUsers); //*
router.get('/users/:id', isAuthenticated, isAdmin, getUserById); //*
// router.put('/users/:id', isAuthenticated, isAdmin, updateUser); //!pending

//! Tour routes
router.get('/tours', isAuthenticated, isAdmin, getAllTours); //*
router.get('/tours/:id', isAuthenticated, isAdmin, getTourById);
router.post('/tours', isAuthenticated, isAdmin, upload.single('image'), createTour); //*
router.put('/tours/:id', isAuthenticated, isAdmin, upload.single('image'), updateTour); //*
router.delete('/tours/:id', isAuthenticated, isAdmin, deleteTour); // *
router.get('/tours/search', isAuthenticated, isAdmin, searchTours); //*

//! Admin route to ban a tour
router.put('/tour/:id/ban', isAuthenticated, isAdmin, banTour);

//! Admin route to unban a tour
router.put('/tour/:id/unban', isAuthenticated, isAdmin, unbanTour);

//! booking routes
router.get('/bookings', isAuthenticated, isAdmin, getAllBookings); //* 
router.delete('/bookings/:id', isAuthenticated, isAdmin, deleteBooking); //*
router.get('/bookings/:id', isAuthenticated, isAdmin, searchBookings); //*
router.put('/bookings/:id/status',isAuthenticated ,isAdmin, updateBookingStatus);

//! reviews routes
router.get('/reviews', isAuthenticated, isAdmin, getAllReviews); //*
router.delete('/reviews/:id', isAuthenticated, isAdmin, deleteReview); //*
router.get('/reviews/search', isAuthenticated, isAdmin, searchReviews); //*

//! admin dashboard
router.get('/dashboard', isAuthenticated, isAdmin, getAdminDashboard); //*


//! Route to get adventure tours
router.get('/dashboard/tours/adventure', isAuthenticated, isAdmin, getAdventureTours);

//! Route to get religious tours
router.get('/dashboard/tours/religious', isAuthenticated, isAdmin, getReligiousTours);

//! Route to get historical & cultural tours
router.get('/dashboard/tours/historical-cultural', isAuthenticated, isAdmin, getHistoricalTours);

//! Route to get romantic tours
router.get('/dashboard/tours/romantic', isAuthenticated, isAdmin, getRomanticTours);

//! Admin logout route
router.post('/logout', isAuthenticated, isAdmin, logout);

module.exports = router;
