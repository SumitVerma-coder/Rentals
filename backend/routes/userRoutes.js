import express from "express";
import {
  getUserProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js"; // ✅ Fix: Remove loginUser

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getAllUsers);
router.get("/profile", protect, getUserProfile);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;
