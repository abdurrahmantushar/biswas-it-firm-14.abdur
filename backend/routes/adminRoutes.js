
import express from "express";
import { getAdminRequests, updateRequestStatus } from "../controllers/requestController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { getAdminStats, getSources, getUsers, updateSourceVerification, updateUserStatus } from "../controllers/adminController.js";

const router = express.Router();
router.get("/stats",authMiddleware,adminMiddleware,getAdminStats);
router.get("/users",authMiddleware,adminMiddleware,getUsers);
router.get("/sources",authMiddleware,adminMiddleware,getSources);
router.patch("/sources/:id/verification",authMiddleware,adminMiddleware,updateSourceVerification);
router.patch("/requests/:id",authMiddleware,adminMiddleware,updateRequestStatus);
router.get("/requests",authMiddleware,adminMiddleware,getAdminRequests);
router.patch("/users/:id/status",authMiddleware,adminMiddleware,updateUserStatus);


export default router;