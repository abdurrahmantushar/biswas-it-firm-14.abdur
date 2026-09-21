
import Order from "../model/OrderModel.js";
import fulfillmentStages from "../utils/fulfillmentStages.js";
import checkOrderDelays from "../utils/delayDetection.js";
import Request from "../model/RequestModel.js";

export const createOrder = async (req, res) => {
  try {
    const {
      requestId,
      priority,
      assignedTo,
      deadline,
      internalNote,
    } = req.body;

    if (!requestId) {
      return res.status(400).json({
        success: false,
        message: "Request ID is required",
      });
    }

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Source request not found",
      });
    }

    if (request.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Only approved requests can be converted into orders",
      });
    }

    const lastOrder = await Order.findOne()
      .sort({ createdAt: -1 })
      .select("orderId");

    let nextNumber = 1;

    if (lastOrder?.orderId) {
      const numberPart = lastOrder.orderId.replace("SX-ORD-", "");
      const parsedNumber = Number(numberPart);

      if (!Number.isNaN(parsedNumber)) {
        nextNumber = parsedNumber + 1;
      }
    }

    const orderId = `SX-ORD-${String(nextNumber).padStart(4, "0")}`;

    const createdAt = new Date();

    const stagesData = fulfillmentStages.map((stage, index) => {
      const stageDeadline = new Date(createdAt);

      stageDeadline.setHours(
        stageDeadline.getHours() + stage.defaultDeadlineHours
      );

      return {
        key: stage.key,
        name: stage.label,
        status: index === 0 ? "processing" : "pending",
        deadline: stageDeadline,
        completedAt: null,
        note: "",
      };
    });

    const order = await Order.create({
      orderId,
      buyer: request.buyer,
      product: request.product,
      quantity: request.quantity,
      priority: priority || "medium",
      assignedTo: assignedTo || null,
      deadline,
      internalNote: internalNote || "",
      stages: stagesData,
    });

    request.status = "completed";
    await request.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(
      Math.max(Number(req.query.limit) || 5, 1),
      50
    );

    const skip = (page - 1) * limit;

    const [orders, totalOrders] = await Promise.all([
      Order.find()
        .populate("buyer", "name email")
        .populate("product", "_id name price")
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json({
      success: true,
      orders,
      pagination: {
        currentPage: page,
        limit,
        totalOrders,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("buyer", "name email")
      .populate("product", "name price")
      .populate("assignedTo", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

export const updateOrderStage = async (req, res) => {
  try {
    const { currentStage, status, note } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const targetStage = order.stages.find(
      (stage) => stage.key === currentStage
    );

    if (!targetStage) {
      return res.status(400).json({
        success: false,
        message: "Invalid fulfillment stage",
      });
    }

    const previousStage = order.stages.find(
      (stage) => stage.key === order.currentStage
    );

    const now = new Date();

    if (order.currentStage !== currentStage) {
      if (previousStage) {
        previousStage.status = "completed";
        previousStage.completedAt = now;
      }

      targetStage.status = status || "processing";

      if (targetStage.status === "completed") {
        targetStage.completedAt = now;
      } else {
        targetStage.completedAt = null;
      }

      order.currentStage = currentStage;
    } else {
      targetStage.status = status || targetStage.status;

      if (targetStage.status === "completed") {
        targetStage.completedAt = now;
      }

      if (note !== undefined) {
        targetStage.note = note;
      }
    }

    if (note !== undefined) {
      targetStage.note = note;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order stage updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order stage",
      error: error.message,
    });
  }
};

 export const updateOrderAssignment = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { assignedTo },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member assigned successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to assign team member",
      error: error.message,
    });
  }
};

export const checkDelayedOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    let delayedCount = 0;

    for (const order of orders) {
      const wasDelayed = order.isDelayed;

      checkOrderDelays(order);

      if (!wasDelayed && order.isDelayed) {
        delayedCount++;
      }

      await order.save();
    }

    res.status(200).json({
      success: true,
      message: "Delay detection completed successfully",
      delayedOrders: delayedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to check delayed orders",
      error: error.message,
    });
  }
};

export const getDelayAnalytics = async (req, res) => {
  try {
    const orders = await Order.find();

    const analytics = fulfillmentStages.map((stage) => {
      let delayedCount = 0;

      orders.forEach((order) => {
        const orderStage = order.stages.find(
          (item) => item.key === stage.key
        );

        if (orderStage?.status === "delayed") {
          delayedCount++;
        }
      });

      return {
        key: stage.key,
        name: stage.label,
        delayedCount,
      };
    });

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch delay analytics",
      error: error.message,
    });
  }
};

export const updateOrderPriority = async (req, res) => {
  try {
    const { priority } = req.body;

    const validPriorities = ["low", "medium", "high", "urgent"];

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { priority },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order priority updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order priority",
      error: error.message,
    });
  }
};

export const updateOrderNote = async (req, res) => {
  try {
    const { internalNote } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { internalNote: internalNote || "" },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Internal note updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update internal note",
      error: error.message,
    });
  }
};

export const updateOrderDeadline = async (req, res) => {
  try {
    const { deadline } = req.body;

    if (!deadline || Number.isNaN(new Date(deadline).getTime())) {
      return res.status(400).json({
        success: false,
        message: "Valid deadline is required",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { deadline: new Date(deadline) },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deadline updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order deadline",
      error: error.message,
    });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const validStatuses = ["pending", "verified", "failed"];

    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update payment status",
      error: error.message,
    });
  }
};

export const getFulfillmentDashboard = async (req, res) => {
  try {
    const orders = await Order.find();

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
      (order) => order.currentStage === "new_order"
    ).length;

    const processingOrders = orders.filter(
      (order) =>
        order.currentStage !== "new_order" &&
        order.currentStage !== "settlement"
    ).length;

    const completedOrders = orders.filter(
      (order) =>
        order.currentStage === "settlement" &&
        order.stages.every((stage) => stage.status === "completed")
    ).length;

    const delayedOrders = orders.filter(
      (order) => order.isDelayed
    ).length;

    const urgentOrders = orders.filter(
      (order) => order.priority === "urgent"
    ).length;

    res.status(200).json({
      success: true,
      dashboard: {
        totalOrders,
        pendingOrders,
        processingOrders,
        completedOrders,
        delayedOrders,
        urgentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch fulfillment dashboard",
      error: error.message,
    });
  }
};