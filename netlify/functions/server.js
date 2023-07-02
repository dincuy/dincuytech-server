require("dotenv").config();
const express = require("express");
const path = require('path')
const app = express();
const serverless = require("serverless-http");
const cors = require("cors");
const corsOptions = require("../../config/corsOptions");
const { updateDataProduct } = require("../../controllers/productController");

app.use(cors(corsOptions));

app.set("view engine", "ejs")

// timer dalam milidetik
// 24 jam
const timer = updateDataProduct(3600000)

app.get("/", (req, res) => {
  
  res.render('index', {timer: timer})
});

app.use("/checkout", require("../../routes/checkout"));

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "Url not found cuyy" });
});

const handler = serverless(app);

module.exports = { handler };
