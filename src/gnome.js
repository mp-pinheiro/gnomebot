import { Client, GatewayIntentBits, Collection } from "discord.js"
import DiscordUtil, { getUserNameIDString } from "./utilities/discord.js"
import logger from "./utilities/logger.js"
import fs from "fs"
import env from "dotenv"
import deployCommands from "./utilities/deployCommands.js"

env.config()

const { DISCORD_AUTH_TOKEN } = process.env

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
})
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
  logger.debug(`Added command: ${command.name} (${file})`)
}

deployCommands(client.commands.map(command => command.getSlashCommand()))

// Dynamically load voice triggers
logger.info('Loading voice triggers...')
for (const file of voiceTriggerFiles) {
  const { default: trigger } = await import(`./triggers/voice/${file}`)
  voiceTriggers.push(trigger)
  logger.debug(`Added voice trigger: ${trigger.name} (${file})`)
}

// Dynamically load text triggers
logger.info('Loading text triggers...')
for (const file of textTriggerFiles) {
  const { default: trigger } = await import(`./triggers/text/${file}`)
  textTriggers.push(trigger)
  logger.debug(`Added text trigger: ${trigger.name} (${file})`)
}

client.on("ready", (event) => {
  logger.info(`Client connected. Logged in as: ${getUserNameIDString(client.user)}`)
  client.user.setActivity("Hello me ol' chum!")
})

client.on("messageCreate", (message) => {
  if (message.author.id == client.user.id) return

  textTriggers.forEach(async (trigger) => {
    try {
      if (await trigger.test(message)) {
        logger.info(`${getUserNameIDString(message.author)} triggered a text event: ${trigger.name}`, { 'content': message.content })
        trigger.execute(message)
      }
    } catch (err) {
      logger.error(`An error occurred while executing ${trigger.name} text trigger:\n${err}`)
    }
  })
})

client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return
  if (!client.commands.has(interaction.commandName)) return

  try {
    logger.info(`${getUserNameIDString(interaction.user)} used command: ${interaction}`)
    return client.commands.get(interaction.commandName).execute(interaction)
  } catch (err) {
    logger.error(`An error occurred while running command: ${interaction}:\n${err}`)
    return interaction.reply({ content: "An error occurred while executing that command!", ephemeral: true })
  }
})


// Called when anything about a user's voice state changes (i.e. mute, unmute, join,leave,change channel, etc.)
client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => {
  if (oldVoiceState.member.user.id === oldVoiceState.client.user.id) return
  logger.debug(`${oldVoiceState.member.user.username}'s voice state changed:\n${oldVoiceState.channel?.name} -> ${newVoiceState?.channel?.name}`)
  voiceTriggers.forEach(async (trigger) => {
    try {
      if (await trigger.test(oldVoiceState, newVoiceState)) {
        logger.info(`${getUserNameIDString(oldVoiceState.member.user)} triggered a voice event: ${trigger.name}`, { 'old_channel': oldVoiceState.channel, 'new_channel': newVoiceState.channel })
        trigger.execute(oldVoiceState, newVoiceState)
      }
    } catch (err) {
      logger.error(`An error occurred while executing ${trigger.name} voice trigger:\n${err}`)
    }
  })
})

client.on("disconnect", (err) => {
  logger.info("Gnomebot disconnected from discord")
})

client.on("error", (err) => {
  logger.error(`An unexpected error occured:\n${err}`)
})

client.login(DISCORD_AUTH_TOKEN)

export default client
