require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { scrapeDataProduct } = require("./controllers/productController");

const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/user", require("./routes/userRoutes"));

// Endpoint untuk melakukan scrapping dan mengupdate data di Firestore
app.get("/scrape-and-update/:product", scrapeDataProduct);

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "Url not found cuyy" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server berjalan di http://0.0.0.0:${PORT}`);
});
