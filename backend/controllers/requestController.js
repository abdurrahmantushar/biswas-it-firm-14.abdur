
import Product from "../model/productModel.js";
import Request from "../model/RequestModel.js";


export const createSourceRequest = async (req, res) => {
  try {
    const {
      product,
      quantity,
      budget,
      message,
    } = req.body;

    if (!product || quantity === undefined || quantity === null || quantity === "") {
      return res.status(400).json({
        message: "Product and quantity are required",
      });
    }

    const parsedQuantity = Number(quantity);

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      return res.status(400).json({
        message: "Quantity must be a valid number greater than 0",
      });
    }

    const parsedBudget =
      budget !== undefined &&
      budget !== null &&
      budget !== ""
        ? Number(budget)
        : undefined;

    if (
      parsedBudget !== undefined &&
      (Number.isNaN(parsedBudget) || parsedBudget < 0)
    ) {
      return res.status(400).json({
        message: "Budget cannot be negative",
      });
    }

    const existingProduct = await Product.findById(product);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (existingProduct.availability === "unavailable") {
      return res.status(400).json({
        message: "This product is currently unavailable",
      });
    }

    if (existingProduct.verificationStatus !== "verified") {
      return res.status(400).json({
        message: "This product source is not verified",
      });
    }

    const request = await Request.create({
      buyer: req.user.id,
      product,
      productName: existingProduct.name,
      quantity: parsedQuantity,
      budget: parsedBudget,
      message,
    });

    return res.status(201).json({
      message: "Source request created successfully",
      request,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create source request",
      error: error.message,
    });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(
      Math.max(Number(req.query.limit) || 10, 1),
      50
    );

    const skip = (page - 1) * limit;

    const filter = {
      buyer: req.user.id,
    };

    const [requests, totalRequests] = await Promise.all([
      Request.find(filter)
        .populate(
          "product",
          "name price location availability sourceType"
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Request.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalRequests / limit);

    res.json({
      requests,
      pagination: {
        currentPage: page,
        limit,
        totalRequests,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get requests",
      error: error.message,
    });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findOne({
      _id: req.params.id,
      buyer: req.user.id,
    }).populate(
      "product",
      "name description price location availability sourceType"
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    res.json({
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get request",
      error: error.message,
    });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "approved",
      "rejected",
      "completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid request status",
      });
    }

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = status;

    await request.save();

    res.json({
      message: "Request status updated successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update request status",
      error: error.message,
    });
  }
};

export const getAdminRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("buyer", "name email company phone")
      .populate("product", "name price location availability sourceType")
      .sort({ createdAt: -1 });

    res.json({
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get source requests",
      error: error.message,
    });
  }
};

