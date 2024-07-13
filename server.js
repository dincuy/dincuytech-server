require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { scrapeDataProduct } = require("./controllers/konter/product");

const konterRoute = require("./routes/konter");
const wifiRoute = require("./routes/wifi");
const produkRoute = require("./routes/produk")

const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

// app.use("/user", require("./routes/userRoutes"));

// rute konter
app.use("/api/konter", konterRoute);
app.use("/api/wifi", wifiRoute);

app.use("/api/warung/produk", produkRoute)

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "Url not found cuyy" });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT);
    console.log("sukses konek ke mongodb");
    app.listen(PORT, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
