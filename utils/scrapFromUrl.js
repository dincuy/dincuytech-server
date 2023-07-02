const cheerio = require("cheerio");

/**
 *
 * @param {Object} source
 * @param {String} product
 */
const scrapFromUrl = async (sourceUrls, product) => {
  const sources = sourceUrls[product]
  
  const providers = sources.map((item) => item.provider);
  const data = [];

  for (let i in providers) {
    const provider = providers[i];
    const [source] = sources.filter((item) => item.provider === provider);
    const { urls } = source;

    for (let i in urls) {
      const newData = []
      try {
        const res = await fetch(urls[i]);
        const html = await res.text();
        const $ = cheerio.load(html);

        const title = $(".payment_title").text();

        $("table.hidden-xs tbody tr").each((index, element) => {
          const kode = $(element).find("td:nth-child(1)").text().trim();
          const produk = $(element).find("td:nth-child(2)").text().trim();
          const desc = $(element)
            .find("td:nth-child(2) b")
            .attr("data-title")
            .replace(/\n/g, " ")
            .trim() || "tidak ada deskripsi";
          const harga = $(element).find("td:nth-child(3)").text().trim();
          const order = $(element).find("td:nth-child(4)").text().trim();

          newData.push({
            kode,
            provider,
            jenisPaket: title.split(" ").slice(1).join(" "),
            produk,
            desc,
            harga,
            order,
          });
        });
      } catch (error) {
        throw error
      }

      data.push(...newData);
    }
  }

  return data;
};

module.exports = scrapFromUrl;
