import express from "express";
import { createProduct, listProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", listProducts);

export default router;
