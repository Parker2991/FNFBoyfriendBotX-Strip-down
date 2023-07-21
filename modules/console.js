const CommandSource = require('../CommandModules/command_source')

function inject (bot, options) {
  bot.console = {
    readline: null,

    useReadlineInterface (rl) {
      this.readline = rl

      rl.on('line', line => {
        bot.commandManager.executeString(bot.console.source, line)
      })

      rl.on('close', () => {
        this.readline = null
      })
    }
  }

  bot.console.source = new CommandSource(null);
  bot.console.source.sendFeedback = message => {
    const ansi = bot.getMessageAsPrismarine(message)?.toAnsi()
    console.log(ansi)
  }

  bot.on('message', message => {
    const ansi = bot.getMessageAsPrismarine(message)?.toAnsi()
    console.log(`[${options.host}${options.port !== 25565 ? `:${options.port}` : ''}] ${ansi}`)
  })
}
module.exports = inject
