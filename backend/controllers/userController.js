import Request from "../model/RequestModel.js";
import User from "../model/userModel.js";


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get profile",
      error: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, company } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.company = company ?? user.company;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export const getBuyerDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("savedProducts");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const totalRequests = await Request.countDocuments({
      buyer: req.user.id,
    });

    const pendingRequests = await Request.countDocuments({
      buyer: req.user.id,
      status: "pending",
    });

    const completedRequests = await Request.countDocuments({
      buyer: req.user.id,
      status: "completed",
    });

    const savedProducts = user.savedProducts.length;

    res.json({
      totalRequests,
      pendingRequests,
      savedProducts,
      completedRequests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get buyer dashboard",
      error: error.message,
    });
  }
};