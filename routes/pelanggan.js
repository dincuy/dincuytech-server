const express = require('express');
const router = express.Router();
const Pelanggan = require('../models/pelanggan');

// Tambah pelanggan baru dengan hutang
router.post('/tambah', async (req, res) => {
  try {
    const pelanggan = new Pelanggan(req.body);
    await pelanggan.save();
    res.status(201).json(pelanggan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Tambah hutang baru ke pelanggan yang sudah ada
router.post('/tambah-hutang/:email', async (req, res) => {
  try {
    const pelanggan = await Pelanggan.findOneAndUpdate(
      { email: req.params.email },
      { $push: { hutang: req.body } },
      { new: true, runValidators: true }
    );
    if (!pelanggan) return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
    res.json(pelanggan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ubah status hutang menjadi lunas
router.patch('/bayar-hutang/:email/:hutangId', async (req, res) => {
  try {
    const pelanggan = await Pelanggan.findOneAndUpdate(
      { email: req.params.email, 'hutang.hutang_id': req.params.hutangId },
      { $set: { 'hutang.$.dibayar': true } },
      { new: true }
    );
    if (!pelanggan) return res.status(404).json({ message: 'Pelanggan atau hutang tidak ditemukan' });
    res.json(pelanggan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mendapatkan semua pelanggan dan hutangnya
router.get('/', async (req, res) => {
  try {
    const pelanggan = await Pelanggan.find();
    res.json(pelanggan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mendapatkan data pelanggan berdasarkan email
router.get('/:email', async (req, res) => {
  try {
    const pelanggan = await Pelanggan.findOne({ email: req.params.email });
    if (!pelanggan) return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
    res.json(pelanggan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
