
import express from "express";
import {createProduct,getPopularProducts,getProductById,getProducts,getRecommendedProducts,getRelatedProducts,getSavedProducts,removeSavedProduct,saveProduct,searchProducts} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, adminMiddleware,upload.single('image') ,createProduct);
router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/:id/related", getRelatedProducts);
router.get("/popular", getPopularProducts);
router.get("/recommended", getRecommendedProducts);
router.post("/:id/save", authMiddleware, saveProduct);
router.get("/saved", authMiddleware, getSavedProducts);
router.get("/:id", getProductById);
router.delete("/:id/save", authMiddleware, removeSavedProduct);
export default router;