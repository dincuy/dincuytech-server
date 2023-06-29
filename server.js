require('dotenv').config()
const express = require("express")
const app = express()

const PORT = process.env.PORT || 3500 

const cheerio = require('cheerio')
const scrapFromUrl = require('./utils/scrapFromUrl')
const { paketInternetUrls } = require('./sourceUrls')

app.get('/', (req, res) => {
  res.send('Hallo home')
})

app.use('/checkout', require('./routes/checkout'))

app.all("*", (req, res) => {
  res.status(404)
  res.json({message: "Url not found cuyy"})
})

// const fetchUrl = async () => {
//   try {
//     const res = await fetch("https://isipulsa.web.id/harga/paket-internet/indosat-11")
//     const html = await res.text()
//     const $ = await cheerio.load(html)
//     console.log($('.payment_title').text())

//     $('table.hidden-xs tbody tr').each((index) => {
//       const kode = $(`td:nth-child(1)`).text()
//       const prov =  
//       const jenisPaket = $(`td:nth-child(2)`).text()

//       // console.log()
//     })
//   } catch (error) {
//     console.log(error.message)
//   }
// }

// fetchUrl()

scrapFromUrl(paketInternetUrls)

app.listen(PORT, () => {
  console.log(`Sukses server berjalan di http://localhost:${PORT}`)
})