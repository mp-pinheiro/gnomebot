import { GNOME_POWER } from "../constants.js"
import DiscordUtil from "../utilities/discord.js"
import { getVoiceConnection } from "@discordjs/voice"
import _ from "lodash"
import { SlashCommandBuilder } from '@discordjs/builders'
import { ChannelType } from "discord.js"

const usageHelp = `\
!gnome power   -   Joins your voice channel and plays GNOME POWER
!gnome power *<channel_id>*   -   Plays GNOME POWER in the specified voice channel (Admin)
!gnome power *@<user>*   -   Joins @<user>'s voice channel and plays GNOME POWER (Admin)
!gnome power stop   -   Stops playing gnome power in this server`

export default {
  name: "power",
  desc: "Plays GNOME POWER in your voice chat.",
  help: usageHelp,
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   * @param {Array<String>} args
   */
  async execute(interaction) {
    //  /power play
    if (interaction.options.getSubcommand() === 'play') {
      return handlePlaySubcommand(interaction)
    }

    //  /power stop
    if (interaction.options.getSubcommand() === 'stop') {
      return handleStopSubcommand(interaction)
    }
  },

  getSlashCommand() {
    return new SlashCommandBuilder()
      .setName('power')
      .setDescription('Plays GNOME POWER in your voice chat!')
      .addSubcommand(subcommand =>
        subcommand
          .setName('stop')
          .setDescription('Stops the song')
      )
      .addSubcommand(subcommand =>
        subcommand
          .setName('play')
          .setDescription('Plays GNOME POWER in a voice channel')
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
  }
}

/**
 * Handles specific command case: `/power stop`
 * @param {import('discord.js').CommandInteraction} interaction 
 * @returns 
 */
const handleStopSubcommand = async (interaction) => {
  const connection = getVoiceConnection(interaction.guildId)
  connection?.destroy()

  return interaction.reply({ content: 'Stopped playing GNOME POWER!', ephemeral: true })
}


/**
 * Handles specific command case: `/power play`
 * @param {import('discord.js').CommandInteraction} interaction 
 */
const handlePlaySubcommand = async (interaction) => {
  const userOption = interaction.options.getMember('user')
  const channelOption = interaction.options.getChannel('channel')
  const hasPermission = interaction.member?.permissions.has("ADMINISTRATOR")

  if (!hasPermission && (userOption || channelOption)) {
    return interaction.reply({ content: "You don't have permission to run that command!", ephemeral: true })
  }

  //  /power @member
  if (userOption) {
    return handleUserPlaySubcommand(interaction, userOption)
  }

  //  /power #channel
  if (channelOption) {
    return handleChannelPlaySubcommand(interaction, channelOption)
  }

  //  /power
  return handleDefaultPlaySubcommand(interaction)
}


/**
 * Handles specific command case: `/power play`
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').GuildMember} member
 */
const handleUserPlaySubcommand = async (interaction, user) => {
  const channel = user.voice?.channel

  if (!channel) {
    return interaction.reply({ content: `${user} is not in a voice channel!`, ephemeral: true })
  }

  await interaction.reply({ content: `Playing GNOME POWER in ${user}'s voice channel: ${channel}` })

  return DiscordUtil.playSound(channel, GNOME_POWER)
}


/**
 * Handles specific command case: `/power play`
 * @param {import('discord.js').CommandInteraction} interaction
 * @param {import('discord.js').VoiceChannel} channel
 */
const handleChannelPlaySubcommand = async (interaction, channel) => {
  await interaction.reply({ content: `Playing GNOME POWER in voice channel: ${channel}` })

  return DiscordUtil.playSound(channel, GNOME_POWER)
}


/**
 * Handles specific command case: `/power play`
 * @param {import('discord.js').CommandInteraction} interaction 
 */
const handleDefaultPlaySubcommand = async (interaction) => {
  const userChannel = interaction.member?.voice?.channel
  if (userChannel) {
    await interaction.reply({ content: `Playing GNOME POWER in ${interaction.member}'s voice channel: ${userChannel}` })
    return DiscordUtil.playSound(userChannel, GNOME_POWER)
  } else {
    return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true })
  }
}