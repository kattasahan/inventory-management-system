import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  // getProduct,
  updateProduct,
} from "../controllers/productController";
import { admin, protect } from "../middleware/authMiddleware";

const router = Router();

// router.get("/get/:id", getProduct);
router.get("/getAll", getAllProducts);

router.post("/add", protect, admin, createProduct);
router.put("/update", protect, admin, updateProduct);
router.delete("/delete", protect, admin, deleteProduct);

export default router;
