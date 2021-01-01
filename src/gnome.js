const Discord = require('discord.js')
const DiscordUtil = require('./util/discord')
const logger = require('./util/logger')
const auth = require('../discord-auth.json')
const fs = require('fs')
const { WOO } = require('./constants/sound_files')

const prefix = '!gnome'

const client = new Discord.Client()
client.commands = new Discord.Collection()

const command_files = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'))
const voice_trigger_files = fs.readdirSync('./src/triggers/voice').filter((file) => file.endsWith('.js'))
const text_trigger_files = fs.readdirSync('./src/triggers/text').filter((file) => file.endsWith('.js'))

const voice_triggers = []
const text_triggers = []

// Load commands
for (const file of command_files) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

// Load Voice Triggers
for (const file of voice_trigger_files) {
  const trigger = require(`./triggers/voice/${file}`)
  voice_triggers.push(trigger)
}

for (const file of text_trigger_files) {
  const trigger = require(`./triggers/text/${file}`)
  text_triggers.push(trigger)
}

client.on('ready', (event) => {
  logger.log(`Client connected.\nLogged in as: ${DiscordUtil.getUserNameIDString(client.user)}`)
  client.user.setActivity("Hello me ol' chum!")
})

client.on('message', (message) => {
  if (message.author.id == client.user.id) return
  if (message.content.startsWith(prefix)) {
    const args = message.content.split(/\s+/)
    args.shift()
    const command = args.shift()?.toLowerCase()

    if (!client.commands.has(command)) return

    try {
      client.commands.get(command).execute(message, args)
      DiscordUtil.logMessage(message)
    } catch (err) {
      logger.log(err)
      message.reply('An error occurred while executing that command!')
    }
  } else {
    if (message.author.id === message.client.user.id) return

    text_triggers.forEach(async (trigger) => {
      const triggered = await trigger.test(message)
      if (triggered) trigger.execute(message)
    })
  }
})

// Called when anything about a user's voice state changes (i.e. mute, unmute, join,leave,change channel, etc.)
client.on('voiceStateUpdate', (oldVoiceState, newVoiceState) => {
  if (oldVoiceState.member.user.id === oldVoiceState.client.user.id) return
  voice_triggers.forEach(async (trigger) => {
    if (await trigger.test(oldVoiceState, newVoiceState)) {
      trigger.execute(oldVoiceState, newVoiceState)
    }
  })
})

client.login(auth.token)
