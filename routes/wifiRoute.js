const express = require("express");
const PelangganWifi = require("../models/pelangganWifiModel");
const router = express.Router();

// PELANGGAN WIFI
// get data pelanggan
router.get("/", async (req, res) => {
  try {
    const result = await PelangganWifi.find({});

    if (result.length === 0) {
      res.status(404).json({ message: "Data tidak ditemukan" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// tambah pelanggan wifi
router.post("/", async (req, res) => {
  try {
    const existingPelanggan = await PelangganWifi.findOne({ macAddress: req.body.macAddress });

    if (existingPelanggan) {
      return res.status(400).json({ message: "Alamat MAC sudah digunakan." });
    }

    const newPelanggan = new PelangganWifi(req.body);
    const result = await newPelanggan.save();

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router