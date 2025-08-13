const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name, price, description, stocks } = req.body;
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Product name is required." });
  }
  if (price == null || isNaN(price) || price < 0) {
    return res.status(400).json({ error: "Price must be a non-negative number." });
  }
  if (stocks == null || isNaN(stocks) || stocks < 0) {
    return res.status(400).json({ error: "Stocks must be a non-negative integer." });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO products (name, price, description, stocks) VALUES (?, ?, ?, ?)",
      [name, price, description, stocks],
    );
    res.status(201).json({ id: result.insertId, name, price, description, stocks });
  } catch (err) {
    res.status(500).json({ error: "Failed to add product: " + err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, stocks } = req.body;
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Product name is required." });
  }
  if (price == null || isNaN(price) || price < 0) {
    return res.status(400).json({ error: "Price must be a non-negative number." });
  }
  if (stocks == null || isNaN(stocks) || stocks < 0) {
    return res.status(400).json({ error: "Stocks must be a non-negative integer." });
  }
  try {
    const [existing] = await db.query("SELECT id FROM products WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: "Product not found." });
    }
    await db.query(
      "UPDATE products SET name = ?, price = ?, description = ?, stocks = ? WHERE id = ?",
      [name, price, description, stocks, id],
    );
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product: " + err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [existing] = await db.query("SELECT id FROM products WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: "Product not found." });
    }
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product: " + err.message });
  }
});

module.exports = router;
