import Discord, { Client, Collection } from "discord.js"
import DiscordUtil from "./util/discord.js"
import logger from "./util/logger.js"
import fs from "fs"
import env from "dotenv"
import { COMMAND_PREFIX } from "./constants.js"

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

// Load commands
for (const file of command_files) {
    const { default: command } = await import(`./commands/${file}`)
    client.commands.set(command.name, command)
}

// Load Voice Triggers
for (const file of voice_trigger_files) {
    const trigger = await import(`./triggers/voice/${file}`)
    voice_triggers.push(trigger.default)
}

for (const file of text_trigger_files) {
    const trigger = await import(`./triggers/text/${file}`)
    text_triggers.push(trigger.default)
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
        const args = message.content.split(/\s+/)
        args.shift()
        const command = args.shift()?.toLowerCase()

        if (!client.commands.has(command)) return

        try {
            client.commands.get(command).execute(message, args)
            DiscordUtil.logMessage(message)
        } catch (err) {
            logger.log(err)
            message.reply("An error occurred while executing that command!")
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
client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => {
    if (oldVoiceState.member.user.id === oldVoiceState.client.user.id) return
    voice_triggers.forEach(async (trigger) => {
        if (await trigger.test(oldVoiceState, newVoiceState)) {
            trigger.execute(oldVoiceState, newVoiceState)
        }
    })
})

client.login(DISCORD_AUTH_TOKEN)

export default client
