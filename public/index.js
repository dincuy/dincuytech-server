const { timer } = require("../server.js");
const now = new Date();
// const target = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Tambahkan 24 jam

// const timer = '<%= timer %>'
function hitungMundur() {
  let sisaWaktu = parseInt(timer, 10) - now.getTime();

  const countdownElement = document.getElementById("countdown");

  const intervalId = setInterval(() => {
    let jam = Math.floor(
      (sisaWaktu % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let menit = Math.floor((sisaWaktu % (1000 * 60 * 60)) / (1000 * 60));
    let detik = Math.floor((sisaWaktu % (1000 * 60)) / 1000);

    sisaWaktu = sisaWaktu - 1000;

    countdownElement.innerHTML = jam + ":" + menit + ":" + detik;
    // console.log(sisaWaktu);

    if (sisaWaktu < 0) {
      clearInterval(intervalId);
      countdownElement.innerHTML = "Berhasil Update";
      setTimeout(() => {
        hitungMundur();
      }, 1000); // Tunggu 1 detik sebelum memulai hitung mundur baru
    }
  }, 1000);
}

hitungMundur();
