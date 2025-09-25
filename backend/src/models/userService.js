import pool from "../config/db.js";

export const getUserByIdService = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const createUser = async (userData) => {
  const client = await pool.connect();
  try {
    const { name, email } = userData;
    const result = await client.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const getUsersService = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  } finally {
    client.release();
  }
};
export const deleteUserByIdService = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query("DELETE FROM users WHERE id = $1 RETURNING *", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  } finally {
    client.release();
  }
};
export const updateUserByIdService = async (id, data) => {
  const fields = [];
  const values = [];
  let idx = 1;

  // Build SET clauses dynamically
  for (const key in data) {
    if (data[key] !== undefined) { // only update provided fields
      fields.push(`${key} = $${idx}`);
      values.push(data[key]);
      idx++;
    }
  }

  if (fields.length === 0) {
    throw new Error("No fields provided to update");
  }

  // Add the id at the end
  values.push(id);

  const query = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = $${idx}
    RETURNING *;
  `;

  const { rows } = await pool.query(query, values);
  return rows[0];
};

