import express from "express";
import { addToBasket, getBasketItems, updateBasketItem, deleteBasketItem } from "../controllers/basketController.js";
const router = express.Router();

router.get("/", getBasketItems);
router.post("/", addToBasket);
router.patch("/:itemName", updateBasketItem);
router.delete("/:itemName", deleteBasketItem);

export default router;
