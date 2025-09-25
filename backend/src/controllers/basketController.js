import { addToBasketService, getBasketItemsService } from "../models/basketService.js";

export const addToBasket = async (req, res) => {
  const { itemName, quantity } = req.body;
  if (!itemName || !quantity) {
    return res
      .status(400)
      .json({ error: "itemName and quantity are required" });
  }
  try {
    const basketItem = await addToBasketService(itemName, quantity);
    res.json(basketItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add item to basket" });
  }
};

export const getBasketItems = async (req, res) => {
  try {
    const items = await getBasketItemsService();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch basket items" });
  }
};