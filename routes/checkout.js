const express = require('express')
const scrapFromUrl = require('../utils/scrapFromUrl')
const sourceUrls = require('../sourceUrls')
const router = express.Router()

router.get('/:product', (req, res) => {
  const product = req.params.product
  scrapFromUrl(sourceUrls, product).then((data) => {
    res.json(data)
  }).catch((error) => {
    res.send(error.message)
  })
})

module.exports = router