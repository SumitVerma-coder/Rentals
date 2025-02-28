import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const { propertyId, checkInDate, checkOutDate } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      property: propertyId,
      checkInDate,
      checkOutDate,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get User Bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("property");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Fix: Add getAllBookings function
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email").populate("property");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();
    res.json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
