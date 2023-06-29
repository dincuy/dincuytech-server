require('dotenv').config()
const express = require("express")
const app = express()

const PORT = process.env.PORT || 3500 

app.get('/', (req, res) => {
  res.send('Hallo home')
})

app.use('/checkout', require('./routes/checkout'))

app.all("*", (req, res) => {
  res.status(404)
  res.json({message: "Url not found cuyy"})
})

app.listen(PORT, () => {
  console.log(`Sukses server berjalan di http://localhost:${PORT}`)
})