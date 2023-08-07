const CommandError = require('../CommandModules/command_error')

module.exports = {
  name: 'say',
//
  execute (context) {
    const message = context.arguments.join(' ')

    const prefix = {
      translate: '[%s%s%s%s][%s][%s][%s] ',//%s is for each { color: 'color example', text: 'name example'}, 
      bold: true,
      color: 'dark_gray',
      with: [
       { color: 'color here', text: 'bot name here' }
      ]
    }

    context.bot.tellraw(['', prefix, message])
  }
}
