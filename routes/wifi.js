const express = require("express");
const PelangganWifi = require("../models/wifi/pelangganWifi");
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

// Mengedit pelanggan wifi berdasarkan ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nama, macAddress, dibuatPada } = req.body;

  try {
    const updatedPelangganWifi = await PelangganWifi.findByIdAndUpdate(
      id,
      { nama, macAddress },
      { new: true, runValidators: true }
    );

    if (!updatedPelangganWifi) {
      return res.status(404).json({ message: 'Pelanggan wifi not found' });
    }

    res.json(updatedPelangganWifi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Menghapus pelanggan wifi
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await PelangganWifi.findByIdAndDelete(id);
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error });
  }
});


module.exports = router