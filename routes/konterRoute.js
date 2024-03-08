const express = require("express");
const router = express.Router();

const sourceUrls = require("../sourceUrls");
const scrapFromUrl = require("../utils/scrapFromUrl");
const PaketInternet = require("../models/paketInternetModel");
const VoucherInternet = require("../models/voucherInternetModel");
const Pulsa = require("../models/pulsaModel");

// PAKET INTERNET
// get tersedia
router.get("/paket-internet", async (req, res) => {
  try {
    const result = [
      {
        data: [],
        options: [],
      },
    ];

    result[0].data = await PaketInternet.find({ order: "ORDER" });
    result[0].options = await PaketInternet.distinct("jenisPaket", {
      order: "ORDER",
    }).exec();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// VOUCHER INTERNET
// get tersedia
router.get("/voucher-internet", async (req, res) => {
  try {
    const result = [
      {
        data: [],
        options: [],
      },
    ];

    result[0].data = await VoucherInternet.find({ order: "ORDER" });
    result[0].options = await VoucherInternet.distinct("jenisPaket", {
      order: "ORDER",
    }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PULSA
// get tersedia
router.get("/pulsa", async (req, res) => {
  try {
    const result = [
      {
        data: [],
        options: [],
      },
    ];

    result[0].data = await Pulsa.find({ order: "ORDER" });
    result[0].options = await Pulsa.distinct("jenisPaket", {
      order: "ORDER",
    }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE DATA PRODUK
router.get("/update-data/:produk", async (req, res) => {
  const models = {
    "paket-internet": PaketInternet,
    "voucher-internet": VoucherInternet,
    pulsa: Pulsa,
  };
  try {
    const produk = req.params.produk;

    const newData = await scrapFromUrl(sourceUrls, produk);

    const jumlahDokumen = await models[produk].countDocuments({});
    if (jumlahDokumen > 0) {
      await models[produk].deleteMany();
      console.log("delete dulu boss");
    }

    const result = await models[produk].insertMany(newData);
    // console.log(newData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
