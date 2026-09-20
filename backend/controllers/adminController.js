import Product from "../model/productModel.js";
import Request from "../model/RequestModel.js";
import User from "../model/userModel.js";



export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalRequests = await Request.countDocuments();

    const pendingRequests = await Request.countDocuments({
      status: "pending",
    });

    res.json({
      totalUsers,
      totalProducts,
      totalRequests,
      pendingRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get admin stats",
      error: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get users",
      error: error.message,
    });
  }
};

export const getSources = async (req, res) => {
  try {
    const sources = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json({
      sources,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get sources",
      error: error.message,
    });
  }
};

export const updateSourceVerification = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "verified",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid verification status",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Source not found",
      });
    }

    product.verificationStatus = status;

    await product.save();

    res.json({
      message: "Source verification status updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update source verification status",
      error: error.message,
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({
        message: "Invalid user status",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        message: "Admin status cannot be changed",
      });
    }

    user.status = status;

    await user.save();

    res.json({
      message: `User ${status} successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user status",
      error: error.message,
    });
  }
};