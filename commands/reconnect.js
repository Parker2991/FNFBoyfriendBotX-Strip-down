module.exports = {
  name: 'reconnect',
  
  hashOnly: false,//set to true ONLY if it is connected to a discord server
  
  execute (context)  {
   const source = context.source
 const bot = context.bot
    const randomstring = require('randomstring')
  context.source.sendFeedback({ text: `Reconnecting to ${bot.options.host}:${bot.options.port}`, color: 'color here'})

setTimeout(function() {
   
  bot.chat(randomstring.generate(1000)) 
 }, 1)
}
}