class CommandSource {
  constructor (player) {
    this.player = player
  }

  sendFeedback () {}

  sendError (message) {
    this.sendFeedback([{ text: '', color: '<color here>' }, message], false)
  }
}

module.exports = CommandSource
