require("dotenv").config();
const express = require("express");
// const path = require("path");
const app = express();
const serverless = require("serverless-http");
const cors = require("cors");
const corsOptions = require("../../config/corsOptions");
const { updateDataProduct } = require("../../controllers/productController");
const scrapFromUrl = require("../../utils/scrapFromUrl");
const sourceUrls = require("../../sourceUrls");
const { setDoc, doc, serverTimestamp } = require("firebase/firestore");
const { db } = require("../../config/firebase");

app.use(cors(corsOptions));

app.set("view engine", "ejs");

// timer dalam milidetik
// 24 jam
const timer = updateDataProduct(3600000);

app.get("/", (req, res) => {
  res.render("index", { timer: timer });
});

// update firestore
app.get("/update", (req, res) => {
  const products = ["pulsa", "paket-internet", "voucher-internet"];
  for (let i in products) {
    scrapFromUrl(sourceUrls, products[i]).then(async (data) => {
      // const newData = data.slice(1, 10)
      await setDoc(doc(db, "products", products[i]), {
        data,
        updatePada: serverTimestamp(),
      });
    });
  }
  res.json({ text: "update sukses" });
});

app.use("/checkout", require("../../routes/checkout"));

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "Url not found cuyy" });
});

const handler = serverless(app);

module.exports = { handler };
