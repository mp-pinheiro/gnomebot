import logger from "../utilities/logger.js"
import { getUserNameIDString, playSound, } from "../utilities/discord.js"
import { GNOME_SOUND, GNOME_POWER } from "../constants.js"
import { SlashCommandBuilder } from '@discordjs/builders'
import { ChannelType } from "discord.js"
import { getVoiceConnection } from "@discordjs/voice"


export default {
  name: "gnome",
  desc: "Gnomebot will join your channel and makes a noise.",
  /**
   * Command handler for `/gnome`
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    const userOption = interaction.options.getMember('user')
    const channelOption = interaction.options.getChannel('channel')
    const hasPermission = interaction.member?.permissions.has("ADMINISTRATOR")

    if (!hasPermission && (userOption || channelOption)) {
      logger.info(`${getUserNameIDString(interaction.author)} is not an administrator.`)
      return interaction.reply({ content: "You must be an administrator to use that command", ephemeral: true })
    }

    const channel = getChannel(interaction, channelOption, userOption)

    //  /gnome power
    if (interaction.options.getSubcommand() === 'power') {
      return handleGnomePower(interaction, channel)
    }

    //  /gnome stop
    if (interaction.options.getSubcommand() === 'stop') {
      return handleStopSubcommand(interaction)
    }

    //  /gnome
    return handleDefaultOption(interaction, channel)
  },

  getSlashCommand() {
    return new SlashCommandBuilder()
      .setName('gnome')
      .setDescription('Plays the gnome sound in your voice chat!')
      .addSubcommand(subcommand =>
        subcommand
          .setName('power')
          .setDescription('Join your voice channel')
          .addChannelOption(channel =>
            channel
              .setName('channel')
              .setDescription('Join this voice channel')
              .addChannelTypes(ChannelType.GuildVoice)
          )
          .addUserOption(user =>
            user
              .setName('user')
              .setDescription('Join this user\'s voice channel')
          )
      )
      .addSubcommand(subcommand =>
        subcommand
          .setName('sound')
          .setDescription('Join your voice channel')
          .addChannelOption(channel =>
            channel
              .setName('channel')
              .setDescription('Join this voice channel')
              .addChannelTypes(ChannelType.GuildVoice)
          )
          .addUserOption(user =>
            user
              .setName('user')
              .setDescription('Join this user\'s voice channel')
          )
      )
      .addSubcommand(subcommand =>
        subcommand
          .setName('stop')
          .setDescription('Gnomebot leaves the voice channel')
      )
  }
}

/**
 * Handles specific command case: `/gnome @member`
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').VoiceChannel} channelOption
 * @param {import('discord.js').GuildMember} userOption
 */
const getChannel = (interaction, channelOption, userOption) => {
  if (channelOption) {
    return channelOption
  }

  if (userOption) {
    return userOption.voice?.channel
  }

  return interaction.member?.voice?.channel
}

/**
 * Handles specific command case: `/gnome #channel`
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').VoiceChannel} channel
 */
const handleGnomePower = async (interaction, channel) => {
  await interaction.reply({ content: `Joining voice channel: ${channel}`, ephemeral: true })

  return playSound(channel, GNOME_POWER)
}

/**
 * Handles default command case: `/gnome`
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').VoiceChannel} channel
 */
const handleDefaultOption = async (interaction, channel) => {
  if (!channel) {
    logger.info(`${getUserNameIDString(interaction.member)} is not in a voice channel.`)
    return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true })
  }

  await interaction.reply({ content: `Joining voice channel: ${channel}`, ephemeral: true })

  return playSound(channel, GNOME_SOUND)
}

/**
 * Handles specific command case: `/gnome stop`
 * @param {import('discord.js').CommandInteraction} interaction 
 * @returns 
 */
const handleStopSubcommand = async (interaction) => {
  const connection = getVoiceConnection(interaction.guildId)
  connection?.destroy()

  return interaction.reply({ content: 'Gnome ya later!', ephemeral: true })
}