const express = require("express");
const cors = require("cors");
require('dotenv').config();
const productsRouter = require("./routes/products");

const pool = require('./db');

async function ensureProductsTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      description TEXT,
      stocks INT NOT NULL
    );
  `;
  try {
    await pool.query(createTableSQL);
    console.log('Products table ensured.');
  } catch (err) {
    console.error('Error ensuring products table:', err.message);
  }
}
ensureProductsTable();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on ${process.env.DB_HOST}:${PORT}`);
});
