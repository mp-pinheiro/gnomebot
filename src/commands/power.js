import logger from "../util/logger.js"
import { Message } from "discord.js"
import { GNOME_POWER } from "../constants/sound_files.js"
import DiscordUtil from "../util/discord.js"

export default {
  name: "power",
  desc: "Plays GNOME POWER in your voice chat.",
  /**
   *
   * @param {Message} message
   * @param {Array<String>} args
   */
  async execute(message, args) {
    if (args.length > 0 && args[0].toLowerCase() == "stop") {
      message.guild?.voice?.channel?.leave()
      return
    }
    if (message.member.voice.channel) {
      DiscordUtil.play_sound(message.member.voice.channel, GNOME_POWER)
    } else {
      message.reply("you are not in a voice channel!")
    }
  },
}
