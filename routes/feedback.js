const express = require('express')
const router = express.Router()

const { mongoose } = require("mongoose")
const Feedback = require("../models/feedback")
const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const { email, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRETE, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN } = process.env

const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRETE, GOOGLE_REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN })

const sendMail = async (_email, name, feedback) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: email,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRETE,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken
      }
    })

    const mailOptions = {
      from: `OYMO FEEDBACK <${_email}>`,
      to: email,
      subject: `Oymo feedback`,
      text: feedback,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${name} feedback</title>
      </head>

      <body
        style="background-color: white; display: flex; justify-content: center; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif">
        <div style="width: 600px; max-width: 100%; background-color: white;">
          <h1>${name} gave a feedbak</h1>
          <p style="color: rgba(0,0,0,0.8); font-size: .9rem;">${_email}</p>
          <span>${feedback}</span>
        </div>
      </body>

      </html>
      `
    }

    const result = await transport.sendMail(mailOptions)
    return result
  } catch (error) {
    return error
  }
}

router.post('/', async (req, res) => {
  const { email, name, feedback } = req.body

  if (email) {
    Feedback.create({
      _id: new mongoose.Types.ObjectId(),
      email,
      name,
      feedback
    })

    sendMail(email, name, feedback)
      .then(result => console.log('Email sent...', result))
      .catch(error => console.log('Error sending mail...', error))

    res.status(201).json({
      message: "Thaks you for your feedback 🥰🥰",
      success: true,
    })
  }
})

module.exports = router