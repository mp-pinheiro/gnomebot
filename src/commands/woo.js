import Logger from "../util/logger.js"
import DiscordUtil from "../util/discord.js"
import { Message } from "discord.js"
import { WOO } from "../constants.js"

const logger = new Logger("woo")
const { getUserNameIDString } = DiscordUtil

const usageHelp = `\
!gnome woo   -   Joins your voice channel and makes a noise
!gnome woo *<channel_id>*   -   Joins the specified voice channel and makes a noise (Admin)
!gnome woo *@<user>*   -   Joins @<user>'s voice channel and makes a noise (Admin)`

export default {
  name: "woo",
  desc: "Gnomebot will join your channel and makes a noise.",
  help: usageHelp,
  /**
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    // !gnome woo
    if (!args || args.length == 0) {
      if (!message.member?.voice.channel) {
        logger.log(`${getUserNameIDString(message.author)} is not in a voice channel.`)
        return message.reply("you are not in a voice channel!")
      }

      return DiscordUtil.play_sound(message.member.voice.channel, WOO)
    }

    // !gnome woo @member
    if (message.mentions.members?.size > 0) {
      const channel = DiscordUtil.getFirstVoiceChannelOfMembers(message.mentions.members)

      if (!channel) {
        return message.reply("that user is not in a voice channel!")
      }

      return DiscordUtil.play_sound(channel, WOO)
    }

    // !gnome woo <channel_id>
    if (args[0].match(/^\d+$/)) {
      const channel_id = args[0]

      if (!message.member?.permissions.has("ADMINISTRATOR")) {
        logger.log(`${getUserNameIDString(message.author)} is not an administrator.`)
        return
      }

      let channel = await message.client.channels.fetch(channel_id)

      return DiscordUtil.play_sound(channel, WOO)
    }
  },
}
