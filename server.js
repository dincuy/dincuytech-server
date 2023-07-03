require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { updateDataProduct } = require("./controllers/productController");
const scrapFromUrl = require("./utils/scrapFromUrl");
const sourceUrls = require("./sourceUrls");
const { setDoc, doc, serverTimestamp } = require("firebase/firestore");
const { db } = require("./config/firebase");

const PORT = 3500;

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// timer dalam milidetik
// 24 jam
// const timer = updateDataProduct(3600000);

const fetchUpdate = () => {
  const products = ["pulsa", "paket-internet", "voucher-internet"];
  for (let i in products) {
    scrapFromUrl(sourceUrls, products[i]).then(async (data) => {
      // const newData = data.slice(1, 10)
      try {
        await setDoc(doc(db, "products", products[i]), {
          data,
          updatePada: serverTimestamp(),
        });
        console.log(`update data product ${products[i]} suksess`);
      } catch (error) {
        console.log(error.message);
      }
    });
  }
};

// fetchUpdate()

app.get("/", (req, res) => {
  // const waktu = updateDataProduct()
  res.render("index");
});

// update firestore
app.get("/update", (req, res) => {
  fetchUpdate();
  res.json({ text: "update sukses" });
});

app.use("/checkout", require("./routes/checkout"));

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "Url not found cuyy" });
});

app.listen(PORT, () => {
  console.log(`Sukses server berjalan di http://localhost:${PORT}`);
});
