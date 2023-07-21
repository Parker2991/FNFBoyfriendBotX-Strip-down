const fs = require('fs')
const path = require('path')
const CommandError = require('../CommandModules/command_error.js')

function inject (bot, options) {
  bot.commandManager = {
    prefix: options.commands?.prefix ?? 'default.',
    commands: {},

    execute (source, commandName, args) {
      const command = this.getCommand(commandName)

      try {
        if (!command || !command.execute) throw new CommandError({ translate: 'Unknown command: %s', with: [commandName] })

        return command.execute({ bot, source, arguments: args })
      } catch (error) {
        console.error(error)

        if (error instanceof CommandError) source.sendError(error._message)
        else source.sendError({ translate: 'command.failed', hoverEvent: { action: 'show_text', contents: String(error.message) } })
      }
    },
//
    executeString (source, command) {
      const [commandName, ...args] = command.split(' ')
      return this.execute(source, commandName, args)
    },

    register (command) {
      this.commands[command.name] = command
    },

    getCommand (name) {
      return this.commands[name]
    },

    getCommands () {
      return Object.values(this.commands)
    }
  }

  for (const filename of fs.readdirSync(path.join(__dirname, '../commands'))) {
    try {
      const command = require(path.join(__dirname, '../commands', filename))
      bot.commandManager.register(command)
    } catch (error) {
      console.error('Failed to load command', filename, ':', error)
    }
  }
}

module.exports = inject
