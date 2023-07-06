require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const sourceUrls = require("./sourceUrls");
const { default: axios } = require("axios");
const { FieldValue } = require('firebase-admin/firestore');
const { db } = require("./config/firebase");
const cheerio = require("cheerio");

const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

// Endpoint untuk melakukan scrapping dan mengupdate data di Firestore
app.get('/scrape-and-update', async (req, res) => {
  try {
    for (let i in sourceUrls) {
      const product = sourceUrls[i].product
      const items = sourceUrls[i].items

      const data = []

      for (let i in items) {
        const provider = items[i].provider
        const urls = items[i].urls

        const scrapedData = []

        for (let i in urls) {
          const res = await axios(urls[i]);
          const html = await res.data;

          const $ = cheerio.load(html);
          const title = $(".payment_title").text();

          $("table.hidden-xs tbody tr").each((index, element) => {
            const kode = $(element).find("td:nth-child(1)").text().trim();
            const produk = $(element).find("td:nth-child(2)").text().trim();
            const desc = $(element)
              .find("td:nth-child(2) b")
              .attr("data-title")
              .replace(/\n/g, " ")
              .trim() || "tidak ada deskripsi";
            const harga = $(element).find("td:nth-child(3)").text().trim();
            const order = $(element).find("td:nth-child(4)").text().trim();

            scrapedData.push({
              kode,
              provider,
              jenisPaket: title.split(" ").slice(1).join(" "),
              produk,
              desc,
              harga,
              order,
            });
          });
        }

        data.push(...scrapedData)
      }

      const docRef = db.collection("products").doc(product);
      await docRef.set({ data, updatePada: FieldValue.serverTimestamp() });
    }

    res.send('Scraping and updating data complete!');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "Url not found cuyy" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server berjalan di http://0.0.0.0:${PORT}`);
});

