// * Not real hashing
const crypto = require('crypto')

let _hash = generateHash()

function inject (bot) {
  bot.hashing = {
    _hash: crypto.randomBytes(4).toString('hex').substring(0,16),
 
    get hash () { return this._hash },
    set hash (value) {
   this._hash = value
      this.discordChannel?.send('```ansi\n Hash for server ' + `${bot.options.host}:${bot.options.port}: ${value}` + '\n```')
    },

    generateHash () {
      return crypto.randomBytes(4).toString('hex').substring(0, 16)
    },

    updateHash () {
      this.hash = this.generateHash()
    }
  }
 
  bot.discord.client?.on('ready', () => {
    bot.hashing.discordChannel = bot.discord.client.channels.cache.get('trusted role id here')
    bot.hashing.discordChannel?.send('```ansi\n Hash for server ' + `${bot.options.host}:${bot.options.port}: ` + bot.hashing.hash + '\n```')
  })
}
//in order to get role, and channel ids is to have developer mode on in discord. in order to turn it is to click on your discord profile it will either be on the bottom left for discord on pc or on the bottom right for discord on mobile. now go to advanced and developer mode should be a option
function generateHash () {
  return crypto.randomBytes(4).toString('hex')
}

module.exports = inject
