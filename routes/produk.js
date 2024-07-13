const express = require("express");
const Produk = require("../models/warung/produk");
const router = express.Router();

// Mendapatkan semua produk
router.get("/", async (req, res) => {
  try {
    const produk = await Produk.find();
    res.json(produk);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mendapatkan produk berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const produk = await Produk.findById(req.params.id);
    if (produk == null) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.json(produk);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Menambahkan produk baru
router.post("/", async (req, res) => {
  const produkBaru = new Produk(req.body);
  try {
    const produk = await produkBaru.save();
    res.status(201).json(produk);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mengedit produk berdasarkan ID
router.put("/:id", async (req, res) => {
  try {
    const produk = await Produk.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (produk == null) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.json(produk);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Menghapus produk berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const produk = await Produk.findByIdAndDelete(req.params.id);
    if (produk == null) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router