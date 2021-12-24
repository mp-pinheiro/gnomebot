import { Client, Collection, Intents } from "discord.js"
import DiscordUtil, { getUserNameIDString } from "./util/discord.js"
import logger from "./util/logger.js"
import fs from "fs"
import env from "dotenv"
import { COMMAND_PREFIX } from "./constants.js"
import { parseArgsStringToArgv as parseArgs } from "string-argv"

env.config()

const { DISCORD_AUTH_TOKEN } = process.env

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] })
client.commands = new Collection()

const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"))
const voiceTriggerFiles = fs
  .readdirSync("./src/triggers/voice")
  .filter((file) => file.endsWith(".js"))
const textTriggerFiles = fs
  .readdirSync("./src/triggers/text")
  .filter((file) => file.endsWith(".js"))

const voiceTriggers = []
const textTriggers = []

// Dynamically load commands
logger.info('Loading commands...')
for (const file of commandFiles) {
  const { default: command } = await import(`./commands/${file}`)
  client.commands.set(command.name, command)
  logger.debug(`Added command: ${command.name}`)
}

// Dynamically load voice triggers
logger.info('Loading voice triggers...')
for (const file of voiceTriggerFiles) {
  const { default: trigger } = await import(`./triggers/voice/${file}`)
  voiceTriggers.push(trigger)
  logger.debug(`Added voice trigger: ${trigger.name}`)
}

// Dynamically load text triggers
logger.info('Loading text triggers...')
for (const file of textTriggerFiles) {
  const { default: trigger } = await import(`./triggers/text/${file}`)
  textTriggers.push(trigger)
  logger.debug(`Added text trigger: ${trigger.name}`)
}

client.on("ready", (event) => {
  logger.info(`Client connected.\nLogged in as: ${getUserNameIDString(client.user)}`)
  client.user.setActivity("Hello me ol' chum!")
})

client.on("messageCreate", (message) => {
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
      logger.info(err)
      message.reply("An error occurred while executing that command!")
    }
  } else {
    textTriggers.forEach(async (trigger) => {
      try {
        if (await trigger.test(message)) {
          logger.info(`${getUserNameIDString(message.author)} triggered a text event: ${trigger.name}`, {'content': message.content})
          trigger.execute(message)
        }
      } catch (err) {
        logger.error(`An error occurred while executing ${trigger.name} text trigger:\n${err}`)
      }
    })
  }
})

client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return
  if (!client.commands.has(interaction.commandName)) return

  try {
    logger.info(`${getUserNameIDString(interaction.user)} used command: ${interaction}`)
    return client.commands.get(interaction.commandName).execute(interaction)
  } catch (err) {
    logger.error(err)
    return interaction.reply({ content: "An error occurred while executing that command!", ephemeral: true })
  }
})


// Called when anything about a user's voice state changes (i.e. mute, unmute, join,leave,change channel, etc.)
client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => {
  if (oldVoiceState.member.user.id === oldVoiceState.client.user.id) return
  voiceTriggers.forEach(async (trigger) => {
    try {
      if (await trigger.test(oldVoiceState, newVoiceState)) {
        logger.info(`${getUserNameIDString(oldVoiceState.member.user)} triggered a voice event: ${trigger.name}`)
        trigger.execute(oldVoiceState, newVoiceState)
      }
    } catch (err) {
      logger.error(`An error occurred while executing ${trigger.name} voice trigger:\n${err}`)
    }
  })
})

client.on("disconnect", (err) => {
  logger.info("Gnombot disconnected from discord")
})

client.on("error", (err) => {
  logger.error(`An unexpected error occured:\n${err}`)
})

client.login(DISCORD_AUTH_TOKEN)

export default client
