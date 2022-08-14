const express = require('express')
const router = express.Router()

const { mongoose } = require("mongoose")
const Feedback = require("../models/feedback")

router.post('/', async (req, res) => {
  const { email, feedback } = req.body

  if (email) {
    Feedback.create({
      _id: new mongoose.Types.ObjectId(),
      email,
      feedback
    })

    res.status(201).json({
      message: "That you for your feedback",
      success: true,
    })
  }
})

module.exports = router