const mongoose = require("mongoose");

const formatDibuatPada = () => {
  const now = new Date();
  return now.toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Jakarta', // Sesuaikan dengan zona waktu yang diinginkan
  });
};

const pulsaSchema = new mongoose.Schema(
  {
    kode: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    jenisPaket: {
      type: String,
      required: true,
    },
    produk: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    harga: {
      type: String,
      required: true,
    },
    hargaJual: {
      type: String,
      required: true,
    },
    order: {
      type: String,
      required: true,
    },
    dibuatPada: {
      type: String,
      default: formatDibuatPada, // Menggunakan nilai default berupa fungsi Date.now
    },
  },
);

const Pulsa = mongoose.model("Pulsa", pulsaSchema, "pulsa");

module.exports = Pulsa;
