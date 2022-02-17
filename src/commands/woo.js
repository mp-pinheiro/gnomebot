import logger from "../utilities/logger.js"
import { getUserNameIDString, playSound } from "../utilities/discord.js"
import { WOO } from "../constants.js"

const usageHelp = `\
!gnome woo   -   Joins your voice channel and makes a noise
!gnome woo *<channel_id>*   -   Joins the specified voice channel and makes a noise (Admin)
!gnome woo *@<user>*   -   Joins @<user>'s voice channel and makes a noise (Admin)`

export default {
  name: "woo",
  desc: "Gnomebot will join your channel and makes a noise.",
  help: usageHelp,
  /**
   * Command handler for `/woo`
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

    //  /woo @member
    if (userOption) {
      return handleUserOption(interaction, userOption)
    }

    //  /woo #channel
    if (channelOption) {
      return handleChannelOption(interaction, channelOption)
    }

    //  /woo
    return handleDefaultOption(interaction)
  },
}

/**
 * Handles specific command case: `/woo @member`
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

  return playSound(channel, WOO)
}

/**
 * Handles specific command case: `/woo #channel`
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').VoiceChannel} channel
 */
const handleChannelOption = async (interaction, channel) => {
  await interaction.reply({ content: `Joining voice channel: ${channel}`, ephemeral: true })

  return playSound(channel, WOO)
}

/**
 * Handles default command case: `/woo`
 * @param {import('discord.js').CommandInteraction} interaction
 */
const handleDefaultOption = async (interaction) => {
  const userChannel = interaction.member?.voice?.channel
  if (!userChannel) {
    logger.info(`${getUserNameIDString(interaction.member)} is not in a voice channel.`)
    return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true })
  }

  await interaction.reply({ content: `Joining voice channel: ${userChannel}`, ephemeral: true })

  return playSound(userChannel, WOO)
}