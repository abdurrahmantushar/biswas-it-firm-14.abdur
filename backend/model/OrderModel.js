import mongoose from "mongoose";

const stageSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "delayed"],
      default: "pending",
    },
    deadline: {
      type: Date,
      required: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    note: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    currentStage: {
      type: String,
      default: "new_order",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "verified", "failed"],
      default: "pending",
    },
    internalNote: {
      type: String,
      trim: true,
      default: "",
    },
    deadline: {
      type: Date,
      required: true,
    },
    isDelayed: {
      type: Boolean,
      default: false,
    },
    stages: {
      type: [stageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;