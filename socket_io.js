const User = require("./models/User")

module.exports = (socket) => {
  socket.on("connected", ({ content, id }) => {
    User.updateOne({ id }, { $set: { active: true } })
      .exec()
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  })
  socket.on("disconnect", ({ content, id }) => {
    User.updateOne({ id }, { $set: { active: true } })
      .exec()
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  })
  socket.on("my message", ({ content, to }) => {
    console.log("message: " + content)
  })
}
