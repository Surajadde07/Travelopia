const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

// Route to create a Razorpay order
// POST /api/payment/create-order
router.post("/create-order", createOrder);

// Route to verify a Razorpay payment
// POST /api/payment/verify-payment
router.post("/verify-payment", verifyPayment);

module.exports = router;
