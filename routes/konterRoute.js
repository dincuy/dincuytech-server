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
    const result = await PaketInternet.find({ order: "ORDER" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// update data
router.get("/paket-internet/:id", async (req, res) => {
  try {
    if (req.params.id === "update-all") {
      const newData = await scrapFromUrl(sourceUrls, "paket-internet");

      const jumlahDokumen = await PaketInternet.countDocuments({});
      if (jumlahDokumen > 0) {
        await PaketInternet.deleteMany();
        console.log("delete dulu boss");
      }

      const result = await PaketInternet.insertMany(newData);
      // console.log(newData);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "gagal" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// VOUCHER INTERNET
// get tersedia
router.get("/voucher-internet", async (req, res) => {
  try {
    const result = await VoucherInternet.find({ order: "ORDER" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// update data
router.get("/voucher-internet/:id", async (req, res) => {
  try {
    if (req.params.id === "update-all") {
      const newData = await scrapFromUrl(sourceUrls, "voucher-internet");

      const jumlahDokumen = await VoucherInternet.countDocuments({});
      if (jumlahDokumen > 0) {
        await VoucherInternet.deleteMany();
        console.log("delete dulu boss");
      }

      const result = await VoucherInternet.insertMany(newData);
      // console.log(newData);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "gagal" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PULSA
// get tersedia
router.get("/pulsa", async (req, res) => {
  try {
    const result = await Pulsa.find({ order: "ORDER" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// update data
router.get("/pulsa/:id", async (req, res) => {
  try {
    if (req.params.id === "update-all") {
      const newData = await scrapFromUrl(sourceUrls, "pulsa");

      const jumlahDokumen = await Pulsa.countDocuments({});
      if (jumlahDokumen > 0) {
        await Pulsa.deleteMany();
        console.log("delete dulu boss");
      }

      const result = await Pulsa.insertMany(newData);
      // console.log(newData);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "gagal" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
