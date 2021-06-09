import Discord, { Client, Collection } from "discord.js"
import DiscordUtil from "./util/discord.js"
import Logger from "./util/logger.js"
import fs from "fs"
import env from "dotenv"
import { COMMAND_PREFIX } from "./constants.js"
import { parseArgsStringToArgv as parseArgs } from "string-argv"


const logger = new Logger('gnome.js')
env.config()

const { getUserNameIDString } = DiscordUtil

const { DISCORD_AUTH_TOKEN } = process.env

const client = new Client()
client.commands = new Collection()

const command_files = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"))
const voice_trigger_files = fs
  .readdirSync("./src/triggers/voice")
  .filter((file) => file.endsWith(".js"))
const text_trigger_files = fs
  .readdirSync("./src/triggers/text")
  .filter((file) => file.endsWith(".js"))

const voice_triggers = []
const text_triggers = []

// Dynamically load commands
for (const file of command_files) {
  const { default: command } = await import(`./commands/${file}`)
  client.commands.set(command.name, command)
}

// Dynamically load voice triggers
for (const file of voice_trigger_files) {
  const { default: trigger } = await import(`./triggers/voice/${file}`)
  voice_triggers.push(trigger)
}

// Dynamically load text triggers
for (const file of text_trigger_files) {
  const { default: trigger } = await import(`./triggers/text/${file}`)
  text_triggers.push(trigger)
}

client.on("ready", (event) => {
  logger.log(
    `Client connected.\nLogged in as: ${getUserNameIDString(client.user)}`
  )
  client.user.setActivity("Hello me ol' chum!")
})

client.on("message", (message) => {
  if (message.author.id == client.user.id) return
  if (message.content.toLowerCase().startsWith(COMMAND_PREFIX)) {
    //const args = message.content.split(/\s+/)
    const args = parseArgs(message.content).filter((x) => !!x.trim())

    args.shift()
    const command = args.shift()?.toLowerCase()

    if (!client.commands.has(command)) return

    try {
      DiscordUtil.logMessage(message)
      client.commands.get(command).execute(message, args)
    } catch (err) {
      logger.log(err)
      message.reply("An error occurred while executing that command!")
    }
  } else {
    text_triggers.forEach(async (trigger) => {
      try {
        if (await trigger.test(message)) {
          logger.log(`${trigger.name} text trigger executed`)
          trigger.execute(message)
        }
      } catch (err) {
        logger.error(`An error occurred while executing ${trigger.name} text trigger:\n${err}`)
      }
    })
  }
})

// Called when anything about a user's voice state changes (i.e. mute, unmute, join,leave,change channel, etc.)
client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => {
  if (oldVoiceState.member.user.id === oldVoiceState.client.user.id) return
  voice_triggers.forEach(async (trigger) => {
    try {
      if (await trigger.test(oldVoiceState, newVoiceState)) {
        logger.log(`${trigger.name} voice trigger executed`)
        trigger.execute(oldVoiceState, newVoiceState)
      }
    } catch (err) {
      logger.error(`An error occurred while executing ${trigger.name} text trigger:\n${err}`)
    }
  })
})

client.on("disconnect", (err) => {
  logger.log("Gnombot disconnected from discord")
})

client.on("error", (err) => {
  logger.error(`An unexpected error occured:\n${err}`)
})

client.login(DISCORD_AUTH_TOKEN)

export default client
