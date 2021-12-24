import Logger from "../util/logger.js"
import { GNOME_POWER } from "../constants.js"
import DiscordUtil from "../util/discord.js"
import _ from "lodash"

const logger = new Logger("commands/gnome_power")

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
      return interaction.guild?.voice?.channel?.leave()
    }

    if (interaction.options.getSubcommand() === 'play') {
      const userOption = interaction.options.getMember('user')
      const channelOption = interaction.options.getChannel('channel')

      if (!userOption && !channelOption) {
        const userChannel = interaction.member?.voice?.channel
        if (userChannel) {
          await interaction.reply({ content: `Joining voice channel: ${userChannel.name}` })
          return DiscordUtil.playSound(userChannel, GNOME_POWER)
        } else {
          return interaction.reply("You are not in a voice channel!")
        }
      }

      // !gnome power @member
      if (userOption) {
        const channel = userOption.voice?.channel

        if (!channel) {
          return interaction.reply({ content: "That user is not in a voice channel!", ephemeral: true })
        }

        await interaction.reply({ content: `Joining voice channel: ${channel.name}` })

        return DiscordUtil.playSound(channel, GNOME_POWER)
      }

      // !gnome power <channel_id>
      if (channelOption) {
        if (!interaction.member?.permissions.has("ADMINISTRATOR")) {
          return interaction.reply({ content: "You don't have permission to run that command!", ephemeral: true })
        }

        await interaction.reply({ content: `Joining voice channel: ${channelOption.name}` })

        return DiscordUtil.playSound(channelOption, GNOME_POWER)
      }
    }
  }
}
