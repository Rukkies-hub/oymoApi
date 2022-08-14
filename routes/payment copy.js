const express = require("express")
const router = express.Router()
const { publicKey, secreteKey } = process.env
const Flutterwave = require('flutterwave-node-v3')
const uuid = require('uuid-random')

router.post("/", async (req, res) => {
  const { account_bank, account_number, currency, email, phone_number, fullname } = req.body
  const fw = new Flutterwave(publicKey, secreteKey)

  try {
    const payload = {
      tx_ref: `Oymo-${uuid()}`,
      amount: 2400,
      account_bank,
      account_number,
      currency,
      email,
      phone_number,
      fullname
    }

    const response = await fw.Charge.ussd(payload)
    console.log(response)
    res.json({ response })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
})

module.exports = router