import pool from "../config/db.js";

export const addToBasketService = async (itemName, quantity) => {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO basket_items (item_name, quantity)
       VALUES ($1, $2)
       ON CONFLICT (item_name)
       DO UPDATE SET quantity = basket_items.quantity + $2`,
      [itemName, quantity]
    );
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

export const getBasketItemsService = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT *
       FROM basket_items`
    );
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};