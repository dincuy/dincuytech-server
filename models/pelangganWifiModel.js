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

const pelangganWifiSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    macAddress: {
      type: String,
      required: true,
    },
    dibuatPada: {
      type: String,
      default: formatDibuatPada, // Menggunakan nilai default berupa fungsi Date.now
    },
  },
);

const PelangganWifi = mongoose.model("Pelanggan Wifi", pelangganWifiSchema);

module.exports = PelangganWifi;
