const asyncHandler = require("express-async-handler");
const { default: axios } = require("axios");
// const { db } = require("../config/firebase");
const sourceUrls = require("../../sourceUrls");
const cheerio = require("cheerio");
// const { FieldValue } = require("firebase-admin/firestore");

const scrapeDataProduct = asyncHandler(async (req, res) => {
  const product = req.params.product;

  const sources = sourceUrls[product];
  if (!sources) {
    return res.json({ message: "errrorroror" });
  }

  const data = [];

  for (let i in sources) {
    const provider = sources[i].provider;
    const urls = sources[i].urls;

    const scrapedData = [];

    for (let i in urls) {
      const res = await axios(urls[i]);
      const html = await res.data;

      const $ = cheerio.load(html);
      const title = $(".payment_title").text();

      $("table.hidden-xs tbody tr").each((index, element) => {
        const kode = $(element).find("td:nth-child(1)").text().trim();
        const produk = $(element).find("td:nth-child(2)").text().trim();
        const desc =
          $(element)
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

    data.push(...scrapedData);
  }

  // const docRef = db.collection("products").doc(product);
  // await docRef.set({ data, updatePada: FieldValue.serverTimestamp() });

  res.json({ message: `Scraping and updating data ${product} complete!` });
});

module.exports = {
  scrapeDataProduct,
};
