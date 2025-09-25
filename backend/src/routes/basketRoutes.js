import express from "express";
import { addToBasket, getBasketItems } from "../controllers/basketController.js";
const router = express.Router();

router.get("/", getBasketItems);
router.post("/", addToBasket);
export default router;