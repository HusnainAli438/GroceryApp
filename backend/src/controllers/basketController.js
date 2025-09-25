import { addToBasketService, getBasketItemsService, updateBasketItemService, deleteBasketItemService } from "../models/basketService.js";

export const addToBasket = async (req, res) => {
  const { itemName, quantity } = req.body;
  if (!itemName || !quantity) {
    return res.status(400).json({ error: "itemName and quantity are required" });
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

export const updateBasketItem = async (req, res) => {
  const { itemName } = req.params;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({ error: "Quantity is required" });
  }

  try {
    const updatedItem = await updateBasketItemService(itemName, quantity);
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update item in basket" });
  }
};

export const deleteBasketItem = async (req, res) => {
  const { itemName } = req.params;

  try {
    await deleteBasketItemService(itemName);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete item from basket" });
  }
};
