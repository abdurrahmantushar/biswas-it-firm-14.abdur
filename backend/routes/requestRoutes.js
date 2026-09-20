

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createSourceRequest, getMyRequests, getRequestById } from "../controllers/requestController.js";

const router = express.Router();

router.post("/", authMiddleware, createSourceRequest);
router.get("/my", authMiddleware, getMyRequests);
router.get("/:id", authMiddleware, getRequestById);
export default router;