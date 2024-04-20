const express = require("express");
const PelangganWifi = require("../models/pelangganWifiModel");
const router = express.Router();

// PELANGGAN WIFI
// get data pelanggan
router.get("/wifi", async (req, res) => {
  try {
    const result = await PelangganWifi.find({});

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// tambah pelanggan wifi
router.post("/wifi", async (req, res) => {
  try {
    const userWifi = await PelangganWifi.create(req.body);
  } catch (error) {}
});
