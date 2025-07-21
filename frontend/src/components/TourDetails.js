import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaStar } from "react-icons/fa";

// Function to load a script dynamically
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const TourDetails = () => {
  const { tourId } = useParams(); // Get the tourId from the URL
  const [tour, setTour] = useState(null); // Store tour details
  const [reviews, setReviews] = useState([]); // Store reviews
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" }); // New review state
  const [reviewSuccess, setReviewSuccess] = useState(false); // To track review submission success
  const [reviewError, setReviewError] = useState(""); // To track review errors
  const [loading, setLoading] = useState(true); // Loading state
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    bookingDate: "",
    numPeople: 1,
  }); // Form state
  const [bookingSuccess, setBookingSuccess] = useState(false); // To track booking success
  const [errorMessage, setErrorMessage] = useState(""); // To track errors
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState("");
  const [paymentErrorMessage, setPaymentErrorMessage] = useState("");
  const token = localStorage.getItem("token");
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}/`;

  // Fetch tour details
  useEffect(() => {
    const loadRazorpay = async () => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        console.error("Razorpay SDK failed to load. Are you online?");
        setErrorMessage(
          "Payment gateway failed to load. Please check your internet connection and try again."
        );
      }
    };
    loadRazorpay();

    const fetchTourDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/tours/${tourId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTour(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tour details:", error.message);
        setLoading(false);
        setErrorMessage(
          "Unable to fetch tour details. Please try again later."
        );
      }
    };

    fetchTourDetails();
  }, [tourId, token]);

  // Fetch reviews for the specific tour
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/tours/${tourId}/reviews`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
        setReviews([]);
      }
    };

    fetchReviews();
  }, [tourId, token, reviewSuccess]);

  // Handle review submission
  const handleReviewSubmit = async () => {
    setReviewError(""); // Reset error messages
    if (!newReview.rating) {
      setReviewError("Please provide a star rating.");
      return;
    }
    if (!newReview.comment.trim()) {
      setReviewError("Comment is required.");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/reviews`,
        { tourId, ...newReview },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviewSuccess(true); // Trigger re-fetching reviews
      setNewReview({ rating: 0, comment: "" }); // Clear the input fields
    } catch (error) {
      if (error.response?.status === 400) {
        setReviewError("You have already reviewed this tour.");
      } else {
        console.error("Error submitting review:", error.message);
        setReviewError(
          "An error occurred while submitting your review. Please try again."
        );
      }
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const verifyPaymentOnBackend = async (
    paymentData,
    bookingDetailsToSave,
    currentTourId
  ) => {
    setPaymentProcessing(true);
    setPaymentSuccessMessage("");
    setPaymentErrorMessage("");
    try {
      const verifyResponse = await axios.post(
        `${baseURL}api/payment/verify-payment`,
        paymentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (verifyResponse.data.success) {
        setPaymentSuccessMessage("Payment verified. Finalizing booking...");
        // Now that payment is verified, create the booking in the database
        try {
          await axios.post(
            `${baseURL}api/user/bookings`,
            { tourId: currentTourId, ...bookingDetailsToSave },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setPaymentSuccessMessage(
            "Payment successful! Your booking is confirmed and saved."
          );
          setBookingSuccess(true);
          // Optionally, you could update the booking record here to mark it as paid
          // For example: await axios.put(`${baseURL}api/user/bookings/${createdBookingId}/confirm-payment`, {}, { headers: { Authorization: `Bearer ${token}` }});
        } catch (bookingError) {
          console.error("Error creating booking after payment:", bookingError);
          setPaymentErrorMessage(
            bookingError.response?.data?.message ||
              "Payment was successful, but failed to save your booking. Please contact support with your payment ID: " +
                paymentData.razorpay_payment_id
          );
          // Potentially, you might want to try to refund the payment here or log this critical issue.
        }
      } else {
        setPaymentErrorMessage(
          verifyResponse.data.message ||
            "Payment verification failed. Please contact support."
        );
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setPaymentErrorMessage(
        error.response?.data?.message ||
          "An error occurred during payment verification."
      );
    } finally {
      setPaymentProcessing(false);
    }
  };

  const initiateRazorpayPayment = async (bookingFormDetails, tourDetails) => {
    setPaymentProcessing(true);
    setPaymentSuccessMessage("");
    setPaymentErrorMessage("");

    const amountInPaise =
      tourDetails.pricePerPerson * bookingFormDetails.numPeople * 100;
    if (amountInPaise <= 0) {
      setPaymentErrorMessage("Total amount must be greater than zero.");
      setPaymentProcessing(false);
      return;
    }

    try {
      // 1. Create Order on Backend
      const orderResponse = await axios.post(
        `${baseURL}api/payment/create-order`,
        {
          amount: amountInPaise,
          currency: "INR", // Or get from tourDetails if applicable
          receipt: `receipt_tour_${tourDetails._id}_${new Date().getTime()}`, // include booking id if available
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!orderResponse.data.success || !orderResponse.data.order) {
        setPaymentErrorMessage(
          orderResponse.data.message || "Could not create payment order."
        );
        setPaymentProcessing(false);
        return;
      }

      const razorpayOrder = orderResponse.data.order;

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Travel Lopia", // Your company name
        description: `Booking for ${tourDetails.title}`,
        image: tourDetails.image
          ? `${baseURL}${tourDetails.image}`
          : "https://via.placeholder.com/150", // Optional: your logo
        order_id: razorpayOrder.id,
        handler: function (response) {
          // This function is called when payment is successful
          verifyPaymentOnBackend(
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            },
            bookingFormDetails, // Pass the form details
            tourDetails._id // Pass the tourId
          );
        },
        prefill: {
          name: bookingFormDetails.fullName,
          // email: "customer_email@example.com", // Add user email if available
          contact: bookingFormDetails.phone,
        },
        notes: {
          tour_id: tourDetails._id,
          tour_title: tourDetails.title,
          // Add any other relevant notes
        },
        theme: {
          color: "#3b82f6", // Blue-500
        },
        modal: {
          ondismiss: function () {
            setPaymentProcessing(false);
            setPaymentErrorMessage("Payment was cancelled.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Razorpay payment failed:", response.error);
        setPaymentErrorMessage(
          `Payment Failed: ${response.error.description} (Reason: ${response.error.reason}, Step: ${response.error.step})`
        );
        // Optionally send failure details to backend for logging
        // axios.post(`${baseURL}api/payment/failed-payment`, { ... });
        setPaymentProcessing(false);
      });
      rzp.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
      setPaymentErrorMessage(
        error.response?.data?.message ||
          "An error occurred while initiating payment."
      );
      setPaymentProcessing(false);
    }
  };

  // Handle booking submission
  const handleBooking = async () => {
    setBookingSuccess(false);
    setErrorMessage(""); // Clear previous general errors
    setPaymentSuccessMessage(""); // Clear previous payment messages
    setPaymentErrorMessage(""); // Clear previous payment messages

    // Basic form validation
    if (!form.fullName || !form.phone || !form.bookingDate || !form.numPeople) {
      setErrorMessage("All booking fields are required.");
      return;
    }
    if (form.numPeople <= 0) {
      setErrorMessage("Number of people must be at least 1.");
      return;
    }

    // At this point, we could first create a 'pending' booking on the backend
    // and then proceed to payment. If payment is successful, we update the booking status.
    // For simplicity here, we'll directly proceed to payment initiation
    // and if payment is successful, the booking is considered confirmed implicitly by the payment.
    // You might want a more robust booking creation step first in a real app.

    // We have the tour details in `tour` state and booking form in `form` state
    if (tour && form) {
      // Instead of creating booking directly, we now initiate payment
      // The `handleBooking` button will now become "Proceed to Payment" or similar
      // Or we can rename it to `handleProceedToPayment`
      // Or we can rename it to `handleProceedToPayment`
      initiateRazorpayPayment(form, tour);
    } else {
      setErrorMessage("Tour details or booking information is missing.");
    }

    
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">
          {errorMessage || "Tour not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="w-screen flex justify-between items-center gap-5 px-12">
        <button
          onClick={() => window.history.back()}
          className="text-white hover:text-gray-50 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 rounded-md">
          Back
        </button>
        <div className="flex gap-5">
          <Link
            to="/login/userdashboard"
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-lg font-semibold hover:text-blue-500">
            Home
          </Link>
          <Link
            to="/login/userdashboard/mybookings"
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-lg font-semibold hover:text-blue-600">
            My Bookings
          </Link>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-center text-blue-600">
        {tour.title}
      </h1>
      <p className="text-center text-gray-500 mt-2">{tour.location}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <div className="flex flex-col gap-7">
          {/* Tour Image */}
          <img
            src={
              tour.image
                ? `${baseURL}${tour.image}`
                : "https://via.placeholder.com/600"
            }
            alt={tour.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />

          {/* Reviews Section */}
          <div className="mx-auto w-full p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Reviews ({reviews.length})
            </h2>

            {/* Input Section with User Icon */}
            <div className="flex items-center space-x-3 mb-4">
              <FaUserCircle className="text-gray-400 text-3xl" />
              <input
                type="text"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Share your thoughts..."
              />
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:bg-yellow-600">
                Submit
              </button>
            </div>

            {/* Star Rating Selection */}
            <div className="flex items-center space-x-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-xl cursor-pointer ${
                    newReview.rating >= star
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                />
              ))}
            </div>

            {/* Error Message */}
            {reviewError && <p className="text-red-500 mb-4">{reviewError}</p>}

            {/* Reviews List */}
            <div>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <FaUserCircle className="text-gray-400 text-3xl" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {review.user.firstname} {review.user.lastname}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="text-yellow-500 flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                          {[...Array(5 - review.rating)].map((_, i) => (
                            <FaStar
                              key={i + review.rating}
                              className="text-gray-300"
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 ml-10">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No reviews available for this tour.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tour Details and Booking Form */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">{tour.title}</h2>
          <p className="text-gray-600 mb-4">{tour.description}</p>
          <p className="text-lg font-bold mb-4">
            Price: ₹{tour.pricePerPerson} / per person
          </p>

          <h3 className="text-xl font-semibold">Booking Details</h3>
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full p-2 border rounded-md mb-4"
            />

            <label className="block text-sm font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full p-2 border rounded-md mb-4"
            />

            <label className="block text-sm font-semibold mb-2">
              Booking Date
            </label>
            <input
              type="date"
              name="bookingDate"
              value={form.bookingDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-4"
              min={new Date().toISOString().split("T")[0]}
            />

            <label className="block text-sm font-semibold mb-2">
              Number of People
            </label>
            <input
              type="number"
              name="numPeople"
              value={form.numPeople}
              onChange={handleInputChange}
              min="1"
              className="w-full p-2 border rounded-md mb-4"
            />

            <p className="font-bold">
              Total Price: ₹{tour.pricePerPerson * form.numPeople}
            </p>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
          )}
          {bookingSuccess && !paymentSuccessMessage && (
            <p className="text-green-500 text-sm mt-4">
              Booking created successfully and approval is pending
            </p>
          )}
          {paymentSuccessMessage && (
            <p className="text-green-500 text-sm mt-4">
              {paymentSuccessMessage}
            </p>
          )}
          {paymentErrorMessage && (
            <p className="text-red-500 text-sm mt-4">{paymentErrorMessage}</p>
          )}

          <button
            onClick={handleBooking}
            disabled={paymentProcessing || paymentSuccessMessage} // Disable if processing or already successful
            className={`w-full mt-6 text-white py-2 rounded-lg transition ${
              paymentProcessing || paymentSuccessMessage
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}>
            {paymentProcessing
              ? "Processing Payment..."
              : paymentSuccessMessage
              ? "Payment Successful!"
              : "Confirm Booking & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
