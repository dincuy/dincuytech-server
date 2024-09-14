const mongoose = require('mongoose');
const { Schema } = mongoose;

// Fungsi untuk menghitung tanggal jatuh tempo satu minggu dari sekarang
const calculateDueDate = () => {
  const now = new Date();
  return new Date(now.setDate(now.getDate() + 7));
};

const HutangSchema = new Schema({
  hutang_id: { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  jumlah: { type: Number, required: true },
  tanggal_jatuh_tempo: { type: Date, default: calculateDueDate },
  dibayar: { type: Boolean, default: false },
  tanggal_dibuat: { type: Date, default: Date.now },
  keterangan: { type: String }
});

const PelangganSchema = new Schema({
  nama: { type: String, required: true },
  email: { type: String, unique: true },
  telepon: { type: String, required: true },
  hutang: [HutangSchema]
});

const Pelanggan = mongoose.model('Pelanggan', PelangganSchema);
module.exports = Pelanggan;
