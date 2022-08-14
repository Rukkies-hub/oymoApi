const express = require('express')
const router = express.Router()
const { payStackSecreteKey } = process.env
const uuid = require('uuid-random')

const paystack = require('paystack-api')(payStackSecreteKey)

router.get('/', async (req, res) => {

  // paystack.{resource}.{method}
  paystack.customer
    .list()
    .then(function (body) {
      console.log(body)
      res.json({ body })
    })
    .catch(function (error) {
      console.log(error)
    })
})

module.exports = router