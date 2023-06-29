const cheerio = require("cheerio");

/**
 *
 * @param {Array} source
 */
const scrapFromUrl = async (sources) => {
  const providers = sources.map((item) => item.provider);
  const data = [];

  for (let i in providers) {
    const provider = providers[i];
    const [source] = sources.filter((item) => item.provider === provider);
    const {urls} = source
    for (let i in urls) {
      const newData = []
      console.log(urls[i])

      try {
        const res = await fetch(urls[i]);
        const html = await res.text()
        const $ = cheerio.load(html);

        const title = $('.payment_title').text()

        $('table.hidden-xs tbody tr').each((index, element) => {
          const kode = $(element).find('td:nth-child(1)').text().trim()
          const kuota = $(element).find('td:nth-child(2)').text().trim()
          const desc = $(element).find('td:nth-child(2) b').attr('data-title').trim()
          const harga = $(element).find('td:nth-child(3)').text().trim()
          const order = $(element).find('td:nth-child(4)').text().trim()
          
          newData.push({
            kode,
            provider,
            jenisPaket: title,
            kuota,
            desc,
            harga,
            order
          })
          // console.log()
        })

      } catch (error) {
        console.log(error.message)
        return
      }

      data.push(...newData)
    }
  }

  console.log(data)
  return data
};

module.exports = scrapFromUrl