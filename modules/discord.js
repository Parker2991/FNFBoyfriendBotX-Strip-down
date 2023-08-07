
const { Client, GatewayIntentBits } = require('discord.js')
const { MessageContent, GuildMessages, Guilds } = GatewayIntentBits

const CommandSource = require('../CommandModules/command_source')

const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] })

client.login(process.env.discordtoken)//add the bots discord token as a secret

function inject (bot, options) {
  if (!options.discord?.channelId) {
    bot.discord = { invite: options.discord?.invite }
    return
  }

  bot.discord = {
    client,
    channel: undefined,
    invite: options.discord.invite || undefined,
    commandPrefix: options.discord.commandPrefix
  }

  client.on('ready', () => {
    bot.discord.channel = client.channels.cache.get(options.discord.channelId)
  })


  let discordQueue = '' 
  setInterval(async () => {
    if (discordQueue === '') return
    try {
      await bot.discord.channel.send(discordQueue.substring(0, 2000))
    } catch (error) {
      console.error(error)
    }

    discordQueue = ''
  }, 1000)

  function sendDiscordMessage (message) {
    discordQueue += message
  }

  function sendComponent (message) {
    const ansi = bot.getMessageAsPrismarine(message).toAnsi().replaceAll('\u001b[9', '\u001b[3')

    sendDiscordMessage('```ansi\n' + ansi.replaceAll('`', '\u200b`').substring(0, 2000) + '\n```')
  }

  bot.on('message', message => {
    sendComponent(message)
  })

  function messageCreate (message) {
    if (message.author.id === bot.discord.client.user.id) return

    if (message.channel.id !== bot.discord.channel.id) return

    if (message.content.startsWith(bot.discord.commandPrefix)) {
      const source = new CommandSource({ profile: { name: message.member.displayName } }, { discord: true, console: false }, false, message)
      source.sendFeedback = message => {
        sendComponent(message)
      }

      bot.commandManager.executeString(source, message.content.substring(bot.discord.commandPrefix.length))
      return
    }

    bot.tellraw({
      translate: '[%s] %s: %s',//%s is for each { color: 'color example', text: 'name example'},
      with: [
        {
          translate: '%s%s%s %s',
          with: [
            {
              text: 'bots name here',
              bold: true,
              color: 'color here'
            },
            
            {
              text: 'Discord',
              bold: true,
              color: 'color here'
            }
          ],
          clickEvent: bot.discord.invite ? { action: 'open_url', value: bot.discord.invite } : undefined,
          hoverEvent: { action: 'show_text', contents: 'Click to join the discord' }
        },
        { text: message.member.displayName },
        message.content
      ]
    })
  }
  client.on('messageCreate', messageCreate)
}

module.exports = inject
