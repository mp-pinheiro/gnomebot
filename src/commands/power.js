import Logger from "../util/logger.js"
import { Message } from "discord.js"
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
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    // !gnome power
    if (!args || args.length == 0) {
      if (message.member.voice.channel) {
        return DiscordUtil.play_sound(message.member.voice.channel, GNOME_POWER)
      } else {
        return message.reply("you are not in a voice channel!")
      }
    }

    // !gnome power stop
    if (args[0] == "stop") {
      return message.guild?.voice?.channel?.leave()
    }

    // !gnome power @member
    if (message.mentions.members?.size > 0) {
      const channel = DiscordUtil.getFirstVoiceChannelOfMembers(message.mentions.members)

      if (!channel) {
        return message.reply("that user is not in a voice channel!")
      }

      return DiscordUtil.play_sound(channel, GNOME_POWER)
    }

    if (message.mentions.roles?.size > 0) {
      const channel = DiscordUtil.getFirstVoiceChannelOfMembers(_.uniq(message.mentions.roles.flatMap(x => x.members)))

      if (!channel) {
        return message.reply("that user is not in a voice channel!")
      }

      return DiscordUtil.play_sound(channel, GNOME_POWER)
    }

    // !gnome power <channel_id>
    if (args[0].match(/^\d+$/g)) {
      if (!message.member?.permissions.has("ADMINISTRATOR")) {
        return message.reply("you don't have permission to run that command!")
      }
      const channel = await message.client.channels.fetch(args[0])
      return DiscordUtil.play_sound(channel, GNOME_POWER)
    }
  },
}
