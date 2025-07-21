const express = require("express");
const router = express.Router();
const { isAuthenticated, isUser } = require("../middleware/auth");
const {
  getUserProfile,
  updateUserProfile,
  getAllTours,
  getTourById,
  getUserReviews,
} = require("../controllers/userController");

const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");
const {
  createBooking,
  getUserBookings,
  cancelBooking,
  generatePackingGuide,
} = require("../controllers/bookingController");
const {
  createReview,
  getTourReviewsByTourId,
} = require("../controllers/reviewController");
const {
  getAdventureTours,
  getReligiousTours,
  getHistoricalTours,
  getRomanticTours,
  searchTours,
} = require("../controllers/tourController");

const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/userController");

//? Register a new user
router.post("/register", registerUser); //*

//? Login user
router.post("/login", loginUser); //*

//! Profile Management
router.get("/profile", isAuthenticated, isUser, getUserProfile); //*
router.put("/profile", isAuthenticated, isUser, updateUserProfile); //*

//! Tour Browsing
router.get("/dashboard", isAuthenticated, isUser, getAllTours); //*
router.get("/tours/:id", isAuthenticated, isUser, getTourById); //*

//! Route to search for tours in user dashboard
router.get("/dashboard/search", isAuthenticated, isUser, searchTours);

//! Booking Management
router.post("/bookings", isAuthenticated, isUser, createBooking); //*
router.get("/bookings", isAuthenticated, isUser, getUserBookings); //*
router.delete("/bookings/:id", isAuthenticated, isUser, cancelBooking); //*
router.post(
  "/bookings/:bookingId/generate-packing-guide",
  isAuthenticated,
  isUser,
  generatePackingGuide
);

//! Review Management
router.post("/reviews", isAuthenticated, isUser, createReview); //*
router.get("/reviews", isAuthenticated, isUser, getUserReviews); //*

//! Route to get reviews of a specific tour
router.get(
  "/tours/:id/reviews",
  isAuthenticated,
  isUser,
  getTourReviewsByTourId
);

//! Route to add a tour to the wishlist
router.post("/dashboard/wishlist/add", isAuthenticated, isUser, addToWishlist);

//! Route to remove a tour from the wishlist
router.delete(
  "/dashboard/wishlist/remove",
  isAuthenticated,
  isUser,
  removeFromWishlist
);

//! Route to get all wishlist tours
router.get("/dashboard/wishlist", isAuthenticated, isUser, getWishlist);

//! Route to get adventure tours
router.get(
  "/dashboard/tours/adventure",
  isAuthenticated,
  isUser,
  getAdventureTours
);

//! Route to get religious tours
router.get(
  "/dashboard/tours/religious",
  isAuthenticated,
  isUser,
  getReligiousTours
);

//! Route to get historical & cultural tours
router.get(
  "/dashboard/tours/historical-cultural",
  isAuthenticated,
  isUser,
  getHistoricalTours
);

//! Route to get romantic tours
router.get(
  "/dashboard/tours/romantic",
  isAuthenticated,
  isUser,
  getRomanticTours
);

//! User logout route
router.post("/logout", isAuthenticated, isUser, logout);

module.exports = router;
