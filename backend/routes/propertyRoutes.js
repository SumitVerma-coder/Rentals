import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all properties
router.get("/", getAllProperties);

// Get a single property by ID
router.get("/:id", getPropertyById);

// Create a new property (protected route)
router.post("/", protect, createProperty);

// Update a property (protected route)
router.put("/:id", protect, updateProperty);

// Delete a property (admin only)
router.delete("/:id", protect, admin, deleteProperty);

export default router;
