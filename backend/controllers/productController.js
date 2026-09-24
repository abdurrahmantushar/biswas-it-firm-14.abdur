import { uploadImageCloude } from "../cloudenary/image_upload.js";
import Category from "../model/categoryModel.js";
import Product from "../model/productModel.js";
import User from "../model/userModel.js";

const buyerProductFields =
  "name image category description price location availability sourceType verificationStatus createdAt";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      location,
      availability,
      sourceType,
      supplierName,
      supplierPhone,
      supplierEmail,
    } = req.body;

    if (
      !name ||
      !category ||
      !price ||
      !location ||
      !sourceType ||
      !supplierName
    ) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    let image = "";

    if (req.file) {
      const uploadImage = await uploadImageCloude(req.file);
      image = uploadImage.secure_url;
    }

    const product = await Product.create({
      name,
      image,
      category,
      description,
      price,
      location,
      availability,
      sourceType,
      supplierName,
      supplierPhone,
      supplierEmail,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      location,
      minPrice,
      maxPrice,
      availability,
      sourceType,
      sort,
    } = req.query;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (location) {
      const locationMap = {
        dhaka: "Dhaka",
        chattogram: "Chittagong",
        sylhet: "Sylhet",
        rajshahi: "Rajshahi",
        khulna: "Khulna",
      };

      filter.location = {
        $regex: locationMap[location] || location,
        $options: "i",
      };
    }

    if (availability) {
      filter.availability = availability;
    }

    if (sourceType) {
      filter.sourceType = sourceType;
    }

    const hasMinPrice = minPrice !== undefined && minPrice !== "";
    const hasMaxPrice = maxPrice !== undefined && maxPrice !== "";

    if (hasMinPrice || hasMaxPrice) {
      filter.price = {};

      if (hasMinPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (hasMaxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    let sortOption = { createdAt: -1 };

    if (sort === "price_asc") {
      sortOption = { price: 1 };
    } else if (sort === "price_desc") {
      sortOption = { price: -1 };
    } else if (sort === "name_asc") {
      sortOption = { name: 1 };
    } else if (sort === "name_desc") {
      sortOption = { name: -1 };
    } else if (sort === "newest") {
      sortOption = { createdAt: -1 };
    }

    const products = await Product.find(filter)
      .select(buyerProductFields)
      .populate("category", "name")
      .sort(sortOption);

    res.json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("getProducts error:", error);

    res.status(500).json({
      message: "Failed to get products",
      error: error.message,
    });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const {search,category,location,minPrice,maxPrice,availability,sourceType,sort} = req.query;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (availability) {
      filter.availability = availability;
    }

    if (sourceType) {
      filter.sourceType = sourceType;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};

      if (minPrice !== undefined) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice !== undefined) {
        filter.price.$lte = Number(maxPrice);
      }
    }

      let sortOption = { createdAt: -1 };

      if (sort === "price_asc") {
        sortOption = { price: 1 };
      }

      if (sort === "price_desc") {
        sortOption = { price: -1 };
      }

      if (sort === "name_asc") {
        sortOption = { name: 1 };
      }

      if (sort === "name_desc") {
        sortOption = { name: -1 };
      }

      if (sort === "newest") {
        sortOption = { createdAt: -1 };
      }

    const products = await Product.find(filter)
      .select(buyerProductFields)
      .populate("category", "name")
      .sort(sortOption);

    res.json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to search products",
      error: error.message,
    });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const products = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
      availability: { $ne: "unavailable" },
    })
      .select(buyerProductFields)
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(8);

    res.json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get related products",
      error: error.message,
    });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      verificationStatus: "verified",
      availability: { $ne: "unavailable" },
    })
      .select(buyerProductFields)
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(8);

    res.json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get recommended products",
      error: error.message,
    });
  }
};

export const saveProduct = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (user.savedProducts.includes(product._id)) {
      return res.status(400).json({
        message: "Product already saved",
      });
    }

    user.savedProducts.push(product._id);

    await user.save();

    res.json({
      message: "Product saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save product",
      error: error.message,
    });
  }
};

export const getSavedProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "savedProducts",
      select:buyerProductFields,
      populate: {
        path: "category",
        select: "name",
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      count: user.savedProducts.length,
      products: user.savedProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get saved products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .select(buyerProductFields)
      .populate("category", "name description");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get product",
      error: error.message,
    });
  }
};

export const removeSavedProduct = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const productExists = user.savedProducts.some(
      (productId) => productId.toString() === req.params.id
    );

    if (!productExists) {
      return res.status(404).json({
        message: "Product is not saved",
      });
    }

    user.savedProducts = user.savedProducts.filter(
      (productId) => productId.toString() !== req.params.id
    );

    await user.save();

    res.json({
      message: "Product removed from saved products",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove saved product",
      error: error.message,
    });
  }
};

export const getPopularProducts = async (req, res) => {
  try {
    const products = await Product.find({
      verificationStatus: "verified",
      availability: { $ne: "unavailable" },
    })
      .select(buyerProductFields)
      .populate("category", "name")
      .sort({
        requestCount: -1,
        saveCount: -1,
        createdAt: -1,
      })
      .limit(8);

    res.json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get popular products",
      error: error.message,
    });
  }
};