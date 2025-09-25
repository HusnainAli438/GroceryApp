import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import basketRoutes from "./routes/basketRoutes.js";

// DB Setup
import { createUserTable } from "./data/createUserTable.js";
import { createBasketItemsTable } from "./data/createBasketItemsTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize DB tables
createUserTable();
createBasketItemsTable();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/basket", basketRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

// DB connection check
app.get("/checkdb", async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT NOW()");
    res.json({ status: "Database connected", time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  } finally {
    client.release();
  }
});



app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
