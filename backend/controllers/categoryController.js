import Category from "../model/categoryModel.js";
import Product from "../model/productModel.js";


const buyerProductFields =
  "name image category description price location availability sourceType verificationStatus createdAt";

  export const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      description,
      image,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create category",
      error: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      isActive: true,
    }).sort({ name: 1 });

    res.json({
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get categories",
      error: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category || !category.isActive) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get category",
      error: error.message,
    });
  }
};

export const getCategoryProducts = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category || !category.isActive) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const products = await Product.find({
      category: req.params.id,
      verificationStatus: "verified",
      availability: { $ne: "unavailable" },
    })
      .select(buyerProductFields)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json({
      category,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get category products",
      error: error.message,
    });
  }
};