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
    const result = await client.query(`SELECT * FROM basket_items`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

export const updateBasketItemService = async (itemName, quantity) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE basket_items
       SET quantity = $1
       WHERE item_name = $2
       RETURNING *`,
      [quantity, itemName]
    );
    if (result.rowCount === 0) {
      throw new Error("Item not found");
    }
    return result.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

export const deleteBasketItemService = async (itemName) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM basket_items
       WHERE item_name = $1`,
      [itemName]
    );
    if (result.rowCount === 0) {
      throw new Error("Item not found");
    }
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};
