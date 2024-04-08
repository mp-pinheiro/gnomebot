import logger from "../utilities/logger.js"
import { getUserNameIDString, playSound } from "../utilities/discord.js"
import { GNOME_SOUND } from "../constants.js"
import { SlashCommandBuilder } from '@discordjs/builders'
import { ChannelType } from "discord.js"

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

    //  /gnome @member
    if (userOption) {
      return handleUserOption(interaction, userOption)
    }

    //  /gnome #channel
    if (channelOption) {
      return handleChannelOption(interaction, channelOption)
    }

    //  /gnome
    return handleDefaultOption(interaction)
  },

  getSlashCommand() {
    return new SlashCommandBuilder()
      .setName('gnome')
      .setDescription('Plays the gnome sound in your voice chat!')
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
  }
}

/**
 * Handles specific command case: `/gnome @member`
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').GuildMember} user
 */
const handleUserOption = async (interaction, user) => {
  const channel = user.voice?.channel

  if (!channel) {
    logger.info(`${getUserNameIDString(user)} is not in a voice channel.`)
    return interaction.reply({ content: `${user} is not in a voice channel!`, ephemeral: true })
  }

  await interaction.reply({ content: `Joining voice channel: ${channel}`, ephemeral: true })

  return playSound(channel, GNOME_SOUND)
}

/**
 * Handles specific command case: `/gnome #channel`
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').VoiceChannel} channel
 */
const handleChannelOption = async (interaction, channel) => {
  await interaction.reply({ content: `Joining voice channel: ${channel}`, ephemeral: true })

  return playSound(channel, GNOME_SOUND)
}

/**
 * Handles default command case: `/gnome`
 * @param {import('discord.js').CommandInteraction} interaction
 */
const handleDefaultOption = async (interaction) => {
  const userChannel = interaction.member?.voice?.channel
  if (!userChannel) {
    logger.info(`${getUserNameIDString(interaction.member)} is not in a voice channel.`)
    return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true })
  }

  await interaction.reply({ content: `Joining voice channel: ${userChannel}`, ephemeral: true })

  return playSound(userChannel, GNOME_SOUND)
}