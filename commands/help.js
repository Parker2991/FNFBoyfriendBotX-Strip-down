const CommandError = require('../CommandModules/command_error')

module.exports = {
  name: 'help',

  execute (context) {
    const commandList = []

    for (const command of context.bot.commandManager.getCommands()) {
      if (commandList.length !== 0) commandList.push(' ')
      commandList.push(String(command.name))
    }

    const length = context.bot.commandManager.getCommands().length

    context.source.sendFeedback(['Commands (', length, ') ', ...commandList], false)
  }
}
