const konversiHarga = (nominal, profit) => {
  const newTotalHarga = Math.ceil(
    parseInt(nominal.replace(/[^\d]/g, ""), 10) + profit
  );

  const bulatkan = Math.ceil(newTotalHarga / 1000) * 1000;

  return "Rp." + bulatkan.toLocaleString("id-ID");
};

/**
 * Jika nominal pulsa < 5rb maka total + 1000
 * Jika nominal pulsa > 5rb maka total + 2000
 * @param {*} strNominal
 */
const getTotalHargaPulsa = (strNominal) => {
  const num = parseInt(strNominal.replaceAll(/[^\d]/g, ""), 10);

  let numTotalHarga = 1000;
  if (strNominal.includes("Pulsa Transfer")) {
    numTotalHarga = num + 1000;
    return "Rp. " + numTotalHarga.toLocaleString("id-ID");
  }

  if (num < 5000) {
    numTotalHarga = num + 1000;
  } else {
    numTotalHarga = num + 2000;
  }

  return "Rp. " + numTotalHarga.toLocaleString("id-ID");
};

module.exports = { konversiHarga, getTotalHargaPulsa };
