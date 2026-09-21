
import express from "express";
import { checkDelayedOrders, createOrder, getAllOrders, getDelayAnalytics, getFulfillmentDashboard, getOrderById, updateOrderAssignment, updateOrderDeadline, updateOrderNote, updateOrderPriority, updateOrderStage, updatePaymentStatus } from "../controllers/fulfillmentController.js";

const router = express.Router();

router.post("/orders", createOrder);

router.get("/orders", getAllOrders);

router.get("/orders/:id", getOrderById);

router.patch("/orders/:id/stage", updateOrderStage);

router.patch("/orders/:id/assignment", updateOrderAssignment);

router.patch("/orders/check-delays", checkDelayedOrders);

router.get("/analytics/delays", getDelayAnalytics);

router.patch("/orders/:id/priority", updateOrderPriority);

router.patch("/orders/:id/note", updateOrderNote);

router.patch("/orders/:id/deadline", updateOrderDeadline);

router.patch("/orders/:id/payment", updatePaymentStatus);

router.get("/dashboard", getFulfillmentDashboard);

export default router;