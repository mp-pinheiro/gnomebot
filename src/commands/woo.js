import logger from "../util/logger.js"
import { getUserNameIDString, playSound } from "../util/discord.js"
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
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    // !gnome woo

    const userOption = interaction.options.getMember('user')
    const channelOption = interaction.options.getChannel('channel')

    if (!userOption && !channelOption) {
      const userChannel = interaction.member?.voice?.channel
      if (!userChannel) {
        logger.info(`${getUserNameIDString(interaction.member)} is not in a voice channel.`)
        return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true })
      }

      await interaction.reply({ content: `Joining voice channel: ${userChannel}`, ephemeral: true })

      return playSound(userChannel, WOO)
    }

    // !gnome woo @member
    if (userOption) {
      const channel = userOption.voice?.channel

      if (!channel) {
        logger.info(`${getUserNameIDString(userOption)} is not in a voice channel.`)
        return interaction.reply({ content: `${userOption} is not in a voice channel!`, ephemeral: true })
      }

      await interaction.reply({ content: `Joining voice channel: ${channel}`, ephemeral: true })

      return playSound(channel, WOO)
    }

    // !gnome woo <channel_id>
    if (channelOption) {
      if (!interaction.member?.permissions.has("ADMINISTRATOR")) {
        logger.info(`${getUserNameIDString(interaction.author)} is not an administrator.`)
        return interaction.reply({ content: "You must be an administrator to use that command", ephemeral: true })
      }

      await interaction.reply({ content: `Joining voice channel: ${channelOption}`, ephemeral: true })

      return playSound(channelOption, WOO)
    }
  },
}
