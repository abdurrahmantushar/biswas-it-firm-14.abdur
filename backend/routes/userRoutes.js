
import express from "express";
import {
  getBuyerDashboard,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.get("/dashboard", authMiddleware, getBuyerDashboard);

export default router;