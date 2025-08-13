const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
