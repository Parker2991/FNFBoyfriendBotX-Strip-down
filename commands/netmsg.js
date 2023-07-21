const CommandError = require('../CommandModules/command_error.js')
module.exports = {
  name: 'netmsg',

  execute (context) {
     
    const message = context.arguments.join(' ')
    const bot = context.bot

    const component = {
      translate: '[%s%s%s%s] [%s] %s \u203a %s',
      with: [
  { color: '<color here>', text: '<name here>',bold: true },//bold is optional
        
        bot.options.host,
        context.source.player.displayName ?? context.source.player.profile.name,
        message
      ]
    }

    for (const eachBot of bot.bots) eachBot.tellraw(component)
  }
}
