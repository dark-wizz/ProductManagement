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
  try {
    const [result] = await db.query(
      "INSERT INTO products (name, price, description, stocks) VALUES (?, ?, ?, ?)",
      [name, price, description, stocks],
    );
    res
      .status(201)
      .json({ id: result.insertId, name, price, description, stocks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, stocks } = req.body;
  try {
    await db.query(
      "UPDATE products SET name = ?, price = ?, description = ?, stocks = ? WHERE id = ?",
      [name, price, description, stocks, id],
    );
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
