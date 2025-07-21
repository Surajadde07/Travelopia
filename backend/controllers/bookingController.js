const Booking = require("../models/Booking");
const Tour = require("../models/Tour");
const User = require("../models/User");
const mongoose = require("mongoose");
const { makeContent } = require("../config/gemini"); // Import makeContent function

// @desc    Create a new booking (User only)
// @route   POST /api/bookings
// @access  Private (User)
exports.createBooking = async (req, res) => {
  try {
    const { tourId, fullName, phone, bookingDate, numPeople } = req.body;
    if (!tourId || !fullName || !phone || !bookingDate || !numPeople) {
      return res.status(400).json({
        message:
          "All fields (tourId, fullName, phone, bookingDate, numPeople) are required.",
      });
    }

    // Verify the tour exists
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Calculate total price
    const totalPrice = tour.pricePerPerson * numPeople;

    // Create a new booking with status 'pending'
    const booking = new Booking({
      user: req.user._id,
      tour: tourId,
      fullName,
      phone,
      bookingDate,
      numPeople,
      totalPrice,
      status: "pending",
    });

    const user = await User.findById(req.user._id);
    user.bookings.push(booking._id);
    await user.save();
    tour.bookings.push(booking._id);
    await tour.save();

    await booking.save();
    res.status(201).json({
      message: "Booking created successfully and is pending approval.",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userWithBookings = await User.findById(req.user._id).populate({
      path: "bookings",
      populate: { path: "tour", select: "title location pricePerPerson image" },
    });

    if (!userWithBookings) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User bookings retrieved successfully",
      bookings: userWithBookings.bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, user: req.user._id },
      { status: "canceled" },
      { new: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or already canceled" });
    }

    res.status(200).json({ message: "Booking canceled", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "username email")
      .populate("tour", "title location image");

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchBookings = async (req, res) => {
  const { id } = req.params;

  try {
    const searchCriteria = {};

    if (mongoose.Types.ObjectId.isValid(id)) {
      const objectId = new mongoose.Types.ObjectId(id);
      searchCriteria.$or = [{ user: objectId }, { tour: objectId }];
    } else {
      return res
        .status(400)
        .json({ message: "Invalid ID format or unsupported search field" });
    }

    const bookings = await Booking.find(searchCriteria);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status (Admin only)
// @route   PUT /api/bookings/:id/status
// @access  Private (Admin)
exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;

  if (!["booked", "canceled"].includes(status)) {
    return res.status(400).json({
      message: 'Invalid status. Status must be either "booked" or "canceled".',
    });
  }

  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();
    res
      .status(200)
      .json({ message: `Booking status updated to ${status}.`, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate a packing guide for a confirmed booking
// @route   POST /api/bookings/:bookingId/generate-packing-guide
// @access  Private (User who owns the booking)
exports.generatePackingGuide = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user._id; // Assuming you have user info in req.user from auth middleware

    // 1. Fetch the booking and ensure it belongs to the user and is confirmed ('booked')
    const booking = await Booking.findById(bookingId).populate("tour");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    if (booking.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this booking." });
    }

    if (booking.status !== "booked") {
      return res.status(400).json({
        message:
          "Packing guide can only be generated for confirmed (booked) tours.",
      });
    }

    // Optional: Check if a packing list already exists and decide if regeneration is allowed
    // if (booking.packingList) {
    //     return res.status(400).json({ message: 'A packing list already exists for this booking.', packingList: booking.packingList });
    // }

    const tour = booking.tour;
    if (!tour) {
      return res.status(404).json({
        message:
          "Tour details associated with this booking could not be found.",
      });
    }

    // 2. Prepare data for the Gemini prompt
    const destination = tour.location || "the destination";
    const tourDescription = tour.description || "general travel";
    const bookingDate = new Date(booking.bookingDate);
    const numPeople = booking.numPeople || 1;
    // For simplicity, assuming a 7-day trip. Could be calculated from tour duration if available.
    const tripDurationDays = 7;
    const endDate = new Date(
      bookingDate.getTime() + tripDurationDays * 24 * 60 * 60 * 1000
    );

    const formattedStartDate = bookingDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedEndDate = endDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // 3. Construct the prompt for Gemini API
    const prompt = `
            Generate a detailed packing list for a ${tripDurationDays}-day trip for ${numPeople} person(s) to ${destination} from ${formattedStartDate} to ${formattedEndDate}.
            The trip is for ${tourDescription}.
            Please provide a practical, itemized list. Consider common weather patterns for the destination around these dates.
            Categorize items if possible (e.g., Clothing, Toiletries, Documents, Electronics, Miscellaneous).
            Focus on essential items.
        `;

    // 4. Call Gemini API using the makeContent function
    let generatedText = "";
    try {
      generatedText = await makeContent(prompt); // Use the new makeContent function
    } catch (geminiError) {
      console.error("Error calling Gemini API via makeContent:", geminiError);
      return res.status(500).json({
        message:
          "Failed to generate packing list due to an error with the AI service.",
      });
    }

    if (!generatedText || generatedText.trim() === "") {
      return res.status(500).json({
        message:
          "The AI service returned an empty packing list. Please try again.",
      });
    }

    // 5. Save the packing list to the booking
    booking.packingList = generatedText;
    await booking.save();

    // 6. Return the generated packing list
    res.status(200).json({
      message: "Packing guide generated and saved successfully.",
      packingList: generatedText,
    });
  } catch (error) {
    console.error("Error generating packing guide:", error);
    if (!res.headersSent) {
      res.status(500).json({
        message: error.message || "An internal server error occurred.",
      });
    }
  }
};
