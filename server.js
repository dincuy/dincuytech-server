require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path')
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { updateDataProduct } = require("./controllers/productController");

const PORT = 3500;

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs");

// timer dalam milidetik
// 24 jam
const timer = updateDataProduct(3600000);

app.get("/", (req, res) => {
  // const waktu = updateDataProduct()

  res.render("index");
});

app.use("/checkout", require("./routes/checkout"));

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "Url not found cuyy" });
});

app.listen(PORT, () => {
  console.log(`Sukses server berjalan di http://localhost:${PORT}`);
});

module.exports = { timer };
