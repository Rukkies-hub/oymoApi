const router = require('express').Router()

const Feedback = require("../models/feedback")

router.get('/get', async (req, res) => {
  const feedbacks = await Feedback.find().limit(100)
  return res.status(200).json({
    feedbacks
  })
})

module.exports = router