const { setDoc, doc, serverTimestamp } = require("firebase/firestore");
const { db } = require("../config/firebase");
const scrapFromUrl = require("../utils/scrapFromUrl");
const sourceUrls = require("../sourceUrls");

/**
 *
 * @param {Number} timer - milidetik
 * @returns {new Date.getTime() + timer}
 */
const updateDataProduct = (timer) => {
  let waktu = new Date().getTime() + timer;
  let durasiMundur = timer / 1000;

  hitungMundur = setInterval(() => {
    console.log(durasiMundur);
    durasiMundur--;

    if (durasiMundur < 0) {
      clearInterval(hitungMundur);

      const products = ["pulsa", "paket-internet", "voucher-internet"];
      for (let i in products) {
        scrapFromUrl(sourceUrls, products[i]).then(async (data) => {
          // const newData = data.slice(1, 10)
          await setDoc(doc(db, "products", products[i]), {
            data,
            updatePada: serverTimestamp(),
          });
        });
      }

      console.log("update data products di firestore");
      updateDataProduct(timer);
    }
  }, 1000);

  return waktu;
};

const fetchUpdate = () => {
  const products = ["pulsa", "paket-internet", "voucher-internet"];
  const updateFirestoreStatus = []
  for (let i in products) {
    scrapFromUrl(sourceUrls, products[i]).then(async (data) => {
      // const newData = data.slice(1, 10)
      try {
        await setDoc(doc(db, "products", products[i]), {
          data,
          updatePada: serverTimestamp(),
        });

        updateFirestoreStatus.push(`update data product ${products[i]} suksess`)
        console.log(`update data product ${products[i]} suksess`);
      } catch (error) {
        console.log(error.message);
      }
    });

    if (products[i] === products[products.length - 1]) {
      console.log("update status ", updateFirestoreStatus)
      return updateFirestoreStatus
    }
  }
};

module.exports = { updateDataProduct, fetchUpdate };
