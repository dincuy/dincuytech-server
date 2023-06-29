const express = require('express')
const router = express.Router()

router.get('/:product', (req, res) => {
  const product = req.params.product

  res.send(product)
})

module.exports = router