function inject (bot) {
  let entityId
  
  let permissionLevel = 2
  
  let gameMode

  bot.on('packet.entity_status', packet => {
    if (packet.entityId !== entityId || packet.entityStatus < 24 || packet.entityStatus > 28) return
    permissionLevel = packet.entityStatus - 24
  })

  bot.on('packet.game_state_change', packet => {
    if (packet.reason !== 3) return // Reason 3 = Change Game Mode

    gameMode = packet.gameMode
  })

  let timer

  bot.on('packet.login', (packet) => {
    entityId = packet.entityId

    gameMode = packet.gameMode
    
    timer = setInterval(() => {
      if (permissionLevel < 2) bot.command('op @s[type=player]')
      if (gameMode !== 1) bot.command('gamemode creative @s[type=player]')
    }, 200)
  })

  bot.on('end', () => {
    if (timer) clearInterval(timer)
  })
}

module.exports = inject
