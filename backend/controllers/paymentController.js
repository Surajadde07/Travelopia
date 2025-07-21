const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay instance
// Ensure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are in your .env file
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "Present" : "Missing");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  const {
    amount,
    currency = "INR",
    receipt: originalReceiptFromFrontend,
  } = req.body; // Amount is in paise

  if (!amount || isNaN(amount)) {
    return res.status(400).json({
      success: false,
      message: "Amount is required and must be a number.",
    });
  }
  if (amount <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "Amount must be greater than 0." });
  }

  let finalReceiptForRazorpay;

  if (
    originalReceiptFromFrontend &&
    originalReceiptFromFrontend.length > 0 &&
    originalReceiptFromFrontend.length <= 40
  ) {
    finalReceiptForRazorpay = originalReceiptFromFrontend;
  } else {
    if (
      originalReceiptFromFrontend &&
      originalReceiptFromFrontend.length > 40
    ) {
      console.warn(
        `Receipt from frontend ("${originalReceiptFromFrontend}") was too long (${originalReceiptFromFrontend.length} chars). Generating a new backend receipt for Razorpay.`
      );
    }
    // Generate a short, unique receipt on the backend if frontend's is invalid or missing
    finalReceiptForRazorpay = `rcpt_bk_${new Date().getTime()}`; // e.g., rcpt_bk_1678886400000 (approx 20 chars)
  }

  const options = {
    amount: Number(amount), // amount in the smallest currency unit
    currency,
    receipt: finalReceiptForRazorpay, // Use the validated or newly generated receipt
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    if (!order) {
      return res
        .status(500)
        .json({ success: false, message: "Razorpay order creation failed." });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error creating order.",
      error: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Missing payment verification details.",
    });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is authentic, you can now save the details in your database
      // For example: await Payment.create({ razorpay_order_id, razorpay_payment_id, status: 'success' });

      // For now, just sending success. In a real app, you'd redirect or send payment success data.
      // If you need to redirect to a frontend success page:
      // res.redirect(`/payment-success?payment_id=${razorpay_payment_id}&order_id=${razorpay_order_id}`);

      res.status(200).json({
        success: true,
        message: "Payment verified successfully.",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed. Signature mismatch.",
      });
    }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error verifying payment.",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
