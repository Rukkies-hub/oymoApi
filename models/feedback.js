const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
  },
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true })

module.exports = mongoose.model("Feedback", FeedbackSchema)