const mongoose = require("mongoose");

const varianSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  hargaBeli: { type: Number, required: true },
  hargaJual: { type: Number, required: true },
});

const stokSchema = new mongoose.Schema({
  jumlah: { type: Number, required: true },
  hargaBeli: { type: Number, required: true },
  hargaJual: { type: Number, required: true },
});

const produkSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  hargaBeli: { type: Number, required: true },
  hargaJual: { type: Number, required: true },
  deskripsi: { type: String },
  kategori: { type: String },
  gambar: { type: String }, // Assuming URL or path to the image
  barcode: { type: String },
  varian: [varianSchema],
  manajemenStok: {
    aktif: { type: Boolean, default: false },
    stok: [stokSchema],
  },
});

const Produk = mongoose.model("Produk", produkSchema);

module.exports = Produk;
