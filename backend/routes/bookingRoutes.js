import express from "express";
import { createBooking, getUserBookings, getAllBookings, cancelBooking } from "../controllers/bookingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new booking
router.post("/", protect, createBooking);

// Get bookings for a specific user
router.get("/my-bookings", protect, getUserBookings);

// Get all bookings (Admin only)
router.get("/", protect, admin, getAllBookings);

// Cancel a booking
router.delete("/:id", protect, cancelBooking);

export default router;
