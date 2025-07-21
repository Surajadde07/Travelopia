import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Slidebar"; // Sidebar component
import Markdown from "react-markdown";

// Enhanced Modal Component
const PackingListModal = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Your Personalized Packing Guide
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full"
            aria-label="Close modal">
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-grow pr-2  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded">
          <Markdown>{content}</Markdown>
        </div>
        <button
          onClick={onClose} // This is the primary close button
          className="mt-6 w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 ease-in-out">
          Close
        </button>
      </div>
    </div>
  );
};

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // State for packing list feature
  const [generatingListForBookingId, setGeneratingListForBookingId] =
    useState(null);
  const [packingListError, setPackingListError] = useState({}); // { bookingId: 'error message' }
  const [showPackingListModal, setShowPackingListModal] = useState(false);
  const [currentPackingListContent, setCurrentPackingListContent] =
    useState(null);

  const handleCloseModal = () => {
    console.log(
      "Attempting to close modal. Current showPackingListModal state:",
      showPackingListModal
    );
    setShowPackingListModal(false);
    setCurrentPackingListContent(null); // Explicitly clear content
    console.log(
      "Modal close attempted. New showPackingListModal state should be false."
    );
  };

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/bookings`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err.message);
        setError("Failed to load bookings. Please try again.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]); // Dependency array ensures this runs when token changes

  // Handle cancel booking
  const handleCancel = async (bookingId) => {
    try {
      // Update the booking status to canceled in the backend
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/bookings/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the booking status to canceled in the frontend
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "canceled" }
            : booking
        )
      );
    } catch (error) {
      console.error("Error cancelling booking:", error.message);
      console.log(error);
      alert(error.response?.data?.message || "Failed to cancel booking.");
    }
  };

  const handleGeneratePackingGuide = async (bookingId) => {
    setGeneratingListForBookingId(bookingId);
    setPackingListError((prev) => ({ ...prev, [bookingId]: null })); // Clear previous error

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/bookings/${bookingId}/generate-packing-guide`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.packingList) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, packingList: response.data.packingList }
              : booking
          )
        );
      } else {
        throw new Error("Packing list not found in response.");
      }
    } catch (err) {
      console.error("Error generating packing guide:", err);
      setPackingListError((prev) => ({
        ...prev,
        [bookingId]:
          err.response?.data?.message ||
          "Failed to generate packing guide. Please try again.",
      }));
    }
    setGeneratingListForBookingId(null);
  };

  const handleViewPackingGuide = (packingListContent) => {
    setCurrentPackingListContent(packingListContent);
    setShowPackingListModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading your bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex items-center h-screen w-screen bg-blue-50">
      {/* Sidebar */}
      <div className="w-[20%] flex items-center h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-[80%] p-6 h-full overflow-y-auto">
        {/* <h1 className="text-4xl font-bold text-center mb-8 pt-2 bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">My Bookings</h1> */}
        <h1 className="text-4xl font-bold text-center mb-8 pt-2 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            You have no bookings yet!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={
                    booking.tour?.image
                      ? `${process.env.REACT_APP_BACKEND_URL}/${booking.tour.image}`
                      : "https://via.placeholder.com/300"
                  }
                  alt={booking.tour?.title || "Tour"}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold">
                    {booking.tour?.title || "Tour Title"}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Location: {booking.tour?.location || "N/A"}
                  </p>
                  <p className="text-gray-500 mt-1">
                    Price: ₹{booking.totalPrice}
                  </p>
                  <p className="text-gray-500 mt-1">
                    Date:{" "}
                    {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-500 mt-1">
                    People: {booking.numPeople}
                  </p>
                  <p
                    className={`text-lg font-semibold mt-2 ${
                      booking.status === "canceled"
                        ? "text-red-500"
                        : booking.status === "pending"
                        ? "text-yellow-500"
                        : booking.status === "booked"
                        ? "text-green-500" // Explicitly green for booked
                        : "text-green-500" // Default to green for other statuses like 'completed'
                    }`}>
                    Status:{" "}
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </p>

                  {/* Packing List Button Logic */}
                  {booking.status === "booked" && (
                    <div className="mt-3">
                      {booking.packingList ? (
                        <button
                          onClick={() =>
                            handleViewPackingGuide(booking.packingList)
                          }
                          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-md text-sm hover:from-purple-600 hover:to-indigo-600 transition">
                          View Packing Guide
                        </button>
                      ) : generatingListForBookingId === booking._id ? (
                        <button
                          disabled
                          className="w-full bg-gray-400 text-white py-2 rounded-md text-sm cursor-not-allowed">
                          Generating Guide...
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleGeneratePackingGuide(booking._id)
                          }
                          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded-md text-sm hover:from-teal-600 hover:to-cyan-600 transition">
                          Generate Packing Guide
                        </button>
                      )}
                      {packingListError[booking._id] && (
                        <p className="text-red-500 text-xs mt-1 text-center">
                          {packingListError[booking._id]}
                        </p>
                      )}
                    </div>
                  )}

                  {booking.status !== "canceled" &&
                    booking.status !== "completed" && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="mt-4 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-md text-sm hover:from-red-600 hover:to-red-700 transition">
                        Cancel Booking
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <PackingListModal
        content={currentPackingListContent}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MyBooking;
