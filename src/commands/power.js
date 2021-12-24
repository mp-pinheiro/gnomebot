import { GNOME_POWER } from "../constants.js"
import DiscordUtil from "../util/discord.js"
import { getVoiceConnection } from "@discordjs/voice"
import _ from "lodash"

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
    // Command /power stop
    if (interaction.options.getSubcommand() === 'stop') {
      const connection = getVoiceConnection(interaction.guildId)
      connection?.destroy()

      return interaction.reply({ content: 'Stopped playing GNOME POWER!', ephemeral: true })
    }

    if (interaction.options.getSubcommand() === 'play') {
      const userOption = interaction.options.getMember('user')
      const channelOption = interaction.options.getChannel('channel')

      if (!userOption && !channelOption) {
        const userChannel = interaction.member?.voice?.channel
        if (userChannel) {
          await interaction.reply({ content: `Playing GNOME POWER in ${userOption}'s voice channel: ${userChannel}` })
          return DiscordUtil.playSound(userChannel, GNOME_POWER)
        } else {
          return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true })
        }
      }

      // !gnome power @member
      if (userOption) {
        const channel = userOption.voice?.channel

        if (!channel) {
          return interaction.reply({ content: `${userOption} is not in a voice channel!`, ephemeral: true })
        }

        await interaction.reply({ content: `Playing GNOME POWER in ${userOption}'s voice channel: ${channel}` })

        return DiscordUtil.playSound(channel, GNOME_POWER)
      }

      // !gnome power <channel_id>
      if (channelOption) {
        const hasPermission = interaction.member?.permissions.has("ADMINISTRATOR")
        if (!hasPermission) {
          return interaction.reply({ content: "You don't have permission to run that command!", ephemeral: true })
        }

        await interaction.reply({ content: `Playing GNOME POWER in voice channel: ${channelOption}` })

        return DiscordUtil.playSound(channelOption, GNOME_POWER)
      }
    }
  }
}
